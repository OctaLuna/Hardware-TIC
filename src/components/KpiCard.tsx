import React from 'react';

export interface KpiCardProps {
  value: string | number;
  label: string;
  subtext?: string;
  icon?: React.ReactNode;
  accent?: 'orange' | 'dark' | 'emerald' | 'amber' | 'rose';
  className?: string;
}

export default function KpiCard({
  value,
  label,
  subtext,
  icon,
  accent = 'orange',
  className = '',
}: KpiCardProps) {
  const accentStyles = {
    orange: 'border-stone-200 hover:border-primary',
    dark: 'bg-[#111111] text-white border-neutral-800 hover:border-primary',
    emerald: 'border-emerald-300 bg-white hover:border-emerald-600',
    amber: 'border-amber-300 bg-white hover:border-amber-600',
    rose: 'border-rose-300 bg-white hover:border-rose-600',
  };

  const valueColors = {
    orange: 'text-primary',
    dark: 'text-primary',
    emerald: 'text-emerald-700',
    amber: 'text-amber-700',
    rose: 'text-rose-700',
  };

  const isDark = accent === 'dark';

  return (
    <div
      className={`rounded-2xl border-2 p-6 shadow-hard transition-all duration-200 flex flex-col justify-between ${
        isDark ? accentStyles.dark : `bg-white ${accentStyles[accent]}`
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <span
          className={`text-xs font-mono font-bold uppercase tracking-wider ${
            isDark ? 'text-gray-300' : 'text-foreground-muted'
          }`}
        >
          {label}
        </span>
        {icon && (
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isDark
                ? 'bg-primary/20 text-primary border border-primary/40'
                : 'bg-[#FAF5DC] text-primary border border-stone-300'
            }`}
          >
            {icon}
          </div>
        )}
      </div>

      <div>
        <div
          className={`text-3xl sm:text-4xl font-display font-bold tabular-nums tracking-tight mb-1 ${valueColors[accent]}`}
        >
          {value}
        </div>
        {subtext && (
          <p
            className={`text-xs font-sans leading-relaxed ${
              isDark ? 'text-gray-400' : 'text-foreground-muted'
            }`}
          >
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}
