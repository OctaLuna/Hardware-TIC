import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ContentPage, ContentSection, InfoPanel } from '../components/ContentBlocks';
import { recommendations } from '../data/recommendations';

export default function Recomendaciones() {
  return <ContentPage title="Recomendaciones" subtitle="Acciones priorizadas para fortalecer la infraestructura y mantener vigentes los entregables." category="Gestión y cierre · próximos pasos">
    <ContentSection title="Acciones recomendadas" eyebrow="Prioridad y responsable">
      <InfoPanel tone="orange"><p className="text-sm leading-relaxed">Estas acciones se desprenden del trabajo del equipo Tiradores y deben revisarse según cambien los activos, servicios, cotizaciones y necesidades de operación.</p></InfoPanel>
      <div className="overflow-x-auto rounded-2xl border-2 border-surface bg-white shadow-hard">
        <table className="w-full min-w-[760px] text-left text-sm">
          <caption className="sr-only">Recomendaciones priorizadas y personas responsables</caption>
          <thead className="bg-surface text-white"><tr>{['Prioridad', 'Recomendación', 'Responsable'].map((head) => <th key={head} scope="col" className="px-4 py-3 font-mono text-xs uppercase">{head}</th>)}</tr></thead>
          <tbody>{recommendations.map(({ priority, text, owner }) => <tr key={text} className="border-t border-stone-200 odd:bg-white even:bg-[#FAF5DC]/50">
            <td className="px-4 py-3"><span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${priority === 'Alta' ? 'bg-rose-100 text-rose-900' : 'bg-amber-100 text-amber-900'}`}>{priority}</span></td>
            <td className="px-4 py-3 leading-relaxed">{text}</td><td className="px-4 py-3">{owner}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </ContentSection>
    <ContentSection title="Relacionadas" eyebrow="Consultar el contexto">
      <div className="flex flex-wrap gap-3">
        <Link to="/conclusiones" className="inline-flex items-center gap-2 rounded-lg bg-surface px-4 py-3 text-sm font-bold text-white hover:bg-primary">Conclusiones <ArrowRight size={15} /></Link>
        <Link to="/contingencia" className="inline-flex items-center gap-2 rounded-lg bg-surface px-4 py-3 text-sm font-bold text-white hover:bg-primary">Plan de Contingencia <ArrowRight size={15} /></Link>
        <Link to="/presupuesto" className="inline-flex items-center gap-2 rounded-lg bg-surface px-4 py-3 text-sm font-bold text-white hover:bg-primary">Presupuesto <ArrowRight size={15} /></Link>
      </div>
    </ContentSection>
  </ContentPage>;
}
