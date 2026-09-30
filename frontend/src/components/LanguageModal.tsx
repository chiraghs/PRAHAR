import React, { useState } from 'react';
import { INDIAN_LANGUAGES, LanguageMeta } from '../lib/languages';
import { Search, X, Check, Globe } from 'lucide-react';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: string;
  onSelectLanguage: (code: string) => void;
}

export function LanguageModal({
  isOpen,
  onClose,
  selectedLanguage,
  onSelectLanguage
}: LanguageModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredLanguages = INDIAN_LANGUAGES.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div 
        className="card"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: 'var(--surface-1)',
          boxShadow: 'var(--shadow-pop)',
          border: '1.5px solid var(--brand-green)'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--hairline)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--surface-2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'var(--brand-green-soft)',
              color: 'var(--brand-green-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Globe size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--ink-primary)' }}>
                Official Indian Languages (8th Schedule + English)
              </h3>
              <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', margin: '2px 0 0 0' }}>
                Full multimodal translation, emergency voice broadcasting & SOP generation via Gemini
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--ink-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 8
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--hairline)', background: 'var(--surface-1)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--surface-2)',
            padding: '8px 12px',
            borderRadius: 10,
            border: '1px solid var(--hairline)'
          }}>
            <Search size={16} color="var(--ink-muted)" />
            <input
              type="text"
              placeholder="Search by language, script, or state (e.g. Odia, বাংলা, Tamil, Telugu)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '0.8rem',
                color: 'var(--ink-primary)',
                fontFamily: 'var(--font-sans)'
              }}
              autoFocus
            />
          </div>
        </div>

        {/* Language Grid */}
        <div style={{
          padding: '16px 20px',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
          gap: '10px'
        }}>
          {filteredLanguages.map((lang) => {
            const isSelected = selectedLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  onSelectLanguage(lang.code);
                  onClose();
                }}
                className="card lift"
                style={{
                  padding: '10px 12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: isSelected ? '1.5px solid var(--brand-green)' : '1px solid var(--hairline)',
                  background: isSelected ? 'var(--brand-green-soft)' : 'var(--surface-2)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
                    {lang.nativeName}
                  </span>
                  {isSelected && (
                    <span style={{ color: 'var(--brand-green)', display: 'flex', alignItems: 'center' }}>
                      <Check size={16} />
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink-secondary)' }}>
                  {lang.name}
                </div>

                <div style={{ fontSize: '0.65rem', color: 'var(--ink-muted)', marginTop: '2px' }}>
                  {lang.region}
                </div>

                {lang.isCoastalHighRisk && (
                  <span style={{
                    fontSize: '0.6rem',
                    padding: '2px 6px',
                    borderRadius: 9999,
                    background: 'var(--brand-orange-soft)',
                    color: 'var(--brand-orange-strong)',
                    fontWeight: 700,
                    alignSelf: 'flex-start',
                    marginTop: '4px'
                  }}>
                    Coastal High-Risk
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '10px 20px',
          borderTop: '1px solid var(--hairline)',
          background: 'var(--surface-2)',
          fontSize: '0.7rem',
          color: 'var(--ink-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span>Showing {filteredLanguages.length} of 23 languages supported</span>
          <span style={{ color: 'var(--brand-green)', fontWeight: 700 }}>Gemini 1.5 Flash Multilingual Engine</span>
        </div>

      </div>
    </div>
  );
}
