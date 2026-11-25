import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Activity, BookOpen, Boxes, ChartNoAxesCombined, ChevronRight, Cpu, FileText,
  House, Menu, Network, Search, Settings, ShieldAlert, Users, Wallet, Workflow, X,
} from 'lucide-react';

const groups = [
  { title: '', links: [{ label: 'Inicio', path: '/', icon: House }] },
  { title: 'Fundamentos', links: [
    { label: 'Gestión de Tecnología', path: '/gestion-tecnologia', icon: Settings },
    { label: 'Ciencia, Tecnología e Innovación', path: '/ciencia-tecnologia-innovacion', icon: Activity },
    { label: 'Misión y Visión', path: '/mision-vision', icon: FileText },
  ] },
  { title: 'Equipo', links: [
    { label: 'Organización', path: '/organigrama', icon: Network },
    { label: 'Descripción de Posiciones', path: '/posiciones', icon: Users },
    { label: 'MBTI del Equipo', path: '/mbti', icon: Users },
    { label: 'Scrum del Equipo', path: '/scrum', icon: BookOpen },
    { label: 'Objetivos y Asignación', path: '/objetivos', icon: ChartNoAxesCombined },
    { label: 'Contactos', path: '/contacto', icon: Users },
  ] },
  { title: 'Procesos y datos', links: [
    { label: 'Modelado IDEF0', path: '/idef0', icon: Workflow },
    { label: 'BPMN del Equipo', path: '/bpmn', icon: Workflow },
    { label: 'Inventarios', path: '/inventarios', icon: Boxes },
    { label: 'Datos y Tableau', path: '/tableau', icon: ChartNoAxesCombined },
    { label: 'Patrones con Weka', path: '/weka', icon: Activity },
    { label: 'Monitoreo con PRTG', path: '/monitoreo', icon: Activity },
    { label: 'Presupuesto', path: '/presupuesto', icon: Wallet },
  ] },
  { title: 'Gestión y cierre', links: [
    { label: 'Soporte Externo', path: '/servicios-externos', icon: Settings },
    { label: 'Plan de Contingencia', path: '/contingencia', icon: ShieldAlert },
    { label: 'Conclusiones', path: '/conclusiones', icon: FileText },
    { label: 'Recomendaciones', path: '/recomendaciones', icon: FileText },
  ] },
];

export const navLinks = groups.flatMap((group) => group.links.map(({ label, path }) => ({ name: label, path, group: group.title || 'General' })));

