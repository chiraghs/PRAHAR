import React from 'react';
import { ArrowRight, Bot, Server, Database, Globe, Waves, ShieldCheck } from 'lucide-react';

export function ArchitectureView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      
      {/* Overview Card */}
      <div className="card" style={{ padding: '20px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-green)', marginBottom: '8px' }}>
          PRAHAR System Architecture & Data Pipelines
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', margin: 0, lineHeight: 1.5 }}>
          Built with an enterprise decoupled microservice architecture: real-time telemetry ingestion operates on dedicated asynchronous pollers, while the high-performance FastAPI core engine powers hydrodynamic flood models and Gemini Flash multimodal spatial reasoning.
        </p>
      </div>

      {/* 4-Tier Pipeline Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
        
        {/* Tier 1: Ingestion Microservice */}
        <div className="card lift" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ padding: '8px', borderRadius: 10, background: 'var(--brand-green-soft)', color: 'var(--brand-green-strong)' }}>
              <Server size={18} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>1. Ingestion Microservice</span>
              <div style={{ fontSize: '0.65rem', color: 'var(--ink-muted)' }}>Port 8001 · Async Poller</div>
            </div>
          </div>
          <ul style={{ fontSize: '0.72rem', color: 'var(--ink-secondary)', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li><strong>IMD & JTWC ATCF:</strong> Real-time cyclone coordinates, central pressure, and radii.</li>
            <li><strong>OpenStreetMap Overpass:</strong> Live vector extraction of hospitals, power grids, and highways.</li>
            <li><strong>INCOIS Telemetry:</strong> Tidal station tables and sea surface temperature anomalies.</li>
          </ul>
        </div>

        {/* Tier 2: Google Earth Engine */}
        <div className="card lift" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ padding: '8px', borderRadius: 10, background: 'var(--brand-orange-soft)', color: 'var(--brand-orange-strong)' }}>
              <Globe size={18} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>2. Google Earth Engine (GEE)</span>
              <div style={{ fontSize: '0.65rem', color: 'var(--ink-muted)' }}>Satellite Raster Pipeline</div>
            </div>
          </div>
          <ul style={{ fontSize: '0.72rem', color: 'var(--ink-secondary)', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li><strong>Copernicus GLO-30 DEM:</strong> 30-meter precision coastal elevation gradients.</li>
            <li><strong>Sentinel-1 SAR:</strong> Synthetic aperture radar backscatter for past flood calibration.</li>
            <li><strong>GPM IMERG:</strong> Multi-satellite precipitation accumulation for compound runoff.</li>
          </ul>
        </div>

        {/* Tier 3: Core Simulation Engine */}
        <div className="card lift" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ padding: '8px', borderRadius: 10, background: 'var(--surface-3)', color: 'var(--ink-primary)' }}>
              <Waves size={18} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>3. Simulation & Graph AI</span>
              <div style={{ fontSize: '0.65rem', color: 'var(--ink-muted)' }}>FastAPI · Port 8010</div>
            </div>
          </div>
          <ul style={{ fontSize: '0.72rem', color: 'var(--ink-secondary)', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li><strong>SLOSH Hydrodynamic Model:</strong> Inverted barometer setup & shallow coastal bathymetry slope.</li>
            <li><strong>Compound River Backflow:</strong> Intersects ocean surge with inland delta drainage channels.</li>
            <li><strong>NetworkX Graph:</strong> Dynamically severs roads submerged &gt;0.5m; computes shelter isolation index.</li>
          </ul>
        </div>

        {/* Tier 4: Gemini Multimodal & Escrow */}
        <div className="card lift" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ padding: '8px', borderRadius: 10, background: 'var(--brand-green-soft)', color: 'var(--brand-green-strong)' }}>
              <Bot size={18} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>4. Gemini Flash Reasoning</span>
              <div style={{ fontSize: '0.65rem', color: 'var(--ink-muted)' }}>Zero-Latency Spatial SOPs</div>
            </div>
          </div>
          <ul style={{ fontSize: '0.72rem', color: 'var(--ink-secondary)', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li><strong>Multimodal GIS Ingestion:</strong> Evaluates satellite composite images & contour rasters.</li>
            <li><strong>Role-Based SOP Synthesis:</strong> Targeted briefs for NDRF, District Magistrates, and Citizens.</li>
            <li><strong>Parametric Smart Escrow:</strong> Triggers 48h pre-landfall liquidity without bureaucracy.</li>
          </ul>
        </div>

      </div>

      {/* Latency & Resilience SLA Table */}
      <div className="card" style={{ padding: '18px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-green)', marginBottom: '12px' }}>
          Real-Time Latency & Anticipatory Action Benchmarks
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '12px', borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--hairline)' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--ink-muted)' }}>GEE Elevation Fetch</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--brand-green)' }}>1.2 sec</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--ink-muted)' }}>Cached in Redis Spatial</div>
          </div>

          <div style={{ padding: '12px', borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--hairline)' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--ink-muted)' }}>Hydrodynamic Surge Sim</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--brand-green)' }}>840 ms</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--ink-muted)' }}>SLOSH bathymetry solver</div>
          </div>

          <div style={{ padding: '12px', borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--hairline)' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--ink-muted)' }}>NetworkX Graph Severance</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--brand-green)' }}>320 ms</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--ink-muted)' }}>340km road vector graph</div>
          </div>

          <div style={{ padding: '12px', borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--hairline)' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--ink-muted)' }}>Gemini Flash Reasoning</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--brand-green)' }}>620 ms</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--ink-muted)' }}>Structured JSON & Indic TTS</div>
          </div>
        </div>
      </div>

    </div>
  );
}
