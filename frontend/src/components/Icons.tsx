import React from 'react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

export function ShieldCheckIcon({ className = "w-5 h-5", style = {} }: IconProps) {
  return (
    <svg className={className} style={{ width: 20, height: 20, ...style }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

export function ShieldAlertIcon({ className = "w-5 h-5", style = {} }: IconProps) {
  return (
    <svg className={className} style={{ width: 20, height: 20, ...style }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

export function SunIcon({ className = "w-4 h-4", style = {} }: IconProps) {
  return (
    <svg className={className} style={{ width: 16, height: 16, ...style }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

export function MoonIcon({ className = "w-4 h-4", style = {} }: IconProps) {
  return (
    <svg className={className} style={{ width: 16, height: 16, ...style }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}

export function ActivityIcon({ className = "w-4 h-4", style = {} }: IconProps) {
  return (
    <svg className={className} style={{ width: 16, height: 16, ...style }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

export function BotIcon({ className = "w-4 h-4", style = {} }: IconProps) {
  return (
    <svg className={className} style={{ width: 16, height: 16, ...style }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

export function WavesIcon({ className = "w-5 h-5", style = {} }: IconProps) {
  return (
    <svg className={className} style={{ width: 20, height: 20, ...style }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 15c2.5 0 3.5-2 6-2s3.5 2 6 2 3.5-2 6-2M3 9c2.5 0 3.5-2 6-2s3.5 2 6 2 3.5-2 6-2M3 21c2.5 0 3.5-2 6-2s3.5 2 6 2 3.5-2 6-2" />
    </svg>
  );
}

export function TimerIcon({ className = "w-4 h-4", style = {} }: IconProps) {
  return (
    <svg className={className} style={{ width: 16, height: 16, ...style }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export function VolumeIcon({ className = "w-4 h-4", style = {} }: IconProps) {
  return (
    <svg className={className} style={{ width: 16, height: 16, ...style }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
  );
}

export function CheckCircleIcon({ className = "w-4 h-4", style = {} }: IconProps) {
  return (
    <svg className={className} style={{ width: 16, height: 16, ...style }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
