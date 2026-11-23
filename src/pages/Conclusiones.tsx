import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import KpiCard from '../components/KpiCard';
import StatusBadge from '../components/StatusBadge';
import { ContentPage, ContentSection, InfoPanel } from '../components/ContentBlocks';

const conclusions = [
  'La estructura organizacional (organigrama, posiciones) alineada con Scrum permite asignar responsabilidades claras y trazables en el área de Hardware.',
  'El modelado de procesos con IDEF0 (contexto) y BPMN (flujo entre roles) hace visible cómo se atiende una solicitud de infraestructura y dónde hay dependencias.',
  'El monitoreo con PRTG permite pasar de una gestión reactiva a una proactiva, sosteniendo la meta de disponibilidad.',
  'Un enlace principal con respaldo satelital y un plan de contingencia reducen el riesgo de interrupciones de los sistemas críticos.',
  'El inventario y la minería de datos (Tableau y Weka) convierten los datos en decisiones sobre renovación, mantenimiento y presupuesto.',
  'Usar el MBTI ayudó a entender los estilos de trabajo y a repartir tareas según las fortalezas de cada integrante.',
];
const activityNames = ['Formar Teams', 'Designar Líder', 'Capacidad de diseño web', 'Crear página principal', 'Gestión de Tecnologías', 'Ciencia, Tecnología e Innovación', 'Misión y Visión', 'Organización', 'Descripción de Posiciones', 'MBTI', 'SCRUM', 'Goals y asignación', 'Inventarios', 'IDEF0', 'BPMN', 'Datos Tableau', 'Patrones Weka', 'Monitoreo', 'Presupuesto', 'Soporte externo', 'Plan de Contingencia', 'Conclusiones', 'Contactos'];

export default function Conclusiones() {
  return <ContentPage title="Conclusiones" subtitle="Síntesis de los entregables, aprendizajes y siguientes pasos para el área." category="Gestión y cierre · síntesis">
    <ContentSection title="Resumen del proyecto" eyebrow="Entregables completados">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><KpiCard value="23/23" label="Actividades" subtext="Completadas" accent="emerald" /><KpiCard value="8" label="Páginas nuevas" subtext="Con navegación agrupada" /><KpiCard value="5" label="Integrantes" subtext="Roles organizados con Scrum" /><KpiCard value="4" label="Áreas" subtext="Hardware e Infraestructura" /></div>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{activityNames.map((activity) => <div key={activity} className="flex items-center justify-between gap-2 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs"><span>{activity}</span><StatusBadge label="TERMINADO" /></div>)}</div>
      <div className="flex flex-wrap gap-2">{[['Posiciones', '/posiciones'], ['Objetivos', '/objetivos'], ['Inventario', '/inventarios'], ['Tableau', '/tableau'], ['Weka', '/weka'], ['Presupuesto', '/presupuesto'], ['Contingencia', '/contingencia'], ['Recomendaciones', '/recomendaciones']].map(([title, path]) => <Link key={path} to={path} className="inline-flex items-center gap-1 rounded-full bg-surface px-4 py-2 text-xs font-bold uppercase text-white hover:bg-primary">{title}<ArrowRight size={13} /></Link>)}</div>
    </ContentSection>
    <ContentSection title="Conclusiones" eyebrow="Resultados del trabajo">
      <ol className="space-y-3">{conclusions.map((text, index) => <li key={text} className="flex gap-4 rounded-xl border-2 border-surface bg-white p-4 shadow-hard"><span className="font-display text-2xl font-bold text-primary">0{index + 1}</span><p className="pt-1 text-sm leading-relaxed">{text}</p></li>)}</ol>
    </ContentSection>
    <ContentSection title="Lecciones aprendidas" eyebrow="Qué mantener y qué mejorar">
      <div className="grid gap-4 md:grid-cols-3"><InfoPanel title="Funcionó"><p className="text-sm leading-relaxed">La organización de responsabilidades, los artefactos visuales y la documentación compartida ayudaron a integrar el trabajo del equipo.</p></InfoPanel><InfoPanel title="Mejoraríamos"><p className="text-sm leading-relaxed">Planificar el contenido antes, elegir desde el inicio una plataforma con interactividad adecuada y centralizar la documentación operativa.</p></InfoPanel><InfoPanel title="Próximos pasos"><ul className="space-y-2 text-sm">{['Mantener actualizado el inventario y revisar peri?dicamente los activos.', 'Reevaluar los modelos de Weka cuando cambien los registros.', 'Actualizar los indicadores del dashboard de Tableau.', 'Revisar cotizaciones y licencias seg?n el presupuesto aprobado.', 'Mantener al d?a los contactos de emergencia y la identidad institucional.'].map((item) => <li key={item}>• {item}</li>)}</ul></InfoPanel></div>
    </ContentSection>
    <InfoPanel tone="dark"><p className="font-display text-2xl font-bold uppercase leading-snug md:text-3xl">Construimos una infraestructura confiable y sostenible para que la salud digital pueda avanzar con seguridad.</p><p className="mt-3 text-sm text-stone-300">Equipo de Hardware e Infraestructura · Tiradores · IATECH Co.</p><Link to="/contacto" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-xs font-bold uppercase text-white">Contactar al equipo <ArrowRight size={15} /></Link></InfoPanel>
  </ContentPage>;
}
