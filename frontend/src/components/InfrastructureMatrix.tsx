import React from 'react';
import { Hospital, Zap, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export function InfrastructureMatrix() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      
      {/* Top Summary Banner */}
      <div className="card" style={{ padding: '18px', background: 'var(--surface-1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--ink-primary)', margin: 0 }}>
              Critical Lifeline & Infrastructure Exposure Matrix
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', margin: '4px 0 0 0' }}>
              NetworkX Graph Analysis of 340km road networks, coastal bridges, and essential facilities under 1.5m - 3.5m surge contours.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ padding: '8px 16px', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--hairline)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--status-critical)' }}>68 km</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>Severed Arteries</div>
            </div>
            <div style={{ padding: '8px 16px', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--hairline)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--brand-orange)' }}>7 / 24</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>Flooded Sub-stations</div>
            </div>
            <div style={{ padding: '8px 16px', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--hairline)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--brand-green)' }}>13 / 18</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>Safe Hospitals</div>
            </div>
          </div>
        </div>
      </div>

      {/* Severed Highway Corridors */}
      <div className="card" style={{ padding: '18px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--status-critical)', marginBottom: '12px' }}>
          Severed Lifeline Road Segments (Inundation Depth &gt; 0.5m)
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="card" style={{ padding: '14px', borderLeft: '4px solid var(--status-critical)', background: 'var(--surface-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>SH-9A Chandbali-Dhamra Expressway</span>
              <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: 9999, background: 'rgba(208, 59, 59, 0.15)', color: 'var(--status-critical)', fontWeight: 800 }}>
                14.2 KM CUTOFF
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', margin: '6px 0 0 0' }}>
              <strong>Surge Overtopping:</strong> 1.3 meters. Completely severs direct vehicular ambulance transit between Dhamra Port and Bhadrak District Hospital.
            </p>
            <div style={{ marginTop: '8px', fontSize: '0.7rem', color: 'var(--brand-orange-strong)', fontWeight: 600 }}>
              ➔ Reroute via Inland NH-16 Bypass (+4.2 hrs) or deploy NDRF motorized assault boats.
            </div>
          </div>

          <div className="card" style={{ padding: '14px', borderLeft: '4px solid var(--brand-orange)', background: 'var(--surface-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>Rajkanika Coastal Loop Arterial</span>
              <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: 9999, background: 'var(--brand-orange-soft)', color: 'var(--brand-orange-strong)', fontWeight: 800 }}>
                8.5 KM CUTOFF
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', margin: '6px 0 0 0' }}>
              <strong>Surge Overtopping:</strong> 0.9 meters. Isolates Talchua Fishing Hamlet Shelter housing 520 evacuees.
            </p>
            <div style={{ marginTop: '8px', fontSize: '0.7rem', color: 'var(--brand-orange-strong)', fontWeight: 600 }}>
              ➔ Road link impassable; requires amphibious relief craft and helicopter air-drops.
            </div>
          </div>
        </div>
      </div>

      {/* Facilities Status Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        
        {/* Healthcare & Shelters */}
        <div className="card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-green)', marginBottom: '12px' }}>
            Hospitals & Shelter Vulnerability
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '12px', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Dhamra Port Community Health Centre</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>Elevation: 2.1m · Surge Depth: 1.4m · Generators Un-elevated</div>
              </div>
              <span style={{ fontSize: '0.65rem', padding: '4px 10px', borderRadius: 8, background: 'rgba(208, 59, 59, 0.15)', color: 'var(--status-critical)', fontWeight: 800 }}>
                AT RISK
              </span>
            </div>

            <div style={{ padding: '12px', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Bhadrak District Hospital</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>Elevation: 8.4m · Surge Depth: 0.0m · 320 Beds Active</div>
              </div>
              <span style={{ fontSize: '0.65rem', padding: '4px 10px', borderRadius: 8, background: 'var(--brand-green-soft)', color: 'var(--brand-green-strong)', fontWeight: 800 }}>
                OPERATIONAL HUB
              </span>
            </div>

            <div style={{ padding: '12px', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Talchua Fishing Hamlet Shelter</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>Elevation: 1.8m · Surge: 1.6m · Occupancy: 520 / 600</div>
              </div>
              <span style={{ fontSize: '0.65rem', padding: '4px 10px', borderRadius: 8, background: 'rgba(208, 59, 59, 0.15)', color: 'var(--status-critical)', fontWeight: 800 }}>
                CUT OFF
              </span>
            </div>
          </div>
        </div>

        {/* Energy Grid Substations */}
        <div className="card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-orange-strong)', marginBottom: '12px' }}>
            Power Grid & Transmission Substations
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '12px', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>OPTCL 132/33kV Chandbali Grid Substation</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>Elevation: 1.9m · Surge: 1.1m · 45,000 Consumers Affected</div>
              </div>
              <span style={{ fontSize: '0.65rem', padding: '4px 10px', borderRadius: 8, background: 'var(--brand-orange-soft)', color: 'var(--brand-orange-strong)', fontWeight: 800 }}>
                SUBMERGED / TRIPPED
              </span>
            </div>

            <div style={{ padding: '12px', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Bhadrak Main 220kV Grid Substation</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>Elevation: 11.2m · Surge: 0.0m · Fully Energized</div>
              </div>
              <span style={{ fontSize: '0.65rem', padding: '4px 10px', borderRadius: 8, background: 'var(--brand-green-soft)', color: 'var(--brand-green-strong)', fontWeight: 800 }}>
                GRID STABLE
              </span>
            </div>

            <div style={{ padding: '12px', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Basudevpur 33/11kV Primary Substation</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>Elevation: 3.4m · Pre-emptive Controlled Shutdown at T-4h</div>
              </div>
              <span style={{ fontSize: '0.65rem', padding: '4px 10px', borderRadius: 8, background: 'var(--surface-3)', color: 'var(--ink-muted)', fontWeight: 800 }}>
                SCHEDULED TRIP
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
