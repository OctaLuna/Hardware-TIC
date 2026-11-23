import React from 'react';
import PageHeaderBanner from './PageHeaderBanner';

export function ContentPage({ title, subtitle, category, children, className = '' }: { title: string; subtitle?: string; category?: string; children: React.ReactNode; className?: string }) {
  return <div className={`min-h-screen bg-background ${className}`}><PageHeaderBanner title={title} subtitle={subtitle} category={category} /><div className="container-wide mx-auto space-y-12 px-4 py-10 md:px-8 md:py-14">{children}</div></div>;
}

export function ContentSection({ title, eyebrow, children, className = '' }: { title: string; eyebrow?: string; children: React.ReactNode; className?: string }) {
  return <section className={`space-y-5 ${className}`}>{eyebrow && <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>}<h2 className="border-b-2 border-surface pb-3 font-display text-3xl font-bold uppercase md:text-4xl">{title}</h2>{children}</section>;
}

export function InfoPanel({ title, children, tone = 'paper' }: { title?: string; children: React.ReactNode; tone?: 'paper' | 'dark' | 'orange'; key?: React.Key }) {
  const tones = { paper: 'border-stone-300 bg-white text-surface', dark: 'border-neutral-700 bg-[#151515] text-white', orange: 'border-primary/50 bg-orange-50 text-surface' };
  return <div className={`rounded-2xl border-2 p-5 shadow-hard ${tones[tone]}`}>{title && <h3 className="mb-3 font-display text-xl font-bold uppercase">{title}</h3>}{children}</div>;
}

export function BulletList({ items }: { items: string[] }) {
  return <ul className="space-y-2 text-sm leading-relaxed text-foreground-muted">{items.map((item) => <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{item}</li>)}</ul>;
}

export const formatBs = (value: number) => `Bs. ${value.toLocaleString('es-BO')}`;
