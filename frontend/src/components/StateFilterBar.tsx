import React from 'react';
import { MapPin, ShieldAlert, Building2 } from 'lucide-react';

export interface StateJurisdiction {
  id: string;
  name: string;
  shortName: string;
  agency: string;
  status: 'critical' | 'watch' | 'alert' | 'standby';
  riskLabel: string;
  center: [number, number];
  zoom: number;
  activeStorm: string;
  surgeDepth: string;
  severedRoads: string;
  funds: string;
}

export const COASTAL_STATES: StateJurisdiction[] = [
  {
    id: 'ALL',
    name: 'All Coastal Sectors (Pan-India Command)',
    shortName: 'National (NDMA)',
    agency: 'National Disaster Management Authority',
    status: 'critical',
    riskLabel: 'RED WARNING (Dhamra Sector)',
    center: [19.0, 85.0],
    zoom: 6,
    activeStorm: 'Cyclone DANA (125 km/h)',
    surgeDepth: '3.1m (Peak)',
    severedRoads: '68 km',
    funds: '₹21.00 Cr'
  },
  {
    id: 'ODISHA',
    name: 'Odisha Coastal Sector',
    shortName: 'Odisha (OSDMA)',
    agency: 'Odisha State Disaster Management Authority',
    status: 'critical',
    riskLabel: 'PRIMARY LANDFALL (T-24h)',
    center: [20.72, 86.92],
    zoom: 8,
    activeStorm: 'Cyclone DANA (125 km/h)',
    surgeDepth: '3.1m at Dhamra Port',
    severedRoads: '54 km',
    funds: '₹10.50 Cr'
  },
  {
    id: 'WEST_BENGAL',
    name: 'West Bengal & Sundarbans Delta',
    shortName: 'West Bengal (WBDMD)',
    agency: 'West Bengal Disaster Management Dept',
    status: 'watch',
    riskLabel: 'HIGH SURGE WATCH',
    center: [21.85, 88.45],
    zoom: 8,
    activeStorm: 'Cyclone DANA Peripheral Gale',
    surgeDepth: '2.2m at Sagar Island',
    severedRoads: '26 km',
    funds: '₹5.25 Cr'
  },
  {
    id: 'ANDHRA_PRADESH',
    name: 'Andhra Pradesh Coastal Belt',
    shortName: 'Andhra Pradesh (APSDMA)',
    agency: 'Andhra Pradesh State Disaster Management Authority',
    status: 'alert',
    riskLabel: 'HEAVY SWELL ALERT',
    center: [16.85, 82.25],
    zoom: 7.5,
    activeStorm: 'Cyclone DANA Trailing Swell',
    surgeDepth: '1.4m at Kakinada',
    severedRoads: '8 km',
    funds: '₹3.50 Cr'
  },
  {
    id: 'TAMIL_NADU',
    name: 'Tamil Nadu & Puducherry Coast',
    shortName: 'Tamil Nadu (TNDMA)',
    agency: 'Tamil Nadu State Disaster Management Authority',
    status: 'standby',
    riskLabel: 'STANDBY / FISHERMEN BARRED',
    center: [11.95, 79.85],
    zoom: 7.5,
    activeStorm: 'Squally Winds (45-55 km/h)',
    surgeDepth: '0.8m at Nagapattinam',
    severedRoads: '0 km',
    funds: '₹1.75 Cr'
  }
];

interface StateFilterBarProps {
  selectedState: string;
  onSelectState: (stateId: string) => void;
}

export function StateFilterBar({ selectedState, onSelectState }: StateFilterBarProps) {
  const currentState = COASTAL_STATES.find(s => s.id === selectedState) || COASTAL_STATES[0];

  return (
    <div className="card" style={{ padding: '8px 14px', marginBottom: '14px', background: 'var(--surface-1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        
        {/* Left Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ padding: '5px', borderRadius: 8, background: 'var(--brand-green-soft)', color: 'var(--brand-green-strong)', display: 'flex', alignItems: 'center' }}>
            <Building2 size={15} />
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>
              OPS JURISDICTION (STATE-LEVEL FILTER):
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-green-strong)' }}>
              {currentState.agency}
            </div>
          </div>
        </div>

        {/* State Selection Buttons */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {COASTAL_STATES.map(state => {
            const isSelected = selectedState === state.id;
            
            const badgeBg = state.status === 'critical' 
              ? 'rgba(208, 59, 59, 0.15)' 
              : state.status === 'watch' 
              ? 'rgba(245, 130, 32, 0.15)' 
              : 'rgba(0, 131, 108, 0.1)';
            const badgeColor = state.status === 'critical'
              ? 'var(--status-critical)'
              : state.status === 'watch'
              ? 'var(--brand-orange-strong)'
              : 'var(--brand-green)';

            return (
              <button
                key={state.id}
                onClick={() => onSelectState(state.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: 10,
                  fontSize: '0.72rem',
                  fontWeight: isSelected ? 800 : 600,
                  border: isSelected ? '1.5px solid var(--brand-green)' : '1px solid var(--hairline)',
                  background: isSelected ? 'var(--brand-green-soft)' : 'var(--surface-2)',
                  color: isSelected ? 'var(--brand-green-strong)' : 'var(--ink-primary)',
                  boxShadow: isSelected ? 'var(--shadow-card)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{state.shortName}</span>
                <span style={{
                  fontSize: '0.6rem',
                  padding: '1px 5px',
                  borderRadius: 9999,
                  background: isSelected ? 'white' : badgeBg,
                  color: isSelected ? 'var(--brand-green-strong)' : badgeColor,
                  fontWeight: 800
                }}>
                  {state.status.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
