import React, { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import KpiCard from '../components/KpiCard';
import { ContentPage, ContentSection, InfoPanel } from '../components/ContentBlocks';
import VideoEmbed from '../components/VideoEmbed';
import { inventoryAreas, inventoryData, inventoryStates, inventoryTypes, INVENTORY_LABEL } from '../data/inventarioData';

const CHART_COLORS = ['#C1522A', '#1F1E1D', '#B6F23A', '#3B6BFF', '#00A6A6', '#E8A72D', '#7C6BFF', '#FF3DCB'];
const concepts = [
  ['Conexión a datos', 'Vincula archivos o fuentes de datos para iniciar el análisis.'], ['Dimensiones y medidas', 'Las dimensiones describen categorías; las medidas contienen valores cuantificables.'], ['Hojas', 'Espacios individuales para construir una visualización.'], ['Dashboards', 'Combinan hojas y controles en una vista interactiva.'], ['Filtros', 'Permiten explorar subconjuntos con criterios claros.'], ['Campos calculados', 'Derivan métricas a partir de expresiones.'], ['Historias (stories)', 'Organizan vistas en una secuencia narrativa.'],
];

type ChartDatum = { name: string; value: number };
type Asset = (typeof inventoryData)[number];

function summarize(rows: Asset[], key: keyof Asset): ChartDatum[] {
  const counts = rows.reduce<Record<string, number>>((result, row) => {
    const name = String(row[key]);
    result[name] = (result[name] || 0) + 1;
    return result;
  }, {});
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

function PreviewChart({ title, data, pie = false }: { title: string; data: ChartDatum[]; pie?: boolean }) {
  return <InfoPanel title={title}><div className="h-64">{data.length ? <ResponsiveContainer width="100%" height="100%">{pie ? <PieChart><Pie data={data} dataKey="value" nameKey="name" outerRadius={78} label>{data.map((item, index) => <Cell key={item.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />)}</Pie><Tooltip /></PieChart> : <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 35 }}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" angle={-25} textAnchor="end" tick={{ fontSize: 10 }} /><YAxis allowDecimals={false} tick={{ fontSize: 10 }} /><Tooltip /><Bar dataKey="value" fill="#C1522A" radius={[5, 5, 0, 0]} /></BarChart>}</ResponsiveContainer> : <div className="flex h-full items-center justify-center text-sm text-foreground-muted">No hay activos con estos filtros.</div>}</div></InfoPanel>;
}

export default function Tableau() {
  const [typeFilter, setTypeFilter] = useState('Todos');
  const [stateFilter, setStateFilter] = useState('Todos');
  const [areaFilter, setAreaFilter] = useState('Todas');
  const filteredAssets = useMemo(() => inventoryData.filter((asset) =>
    (typeFilter === 'Todos' || asset.tipo === typeFilter)
    && (stateFilter === 'Todos' || asset.estado === stateFilter)
    && (areaFilter === 'Todas' || asset.area === areaFilter)), [typeFilter, stateFilter, areaFilter]);
  const criticalCount = filteredAssets.filter((asset) => ['Crítica', 'Alta'].includes(asset.criticidad)).length;
  const byState = summarize(filteredAssets, 'estado');
  const byType = summarize(filteredAssets, 'tipo');
  const byCriticality = summarize(filteredAssets, 'criticidad');
  const byYear = summarize(filteredAssets, 'anio').sort((a, b) => Number(a.name) - Number(b.name));
  const hasFilters = typeFilter !== 'Todos' || stateFilter !== 'Todos' || areaFilter !== 'Todas';

  return <ContentPage title="Datos y Tableau · Visualización de Indicadores" subtitle="De los registros operativos a indicadores que ayudan a decidir." category="Procesos y datos · analítica">
    <ContentSection title="¿Qué es Tableau?" eyebrow="Plataforma de análisis visual">
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]"><InfoPanel><p className="leading-relaxed">Tableau convierte datos en visualizaciones y dashboards interactivos. El equipo puede usarlo para explorar tendencias de activos, incidentes y costos; las conclusiones dependen de la calidad y actualización de los datos de origen.</p><a className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline" href="https://www.tableau.com/es-es/learn" target="_blank" rel="noreferrer">Formación oficial de Tableau <ArrowUpRight size={15} /></a></InfoPanel><InfoPanel title="Productos"><ul className="space-y-2 text-sm"><li><b>Desktop</b> · creación de análisis.</li><li><b>Public</b> · publicación gratuita de visualizaciones públicas.</li><li><b>Cloud / Server</b> · publicación y colaboración organizacional.</li><li><b>Prep</b> · preparación y combinación de datos.</li></ul></InfoPanel></div>
    </ContentSection>
    <ContentSection title="Aplicaciones en Hardware e Infraestructura" eyebrow="Casos de uso">
      <div className="grid gap-4 md:grid-cols-2"><InfoPanel title="¿Para qué lo usamos?"><ul className="space-y-2 text-sm text-foreground-muted">{['Visualizar el inventario y el estado de los activos.', 'Seguir disponibilidad, MTTR e incidentes de infraestructura.', 'Revisar ejecución presupuestaria y necesidades de renovación.'].map((item) => <li key={item}>• {item}</li>)}</ul></InfoPanel><InfoPanel title="Buenas prácticas"><ul className="space-y-2 text-sm text-foreground-muted">{['Elegir el gráfico según la pregunta que se quiere responder.', 'Limitar colores y mantener una jerarquía visual consistente.', 'Mostrar los KPI principales arriba y filtros con nombres claros.', 'Documentar fecha, fuente y definiciones de cada indicador.'].map((item) => <li key={item}>• {item}</li>)}</ul></InfoPanel></div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{concepts.map(([title, text]) => <InfoPanel key={title} title={title}><p className="text-sm leading-relaxed">{text}</p></InfoPanel>)}</div>
      <div className="grid gap-5 md:grid-cols-2"><InfoPanel title="Ventajas"><p className="text-sm leading-relaxed">Interactividad, rapidez de exploración y variedad de fuentes de datos.</p></InfoPanel><InfoPanel title="Aspectos a considerar"><p className="text-sm leading-relaxed">Costo de licencias según el producto, curva de aprendizaje y dependencia de datos confiables.</p></InfoPanel></div>
    </ContentSection>
    <ContentSection title="Dashboard de activos" eyebrow="Tableau · gestión de hardware">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><KpiCard value={filteredAssets.length} label="Activos registrados" subtext={INVENTORY_LABEL} /><KpiCard value={filteredAssets.filter((asset) => asset.estado === 'Activo').length} label="En estado activo" accent="emerald" /><KpiCard value={criticalCount} label="Criticidad alta o crítica" accent="amber" /><KpiCard value={filteredAssets.filter((asset) => asset.estado === 'Obsoleto').length} label="Marcados obsoletos" accent="rose" /></div>
      <InfoPanel title="Filtros del dashboard">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="text-sm font-semibold">Tipo de activo<select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="mt-2 block w-full rounded-lg border-2 border-stone-300 bg-white px-3 py-2.5 text-sm"><option>Todos</option>{inventoryTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
          <label className="text-sm font-semibold">Estado<select value={stateFilter} onChange={(event) => setStateFilter(event.target.value)} className="mt-2 block w-full rounded-lg border-2 border-stone-300 bg-white px-3 py-2.5 text-sm"><option>Todos</option>{inventoryStates.map((state) => <option key={state}>{state}</option>)}</select></label>
          <label className="text-sm font-semibold">Área<select value={areaFilter} onChange={(event) => setAreaFilter(event.target.value)} className="mt-2 block w-full rounded-lg border-2 border-stone-300 bg-white px-3 py-2.5 text-sm"><option value="Todas">Todas</option>{inventoryAreas.map((area) => <option key={area}>{area}</option>)}</select></label>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p aria-live="polite" className="text-xs text-foreground-muted">Mostrando {filteredAssets.length} de {inventoryData.length} activos registrados.</p><button type="button" onClick={() => { setTypeFilter('Todos'); setStateFilter('Todos'); setAreaFilter('Todas'); }} disabled={!hasFilters} className="inline-flex items-center gap-2 rounded-lg border-2 border-surface px-3 py-2 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-40"><RotateCcw size={14} /> Limpiar filtros</button></div>
      </InfoPanel>
      <div className="grid gap-4 md:grid-cols-2"><PreviewChart title="Activos por estado" data={byState} pie /><PreviewChart title="Activos por tipo" data={byType} /><PreviewChart title="Activos por criticidad" data={byCriticality} pie /><PreviewChart title="Registros por año de adquisición" data={byYear} /></div>
      <div className="flex flex-wrap gap-3"><a className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline" href="https://help.tableau.com/current/pro/desktop/es-es/dashboards_create.htm" target="_blank" rel="noreferrer">Guía oficial: crear dashboards <ArrowUpRight size={15} /></a><a className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline" href="/inventarios">Ver página de inventario <ArrowUpRight size={15} /></a></div>
    </ContentSection>
    <ContentSection title="Video de apoyo" eyebrow="Recurso formativo">
      <p className="text-sm text-foreground-muted">Tutorial en español sobre Tableau Public, conexión a datos y creación de un primer dashboard.</p>
      <VideoEmbed title="Aprende Tableau desde cero: tutorial para principiantes" channel="Mundo Tableau" url="https://www.youtube.com/watch?v=v3vQPmz3olo" />
    </ContentSection>
  </ContentPage>;
}
