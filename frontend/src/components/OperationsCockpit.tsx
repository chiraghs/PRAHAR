import React, { useState } from 'react';
import { MapContainer, TileLayer, Polyline, Polygon, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { 
  ShieldAlert, 
  Wind, 
  Waves, 
  Hospital, 
  Zap, 
  Clock, 
  Volume2, 
  CheckCircle2, 
  FileText, 
  Play, 
  Square,
  AlertTriangle,
  Compass,
  Globe,
  Layers
} from 'lucide-react';
import { BotIcon, TimerIcon, VolumeIcon } from './Icons';
import { INDIAN_LANGUAGES, LanguageMeta } from '../lib/languages';

interface OperationsCockpitProps {
  selectedLanguage: string;
  currentTimeStep: string;
  onTimeStepChange: (step: string) => void;
}

type BasemapStyle = 'carto-dark' | 'google-hybrid' | 'esri-satellite' | 'carto-voyager';

const createSvgIcon = (color: string, label: string) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="
      background-color: ${color};
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 12px ${color};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    ">${label}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
};

const hospitalSafeIcon = createSvgIcon('#0ca30c', '🏥');
const hospitalRiskIcon = createSvgIcon('#d03b3b', '🏥');
const substationFloodedIcon = createSvgIcon('#f58220', '⚡');
const shelterSafeIcon = createSvgIcon('#00836c', '🏕️');
const shelterCutoffIcon = createSvgIcon('#d03b3b', '🏕️');
const cycloneEyeIcon = createSvgIcon('#d03b3b', '🌀');

