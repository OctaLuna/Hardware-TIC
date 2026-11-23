import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Target } from 'lucide-react';
import { ContentPage, ContentSection, InfoPanel } from '../components/ContentBlocks';
import KpiCard from '../components/KpiCard';
import StatusBadge from '../components/StatusBadge';

const goals = [
  ['Disponibilidad de servicios críticos', 'Gestión de Infraestructura Global', '≥ 99,9%', 'Medición mensual en PRTG', 'Einar Guillén'],
  ['Tiempo medio de recuperación (MTTR)', 'Gestión de Infraestructura Global', '< 2 horas', 'Promedio entre detección y recuperación', 'Einar Guillén'],
  ['Primera respuesta a soporte', 'Operaciones de Soporte y Entorno de Trabajo', '< 30 minutos', 'Tiempo de primera respuesta por ticket', 'Leonardo Ibarra'],
  ['Incidentes críticos', 'Aseguramiento de Calidad y Recursos', '0 por trimestre', 'Incidentes críticos registrados', 'Huascar Duran'],
  ['Inventario actualizado', 'Gestión de Infraestructura Global', '100%', 'Activos con custodio, ubicación y estado', 'Einar Guillén'],
  ['Equipamiento certificado', 'Aseguramiento de Calidad y Recursos', '100% aplicable', 'Evidencia según normativa pertinente', 'Huascar Duran'],
];
const assignments = [
  ['Octavio Luna', 'Scrum Master', 'Liderazgo del área', 'Cumplimiento de sprints y bloqueos', 'Seguimiento de objetivos y reporte ejecutivo'],
  ['Leandro Colque', 'Product Owner', 'Tecnología y presupuesto', 'Ejecución presupuestaria', 'Backlog priorizado y plan de compras'],
  ['Einar Guillén', 'Developer', 'Infraestructura global', 'Disponibilidad, MTTR e inventario', 'Inventario y plan de mantenimiento'],
  ['Huascar Duran', 'Developer', 'Calidad y recursos', 'Incidentes y certificaciones', 'Matriz de cumplimiento y revisión de riesgos'],
  ['Leonardo Ibarra', 'Developer', 'Soporte y entorno', 'Primera respuesta de soporte', 'Registro de solicitudes y capacitación'],
];
const activities = [
  ['Formar Teams', ''], ['Designar Líder', '/organigrama'], ['Capacidad de diseño web', '/'], ['Crear página principal Área Trabajo', '/'],
  ['Gestión de Tecnologías', '/gestion-tecnologia'], ['Ciencia, Tecnología e Innovación', '/ciencia-tecnologia-innovacion'], ['Misión y Visión', '/mision-vision'], ['Organización', '/organigrama'], ['Descripción de Posiciones', '/posiciones'], ['MBTI', '/mbti'], ['SCRUM', '/scrum'], ['Goals, Objetivos y asignación de personal', '/objetivos'], ['Inventarios', '/inventarios'], ['IDEF0', '/idef0'], ['BPMN', '/bpmn'], ['Datos Tableau', '/tableau'], ['Patrones Weka', '/weka'], ['Monitoreo', '/monitoreo'], ['Presupuesto', '/presupuesto'], ['Soporte externo', '/servicios-externos'], ['Plan de Contingencia', '/contingencia'], ['Conclusiones y Recomendaciones', '/conclusiones'], ['Contactos', '/contacto'],
];
const visionCards = [
  ['Infraestructura de alta disponibilidad', 'Arquitectura resiliente para sostener los sistemas clínicos críticos.'],
  ['Estructura de equipo clara', 'Roles y responsabilidades trazables, alineados con Scrum.'],
  ['Cumplimiento y calidad', 'Hardware y prácticas alineados con requisitos de salud y seguridad.'],
  ['Documentación y mejora continua', 'Procesos, indicadores y aprendizajes accesibles para el equipo.'],
];

