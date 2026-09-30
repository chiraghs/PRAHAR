import React from 'react';
import { TimerIcon, ActivityIcon, ShieldCheckIcon, WavesIcon } from './Icons';
import { INDIAN_LANGUAGES, LanguageMeta } from '../lib/languages';
import { COASTAL_STATES } from './StateFilterBar';

interface KPICardsProps {
  language: string;
  selectedState?: string;
}

export function KPICards({ language, selectedState = 'ALL' }: KPICardsProps) {
  const currentLang = INDIAN_LANGUAGES.find(l => l.code === language) || INDIAN_LANGUAGES[0];
  const currentState = COASTAL_STATES.find(s => s.id === selectedState) || COASTAL_STATES[0];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '18px' }}>
      
      {/* KPI 1: Speed to Landfall */}
      <div className="card lift" style={{ padding: '16px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--brand-green)' }}>
            {language === 'or' ? 'ସ୍ଥଳଭାଗ ଛୁଇଁବାକୁ ବାକି' : language === 'bn' ? 'স্থলভাগে আছড়ে পড়ার সময়' : language === 'te' ? 'తీరం దాటే సమయం' : language === 'ta' ? 'புயல் கரையை கடக்கும் நேரம்' : language === 'hi' ? 'लैंडफॉल तक शेष समय' : 'Time-To-Landfall Window'}
          </span>
          <div style={{ padding: '6px', borderRadius: 8, background: 'var(--brand-green-soft)', color: 'var(--brand-green-strong)', display: 'flex', alignItems: 'center' }}>
            <TimerIcon style={{ width: 16, height: 16 }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--ink-primary)' }}>T-24h 00m</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--status-good-text)' }}>Target &lt; T-12h</span>
        </div>
        <div style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--hairline)', paddingTop: '8px' }}>
          <span>Jurisdiction Watch:</span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-green-strong)', fontWeight: 700 }}>{currentState.shortName}</span>
        </div>
      </div>

      {/* KPI 2: Peak Storm Surge Inundation */}
      <div className="card lift" style={{ padding: '16px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--brand-green)' }}>
            {language === 'or' ? 'ସର୍ବାଧିକ ଜୁଆର ଉଚ୍ଚତା' : language === 'bn' ? 'সর্বোচ্চ জলোচ্ছ্বাসের উচ্চতা' : language === 'te' ? 'గరిష్ట తుఫాను ఉప్పెన' : language === 'ta' ? 'அதிகபட்ச புயல் அலை' : language === 'hi' ? 'अधिकतम तूफानी ज्वार' : 'Peak Storm Surge Depth'}
          </span>
          <div style={{ padding: '6px', borderRadius: 8, background: 'var(--brand-green-soft)', color: 'var(--brand-green-strong)', display: 'flex', alignItems: 'center' }}>
            <WavesIcon style={{ width: 16, height: 16 }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--ink-primary)' }}>{currentState.surgeDepth.split(' ')[0]}</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--brand-orange)' }}>{currentState.surgeDepth.split(' ').slice(1).join(' ') || 'Forecast'}</span>
        </div>
        <div style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--hairline)', paddingTop: '8px' }}>
          <span>Risk Classification:</span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--status-critical)', fontWeight: 700 }}>{currentState.riskLabel}</span>
        </div>
      </div>

      {/* KPI 3: Severed Lifeline Corridors */}
      <div className="card lift" style={{ padding: '16px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--brand-orange-strong)' }}>
            {language === 'or' ? 'ବିଚ୍ଛିନ୍ନ ଜାତୀୟ/ରାଜ୍ୟ ରାଜପଥ' : language === 'bn' ? 'বিচ্ছিন্ন প্রধান সড়ক পথ' : language === 'te' ? 'తెగిపోయిన ప్రధాన రహదారులు' : language === 'ta' ? 'துண்டிக்கப்பட்ட நெடுஞ்சாலைகள்' : language === 'hi' ? 'जलमग्न राष्ट्रीय/राज्य राजमार्ग' : 'Severed Lifeline Corridors'}
          </span>
          <div style={{ padding: '6px', borderRadius: 8, background: 'var(--brand-orange-soft)', color: 'var(--brand-orange-strong)', display: 'flex', alignItems: 'center' }}>
            <ActivityIcon style={{ width: 16, height: 16 }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--status-critical)' }}>{currentState.severedRoads}</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--status-critical)' }}>In {currentState.shortName}</span>
        </div>
        <div style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--hairline)', paddingTop: '8px' }}>
          <span>Ambulance Transit Loss:</span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-orange-strong)', fontWeight: 700 }}>+4.2 Hours Reroute</span>
        </div>
      </div>

      {/* KPI 4: Parametric Disaster Liquidity */}
      <div className="card lift" style={{ padding: '16px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--brand-green)' }}>
            {language === 'or' ? 'ଆଗୁଆ ବୀମା ପାଣ୍ଠି' : language === 'bn' ? 'আগাম জরুরি তহবিল' : language === 'te' ? 'ముందస్తు విపత్తు ద్రవ్యత' : language === 'ta' ? 'முன்கூட்டியே விடுவிக்கப்பட்ட நிதி' : language === 'hi' ? 'पूर्व-आपदा त्वरित बीमा राशि' : 'Parametric Disaster Liquidity'}
          </span>
          <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: 9999, background: 'var(--brand-green-soft)', color: 'var(--brand-green-strong)', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
            T-24H ESCROW
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--brand-green)' }}>{currentState.funds}</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-muted)' }}>Pre-Landfall Pool</span>
        </div>
        <div style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--hairline)', paddingTop: '8px' }}>
          <span>Disbursement Delay:</span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--status-good-text)', fontWeight: 700 }}>0 Days (48h Pre-Landfall)</span>
        </div>
      </div>

    </div>
  );
}
