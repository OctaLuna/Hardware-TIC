import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ShieldAlert } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { ContentPage, ContentSection, InfoPanel } from '../components/ContentBlocks';
import PrintToPdfButton from '../components/PrintToPdfButton';

const risks = [
  ['Caída del internet principal', 'Media', 'Alta', 'Alto'], ['Falla de servidor', 'Media', 'Crítica', 'Alto'], ['Corte de energía eléctrica', 'Media', 'Crítica', 'Alto'], ['Falla de equipo crítico', 'Media', 'Alta', 'Alto'], ['Ciberataque o malware', 'Media', 'Crítica', 'Alto'], ['Pérdida de datos', 'Baja', 'Crítica', 'Alto'], ['Incendio o inundación en sala de equipos', 'Baja', 'Crítica', 'Alto'], ['Falla del enlace satelital de respaldo', 'Baja', 'Media', 'Medio'],
];
const scenarios = [
  ['Caída de internet', 'Alerta de disponibilidad de PRTG y validación de conectividad', 'Conmutar al enlace Starlink; notificar estado y revisar servicios prioritarios', 'Gestión de Infraestructura Global', '30 min'],
  ['Corte eléctrico', 'Alerta de UPS/energía si existe sensor; aviso de usuarios', 'Confirmar autonomía UPS, activar generador si está disponible y priorizar apagado seguro', 'Operaciones de Soporte', '15 min'],
  ['Falla de servidor', 'Alerta de PRTG por host, servicio o almacenamiento', 'Aislar el componente afectado y restaurar servicio desde equipo o respaldo disponible', 'Gestión de Infraestructura Global', '2 h'],
  ['Ciberataque', 'Alertas de endpoint/seguridad y actividad anómala', 'Aislar equipos comprometidos, preservar evidencia y activar protocolo de seguridad', 'Líder y Calidad', '1 h'],
];
const phases = ['Detección', 'Evaluación de impacto', 'Activación del plan', 'Recuperación priorizada', 'Verificación de servicio', 'Cierre y documentación'];
const levelClass: Record<string, string> = { Alto: 'bg-rose-100 text-rose-900 border-rose-500', Medio: 'bg-amber-100 text-amber-900 border-amber-500', Bajo: 'bg-emerald-100 text-emerald-900 border-emerald-500' };

