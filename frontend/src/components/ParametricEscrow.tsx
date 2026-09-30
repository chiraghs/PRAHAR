import React from 'react';
import { CheckCircle2, ShieldCheck, Coins, ArrowRight, ExternalLink } from 'lucide-react';
import { ShieldCheckIcon } from './Icons';

export function ParametricEscrow() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      
      {/* Escrow Pool Header Card */}
      <div className="card" style={{ padding: '24px', background: 'var(--hero-gradient)', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.9 }}>
                PRE-LANDFALL PARAMETRIC SMART ESCROW
              </span>
              <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 9999, background: 'rgba(255, 255, 255, 0.25)', fontWeight: 800 }}>
                ODISHA-COASTAL-PARAMETRIC-2024-09
              </span>
            </div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, fontFamily: 'var(--font-mono)', margin: 0 }}>
              ₹21.00 Crores <span style={{ fontSize: '1.2rem', opacity: 0.85, fontWeight: 500 }}>($2.50M USD)</span>
            </h2>
            <p style={{ fontSize: '0.8rem', opacity: 0.9, marginTop: '6px', maxWidth: '600px' }}>
              Underwritten by the Global Anticipatory Climate Resilience Facility. Funds release automatically 24–48 hours prior to landfall without manual damage surveys.
            </p>
          </div>

          <div style={{ padding: '14px 20px', borderRadius: 14, background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.3)', textAlign: 'right' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, opacity: 0.85 }}>Trigger Execution Status</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 900, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
              <CheckCircle2 size={20} color="#3ecdae" />
              <span>DISBURSED (T-24H)</span>
            </div>
            <div style={{ fontSize: '0.7rem', opacity: 0.8, marginTop: '4px' }}>100% Liquidity Delivered</div>
          </div>
        </div>
      </div>

      {/* Verifiable Smart Contract Triggers */}
      <div className="card" style={{ padding: '18px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-green)', marginBottom: '14px' }}>
          Verifiable Parametric Trigger Conditions
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '14px', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--hairline)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Condition 1: Sustained Wind</span>
              <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: 9999, background: 'var(--brand-green-soft)', color: 'var(--brand-green-strong)', fontWeight: 800 }}>
                CRITERIA MET
              </span>
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--ink-primary)' }}>
              125 km/h <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>&gt;= 120 km/h threshold</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', marginTop: '4px' }}>
              Verified via IMD Radar Paradip & JTWC ATCF telemetry stream.
            </div>
          </div>

          <div style={{ padding: '14px', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--hairline)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Condition 2: Peak Surge Depth</span>
              <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: 9999, background: 'var(--brand-green-soft)', color: 'var(--brand-green-strong)', fontWeight: 800 }}>
                CRITERIA MET
              </span>
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--ink-primary)' }}>
              1.8m <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>&gt;= 1.5m threshold</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', marginTop: '4px' }}>
              Verified via GEE Copernicus DEM 30m + INCOIS tide gauge model.
            </div>
          </div>

          <div style={{ padding: '14px', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--hairline)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Condition 3: Pre-Landfall Window</span>
              <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: 9999, background: 'var(--brand-green-soft)', color: 'var(--brand-green-strong)', fontWeight: 800 }}>
                CRITERIA MET
              </span>
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--ink-primary)' }}>
              T-24h 00m <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>[24h - 48h Window]</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', marginTop: '4px' }}>
              Guarantees emergency cash liquidity before physical landfall occurs.
            </div>
          </div>
        </div>
      </div>

      {/* Beneficiary Allocations Table */}
      <div className="card" style={{ padding: '18px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-green)', marginBottom: '14px' }}>
          Automated Pre-Landfall Disbursements
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            {
              agency: 'Bhadrak District Emergency Contingency Account',
              amount: '₹5.25 Crores',
              usd: '$625,000',
              purpose: 'Procurement of 140 evacuation transit buses, diesel stockpiles, and 45,000 ready-to-eat dry ration packets.',
              txHash: '0x8f2a...c391'
            },
            {
              agency: 'Kendrapara Coastal Disaster Management Cell',
              amount: '₹3.50 Crores',
              usd: '$415,000',
              purpose: 'Temporary sandbag berm reinforcements for Baitarani estuary and emergency hospital generator diesel caches.',
              txHash: '0x4e1b...9d02'
            },
            {
              agency: 'NDRF 03rd Battalion Mundali Command',
              amount: '₹1.75 Crores',
              usd: '$210,000',
              purpose: 'Operational staging of 12 zodiac assault craft, sonar equipment, and aerial helicopter life-support bundles.',
              txHash: '0x992c...e814'
            }
          ].map((item, idx) => (
            <div key={idx} style={{ padding: '14px 18px', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ maxWidth: '600px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--ink-primary)' }}>{item.agency}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: '4px' }}>{item.purpose}</div>
                <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--brand-green)', marginTop: '4px' }}>
                  Smart Contract Tx: {item.txHash} • Settlement: Instant Liquidity
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--brand-green)' }}>
                  {item.amount}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>{item.usd}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
