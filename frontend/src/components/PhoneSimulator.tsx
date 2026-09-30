import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Battery, 
  ShieldAlert, 
  Navigation, 
  Radio, 
  AlertTriangle, 
  PhoneCall, 
  MapPin, 
  QrCode, 
  CheckCircle2, 
  Compass, 
  Volume2, 
  Play, 
  Square,
  Sparkles,
  LifeBuoy
} from 'lucide-react';
import { INDIAN_LANGUAGES, LanguageMeta } from '../lib/languages';

interface PhoneSimulatorProps {
  selectedLanguage: string;
}

export function PhoneSimulator({ selectedLanguage }: PhoneSimulatorProps) {
  const [timeStr, setTimeStr] = useState('02:15');
  const [mobileTab, setMobileTab] = useState<'alerts' | 'shelters' | 'sos' | 'pass'>('alerts');
  const [sosTriggered, setSosTriggered] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [simState, setSimState] = useState<'warning' | 'evacuate' | 'landfall'>('evacuate');

  const currentLang: LanguageMeta = INDIAN_LANGUAGES.find(l => l.code === selectedLanguage) || INDIAN_LANGUAGES[0];

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(`${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handlePlayVoice = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }
      setIsPlayingAudio(true);
      const utterance = new SpeechSynthesisUtterance(currentLang.broadcastText);
      utterance.lang = currentLang.bcp47;
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 3000);
    }
  };

  const handleTriggerSOS = () => {
    setSosTriggered(!sosTriggered);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '16px' }}>
      
      {/* Control Bar for Simulator */}
      <div className="card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '840px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-green)', letterSpacing: '0.05em' }}>
            📱 Mobile Citizen & Field PWA Simulator
          </span>
          <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: 9999, background: 'var(--brand-green-soft)', color: 'var(--brand-green-strong)', fontWeight: 800 }}>
            iOS / Android PWA
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>Simulation Phase:</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[
              { id: 'warning', label: 'T-48h Warning' },
              { id: 'evacuate', label: 'T-24h Evacuation' },
              { id: 'landfall', label: 'T-0h Landfall' }
            ].map(phase => (
              <button
                key={phase.id}
                onClick={() => setSimState(phase.id as any)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 8,
                  fontSize: '0.68rem',
                  fontWeight: simState === phase.id ? 800 : 500,
                  border: simState === phase.id ? '1px solid var(--brand-green)' : '1px solid var(--hairline)',
                  background: simState === phase.id ? 'var(--brand-green-soft)' : 'var(--surface-2)',
                  color: simState === phase.id ? 'var(--brand-green-strong)' : 'var(--ink-muted)',
                  cursor: 'pointer'
                }}
              >
                {phase.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Container with Smartphone Device Frame */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0' }}>
        
        {/* iPhone Physical Bezel */}
        <div 
          style={{
            width: '340px',
            height: '690px',
            backgroundColor: '#0a0f1d',
            borderRadius: '50px',
            padding: '12px',
            border: '5px solid #233147',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Dynamic Island Notch */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '110px',
            height: '24px',
            backgroundColor: '#000000',
            borderRadius: '9999px',
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 10px'
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1e293b' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0ca30c' }} className="animate-radar" />
          </div>

          {/* Smartphone Screen Canvas */}
          <div 
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'var(--surface-1)',
              borderRadius: '38px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              color: 'var(--ink-primary)',
              border: '1px solid var(--hairline)'
            }}
          >
            {/* Status Bar */}
            <div style={{
              height: '42px',
              paddingTop: '8px',
              paddingLeft: '22px',
              paddingRight: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '11px',
              fontWeight: 800,
              color: 'var(--ink-muted)',
              zIndex: 30
            }}>
              <span>{timeStr}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)' }}>5G</span>
                <Wifi size={12} />
                <Battery size={13} />
              </div>
            </div>

            {/* Mobile Header Banner */}
            <div style={{
              padding: '10px 14px',
              background: 'var(--brand-gradient)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 900, fontSize: '0.9rem', letterSpacing: '0.04em' }}>PRAHAR</span>
                <span style={{ fontSize: '0.6rem', padding: '1px 6px', borderRadius: 9999, background: 'rgba(255, 255, 255, 0.25)', fontWeight: 800 }}>
                  ODISHA CITIZEN
                </span>
              </div>
              <div style={{ fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3ecdae', display: 'inline-block' }} />
                <span>GPS Locked</span>
              </div>
            </div>

            {/* Mobile Screen Body (Scrollable) */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              {/* TAB 1: ALERTS & CYCLONE RADAR */}
              {mobileTab === 'alerts' && (
                <>
                  {/* Cyclone Telemetry Card */}
                  <div style={{ padding: '12px', borderRadius: 14, background: 'var(--surface-2)', border: '1px solid var(--hairline)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--status-critical)', textTransform: 'uppercase' }}>
                        🔴 RED CYCLONE WARNING
                      </span>
                      <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--ink-muted)' }}>
                        T-24H LANDFALL
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--ink-primary)' }}>Cyclone DANA</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>Target: Dhamra / Bhitarkanika</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--status-critical)', fontFamily: 'var(--font-mono)' }}>125 km/h</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--brand-orange-strong)' }}>Surge: 3.1m</div>
                      </div>
                    </div>
                  </div>

                  {/* Vernacular Audio Alert Box */}
                  <div style={{ padding: '12px', borderRadius: 14, background: 'var(--brand-orange-soft)', border: '1px solid rgba(245, 130, 32, 0.3)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Radio size={14} color="var(--brand-orange-strong)" />
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--brand-orange-strong)' }}>
                          {currentLang.nativeName} ({currentLang.name}) Voice Siren
                        </span>
                      </div>
                      <button
                        onClick={handlePlayVoice}
                        style={{
                          padding: '3px 8px',
                          borderRadius: 6,
                          background: isPlayingAudio ? 'var(--status-critical)' : 'var(--brand-orange-strong)',
                          color: 'white',
                          border: 'none',
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {isPlayingAudio ? <Square size={10} fill="white" /> : <Play size={10} fill="white" />}
                        {isPlayingAudio ? 'Stop' : 'Listen'}
                      </button>
                    </div>

                    <p style={{ fontSize: '0.7rem', fontStyle: 'italic', margin: 0, color: 'var(--ink-primary)', lineHeight: 1.35 }}>
                      "{currentLang.broadcastText}"
                    </p>
                  </div>

                  {/* Quick Action Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button
                      onClick={() => setMobileTab('shelters')}
                      style={{
                        padding: '10px',
                        borderRadius: 12,
                        background: 'var(--brand-green)',
                        color: 'white',
                        border: 'none',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Navigation size={14} />
                      Find Safe Shelter
                    </button>

                    <button
                      onClick={() => setMobileTab('sos')}
                      style={{
                        padding: '10px',
                        borderRadius: 12,
                        background: 'var(--status-critical)',
                        color: 'white',
                        border: 'none',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <LifeBuoy size={14} />
                      Emergency SOS
                    </button>
                  </div>

                  {/* Offline Survival Checklist */}
                  <div style={{ padding: '12px', borderRadius: 14, background: 'var(--surface-2)', border: '1px solid var(--hairline)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-green)', marginBottom: '6px' }}>
                      Offline Citizen Readiness
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.68rem', color: 'var(--ink-secondary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle2 size={13} color="var(--brand-green)" />
                        <span>Charge phones & battery power banks.</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle2 size={13} color="var(--brand-green)" />
                        <span>Fill clean water containers; boil all water.</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle2 size={13} color="var(--brand-green)" />
                        <span>Move livestock to pucca platforms.</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: SHELTERS & NAVIGATION */}
              {mobileTab === 'shelters' && (
                <>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
                    Designated Cyclone Shelters Nearby
                  </div>

                  <div style={{ padding: '12px', borderRadius: 14, background: 'var(--surface-2)', border: '1.5px solid var(--brand-green)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>Rajkanika Cyclone Shelter</span>
                      <span style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: 6, background: 'var(--brand-green-soft)', color: 'var(--brand-green-strong)', fontWeight: 800 }}>
                        SAFE & OPEN
                      </span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>
                      📍 850m away • 11 min walk • Elev: 4.5m
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--brand-green)', fontWeight: 700 }}>
                      Available Capacity: 350 spaces left
                    </div>
                    <button
                      onClick={() => alert('Launching Turn-by-Turn Safe Walking Evacuation Route (Avoiding flooded culverts).')}
                      style={{
                        padding: '6px 10px',
                        borderRadius: 8,
                        background: 'var(--brand-green)',
                        color: 'white',
                        border: 'none',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        marginTop: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Navigation size={12} /> Start Safe Walking Navigation
                    </button>
                  </div>

                  <div style={{ padding: '12px', borderRadius: 14, background: 'rgba(208, 59, 59, 0.08)', border: '1px solid rgba(208, 59, 59, 0.3)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>Talchua Fishing Hamlet Shelter</span>
                      <span style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: 6, background: 'rgba(208, 59, 59, 0.2)', color: 'var(--status-critical)', fontWeight: 800 }}>
                        ROAD CUT OFF
                      </span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>
                      📍 3.2 km away • Impassable road (1.6m water)
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--status-critical)', fontWeight: 700 }}>
                      ⚠️ Do NOT attempt walking; wait for NDRF boat.
                    </div>
                  </div>
                </>
              )}

              {/* TAB 3: SOS RESCUE BEACON */}
              {mobileTab === 'sos' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '14px', paddingTop: '10px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--status-critical)' }}>
                    EMERGENCY DISTRESS BEACON
                  </div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', margin: 0 }}>
                    Transmits instant GPS coordinates to NDRF Mundali 03 Battalion and Odisha Coast Guard via satellite mesh.
                  </p>

                  <button
                    onClick={handleTriggerSOS}
                    style={{
                      width: '140px',
                      height: '140px',
                      borderRadius: '50%',
                      background: sosTriggered 
                        ? 'radial-gradient(circle, #0ca30c, #00594a)' 
                        : 'radial-gradient(circle, #d03b3b, #8b0000)',
                      color: 'white',
                      border: '4px solid white',
                      boxShadow: sosTriggered 
                        ? '0 0 25px #0ca30c' 
                        : '0 0 30px rgba(208, 59, 59, 0.6)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <LifeBuoy size={36} />
                    <span style={{ fontSize: '1rem', fontWeight: 900, marginTop: '4px' }}>
                      {sosTriggered ? 'BEACON ON' : 'SOS PING'}
                    </span>
                  </button>

                  <div style={{ padding: '8px 14px', borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--hairline)', width: '100%', fontSize: '0.68rem' }}>
                    <div><strong>Your Coordinates:</strong> 20.814°N, 86.912°E</div>
                    <div style={{ color: sosTriggered ? 'var(--brand-green)' : 'var(--ink-muted)', fontWeight: 700, marginTop: '2px' }}>
                      {sosTriggered ? '✓ PING DELIVERED TO NDRF BOAT #4' : 'Ready to broadcast'}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: PARAMETRIC RELIEF PASS */}
              {mobileTab === 'pass' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
                    Digital Pre-Landfall Relief Voucher
                  </div>

                  <div style={{ padding: '16px', borderRadius: 16, background: 'var(--hero-gradient)', color: 'white', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.85, fontWeight: 700 }}>
                      Parametric Contingency Pass
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>
                      ₹15,000 INR
                    </div>
                    <div style={{ fontSize: '0.68rem', opacity: 0.9 }}>
                      Pre-Authorized Evacuation & Emergency Food Voucher
                    </div>

                    <div style={{ width: '110px', height: '110px', background: 'white', borderRadius: 10, padding: '8px', margin: '4px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <QrCode size={94} color="#00594a" />
                    </div>

                    <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', opacity: 0.8 }}>
                      PASS ID: PRAHAR-OD-2024-BHADRAK
                    </div>
                  </div>

                  <div style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', textAlign: 'center' }}>
                    Redeemable for transit buses, dry ration caches, and kerosene/diesel at any authorized Gram Panchayat center.
                  </div>
                </div>
              )}

            </div>

            {/* Bottom App Navigation Bar */}
            <div style={{
              height: '54px',
              borderTop: '1px solid var(--hairline)',
              background: 'var(--surface-1)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              padding: '4px 6px',
              zIndex: 30
            }}>
              {[
                { id: 'alerts', label: 'Radar', icon: <Radio size={16} /> },
                { id: 'shelters', label: 'Shelters', icon: <Navigation size={16} /> },
                { id: 'sos', label: 'SOS', icon: <LifeBuoy size={16} /> },
                { id: 'pass', label: 'Relief Pass', icon: <QrCode size={16} /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setMobileTab(tab.id as any)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    background: 'transparent',
                    color: mobileTab === tab.id ? 'var(--brand-green)' : 'var(--ink-muted)',
                    cursor: 'pointer',
                    fontSize: '0.65rem',
                    fontWeight: mobileTab === tab.id ? 800 : 500
                  }}
                >
                  {tab.icon}
                  <span style={{ marginTop: '2px' }}>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* iOS Home Indicator Bar */}
            <div style={{ height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-1)' }}>
              <div style={{ width: '90px', height: '4px', borderRadius: '9999px', backgroundColor: 'var(--ink-muted)', opacity: 0.4 }} />
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
