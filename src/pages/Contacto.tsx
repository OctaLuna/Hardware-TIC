import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import PageHeaderBanner from '../components/PageHeaderBanner';
import { 
  teamMembersContact, 
  generalContactInfo, 
  TeamMemberContact 
} from '../data/contactData';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  GraduationCap, 
  Building2, 
  ArrowRight, 
  AlertCircle,
  Activity, 
  Send,
} from 'lucide-react';

export default function Contacto() {
  // Form State
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    asunto: 'Soporte técnico',
    mensaje: ''
  });
  const [formError, setFormError] = useState<string | null>(null);
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formError) setFormError(null);
  };

  const handleFormSubmit = () => {
    if (!generalContactInfo.email) return;
    if (!formData.nombre.trim()) return setFormError('Por favor ingresa tu nombre completo.');
    if (!formData.correo.trim() || !formData.correo.includes('@')) return setFormError('Por favor ingresa un correo electrónico válido.');
    if (!formData.mensaje.trim()) return setFormError('Por favor escribe un mensaje detallando tu consulta.');

    const subject = encodeURIComponent(`[${formData.asunto}] Mensaje de ${formData.nombre}`);
    const body = encodeURIComponent(
      `Nombre: ${formData.nombre}\nCorreo de contacto: ${formData.correo}\nAsunto: ${formData.asunto}\n\nMensaje:\n${formData.mensaje}`
    );
    window.location.href = `mailto:${generalContactInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <AnimatedPage>
      <div className="w-full bg-background pb-24">
        {/* Header Oficial */}
        <PageHeaderBanner
          title="Contacto"
          badge="Directorio del Equipo • Tiradores"
          subtitle="Conoce al equipo y consulta los canales personales publicados."
        />

        <div className="container-wide mt-16 space-y-24">

          {/* ==================== 2.4 BLOQUE DE ACCESO RÁPIDO A MONITOREO ==================== */}
          <section className="bg-surface text-foreground-inverse p-6 sm:p-8 rounded-2xl border-l-8 border-primary shadow-hard-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0 border border-primary/40 mt-1">
                <Activity size={26} />
              </div>
              <div>
                <span className="text-primary font-mono text-xs font-bold uppercase tracking-wider block mb-1">
                  Monitoreo de infraestructura
                </span>
                <h3 className="text-xl sm:text-2xl font-display text-white">
                  ¿Incidencia en la infraestructura? Consulta el monitoreo
                </h3>
                <p className="text-sm text-gray-400 mt-1 font-sans">
                  Consulta el acceso PRTG y el esquema de referencia de la infraestructura.
                </p>
              </div>
            </div>

            <Link
              to="/monitoreo"
              className="btn-primary text-sm px-6 py-3.5 inline-flex items-center gap-2 whitespace-nowrap shadow-hard-orange hover:scale-105 transition-transform shrink-0"
            >
              <span>Ver Mapa de Monitoreo</span>
              <ArrowRight size={16} />
            </Link>
          </section>

          {/* ==================== 2.1 TARJETAS DE CONTACTO POR INTEGRANTE ==================== */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <span aria-hidden="true" className="w-2 h-10 bg-primary block rounded-full" />
              <div>
                <h2 className="text-3xl md:text-4xl font-display text-surface">
                  1. Directorio del Equipo de Hardware
                </h2>
                <p className="text-sm text-foreground-muted uppercase tracking-widest font-sans">
                  5 ingenieros responsables de la infraestructura física en IA MediTech
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {teamMembersContact.map((member) => (
                <MemberContactCard key={member.id} member={member} />
              ))}

              {/* Tarjeta de Mesa de Ayuda General */}
              <div className="bg-[#111111] text-foreground-inverse p-8 rounded-2xl border-2 border-primary/50 shadow-hard-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-display text-lg font-bold shadow-sm">
                      TH
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">
                        CANAL CENTRALIZADO
                      </span>
                      <h3 className="text-xl font-display text-white">
                        Mesa de Infraestructura
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-6">
                    Para solicitudes generales de compras de hardware, auditorías normativas o coordinación institucional entre áreas.
                  </p>
                  <div className="space-y-2 text-xs font-mono text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-primary shrink-0" />
                      <span className="truncate">{generalContactInfo.email ?? 'Correo oficial no publicado'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-primary shrink-0" />
                      <span>{generalContactInfo.schedule}</span>
                    </div>
                  </div>
                </div>

                {generalContactInfo.email ? (
                  <a href={`mailto:${generalContactInfo.email}?subject=Solicitud%20de%20Infraestructura`} className="btn-primary text-xs py-3 text-center justify-center w-full">
                    Contactar Mesa Central
                  </a>
                ) : (
                  <button type="button" disabled aria-disabled="true" className="btn-primary text-xs py-3 text-center justify-center w-full cursor-not-allowed opacity-50" title="Correo oficial no publicado">
                    Contactar Mesa Central
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* ==================== 2.2 CONTACTO GENERAL Y 2.3 FORMULARIO ==================== */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* 2.2 Información Institucional */}
            <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-2xl border border-stone-200 shadow-hard space-y-6">
              <div>
                <span className="text-primary font-bold font-mono text-xs uppercase tracking-widest block mb-1">
                  Información Institucional
                </span>
                <h3 className="text-2xl sm:text-3xl font-display text-surface">
                  Contacto General
                </h3>
                <p className="text-sm text-foreground-muted font-sans mt-2 leading-relaxed">
                  {generalContactInfo.description}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-stone-200 font-sans text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-surface text-primary shrink-0">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <strong className="text-surface block">Equipo y Empresa:</strong>
                    <span className="text-foreground-muted">{generalContactInfo.teamName}</span>
                    <div className="text-xs text-primary font-mono">{generalContactInfo.company}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-surface text-primary shrink-0">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <strong className="text-surface block">Institución Académica:</strong>
                    <span className="text-foreground-muted">{generalContactInfo.university}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-surface text-primary shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <strong className="text-surface block">Ubicación Física:</strong>
                    <span className="text-foreground-muted">{generalContactInfo.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-surface text-primary shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <strong className="text-surface block">Horario de Atención:</strong>
                    <span className="text-foreground-muted">{generalContactInfo.schedule}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-surface text-primary shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <strong className="text-surface block">Correo Electrónico Oficial:</strong>
                    {generalContactInfo.email ? (
                      <a href={`mailto:${generalContactInfo.email}`} className="text-primary hover:underline font-mono text-xs font-bold">
                        {generalContactInfo.email}
                      </a>
                    ) : (
                      <span className="text-foreground-muted">No publicado</span>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* 2.3 Formulario de Contacto Funcional */}
            <div className="lg:col-span-7 bg-[#111111] text-foreground-inverse p-8 md:p-10 rounded-2xl border-2 border-primary/40 shadow-hard-lg">
              <div className="mb-6">
                <span className="text-primary font-mono text-xs font-bold uppercase tracking-widest block mb-1">
                  Buzón de Mensajería
                </span>
                <h3 className="text-2xl sm:text-3xl font-display text-white">
                  Envíanos un Mensaje
                </h3>
                <p className="text-sm text-gray-400 font-sans mt-1">
                  Completa los campos. El envío se habilitará cuando exista un correo oficial de destino.
                </p>
              </div>

              {formError && (
                <div role="alert" className="mb-6 flex items-start gap-3 rounded-xl border border-rose-500 bg-rose-950/80 p-4 text-sm text-rose-200">
                  <AlertCircle size={20} className="mt-0.5 shrink-0 text-rose-400" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="space-y-5 font-sans">
                <div>
                  <label className="block text-xs font-mono uppercase text-gray-300 mb-2 font-bold">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    placeholder="Ej. Ing. María Prado"
                    className="w-full px-4 py-3 rounded-xl bg-[#1c1c1c] border border-neutral-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-300 mb-2 font-bold">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      value={formData.correo}
                      onChange={(e) => handleInputChange('correo', e.target.value)}
                      placeholder="tu.correo@ejemplo.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#1c1c1c] border border-neutral-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-300 mb-2 font-bold">
                      Asunto del Requerimiento *
                    </label>
                    <select
                      value={formData.asunto}
                      onChange={(e) => handleInputChange('asunto', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#1c1c1c] border border-neutral-700 text-white focus:outline-none focus:border-primary text-sm transition-colors cursor-pointer"
                    >
                      <option value="Soporte técnico">Soporte técnico</option>
                      <option value="Solicitud de infraestructura">Solicitud de infraestructura</option>
                      <option value="Consulta general">Consulta general</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-gray-300 mb-2 font-bold">
                    Mensaje o Descripción de la Necesidad *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.mensaje}
                    onChange={(e) => handleInputChange('mensaje', e.target.value)}
                    placeholder="Describe los requerimientos técnicos, equipo, sistema o consulta sobre la infraestructura..."
                    className="w-full px-4 py-3 rounded-xl bg-[#1c1c1c] border border-neutral-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-gray-500 font-mono">
                    * Campos obligatorios para procesar la solicitud.
                  </span>
                  <button
                    type="button"
                    onClick={handleFormSubmit}
                    disabled={!generalContactInfo.email}
                    aria-disabled={!generalContactInfo.email}
                    title={!generalContactInfo.email ? 'Correo oficial no publicado' : undefined}
                    className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 shadow-hard-orange transition-transform disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span>Enviar Mensaje</span>
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>

          </section>

        </div>
      </div>
    </AnimatedPage>
  );
}

/* ==================== TARJETA DE INTEGRANTE (PERSONCARD) ==================== */

function MemberContactCard({ member }: { member: TeamMemberContact; key?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-hard hover:shadow-hard-orange hover:border-primary transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div className="p-7">
        
        {/* Cabecera con Foto o Avatar Iniciales */}
        <div className="flex items-start gap-4 mb-5">
          {member.photoUrl ? (
            <img
              src={member.photoUrl}
              alt={`Foto de ${member.name}`}
              loading="lazy"
              className={`h-28 w-24 shrink-0 rounded-xl border-2 border-primary shadow-sm ${member.photoFit === 'contain' ? 'bg-stone-100 object-contain' : 'object-cover'}`}
              style={{ objectPosition: member.photoPosition ?? 'center' }}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-surface text-primary flex items-center justify-center font-display text-2xl font-bold border-2 border-primary shadow-sm shrink-0 group-hover:scale-105 transition-transform">
              {member.initials}
            </div>
          )}

          <div>
            <h3 className="font-display text-xl sm:text-2xl text-surface font-bold leading-tight group-hover:text-primary transition-colors">
              {member.name}
            </h3>
            <div className="text-xs font-mono font-bold text-primary uppercase mt-1">
              {member.scrumRole}
            </div>
            <div className="text-xs text-foreground-muted font-sans mt-0.5">
              {member.area}
            </div>
          </div>
        </div>

        {member.bio && (
          <p className="text-xs sm:text-sm text-foreground-muted font-sans leading-relaxed mb-6 border-l-2 border-primary/40 pl-3">
            {member.bio}
          </p>
        )}

        {/* Datos de contacto publicados */}
        <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 mb-6 font-mono text-xs">
          <div className="flex items-center justify-between text-foreground-muted">
            <span className="flex items-center gap-2">
              <Mail size={14} className="text-primary" /> Correo:
            </span>
            <span className="text-surface font-semibold truncate max-w-[170px]" title={member.email ?? 'No publicado'}>
              {member.email ?? 'No publicado'}
            </span>
          </div>
          <div className="flex items-center justify-between text-foreground-muted">
            <span className="flex items-center gap-2">
              <Phone size={14} className="text-primary" /> Teléfono:
            </span>
            <span className="text-surface font-semibold">
              {member.phone ?? 'No publicado'}
            </span>
          </div>
        </div>

        {/* Botones Principales de Contacto */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {member.email ? (
            <a href={`mailto:${member.email}?subject=Contacto%20con%20${encodeURIComponent(member.name)}`} className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-surface text-white text-xs font-semibold hover:bg-primary transition-colors shadow-sm text-center">
              <Mail size={14} /><span>Escribir correo</span>
            </a>
          ) : (
            <button type="button" disabled aria-disabled="true" title="Correo no publicado" className="inline-flex cursor-not-allowed items-center justify-center gap-1.5 rounded-lg bg-surface px-3 py-2.5 text-center text-xs font-semibold text-white opacity-50 shadow-sm">
              <Mail size={14} /><span>Escribir correo</span>
            </button>
          )}

          {member.whatsapp ? (
            <a href={`https://wa.me/${member.whatsapp}?text=${encodeURIComponent(`Hola ${member.name}, te contacto desde el portal Tiradores.`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition-colors shadow-sm text-center">
              <MessageSquare size={14} /><span>WhatsApp</span>
            </a>
          ) : (
            <button type="button" disabled aria-disabled="true" title="Número no publicado" className="inline-flex cursor-not-allowed items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2.5 text-center text-xs font-semibold text-white opacity-50 shadow-sm">
              <MessageSquare size={14} /><span>WhatsApp</span>
            </button>
          )}
        </div>
      </div>

      {/* Enlaces Internos a Scrum y Organigrama */}
      <div className="bg-stone-100/80 px-7 py-3 border-t border-stone-200 flex items-center justify-between text-xs font-mono">
        <Link
          to={`/scrum#${member.scrumAnchor}`}
          className="text-foreground-muted hover:text-primary transition-colors flex items-center gap-1 font-semibold"
        >
          <span>Ver en Scrum</span>
          <ArrowRight size={12} />
        </Link>
        <span className="text-stone-300">|</span>
        <Link
          to={`/organigrama#${member.organigramaAnchor}`}
          className="text-foreground-muted hover:text-primary transition-colors flex items-center gap-1 font-semibold"
        >
          <span>Ver en Organigrama</span>
          <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
