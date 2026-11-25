import React, { Suspense, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Sidebar, { navLinks } from './Sidebar';
import CustomCursor from './CustomCursor';
import Preloader from './Preloader';
import SideTelemetryRails from './SideTelemetryRails';
import { ArrowRight } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previousScrollRestoration; };
  }, []);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    const targetId = decodeURIComponent(location.hash.slice(1));
    let frame = 0;
    let attempts = 0;
    const scrollToHashTarget = () => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'instant' });
        return;
      }
      if (attempts++ < 120) frame = requestAnimationFrame(scrollToHashTarget);
    };
    frame = requestAnimationFrame(scrollToHashTarget);
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-primary selection:text-white">
      {/* Cinematic Custom Cursor (Desktop) */}
      <CustomCursor />

      {/* Cinematic App Preloader (Intro only) */}
      <Preloader />

      {/* High-Tech Telemetry Side Rails on Viewport Flanks */}
      <SideTelemetryRails />

      {/* Subtle Noise Texture Overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[-1] noise-overlay opacity-60"
      />

      <Sidebar />

      {/* Main Content Area with top offset for floating navbar and architectural side framing */}
      <main className="editorial-main relative flex-1 pt-[68px] lg:ml-[244px] lg:pt-0">
        <Suspense fallback={<div role="status" className="container-wide mx-auto px-4 py-16 font-mono text-xs uppercase tracking-widest text-foreground-muted">Cargando sección…</div>}>
          <Outlet />
        </Suspense>
      </main>

      {/* Footer - All texts and links preserved identically */}
      <footer className="relative z-10 border-t border-neutral-800 bg-surface py-16 text-foreground-inverse lg:ml-[244px]">
        <div className="container-wide grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-display mb-4">Tiradores</h2>
            <p className="text-gray-400 max-w-sm mb-6">
              Construimos la base física que sostiene la salud digital. Equipo de Hardware e Infraestructura, IA MediTech.
            </p>
            <Link
              to="/contacto"
              className="btn-primary inline-flex items-center gap-2 text-xs py-2.5 px-6 uppercase tracking-wider font-semibold shadow-hard-orange hover:scale-105 transition-transform"
            >
              <span>Contáctanos</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div>
            <h3 className="text-xl font-display mb-4 text-primary">Navegación</h3>
            <ul className="flex flex-col gap-2 text-gray-400">
              {navLinks.map((link) => (
                <li key={link.path}>
              <Link to={link.path} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container-wide mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Tiradores Hardware. Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <span>LinkedIn</span>
             <span>Twitter</span>
             <span>GitHub</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