export default function Contingencia() {
  return <ContentPage className="printable-page" title="Plan de Contingencia y Continuidad Operativa" subtitle="Roles, respuestas y recuperación para proteger los servicios prioritarios." category="Gestión y cierre · continuidad">
    <PrintToPdfButton title="el plan de contingencia" />
    <ContentSection title="Conceptos para la continuidad" eyebrow="Lenguaje común">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{[['Plan de contingencia', 'Acciones previstas para responder a una interrupción y reducir su impacto.'], ['BCP', 'Business Continuity Plan: mantener o restablecer procesos esenciales.'], ['DRP', 'Disaster Recovery Plan: recuperar sistemas, infraestructura y datos tras un desastre.'], ['RTO', 'Tiempo objetivo propuesto para recuperar un servicio.'], ['RPO', 'Punto objetivo de recuperación: antigüedad máxima de datos que se aceptaría perder.'], ['Regla 3-2-1', 'Conservar tres copias de datos, en dos medios, con una copia fuera del sitio principal.']].map(([title, text]) => <InfoPanel key={title} title={title}><p className="text-sm leading-relaxed">{text}</p></InfoPanel>)}</div>
      <InfoPanel tone="orange"><p className="flex items-start gap-2 text-sm"><ShieldAlert className="mt-0.5 shrink-0 text-primary" size={18} />Los RTO/RPO de este documento son valores propuestos para el ejercicio. El equipo debe ajustarlos tras un análisis de impacto y validarlos con los responsables de cada servicio.</p></InfoPanel>
    </ContentSection>
    <ContentSection title="Matriz de riesgos" eyebrow="Evaluación inicial cualitativa">
      <div className="overflow-x-auto rounded-2xl border-2 border-surface bg-white shadow-hard"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-surface text-white"><tr>{['Riesgo', 'Probabilidad', 'Impacto', 'Nivel propuesto'].map((head) => <th key={head} className="px-4 py-3 font-mono text-xs uppercase">{head}</th>)}</tr></thead><tbody>{risks.map(([risk, probability, impact, level]) => <tr key={risk} className="border-t border-stone-200"><td className="px-4 py-3">{risk}</td><td className="px-4 py-3">{probability}</td><td className="px-4 py-3">{impact}</td><td className="px-4 py-3"><span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase ${levelClass[level]}`}>{level}</span></td></tr>)}</tbody></table></div>
    </ContentSection>
    <ContentSection title="Escenarios de respuesta" eyebrow="Detección y acción inmediata">
      <div className="overflow-x-auto rounded-2xl border-2 border-surface bg-white shadow-hard"><table className="w-full min-w-[1100px] text-left text-sm"><thead className="bg-surface text-white"><tr>{['Escenario', 'Cómo se detecta', 'Respuesta inmediata', 'Responsable', 'RTO propuesto'].map((head) => <th key={head} className="px-4 py-3 font-mono text-[10px] uppercase">{head}</th>)}</tr></thead><tbody>{scenarios.map((row) => <tr key={row[0]} className="border-t border-stone-200 odd:bg-white even:bg-[#FAF5DC]/50">{row.map((cell) => <td key={cell} className="px-4 py-3 align-top">{cell}</td>)}</tr>)}</tbody></table></div>
    </ContentSection>
    <ContentSection title="Roles durante una emergencia" eyebrow="Coordinación y comunicación">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{[['Octavio Luna', 'Coordina respuesta y comunicación con dirección.'], ['Leandro Colque', 'Evalúa y autoriza compras de emergencia.'], ['Einar Guillén', 'Gestiona logística, diagnóstico y reposición.'], ['Huascar Duran', 'Valida recuperación, cumplimiento y lecciones aprendidas.'], ['Leonardo Ibarra', 'Informa a usuarios y gestiona accesos y soporte.']].map(([name, responsibility]) => <InfoPanel key={name}><h3 className="font-display text-lg font-bold uppercase">{name}</h3><p className="mt-2 text-sm leading-relaxed">{responsibility}</p></InfoPanel>)}</div>
      <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-surface bg-white p-5 text-center shadow-hard"><span className="rounded-lg bg-surface px-4 py-2 text-sm font-bold text-white">Incidente detectado · PRTG / usuario</span><ArrowDown className="text-primary" /><span className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Líder de Hardware coordina evaluación</span><ArrowDown className="text-primary" /><div className="grid w-full gap-2 md:grid-cols-3"><span className="rounded-lg bg-[#FAF5DC] px-3 py-3 text-xs">Infraestructura: recuperación técnica</span><span className="rounded-lg bg-[#FAF5DC] px-3 py-3 text-xs">Calidad: verificación y registro</span><span className="rounded-lg bg-[#FAF5DC] px-3 py-3 text-xs">Soporte: usuarios y accesos</span></div><ArrowDown className="text-primary" /><span className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white">Servicio validado · cierre y documentación</span><Link to="/contacto" className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">Consultar contactos de emergencia <ArrowRight size={15} /></Link></div>
    </ContentSection>
    <ContentSection title="Procedimiento por fases" eyebrow="Respuesta de principio a fin">
      <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{phases.map((phase, index) => <li key={phase} className="flex gap-3 rounded-xl border border-stone-300 bg-white p-4"><span className="font-mono font-bold text-primary">0{index + 1}</span><span className="text-sm font-semibold">{phase}</span></li>)}</ol>
    </ContentSection>
    <ContentSection title="Pruebas, revisión y relaciones" eyebrow="Mantener el plan vigente">
      <div className="grid gap-4 md:grid-cols-2"><InfoPanel title="Calendario sugerido de simulacros"><ul className="space-y-2 text-sm"><li>• Trimestral: probar conmutación del enlace alternativo.</li><li>• Semestral: ejercicio de recuperación de archivos y servicios prioritarios.</li><li>• Anual: simulacro de indisponibilidad de sala o servidor crítico.</li><li>Registrar tiempos reales, hallazgos, responsables y acciones correctivas.</li></ul></InfoPanel><InfoPanel title="Mantenimiento del plan"><p className="text-sm leading-relaxed">Revisar al menos cada semestre y después de cambios importantes de infraestructura, proveedores, personal, normativa o incidentes. Actualizar contactos, dependencias, respaldos y RTO/RPO.</p></InfoPanel></div>
      <div className="flex flex-wrap gap-2">{[['Monitoreo PRTG', '/monitoreo'], ['Proveedores de respaldo', '/servicios-externos'], ['Proceso BPMN', '/bpmn'], ['Presupuesto', '/presupuesto']].map(([label, href]) => <Link key={href} to={href} className="rounded-full border border-surface bg-white px-4 py-2 text-xs font-bold uppercase hover:bg-primary hover:text-white">{label}</Link>)}</div>
    </ContentSection>
  </ContentPage>;
}