export default function Objetivos() {
  return <ContentPage title="Goals, Objetivos y Asignación de Personal" subtitle="Metas medibles, responsables y avance del trabajo del equipo." category="Equipo · planificación">
    <ContentSection title="Objetivo general" eyebrow="Propósito del área">
      <InfoPanel tone="dark"><p className="text-base leading-relaxed md:text-lg">Optimizar la infraestructura de hardware para garantizar la sostenibilidad y eficiencia de la infraestructura de hardware a través de la implementación de tecnologías de punta y la gestión integral del ciclo de vida de los equipos, para su implementación en las áreas de Ciencia de Datos e Inteligencia Artificial de la empresa.</p></InfoPanel>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{visionCards.map(([title, text]) => <InfoPanel key={title} title={title}><p className="text-sm leading-relaxed">{text}</p></InfoPanel>)}</div>
    </ContentSection>
    <ContentSection title="Objetivos específicos SMART" eyebrow="Horizonte propuesto: 12 meses desde la aprobación">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{goals.map(([metric, area, target, method, owner]) => <InfoPanel key={metric}><div className="mb-3 flex items-start justify-between"><Target className="text-primary" size={20} /><span className="rounded-full bg-orange-100 px-2 py-1 font-mono text-[10px] font-bold uppercase text-orange-900">12 meses</span></div><h3 className="font-display text-lg font-bold uppercase">{metric}</h3><p className="mt-2 text-sm text-foreground-muted">Área: {area}</p><p className="mt-3 text-2xl font-display font-bold text-primary">{target}</p><p className="mt-2 text-xs text-foreground-muted">Medición: {method}</p><p className="mt-2 font-mono text-[10px] uppercase text-foreground-muted">Responsable: {owner}</p></InfoPanel>)}</div>
    </ContentSection>
    <ContentSection title="Asignación de personal" eyebrow="Responsables y entregables">
      <div className="overflow-x-auto rounded-2xl border-2 border-surface bg-white shadow-hard"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-surface text-white"><tr>{['Integrante', 'Rol Scrum', 'Área', 'Objetivo asignado', 'Entregables', 'Estado'].map((heading) => <th key={heading} className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide">{heading}</th>)}</tr></thead><tbody>{assignments.map((row) => <tr key={row[0]} className="border-t border-stone-200 odd:bg-white even:bg-[#FAF5DC]/50">{row.map((cell) => <td key={cell} className="px-4 py-3 align-top">{cell}</td>)}<td className="px-4 py-3"><StatusBadge label="TERMINADO" /></td></tr>)}</tbody></table></div>
    </ContentSection>
    <ContentSection title="Tablero de avance del proyecto" eyebrow="Actividades completadas">
      <InfoPanel tone="dark"><div className="mb-3 flex flex-wrap items-end justify-between gap-3"><div><p className="font-mono text-xs uppercase tracking-widest text-stone-400">Avance total</p><p className="mt-1 font-display text-4xl font-bold text-primary">23/23 <span className="text-2xl">· 100%</span></p></div><CheckCircle2 className="text-emerald-400" size={30} /></div><div className="h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full w-full rounded-full bg-emerald-500" /></div></InfoPanel>
      <KpiCard value="23/23" label="Actividades terminadas" subtext="Estado general del proyecto" accent="emerald" className="max-w-sm" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{activities.map(([label, path], index) => <div key={label} className="flex min-h-14 items-center gap-3 rounded-xl border border-stone-300 bg-white px-4 py-3"><span className="font-mono text-xs text-stone-400">{String(index + 1).padStart(2, '0')}</span>{path ? <Link to={path} className="flex-1 text-sm font-medium hover:text-primary">{label}<ArrowRight className="ml-1 inline" size={13} /></Link> : <span className="flex-1 text-sm font-medium">{label}</span>}<StatusBadge label="TERMINADO" /></div>)}</div>
    </ContentSection>
  </ContentPage>;
}