const normalizeSearchText = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeResult, setActiveResult] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDialogRef = useRef<HTMLDivElement>(null);
  const searchTriggerRef = useRef<HTMLElement | null>(null);

  const searchResults = useMemo(() => {
    const normalized = normalizeSearchText(query.trim());
    return navLinks.filter((link) => !normalized || normalizeSearchText(`${link.name} ${link.path} ${link.group}`).includes(normalized));
  }, [query]);

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => { setSearchOpen(false); setQuery(''); }, [location.pathname]);
  useEffect(() => setActiveResult(0), [query]);

  useEffect(() => {
    if (!searchOpen) return;
    searchInputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
        searchTriggerRef.current?.focus();
      }
      if (event.key === 'Tab' && searchDialogRef.current) {
        const focusable = Array.from(searchDialogRef.current.querySelectorAll('input, button:not(:disabled)')) as HTMLElement[];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [searchOpen]);

  const showSearch = (event: React.MouseEvent<HTMLElement>) => {
    searchTriggerRef.current = event.currentTarget;
    setQuery('');
    setSearchOpen(true);
  };
  const closeSearch = () => {
    setSearchOpen(false);
    searchTriggerRef.current?.focus();
  };

  const navigation = (
    <nav aria-label="Navegación principal" className="editorial-navigation flex-1 overflow-y-auto px-3 py-5">
      <button type="button" onClick={showSearch} className="mb-5 flex min-h-10 w-full items-center gap-3 rounded-lg border border-white/15 px-3 py-2 text-left text-[13px] text-stone-300 transition-colors hover:border-primary hover:bg-white/10 hover:text-white" aria-haspopup="dialog">
        <Search size={16} className="text-stone-400" /><span className="flex-1">Buscar página</span>
      </button>
      {groups.map((group) => (
        <section key={group.title || 'home'} className="mb-5">
          {group.title && <h2 className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">{group.title}</h2>}
          <ul className="space-y-1">
            {group.links.map(({ label, path, icon: Icon }) => {
              const active = location.pathname === path;
              return <li key={path}><Link to={path} aria-current={active ? 'page' : undefined} className={`group flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-[13px] leading-snug transition-colors ${active ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-stone-300 hover:bg-white/10 hover:text-white'}`}>
                <Icon size={16} className={active ? 'shrink-0' : 'shrink-0 text-stone-400 group-hover:text-primary-light'} />
                <span className="flex-1">{label}</span>{active && <ChevronRight size={14} />}
              </Link></li>;
            })}
          </ul>
        </section>
      ))}
    </nav>
  );

  return <>
    <header className="editorial-mobile-header fixed inset-x-0 top-0 z-40 flex h-[68px] items-center justify-between border-b border-neutral-800 bg-[#111111] px-4 text-white lg:hidden">
      <Link to="/" className="font-display text-xl font-bold tracking-wide">IATECH <span className="text-primary">Co.</span></Link>
      <button type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} onClick={() => setOpen(!open)} className="rounded-md border border-white/20 p-2 hover:bg-white/10">{open ? <X size={20} /> : <Menu size={20} />}</button>
    </header>

    <aside className="editorial-sidebar fixed inset-y-0 left-0 z-40 hidden w-[276px] flex-col border-r border-neutral-800 bg-[#111111] text-white lg:flex">
      <Link to="/" className="flex h-[76px] items-center gap-3 border-b border-white/10 px-6"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white"><Cpu size={20} /></span><span className="font-display text-xl font-bold tracking-wide">IATECH <span className="text-primary">Co.</span></span></Link>
      {navigation}<div className="border-t border-white/10 p-4"><p className="text-center font-mono text-[9px] uppercase tracking-widest text-stone-500">Hardware & Infraestructura</p></div>
    </aside>

    {open && <button type="button" aria-label="Cerrar menú" onClick={() => setOpen(false)} className="fixed inset-0 top-[68px] z-40 bg-black/60 lg:hidden" />}
    <aside aria-label="Menú móvil" className={`editorial-drawer fixed bottom-0 left-0 top-[68px] z-50 flex w-[min(86vw,340px)] flex-col border-r border-neutral-800 bg-[#111111] text-white shadow-2xl transition-transform duration-200 lg:hidden ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      {navigation}<div className="border-t border-white/10 p-4"><p className="text-center font-mono text-[9px] uppercase tracking-widest text-stone-500">Hardware & Infraestructura</p></div>
    </aside>

    {searchOpen && <div className="fixed inset-0 z-[70] flex items-start justify-center bg-black/65 p-4 pt-[12vh]" onMouseDown={(event) => { if (event.target === event.currentTarget) closeSearch(); }}>
      <div ref={searchDialogRef} role="dialog" aria-modal="true" aria-labelledby="page-search-title" className="editorial-search-dialog w-full max-w-xl overflow-hidden rounded-2xl border-2 border-surface bg-background shadow-hard-lg">
        <div className="flex items-center gap-3 border-b border-stone-300 px-4 py-3"><Search size={18} className="shrink-0 text-primary" /><h2 id="page-search-title" className="sr-only">Buscar página</h2>
          <input ref={searchInputRef} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => {
            if (event.key === 'ArrowDown' && searchResults.length) { event.preventDefault(); setActiveResult((index) => (index + 1) % searchResults.length); }
            if (event.key === 'ArrowUp' && searchResults.length) { event.preventDefault(); setActiveResult((index) => (index - 1 + searchResults.length) % searchResults.length); }
            if (event.key === 'Enter' && searchResults[activeResult]) { navigate(searchResults[activeResult].path); setSearchOpen(false); }
          }} placeholder="Buscar una página…" aria-label="Buscar por nombre o sección" aria-controls="page-search-results" aria-activedescendant={searchResults[activeResult] ? `page-result-${activeResult}` : undefined} className="min-w-0 flex-1 bg-transparent py-1 text-sm text-surface outline-none placeholder:text-foreground-muted" />
          <button type="button" onClick={closeSearch} className="rounded-md border border-stone-400 px-2 py-1 font-mono text-[10px] font-bold uppercase hover:bg-surface hover:text-white" aria-label="Cerrar búsqueda">Esc</button>
        </div>
        <div id="page-search-results" role="listbox" aria-label="Páginas" className="max-h-[55vh] overflow-y-auto p-2">
          {searchResults.map((link, index) => <button key={link.path} id={`page-result-${index}`} role="option" aria-selected={activeResult === index} type="button" onMouseEnter={() => setActiveResult(index)} onClick={() => { navigate(link.path); setSearchOpen(false); }} className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-3 text-left ${activeResult === index ? 'bg-primary text-white' : 'text-surface hover:bg-orange-100'}`}><span className="font-semibold">{link.name}</span><span className={`text-xs ${activeResult === index ? 'text-white/75' : 'text-foreground-muted'}`}>{link.group}</span></button>)}
        </div>
        {!searchResults.length && <p className="px-4 py-8 text-center text-sm text-foreground-muted" role="status">No se encontraron páginas. Prueba con otro término.</p>}
        <p className="border-t border-stone-300 px-4 py-2 font-mono text-[10px] text-foreground-muted">↑ ↓ para recorrer · Enter para abrir · Escape para cerrar</p>
      </div>
    </div>}
  </>;
}
