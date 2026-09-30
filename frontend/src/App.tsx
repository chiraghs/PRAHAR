import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { KPICards } from './components/KPICards';
import { StateFilterBar } from './components/StateFilterBar';
import { OperationsCockpit } from './components/OperationsCockpit';
import { InfrastructureMatrix } from './components/InfrastructureMatrix';
import { ParametricEscrow } from './components/ParametricEscrow';
import { ArchitectureView } from './components/ArchitectureView';
import { PhoneSimulator } from './components/PhoneSimulator';
import { Compass, Building2, Coins, Server, Smartphone } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const params = new URLSearchParams(window.location.search);
    return (params.get('theme') as 'light' | 'dark') || 'light';
  });
  const [language, setLanguage] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang') || 'en';
  });
  const [selectedState, setSelectedState] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('state') || 'ALL';
  });
  const [activeTab, setActiveTab] = useState<'cockpit' | 'mobile' | 'infrastructure' | 'parametric' | 'architecture'>(() => {
    const params = new URLSearchParams(window.location.search);
    return (params.get('tab') as any) || 'cockpit';
  });
  const [currentTimeStep, setCurrentTimeStep] = useState<string>('T-24h');

  // Sync theme with DOM
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app-mesh" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Executive Sticky Header */}
      <Header 
        theme={theme}
        onToggleTheme={toggleTheme}
        selectedLanguage={language}
        onLanguageChange={setLanguage}
        activeRiskCount={3}
      />

      {/* Main App Container */}
      <main style={{ maxWidth: '1440px', width: '100%', margin: '0 auto', padding: '18px 24px 32px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* State-Level Operational Filter Bar for Ops */}
        <StateFilterBar 
          selectedState={selectedState}
          onSelectState={setSelectedState}
        />

        {/* Top Executive KPI Cards */}
        <KPICards language={language} selectedState={selectedState} />

        {/* View Navigation Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '6px', background: 'var(--surface-2)', padding: '4px', borderRadius: '14px', border: '1px solid var(--hairline)', flexWrap: 'wrap' }}>
            {[
              { id: 'cockpit', label: 'Operations Cockpit', icon: <Compass size={15} /> },
              { id: 'mobile', label: 'Mobile Simulator (PWA)', icon: <Smartphone size={15} /> },
              { id: 'infrastructure', label: 'Infrastructure Matrix (5)', icon: <Building2 size={15} /> },
              { id: 'parametric', label: 'Parametric Liquidity Escrow', icon: <Coins size={15} /> },
              { id: 'architecture', label: 'Architecture & GEE Pipeline', icon: <Server size={15} /> }
            ].map(tab => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    fontSize: '0.75rem',
                    fontWeight: isSelected ? 800 : 600,
                    border: 'none',
                    background: isSelected ? 'var(--brand-green)' : 'transparent',
                    color: isSelected ? '#ffffff' : 'var(--ink-secondary)',
                    boxShadow: isSelected ? '0 2px 8px rgba(0, 131, 108, 0.3)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Active Cyclone: <strong style={{ color: 'var(--status-critical)' }}>DANA (125 km/h)</strong></span>
            <span>•</span>
            <span>Target: <strong style={{ color: 'var(--brand-orange-strong)' }}>Dhamra Port, Odisha</strong></span>
          </div>
        </div>

        {/* Dynamic Tabbed Content */}
        <div style={{ flex: 1 }}>
          {activeTab === 'cockpit' && (
            <OperationsCockpit 
              selectedLanguage={language}
              selectedState={selectedState}
              currentTimeStep={currentTimeStep}
              onTimeStepChange={setCurrentTimeStep}
            />
          )}

          {activeTab === 'mobile' && (
            <PhoneSimulator 
              selectedLanguage={language}
            />
          )}

          {activeTab === 'infrastructure' && (
            <InfrastructureMatrix />
          )}

          {activeTab === 'parametric' && (
            <ParametricEscrow />
          )}

          {activeTab === 'architecture' && (
            <ArchitectureView />
          )}
        </div>

      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--hairline)', padding: '14px 24px', background: 'var(--surface-1)', fontSize: '0.72rem', color: 'var(--ink-muted)', textAlign: 'center' }}>
        PRAHAR (Predictive Risk & Anticipatory Hazard Action Resource) • Supporting all 22 Official Indian Languages (Eighth Schedule) • Ingestion Service on Port 8001 • Core Engine on Port 8010
      </footer>

    </div>
  );
}