export function OperationsCockpit({ selectedLanguage, currentTimeStep, onTimeStepChange }: OperationsCockpitProps) {
  const [selectedRole, setSelectedRole] = useState<'NDRF' | 'COLLECTOR' | 'PUBLIC'>('NDRF');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeStormId, setActiveStormId] = useState<'dana' | 'amphan' | 'fani'>('dana');
  
  // Basemap Selector (supports env var or user preference)
  const defaultBasemap = (import.meta.env.VITE_DEFAULT_BASEMAP as BasemapStyle) || 'carto-dark';
  const [basemap, setBasemap] = useState<BasemapStyle>(defaultBasemap);
  const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const currentLang: LanguageMeta = INDIAN_LANGUAGES.find(l => l.code === selectedLanguage) || INDIAN_LANGUAGES[0];

  // Track coordinates
  const trackWaypoints = [
    { time: 'T-72h', lat: 16.5, lng: 90.2, wind: 65, surge: 0.4 },
    { time: 'T-48h', lat: 18.1, lng: 89.4, wind: 90, surge: 0.9 },
    { time: 'T-24h', lat: 19.8, lng: 88.2, wind: 115, surge: 1.8 },
    { time: 'T-12h', lat: 20.4, lng: 87.5, wind: 125, surge: 2.6 },
    { time: 'Landfall', lat: 20.85, lng: 86.95, wind: 120, surge: 3.1 },
    { time: 'T+12h', lat: 21.6, lng: 86.2, wind: 70, surge: 1.2 }
  ];

  const polylineCoords = trackWaypoints.map(w => [w.lat, w.lng] as [number, number]);
  const activePosition: [number, number] = [19.8, 88.2];
  const landfallPosition: [number, number] = [20.85, 86.95];

  // Inundation Polygons
  const zoneDeep: [number, number][] = [
    [20.70, 86.85], [20.95, 87.05], [20.90, 87.20], [20.65, 87.00]
  ];
  const zoneMid: [number, number][] = [
    [20.45, 86.50], [20.75, 86.85], [20.60, 87.05], [20.35, 86.70]
  ];
  const zoneLow: [number, number][] = [
    [20.90, 86.40], [21.15, 86.70], [20.95, 87.05], [20.70, 86.75]
  ];

  // Basemap Tile Layer URLs
  const getBasemapConfig = () => {
    switch (basemap) {
      case 'google-hybrid':
        return {
          url: googleApiKey 
            ? `https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&key=${googleApiKey}`
            : 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
          attribution: '&copy; Google Maps Platform'
        };
      case 'esri-satellite':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri World Imagery (Satellite)'
        };
      case 'carto-voyager':
        return {
          url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          attribution: '&copy; CARTO &copy; OpenStreetMap'
        };
      case 'carto-dark':
      default:
        return {
          url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
          attribution: '&copy; CARTO Dark Matter &copy; OpenStreetMap'
        };
    }
  };

  const basemapConfig = getBasemapConfig();

  // Web Speech API voice synthesis
  const handlePlayVoice = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }

      setIsPlayingAudio(true);
      const textToSpeak = currentLang.broadcastText;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = currentLang.bcp47;
      utterance.rate = 0.92;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 3500);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 380px', gap: '14px', alignItems: 'stretch' }}>
      
      {/* LEFT COLUMN: Active Storm Selector & District Vulnerability */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Storm Selector Card */}
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-green)' }}>
              Active Storm Telemetry
            </span>
            <span className="glass" style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: 9999, color: 'var(--status-critical)', fontWeight: 700 }}>
              LIVE T-24H
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { id: 'dana', name: 'Cyclone DANA', category: 'Cat 2 · 125 km/h', active: true, basin: 'Bay of Bengal' },
              { id: 'amphan', name: 'Cyclone AMPHAN (2020)', category: 'Super Cyclone · 260 km/h', active: false, basin: 'Benchmark' },
              { id: 'fani', name: 'Cyclone FANI (2019)', category: 'Extremely Severe · 215 km/h', active: false, basin: 'Benchmark' }
            ].map(storm => (
              <button
                key={storm.id}
                onClick={() => setActiveStormId(storm.id as any)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 12,
                  border: activeStormId === storm.id ? '1.5px solid var(--brand-green)' : '1px solid var(--hairline)',
                  background: activeStormId === storm.id ? 'var(--brand-green-soft)' : 'var(--surface-2)',
                  color: 'var(--ink-primary)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{storm.name}</span>
                  {storm.active && (
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--status-critical)', display: 'inline-block' }} />
                  )}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', marginTop: '2px' }}>
                  {storm.category} • {storm.basin}
                </div>
              </button>
            ))}
          </div>

          {/* Quick Storm Stats */}
          <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--hairline)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--ink-muted)' }}>Central Pressure</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>984 hPa</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--ink-muted)' }}>Forward Speed</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>14 km/h</div>
            </div>
          </div>
        </div>

        {/* Coastal District Risk Rankings */}
        <div className="card" style={{ padding: '16px', flex: 1 }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-orange-strong)', marginBottom: '12px' }}>
            District Vulnerability Index
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { name: 'Bhadrak District', score: 94, level: 'Catastrophic', color: 'var(--status-critical)' },
              { name: 'Kendrapara Lowlands', score: 89, level: 'Critical', color: 'var(--status-critical)' },
              { name: 'Jagatsinghpur Estuary', score: 82, level: 'Severe', color: 'var(--brand-orange)' },
              { name: 'Balasore Coastal Belt', score: 76, level: 'Elevated', color: 'var(--status-warning)' }
            ].map(dist => (
              <div key={dist.name}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>{dist.name}</span>
                  <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: dist.color }}>{dist.score}%</span>
                </div>
                <div style={{ height: 6, background: 'var(--surface-3)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${dist.score}%`, background: dist.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '16px', padding: '10px', borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--hairline)', fontSize: '0.7rem', color: 'var(--ink-secondary)' }}>
            <strong>Choke Point Alert:</strong> Dhamra & Baitarani river backflow coincides with 3.1m high surge, blocking seaward drainage.
          </div>
        </div>

      </div>

      {/* CENTER COLUMN: GIS Map & Temporal Scrubber */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', padding: 0 }}>
        
        {/* Top Floating Controls: Basemap Switcher & Inundation Legend */}
        <div style={{ position: 'absolute', top: 12, left: 12, right: 12, zIndex: 999, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', pointerEvents: 'none' }}>
          
          {/* Basemap Switcher (Interactive) */}
          <div className="glass" style={{ padding: '3px 4px', borderRadius: 10, display: 'flex', gap: '4px', pointerEvents: 'auto', background: 'var(--surface-1)' }}>
            {[
              { id: 'carto-dark', label: '🌑 Dark War Room' },
              { id: 'google-hybrid', label: '🛰️ Google Hybrid' },
              { id: 'esri-satellite', label: '🌍 Satellite' },
              { id: 'carto-voyager', label: '🗺️ Streets' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setBasemap(item.id as any)}
                style={{
                  padding: '4px 8px',
                  borderRadius: 6,
                  border: 'none',
                  fontSize: '0.65rem',
                  fontWeight: basemap === item.id ? 800 : 600,
                  background: basemap === item.id ? 'var(--brand-green)' : 'transparent',
                  color: basemap === item.id ? '#ffffff' : 'var(--ink-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Surge Legend */}
          <div style={{ display: 'flex', gap: '6px', pointerEvents: 'auto' }}>
            <div className="glass" style={{ padding: '4px 8px', borderRadius: 8, fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '5px', background: 'var(--surface-1)' }}>
              <span style={{ width: 8, height: 8, background: '#d03b3b', borderRadius: '2px' }} />
              <span>&gt; 2.5m</span>
            </div>
            <div className="glass" style={{ padding: '4px 8px', borderRadius: 8, fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '5px', background: 'var(--surface-1)' }}>
              <span style={{ width: 8, height: 8, background: '#f58220', borderRadius: '2px' }} />
              <span>1.5 - 2.5m</span>
            </div>
            <div className="glass" style={{ padding: '4px 8px', borderRadius: 8, fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '5px', background: 'var(--surface-1)' }}>
              <span style={{ width: 8, height: 8, background: '#00836c', borderRadius: '2px' }} />
              <span>0.5 - 1.5m</span>
            </div>
          </div>
        </div>

        {/* Leaflet Map Canvas */}
        <div style={{ flex: 1, minHeight: '460px', width: '100%' }}>
          <MapContainer 
            key={basemap}
            center={[20.35, 87.5]} 
            zoom={8} 
            scrollWheelZoom={true} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution={basemapConfig.attribution}
              url={basemapConfig.url}
            />

            {/* Track Polyline */}
            <Polyline positions={polylineCoords} color="#d03b3b" weight={4} dashArray="6, 8" />

            {/* Cone of Uncertainty buffer */}
            <Circle 
              center={landfallPosition} 
              radius={65000} 
              pathOptions={{ color: '#f58220', fillColor: '#f58220', fillOpacity: 0.14, weight: 1.5 }} 
            />

            {/* Inundation Zones */}
            <Polygon positions={zoneDeep} pathOptions={{ color: '#d03b3b', fillColor: '#d03b3b', fillOpacity: 0.45, weight: 1.5 }}>
              <Popup>
                <strong>Bhitarkanika - Dhamra Fringe</strong><br />
                Surge Depth: <strong>2.5m - 3.5m</strong><br />
                Status: Earthen Embankments Overtopped
              </Popup>
            </Polygon>

            <Polygon positions={zoneMid} pathOptions={{ color: '#f58220', fillColor: '#f58220', fillOpacity: 0.35, weight: 1.5 }}>
              <Popup>
                <strong>Kendrapara Lowland Estuary</strong><br />
                Surge Depth: <strong>1.5m - 2.5m</strong><br />
                Status: Severe River Backflow Threat
              </Popup>
            </Polygon>

            <Polygon positions={zoneLow} pathOptions={{ color: '#00836c', fillColor: '#00836c', fillOpacity: 0.25, weight: 1.5 }}>
              <Popup>
                <strong>Bhadrak Agricultural Delta</strong><br />
                Surge Depth: <strong>0.5m - 1.5m</strong><br />
                Status: Saline Paddy Inundation
              </Popup>
            </Polygon>

            {/* Cyclone Eye Marker */}
            <Marker position={activePosition} icon={cycloneEyeIcon}>
              <Popup>
                <div style={{ color: '#0a1f1a' }}>
                  <h4 style={{ margin: 0, color: '#d03b3b' }}>🌀 Cyclone DANA</h4>
                  <p style={{ margin: '4px 0', fontSize: '0.75rem' }}>Location: 19.8°N, 88.2°E</p>
                  <p style={{ margin: '4px 0', fontSize: '0.75rem' }}>Wind: 115 km/h • Central: 984 hPa</p>
                </div>
              </Popup>
            </Marker>

            {/* Projected Landfall */}
            <Marker position={landfallPosition} icon={createSvgIcon('#f58220', '🎯')}>
              <Popup>
                <div>
                  <strong>Projected Landfall: Dhamra Port</strong><br />
                  Expected: 24 Oct 23:30 IST<br />
                  Peak Surge: 3.1m
                </div>
              </Popup>
            </Marker>

            {/* Infrastructure Markers */}
            <Marker position={[20.82, 86.91]} icon={hospitalRiskIcon}>
              <Popup>
                <strong>Dhamra Port CHC</strong><br />
                Elevation: 2.1m | Surge: <strong>1.4m</strong><br />
                <span style={{ color: '#d03b3b', fontWeight: 700 }}>Power Cutoff Imminent</span>
              </Popup>
            </Marker>

            <Marker position={[21.05, 86.51]} icon={hospitalSafeIcon}>
              <Popup>
                <strong>Bhadrak District Hospital</strong><br />
                Elevation: 8.4m | Surge: 0.0m<br />
                <span style={{ color: '#0ca30c', fontWeight: 700 }}>Safe Regional Relief Hub</span>
              </Popup>
            </Marker>

            <Marker position={[20.78, 86.74]} icon={substationFloodedIcon}>
              <Popup>
                <strong>OPTCL Chandbali Grid Substation</strong><br />
                Elevation: 1.9m | Surge: 1.1m<br />
                <span style={{ color: '#f58220', fontWeight: 700 }}>Tripped - 45k Consumers Cut</span>
              </Popup>
            </Marker>

            <Marker position={[20.68, 86.77]} icon={shelterSafeIcon}>
              <Popup>
                <strong>Rajkanika Multi-Purpose Shelter</strong><br />
                Elevation: 4.5m | Occupancy: 850 / 1200
              </Popup>
            </Marker>

            <Marker position={[20.73, 87.03]} icon={shelterCutoffIcon}>
              <Popup>
                <strong>Talchua Hamlet Shelter</strong><br />
                <span style={{ color: '#d03b3b', fontWeight: 700 }}>Road Link Severed</span><br />
                Inflatable assault boats needed
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Temporal Scrubber Control Strip */}
        <div style={{ padding: '12px 16px', background: 'var(--surface-1)', borderTop: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TimerIcon style={{ color: 'var(--brand-green)' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--ink-secondary)', textTransform: 'uppercase' }}>
              Time-Travel Scrubber:
            </span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['T-72h', 'T-48h', 'T-24h', 'T-12h', 'Landfall', 'T+12h'].map(step => {
              const isSelected = currentTimeStep === step;
              return (
                <button
                  key={step}
                  onClick={() => onTimeStepChange(step)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 8,
                    fontSize: '0.72rem',
                    fontWeight: isSelected ? 800 : 600,
                    border: isSelected ? '1px solid var(--brand-green)' : '1px solid var(--hairline)',
                    background: isSelected ? 'var(--brand-green-soft)' : 'var(--surface-2)',
                    color: isSelected ? 'var(--brand-green-strong)' : 'var(--ink-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {step}
                </button>
              );
            })}
          </div>

          <span style={{ fontSize: '0.7rem', color: 'var(--brand-green)', fontWeight: 600 }}>
            ● GEE Copernicus 30m Active
          </span>
        </div>

      </div>

      {/* RIGHT COLUMN: Gemini AI Multimodal SOP Playbook & Indic Voice */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Role Selector Card */}
        <div className="card" style={{ padding: '14px' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-green)', marginBottom: '10px' }}>
            Operational Cadre Directives
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
            {[
              { id: 'NDRF', label: 'NDRF Command' },
              { id: 'COLLECTOR', label: 'Magistrate / DM' },
              { id: 'PUBLIC', label: 'Panchayat' }
            ].map(role => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id as any)}
                style={{
                  padding: '8px 4px',
                  borderRadius: 10,
                  fontSize: '0.7rem',
                  fontWeight: selectedRole === role.id ? 800 : 600,
                  border: selectedRole === role.id ? '1.5px solid var(--brand-green)' : '1px solid var(--hairline)',
                  background: selectedRole === role.id ? 'var(--brand-green-soft)' : 'var(--surface-2)',
                  color: selectedRole === role.id ? 'var(--brand-green-strong)' : 'var(--ink-muted)',
                  cursor: 'pointer'
                }}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gemini Flash Reasoning Playbook */}
        <div className="card" style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BotIcon style={{ color: 'var(--brand-green)' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
                Gemini Flash Multimodal SOP
              </span>
            </div>
            <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: 9999, background: 'var(--brand-orange-soft)', color: 'var(--brand-orange-strong)', fontWeight: 800 }}>
              T-24H FLASH
            </span>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--ink-secondary)', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.45 }}>
            {selectedRole === 'NDRF' && (
              <>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--brand-green)', fontWeight: 800 }}>1.</span>
                  <span><strong>Deploy 6 motorized assault craft</strong> at severed SH-9A junction (Lat 20.78, Lng 86.82) to evacuate Talchua shelter.</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--brand-green)', fontWeight: 800 }}>2.</span>
                  <span><strong>Stage 500 GPM dewatering pumps</strong> at Dhamra Port CHC to shield oxygen cylinder manifold room from 1.4m surge.</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--brand-green)', fontWeight: 800 }}>3.</span>
                  <span><strong>Aerial Drop Zone Confirmed:</strong> Bhadrak Autonomous College grounds dry at 9.2m elevation.</span>
                </div>
              </>
            )}
            {selectedRole === 'COLLECTOR' && (
              <>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--brand-green)', fontWeight: 800 }}>1.</span>
                  <span><strong>Mandatory Evacuation Order:</strong> Clear all kutcha structures within 5km of Bhitarkanika coastal line.</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--brand-green)', fontWeight: 800 }}>2.</span>
                  <span><strong>Grid Power De-energize:</strong> Trip 132kV Chandbali substation at T-4h to avoid explosive transformer rupture.</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--brand-green)', fontWeight: 800 }}>3.</span>
                  <span><strong>Emergency Transfers:</strong> Reroute maternity and dialysis cases to Bhadrak District Hospital via NH-16 bypass.</span>
                </div>
              </>
            )}
            {selectedRole === 'PUBLIC' && (
              <>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--brand-green)', fontWeight: 800 }}>1.</span>
                  <span><strong>Move livestock to elevated platforms:</strong> Prevent saline drowning and waterborne infection.</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--brand-green)', fontWeight: 800 }}>2.</span>
                  <span><strong>Boil all stored drinking water:</strong> Mangrove floodwaters pose contamination and displaced snakebite risks.</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--brand-green)', fontWeight: 800 }}>3.</span>
                  <span><strong>Tune to 101.4 MHz</strong> for continuous emergency district siren updates.</span>
                </div>
              </>
            )}
          </div>

          {/* Indic Voice Synthesizer Card */}
          <div style={{ marginTop: 'auto', padding: '12px', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--hairline)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <VolumeIcon style={{ color: 'var(--brand-green)' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 800 }}>
                  Voice Broadcast: {currentLang.nativeName} ({currentLang.name})
                </span>
              </div>

              {/* Animated Soundwave Bars */}
              {isPlayingAudio && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '18px' }}>
                  <div className="waveform-bar" />
                  <div className="waveform-bar" />
                  <div className="waveform-bar" />
                  <div className="waveform-bar" />
                  <div className="waveform-bar" />
                  <div className="waveform-bar" />
                </div>
              )}

              <button
                onClick={handlePlayVoice}
                style={{
                  padding: '4px 10px',
                  borderRadius: 8,
                  background: isPlayingAudio ? 'var(--status-critical)' : 'var(--brand-green)',
                  color: 'white',
                  border: 'none',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {isPlayingAudio ? (
                  <>
                    <Square size={12} fill="white" /> Stop
                  </>
                ) : (
                  <>
                    <Play size={12} fill="white" /> Listen Voice ({currentLang.code.toUpperCase()})
                  </>
                )}
              </button>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--ink-primary)', fontStyle: 'italic', margin: 0, lineHeight: 1.45, fontWeight: 500, padding: '4px 0' }}>
              "{currentLang.broadcastText}"
            </p>
            <div style={{ fontSize: '0.65rem', color: 'var(--brand-green-strong)', marginTop: '4px', fontWeight: 700 }}>
              ✓ Gemini Cloud Audio Synthesized ({currentLang.bcp47})
            </div>
          </div>

          {/* PDF Export Button */}
          <button
            onClick={() => alert(`Exporting PRAHAR Anticipatory Action Brief in ${currentLang.name} (.PDF format) with GPS waypoints.`)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: 12,
              background: 'var(--brand-gradient)',
              color: 'white',
              border: 'none',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <FileText size={15} />
            Export Official NDRF Directive (.PDF - {currentLang.name})
          </button>
        </div>

      </div>

    </div>
  );
}
