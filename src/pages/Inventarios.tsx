import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DataTable from '../components/DataTable';
import KpiCard from '../components/KpiCard';
import StatusBadge from '../components/StatusBadge';
import { ContentPage, ContentSection, InfoPanel } from '../components/ContentBlocks';
import { countBy, inventoryAreas, inventoryData, inventoryStates, inventorySummary, inventoryTypes, INVENTORY_LABEL } from '../data/inventarioData';

const ORANGE = '#C1522A';
const PALETTE = ['#C1522A', '#1F1E1D', '#B6F23A', '#3B6BFF', '#00A6A6', '#E8A72D', '#7C6BFF', '#FF3DCB'];
const stateVariant = (state: string) => state === 'Activo' ? 'success' : state === 'En mantenimiento' ? 'warning' : 'danger';
const columns = [
  { key: 'id', header: 'ID', sortable: true }, { key: 'tipo', header: 'Tipo de activo', sortable: true },
  { key: 'descripcion', header: 'Descripción', sortable: true }, { key: 'criticidad', header: 'Criticidad', sortable: true },
  { key: 'anio', header: 'Año', sortable: true }, { key: 'area', header: 'Área responsable', sortable: true },
  { key: 'estado', header: 'Estado', sortable: true, render: (row: any) => <StatusBadge label={row.estado} variant={stateVariant(row.estado) as any} /> },
  { key: 'ubicacion', header: 'Ubicación', sortable: true },
];

export default function Inventarios() {
  const byType = Object.entries(countBy('tipo')).map(([name, value]) => ({ name, value }));
  const byState = Object.entries(countBy('estado')).map(([name, value]) => ({ name, value }));
  const byArea = Object.entries(countBy('area')).map(([name, value]) => ({ name: name.replace('Gestión de ', '').replace('Operaciones de ', ''), value }));
  return <ContentPage title="Inventario de Activos de Hardware" subtitle="Una vista trazable del ciclo de vida, el estado y la criticidad del equipamiento." category="Procesos y datos · activos">
    <InfoPanel tone="orange"><p className="font-mono text-xs font-bold uppercase tracking-wider">{INVENTORY_LABEL}</p><p className="mt-2 text-sm leading-relaxed">El inventario registra propiedad, ubicación, estado, criticidad y antigüedad de cada activo. Es la base para planificar mantenimiento, presupuesto, renovación y controles de seguridad. Sus datos pueden alimentar el monitoreo con PRTG y el análisis exploratorio con Weka.</p></InfoPanel>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <KpiCard value={inventorySummary.total} label="Total de activos" subtext="Registros del inventario" />
      <KpiCard value={inventorySummary.active} label="Activos" accent="emerald" />
      <KpiCard value={inventorySummary.obsolete} label="Obsoletos" accent="rose" />
      <KpiCard value={inventorySummary.maintenance} label="En mantenimiento" accent="amber" />
      <KpiCard value={inventorySummary.highCriticality} label="Criticidad alta" subtext="Crítica + alta" accent="dark" />
    </div>
    <ContentSection title="Registro de activos" eyebrow="Búsqueda · filtros · exportación CSV">
      <DataTable data={inventoryData} columns={columns} searchPlaceholder="Buscar ID, activo, área o ubicación…" searchKeys={['id', 'tipo', 'descripcion', 'area', 'ubicacion']} exportFilename="inventario-activos" rowKey={(row: any) => row.id} filters={[
        { key: 'tipo', label: 'Tipo', options: inventoryTypes, getValue: (row: any) => row.tipo },
        { key: 'estado', label: 'Estado', options: inventoryStates, getValue: (row: any) => row.estado },
        { key: 'area', label: 'Área', options: inventoryAreas, getValue: (row: any) => row.area },
      ]} />
    </ContentSection>
    <ContentSection title="Distribución de activos" eyebrow="Resumen del inventario">
      <div className="grid gap-5 lg:grid-cols-3">
        <InfoPanel title="Activos por tipo"><div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={byType} margin={{ top: 8, right: 8, left: -20, bottom: 50 }}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" angle={-35} textAnchor="end" interval={0} tick={{ fontSize: 10 }} /><YAxis allowDecimals={false} tick={{ fontSize: 11 }} /><Tooltip /><Bar dataKey="value" fill={ORANGE} radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div></InfoPanel>
        <InfoPanel title="Activos por estado"><div className="h-72"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={byState} dataKey="value" nameKey="name" outerRadius={88} label>{byState.map((entry, index) => <Cell key={entry.name} fill={PALETTE[index]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div><div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">{byState.map((item, index) => <span key={item.name} className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full" style={{ background: PALETTE[index] }} />{item.name}: {item.value}</span>)}</div></InfoPanel>
        <InfoPanel title="Activos por área"><div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={byArea} layout="vertical" margin={{ top: 8, right: 10, left: 5, bottom: 8 }}><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} /><YAxis type="category" dataKey="name" width={118} tick={{ fontSize: 9 }} /><Tooltip /><Bar dataKey="value" fill="#1F1E1D" radius={[0, 5, 5, 0]} /></BarChart></ResponsiveContainer></div></InfoPanel>
      </div>
    </ContentSection>
  </ContentPage>;
}
