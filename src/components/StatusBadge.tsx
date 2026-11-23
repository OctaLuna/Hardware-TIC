import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, Info } from 'lucide-react';

export type StatusVariant = 'success' | 'warning' | 'danger' | 'neutral';

export interface StatusBadgeProps {
  label: string;
  variant?: StatusVariant;
  className?: string;
}

export default function StatusBadge({
  label,
  variant = 'success',
  className = '',
}: StatusBadgeProps) {
  const styles: Record<StatusVariant, string> = {
    success: 'bg-emerald-100 text-emerald-900 border-emerald-700',
    warning: 'bg-amber-100 text-amber-900 border-amber-700',
    danger: 'bg-rose-100 text-rose-900 border-rose-700',
    neutral: 'bg-stone-100 text-stone-800 border-stone-500',
  };

  const icons: Record<StatusVariant, React.ReactNode> = {
    success: <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />,
    warning: <Clock size={13} className="text-amber-700 shrink-0" />,
    danger: <AlertTriangle size={13} className="text-rose-700 shrink-0" />,
    neutral: <Info size={13} className="text-stone-600 shrink-0" />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-[11px] font-mono font-bold uppercase tracking-wider whitespace-nowrap shrink-0 ${styles[variant]} ${className}`}
    >
      {icons[variant]}
      <span>{label}</span>
    </span>
  );
}
