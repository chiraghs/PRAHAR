import React, { useState } from 'react';
import { ShieldCheckIcon, SunIcon, MoonIcon, BotIcon, WavesIcon } from './Icons';
import { Globe, ChevronDown } from 'lucide-react';
import { LanguageModal } from './LanguageModal';
import { INDIAN_LANGUAGES, LanguageMeta } from '../lib/languages';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  selectedLanguage: string;
  onLanguageChange: (langCode: string) => void;
  activeRiskCount: number;
}

export function Header({
  theme,
  onToggleTheme,
  selectedLanguage,
  onLanguageChange,
  activeRiskCount
}: HeaderProps) {
  const [showConfig, setShowConfig] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const currentLang: LanguageMeta = INDIAN_LANGUAGES.find(l => l.code === selectedLanguage) || INDIAN_LANGUAGES[0];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-hairline bg-surface-1/90 backdrop-blur-md px-4 lg:px-8 py-3.5 transition-colors" style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--hairline)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          
          {/* Brand & Subtext */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div 
              style={{ 
                width: 42, 
                height: 42, 
                borderRadius: 14, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                background: 'var(--brand-gradient)', 
                color: 'white',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <WavesIcon style={{ width: 24, height: 24 }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink-primary)' }}>
                  PRAHAR
                </span>
                <span style={{ 
                  fontSize: '0.68rem', 
                  padding: '2px 8px', 
                  borderRadius: '9999px', 
                  background: 'var(--brand-green-soft)', 
                  color: 'var(--brand-green-strong)', 
                  fontWeight: 800, 
                  border: '1px solid rgba(0, 131, 108, 0.2)',
                  letterSpacing: '0.04em'
                }}>
                  AI DEFENSE • RESILIENCE
                </span>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                  Bay of Bengal Basin · NDMA / INCOIS
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--ink-secondary)', fontWeight: 500, margin: 0 }}>
                {currentLang.tagline}
              </p>
            </div>
          </div>

          {/* Live Status Indicators & Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            
            {/* Engine Status Badge */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '6px 12px', 
              borderRadius: '12px', 
              background: 'var(--surface-2)', 
              border: '1px solid var(--hairline)', 
              fontSize: '0.75rem' 
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-green)', display: 'inline-block' }} />
              <span style={{ color: 'var(--ink-primary)', fontWeight: 600 }}>GEE 30m + Gemini Flash</span>
              <span style={{ color: 'var(--ink-muted)' }}>|</span>
              <span style={{ color: 'var(--brand-green)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>180ms</span>
            </div>

            {/* Active Risk Alerts Counter */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '6px 12px', 
              borderRadius: '12px', 
              background: 'var(--brand-orange-soft)', 
              border: '1px solid rgba(245, 130, 32, 0.3)', 
              fontSize: '0.75rem', 
              color: 'var(--brand-orange-strong)', 
              fontWeight: 700 
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-orange)', display: 'inline-block' }} className="animate-radar" />
              <span>{activeRiskCount} Critical Sectors</span>
            </div>

            {/* 22 Indian Languages Switcher Trigger */}
            <button
              onClick={() => setShowLanguageModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '12px',
                background: 'var(--surface-2)',
                border: '1px solid var(--brand-green)',
                color: 'var(--ink-primary)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="Change Language (22 Official Indian Languages Supported)"
            >
              <Globe size={15} color="var(--brand-green)" />
              <span style={{ color: 'var(--brand-green-strong)', fontWeight: 800 }}>
                {currentLang.nativeName} ({currentLang.name})
              </span>
              <span style={{ fontSize: '0.65rem', padding: '1px 6px', borderRadius: 9999, background: 'var(--brand-green-soft)', color: 'var(--brand-green-strong)', fontWeight: 800 }}>
                22 Indic
              </span>
              <ChevronDown size={14} color="var(--ink-muted)" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle color theme"
              style={{ 
                width: 36, 
                height: 36, 
                borderRadius: 12, 
                border: '1px solid var(--hairline)', 
                background: 'var(--surface-2)', 
                color: 'var(--ink-secondary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            >
              {theme === 'dark' ? <SunIcon style={{ color: '#f59e0b' }} /> : <MoonIcon style={{ color: '#46584f' }} />}
            </button>

            {/* Config / API Key Drawer Trigger */}
            <button
              onClick={() => setShowConfig(!showConfig)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: 12,
                background: 'var(--surface-2)',
                color: 'var(--ink-primary)',
                fontSize: '0.75rem',
                fontWeight: 600,
                border: '1px solid var(--hairline)',
                cursor: 'pointer'
              }}
            >
              <BotIcon style={{ color: 'var(--brand-green)' }} />
              <span>AI Config</span>
            </button>
          </div>
        </div>

        {/* Config Drawer */}
        {showConfig && (
          <div style={{ 
            maxWidth: '1440px', 
            margin: '12px auto 0 auto', 
            padding: '14px 18px', 
            borderRadius: 16, 
            background: 'var(--surface-2)', 
            border: '1px solid var(--brand-green)', 
            fontSize: '0.75rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--ink-primary)', margin: 0 }}>Google AI Gemini & Earth Engine Telemetry</p>
              <p style={{ color: 'var(--ink-muted)', margin: '2px 0 0 0', fontSize: '0.7rem' }}>
                Connected to Ingestion Microservice on port 8001. All 22 Eighth Schedule languages synthesized via Gemini.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="password" 
                placeholder="Enter Gemini API key (optional, mock fallback active)..." 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                style={{
                  background: 'var(--surface-1)',
                  border: '1px solid var(--hairline)',
                  borderRadius: 10,
                  padding: '6px 12px',
                  color: 'var(--ink-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  width: '280px'
                }}
              />
              <button
                onClick={() => setShowConfig(false)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 10,
                  background: 'var(--brand-green)',
                  color: 'white',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  cursor: 'pointer'
                }}
              >
                Save Key
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 22 Indian Languages Selection Modal */}
      <LanguageModal 
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={onLanguageChange}
      />
    </>
  );
}
