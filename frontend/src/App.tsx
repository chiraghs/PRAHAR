import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Polygon, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { 
  ShieldAlert, 
  Wind, 
  Waves, 
  Hospital, 
  Zap, 
  AlertTriangle, 
  Radio, 
  Coins, 
  FileText, 
  Clock, 
  Compass, 
  Building2, 
  LifeBuoy, 
  Volume2, 
  CheckCircle2, 
  ChevronRight,
  RefreshCw
} from 'lucide-react';

// Fix Leaflet Default Icon in React
const createSvgIcon = (color: string, label: string) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="
      background-color: ${color};
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 10px ${color};
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

const hospitalSafeIcon = createSvgIcon('#10b981', '🏥');
const hospitalRiskIcon = createSvgIcon('#ef4444', '🏥');
const substationFloodedIcon = createSvgIcon('#f59e0b', '⚡');
const shelterSafeIcon = createSvgIcon('#06b6d4', '🏕️');
const shelterCutoffIcon = createSvgIcon('#f43f5e', '🏕️');
const cycloneEyeIcon = createSvgIcon('#f43f5e', '🌀');

export default function App() {
  const [activeTab, setActiveTab] = useState<'advisory' | 'infrastructure' | 'parametric'>('advisory');
  const [selectedRole, setSelectedRole] = useState<'NDRF' | 'COLLECTOR' | 'PUBLIC'>('NDRF');
  const [currentTimeStep, setCurrentTimeStep] = useState<string>('T-24h');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [loadingAdvisory, setLoadingAdvisory] = useState(false);

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

  // Current active cyclone position
  const activePosition: [number, number] = [19.8, 88.2];
  const landfallPosition: [number, number] = [20.85, 86.95];

  // Inundation Zones (Bhitarkanika, Dhamra, Kendrapara)
  const zoneDeep: [number, number][] = [
    [20.70, 86.85], [20.95, 87.05], [20.90, 87.20], [20.65, 87.00]
  ];
  const zoneMid: [number, number][] = [
    [20.45, 86.50], [20.75, 86.85], [20.60, 87.05], [20.35, 86.70]
  ];
  const zoneLow: [number, number][] = [
    [20.90, 86.40], [21.15, 86.70], [20.95, 87.05], [20.70, 86.75]
  ];

  const handleAudioSim = () => {
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 4000);
  };

  const handleRoleChange = (role: 'NDRF' | 'COLLECTOR' | 'PUBLIC') => {
    setSelectedRole(role);
    setLoadingAdvisory(true);
    setTimeout(() => setLoadingAdvisory(false), 300);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
      
      {/* Top Command Header */}
      <header className="glass-panel" style={{ margin: '8px 12px 4px 12px', padding: '10px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', padding: '8px 10px', borderRadius: '8px', boxShadow: '0 0 16px rgba(6, 182, 212, 0.4)' }}>
            <Waves size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.05em' }}>प्रहार (PRAHAR)</h1>
              <span className="glass-pill" style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 600 }}>v1.0 RESILIENCE</span>
              <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                Ingestion Engine Active (8001)
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Track-Based Cyclone Impact & Infrastructure Vulnerability Forecaster • Bay of Bengal Basin
            </p>
          </div>
        </div>

        {/* Real-time Telemetry Ribbons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="glass-panel" style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '3px solid #f43f5e' }}>
            <Wind size={18} color="#f43f5e" />
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Max Sustained Wind</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>125 km/h <span style={{ fontSize: '0.7rem', color: '#f43f5e' }}>(Cat 2)</span></div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '3px solid #06b6d4' }}>
            <Waves size={18} color="#06b6d4" />
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Peak Surge Depth</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#06b6d4' }}>3.1 meters</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '3px solid #f59e0b' }}>
            <Clock size={18} color="#f59e0b" />
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Time to Landfall</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f59e0b' }}>T-24h 00m</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid View */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: '12px', padding: '0 12px 12px 12px', flex: 1, minHeight: 0 }}>
        
        {/* Left Column: Interactive GIS Map & Timeline Scrubber */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          
          {/* Map Overlay Layer Toggles */}
          <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 999, display: 'flex', gap: '8px' }}>
            <div className="glass-panel" style={{ padding: '6px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(15, 23, 42, 0.9)' }}>
              <span style={{ width: 10, height: 10, background: '#ef4444', borderRadius: '2px', display: 'inline-block' }}></span>
              Surge &gt; 2.5m
            </div>
            <div className="glass-panel" style={{ padding: '6px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(15, 23, 42, 0.9)' }}>
              <span style={{ width: 10, height: 10, background: '#f59e0b', borderRadius: '2px', display: 'inline-block' }}></span>
              Surge 1.5 - 2.5m
            </div>
            <div className="glass-panel" style={{ padding: '6px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(15, 23, 42, 0.9)' }}>
              <span style={{ width: 10, height: 10, background: '#06b6d4', borderRadius: '2px', display: 'inline-block' }}></span>
              Surge 0.5 - 1.5m
            </div>
          </div>

          {/* Leaflet Map Canvas */}
          <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
            <MapContainer 
              center={[20.35, 87.5]} 
              zoom={8} 
              scrollWheelZoom={true} 
              style={{ height: '100%', width: '100%' }}
            >
              {/* Dark CartoDB Basemap */}
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />

              {/* Cyclone Track Polyline */}
              <Polyline positions={polylineCoords} color="#f43f5e" weight={4} dashArray="6, 8" />

              {/* Cone of Uncertainty buffer around projected landfall */}
              <Circle 
                center={landfallPosition} 
                radius={65000} 
                pathOptions={{ color: '#f43f5e', fillColor: '#f43f5e', fillOpacity: 0.12, weight: 1 }} 
              />

              {/* Inundation Depth Polygons */}
              <Polygon positions={zoneDeep} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.45, weight: 1.5 }}>
                <Popup>
                  <strong>Zone: Bhitarkanika - Dhamra Fringe</strong><br />
                  Surge Depth: <strong>2.5m - 3.5m (Catastrophic)</strong><br />
                  Status: Earthen Embankments Overtopped
                </Popup>
              </Polygon>

              <Polygon positions={zoneMid} pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.35, weight: 1.5 }}>
                <Popup>
                  <strong>Zone: Kendrapara Lowland Estuary</strong><br />
                  Surge Depth: <strong>1.5m - 2.5m (Severe)</strong><br />
                  Status: Estuary River Backflow Risk High
                </Popup>
              </Polygon>

              <Polygon positions={zoneLow} pathOptions={{ color: '#06b6d4', fillColor: '#06b6d4', fillOpacity: 0.25, weight: 1.5 }}>
                <Popup>
                  <strong>Zone: Bhadrak Agricultural Delta</strong><br />
                  Surge Depth: <strong>0.5m - 1.5m (Moderate)</strong><br />
                  Status: Waterlogging in Saline Paddy Belts
                </Popup>
              </Polygon>

              {/* Current Cyclone Eye Marker */}
              <Marker position={activePosition} icon={cycloneEyeIcon}>
                <Popup>
                  <div style={{ color: '#0f172a' }}>
                    <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#dc2626' }}>🌀 Severe Cyclonic Storm DANA</h3>
                    <p style={{ margin: '4px 0', fontSize: '0.75rem' }}>Current: 19.8°N, 88.2°E</p>
                    <p style={{ margin: '4px 0', fontSize: '0.75rem' }}>Wind: 115 km/h • Central Pressure: 984 hPa</p>
                    <p style={{ margin: '4px 0', fontSize: '0.75rem' }}>Heading: North-Northwest towards Dhamra</p>
                  </div>
                </Popup>
              </Marker>

              {/* Projected Landfall Marker */}
              <Marker position={landfallPosition} icon={createSvgIcon('#f59e0b', '🎯')}>
                <Popup>
                  <div style={{ color: '#0f172a' }}>
                    <h4 style={{ margin: 0, color: '#b45309' }}>Projected Landfall: Dhamra Port</h4>
                    <p style={{ fontSize: '0.75rem', margin: '4px 0' }}>Expected: T-0h (24 Oct 23:30 IST)</p>
                    <p style={{ fontSize: '0.75rem', margin: '4px 0' }}>Peak Surge: 3.1m • Astronomical High Tide Coincidence</p>
                  </div>
                </Popup>
              </Marker>

              {/* Critical Infrastructure Markers */}
              <Marker position={[20.82, 86.91]} icon={hospitalRiskIcon}>
                <Popup>
                  <strong>Dhamra Port Community Health Centre</strong><br />
                  Elevation: 2.1m | Surge Depth: <strong>1.4m</strong><br />
                  Status: <span style={{ color: '#ef4444' }}>Power Cutoff Imminent</span><br />
                  Generators un-elevated! Oxygen stock: 18h
                </Popup>
              </Marker>

              <Marker position={[21.05, 86.51]} icon={hospitalSafeIcon}>
                <Popup>
                  <strong>Bhadrak District Hospital</strong><br />
                  Elevation: 8.4m | Surge Depth: 0.0m<br />
                  Status: <span style={{ color: '#10b981' }}>Safe Major Relief Hub</span><br />
                  Bed capacity: 320 • Heli-pad operational
                </Popup>
              </Marker>

              <Marker position={[20.78, 86.74]} icon={substationFloodedIcon}>
                <Popup>
                  <strong>132/33kV Chandbali Grid Substation</strong><br />
                  Elevation: 1.9m | Surge Depth: 1.1m<br />
                  Status: <span style={{ color: '#f59e0b' }}>Submerged - Tripped</span><br />
                  Impact: 45,000 households without grid power
                </Popup>
              </Marker>

              <Marker position={[20.68, 86.77]} icon={shelterSafeIcon}>
                <Popup>
                  <strong>Rajkanika Multi-Purpose Cyclone Shelter</strong><br />
                  Elevation: 4.5m | Capacity: 1,200<br />
                  Occupancy: 850 evacuees | Status: Fully Accessible
                </Popup>
              </Marker>

              <Marker position={[20.73, 87.03]} icon={shelterCutoffIcon}>
                <Popup>
                  <strong>Talchua Fishing Hamlet Shelter</strong><br />
                  Elevation: 1.8m | Surge Depth: 1.6m<br />
                  Status: <span style={{ color: '#f43f5e' }}>Severed Road Link</span><br />
                  Requires NDRF inflatable assault boats for evacuation
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Timeline Scrubber Bar */}
          <div className="glass-panel" style={{ margin: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1000, background: 'rgba(15, 23, 42, 0.95)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} color="#06b6d4" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>TEMPORAL SCRUBBER:</span>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              {['T-72h', 'T-48h', 'T-24h', 'T-12h', 'Landfall', 'T+12h'].map((step) => {
                const isSelected = currentTimeStep === step;
                return (
                  <button
                    key={step}
                    onClick={() => setCurrentTimeStep(step)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '6px',
                      border: isSelected ? '1px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: isSelected ? 'rgba(6, 182, 212, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                      color: isSelected ? '#38bdf8' : '#94a3b8',
                      fontSize: '0.75rem',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {step}
                  </button>
                );
              })}
            </div>

            <div style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></span>
              Copernicus 30m GEE Synced
            </div>
          </div>
        </div>

        {/* Right Column: Tabbed Intelligence Deck */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          {/* Tab Navigation */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(0, 0, 0, 0.2)' }}>
            <button
              onClick={() => setActiveTab('advisory')}
              style={{
                flex: 1,
                padding: '12px 8px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'advisory' ? '2px solid #06b6d4' : '2px solid transparent',
                color: activeTab === 'advisory' ? '#38bdf8' : '#94a3b8',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <FileText size={15} />
              Gemini SOPs
            </button>

            <button
              onClick={() => setActiveTab('infrastructure')}
              style={{
                flex: 1,
                padding: '12px 8px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'infrastructure' ? '2px solid #06b6d4' : '2px solid transparent',
                color: activeTab === 'infrastructure' ? '#38bdf8' : '#94a3b8',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Building2 size={15} />
              Infrastructure (5)
            </button>

            <button
              onClick={() => setActiveTab('parametric')}
              style={{
                flex: 1,
                padding: '12px 8px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'parametric' ? '2px solid #06b6d4' : '2px solid transparent',
                color: activeTab === 'parametric' ? '#38bdf8' : '#94a3b8',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Coins size={15} />
              Parametric Escrow
            </button>
          </div>

          {/* Tab 1 Content: Gemini Flash SOP Advisory */}
          {activeTab === 'advisory' && (
            <div style={{ padding: '16px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Role Toggle Selector */}
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 600 }}>
                  Select Target Operational Cadre:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                  {[
                    { id: 'NDRF', label: 'NDRF Forces' },
                    { id: 'COLLECTOR', label: 'Magistrate / DM' },
                    { id: 'PUBLIC', label: 'Gram Panchayat' }
                  ].map((role) => (
                    <button
                      key={role.id}
                      onClick={() => handleRoleChange(role.id as any)}
                      style={{
                        padding: '8px 4px',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontWeight: selectedRole === role.id ? 700 : 500,
                        border: selectedRole === role.id ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                        background: selectedRole === role.id ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                        color: selectedRole === role.id ? '#38bdf8' : '#94a3b8',
                        cursor: 'pointer'
                      }}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gemini Flash Reasoning Card */}
              <div className="glass-panel" style={{ padding: '12px', borderLeft: '4px solid #38bdf8', background: 'rgba(15, 23, 42, 0.6)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldAlert size={16} color="#38bdf8" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc' }}>
                      {selectedRole === 'NDRF' ? 'NDRF Battalions 03 & 04 Directives' : selectedRole === 'COLLECTOR' ? 'Collector Evacuation Mandate' : 'Gram Panchayat Siren Broadcast'}
                    </span>
                  </div>
                  <span className="glass-pill" style={{ fontSize: '0.65rem', color: '#f43f5e', fontWeight: 700 }}>FLASH T-24H</span>
                </div>

                <ul style={{ fontSize: '0.75rem', color: '#cbd5e1', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.4 }}>
                  {selectedRole === 'NDRF' && (
                    <>
                      <li><strong>Pre-stage 6 assault craft</strong> at severed SH-9A junction (Lat 20.78, Lng 86.82) to evacuate Talchua shelter.</li>
                      <li><strong>High-capacity pumps (500 GPM)</strong> requisitioned for Dhamra Port CHC to safeguard oxygen cylinders.</li>
                      <li><strong>Aerial Drop Zone:</strong> Bhadrak Autonomous College grounds confirmed high and dry (Elev 9.2m).</li>
                      <li><strong>Target Quota:</strong> 18,400 residents in Dosinga, Kaitha & Talchua before 18:00 IST.</li>
                    </>
                  )}
                  {selectedRole === 'COLLECTOR' && (
                    <>
                      <li>Mandatory evacuation ordered for all kutcha houses within 5km of Bhitarkanika mangrove line.</li>
                      <li>Order OPTCL to safely trip 132kV Chandbali grid 4 hours prior to landfall to avoid transformer blasts.</li>
                      <li>Re-route critical dialysis/maternity patients inland via NH-16 corridor to Bhadrak District Hospital.</li>
                      <li>Distribute 4 days buffer rations & water purification chlorine to 12 designated shelters.</li>
                    </>
                  )}
                  {selectedRole === 'PUBLIC' && (
                    <>
                      <li>Move livestock to elevated village pucca platform shelters immediately.</li>
                      <li>Boil all drinking water; floodwaters carry mangrove snake hazards.</li>
                      <li>Fishermen strictly barred from sea; tie down fishing boats behind mangrove creek barriers.</li>
                      <li>Tune battery-powered radios to emergency frequency 101.4 MHz.</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Indic Audio Broadcast Box */}
              <div className="glass-panel" style={{ padding: '12px', background: 'rgba(30, 41, 59, 0.4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Volume2 size={16} color="#10b981" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#e2e8f0' }}>Indic Voice Alert (Odia Broadcast)</span>
                  </div>
                  <button
                    onClick={handleAudioSim}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      background: isPlayingAudio ? '#f43f5e' : '#10b981',
                      border: 'none',
                      color: 'white',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {isPlayingAudio ? '🔊 Broadcasting...' : '▶ Listen in Odia'}
                  </button>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '6px' }}>
                  "ଧାମରା ଏବଂ ଚାନ୍ଦବାଲି ଉପକୂଳବର୍ତ୍ତୀ ଅଞ୍ଚଳରେ ୨.୫ ମିଟର ପର୍ଯ୍ୟନ୍ତ ଜଳପ୍ଲାବନ ହେବାର ସମ୍ଭାବନା ଅଛି। ଦୟାକରି ତୁରନ୍ତ ନିକଟସ୍ଥ ବାତ୍ୟା ଆଶ୍ରୟସ୍ଥଳୀକୁ ଯାଆନ୍ତୁ।"
                </p>
              </div>

              {/* Download Action Brief Button */}
              <button
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                  color: 'white',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
                }}
                onClick={() => alert('Downloaded PRAHAR Emergency SOP Action Brief (PDF format) with GPS waypoints.')}
              >
                <FileText size={16} />
                Export Official NDRF SOP Directive (.PDF)
              </button>
            </div>
          )}

          {/* Tab 2 Content: Critical Infrastructure & Road Severance */}
          {activeTab === 'infrastructure' && (
            <div style={{ padding: '16px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div className="glass-panel" style={{ padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ef4444' }}>68 km</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Severed Highways</div>
                </div>
                <div className="glass-panel" style={{ padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f59e0b' }}>7 / 24</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Flooded Sub-stations</div>
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', marginTop: '4px' }}>
                SEVERED ARTERIAL ROADWAYS:
              </div>

              <div className="glass-panel" style={{ padding: '10px', borderLeft: '3px solid #ef4444', background: 'rgba(239, 68, 68, 0.08)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc' }}>SH-9A Chandbali - Dhamra Highway</div>
                <div style={{ fontSize: '0.7rem', color: '#fca5a5', marginTop: '2px' }}>Severance: 14.2 km • Flood Depth: 1.3m</div>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '4px' }}>
                  Direct ambulance route to Bhadrak District Hospital severed. Emergency airlift or boats required.
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '10px', borderLeft: '3px solid #f59e0b', background: 'rgba(245, 158, 11, 0.08)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc' }}>Rajkanika Coastal Loop Road</div>
                <div style={{ fontSize: '0.7rem', color: '#fde68a', marginTop: '2px' }}>Severance: 8.5 km • Flood Depth: 0.9m</div>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '4px' }}>
                  Cuts off Talchua Fishing Hamlet Shelter (520 evacuees).
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', marginTop: '4px' }}>
                HOSPITAL POWER & LIFELINE STATUS:
              </div>

              <div className="glass-panel" style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc' }}>Dhamra Port CHC</div>
                  <div style={{ fontSize: '0.65rem', color: '#ef4444' }}>Surge: 1.4m • Generators Unprotected</div>
                </div>
                <span className="glass-pill" style={{ color: '#ef4444', fontSize: '0.65rem', fontWeight: 700 }}>HIGH VULNERABILITY</span>
              </div>

              <div className="glass-panel" style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc' }}>Bhadrak District Hospital</div>
                  <div style={{ fontSize: '0.65rem', color: '#10b981' }}>Elevation: 8.4m • Fully Operational</div>
                </div>
                <span className="glass-pill" style={{ color: '#10b981', fontSize: '0.65rem', fontWeight: 700 }}>SECURE HUB</span>
              </div>
            </div>
          )}

          {/* Tab 3 Content: Parametric Insurance Smart Escrow */}
          {activeTab === 'parametric' && (
            <div style={{ padding: '16px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              <div className="glass-panel" style={{ padding: '14px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(99, 102, 241, 0.15))', border: '1px solid #06b6d4' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 700 }}>PRE-LANDFALL PARAMETRIC TRIGGER</span>
                  <span className="glass-pill" style={{ background: '#10b981', color: 'white', fontSize: '0.65rem', fontWeight: 800 }}>
                    DISBURSED (T-24H)
                  </span>
                </div>
                
                <div style={{ marginTop: '10px', fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>
                  ₹21.00 Crores <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>($2.5M USD)</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Policy: ODISHA-COASTAL-PARAMETRIC-2024-09
                </div>
              </div>

              {/* Trigger Condition Matrix */}
              <div className="glass-panel" style={{ padding: '12px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                  VERIFIED TRIGGER CRITERIA (SMART CONTRACT):
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.7rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Wind Speed Threshold (≥ 120 km/h)</span>
                    <span style={{ color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={13} /> 125 km/h (MET)
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Surge Inundation Depth (≥ 1.5m)</span>
                    <span style={{ color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={13} /> 1.8m (MET)
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Time Window (24-48h Pre-Landfall)</span>
                    <span style={{ color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={13} /> 24 Hours Left (MET)
                    </span>
                  </div>
                </div>
              </div>

              {/* Instant Liquidity Allocations */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                  AUTOMATED PRE-LANDFALL TRANSFERS:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="glass-panel" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc' }}>Bhadrak Emergency Fund</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Evacuation buses & fuel</div>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981' }}>₹5.25 Cr</div>
                  </div>

                  <div className="glass-panel" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc' }}>Kendrapara Coastal Command</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Flood barriers & generator diesel</div>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981' }}>₹3.50 Cr</div>
                  </div>

                  <div className="glass-panel" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc' }}>NDRF 03 Battalion Mundali</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Assault boats & life-support staging</div>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981' }}>₹1.75 Cr</div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
