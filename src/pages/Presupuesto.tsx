import React from 'react';
import { Download } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DataTable from '../components/DataTable';
import KpiCard from '../components/KpiCard';
import { ContentPage, ContentSection, InfoPanel, formatBs } from '../components/ContentBlocks';
import { budgetItems, budgetScenarios, budgetTotals } from '../data/presupuestoData';
import { downloadBudgetWorkbook } from '../lib/xlsx';

const rows = budgetItems.map((item) => ({ ...item, subtotal: item.unitario == null ? null : item.cantidad * item.unitario }));
const columns = [
  { key: 'concepto', header: 'Concepto', sortable: true }, { key: 'tipo', header: 'Tipo', sortable: true },
  { key: 'cantidad', header: 'Cantidad', sortable: true }, { key: 'unitario', header: 'Costo unitario (Bs.)', sortable: true, align: 'right' as const, render: (row: any) => row.unitario == null ? 'Por definir' : formatBs(row.unitario), sortValue: (row: any) => row.unitario ?? -1 },
  { key: 'frecuencia', header: 'Frecuencia', sortable: true }, { key: 'subtotal', header: 'Subtotal (Bs.)', sortable: true, align: 'right' as const, render: (row: any) => row.subtotal == null ? 'Por definir' : formatBs(row.subtotal), sortValue: (row: any) => row.subtotal ?? -1 },
  { key: 'fuente', header: 'Fuente / estado' },
];

export default function Presupuesto() {
  const capexOpex = [{ name: 'CAPEX', value: budgetTotals.capex }, { name: 'OPEX anual', value: budgetTotals.opexAnnual }];
  const areaCosts = [
    { name: 'Infraestructura', value: 170000 + 25500 + 18000 },
    { name: 'Soporte y puestos', value: 42500 },
    { name: 'Calidad e IoT', value: 14000 },
    { name: 'Servicios compartidos', value: budgetTotals.firstYearOpex + 2999 },
  ];
  return <ContentPage title="Presupuesto del Área de Hardware" subtitle="Escenarios OPEX/CAPEX y referencias para planificar las adquisiciones." category="Procesos y datos · finanzas">
    <div className="print-hidden flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-300 bg-white p-4">
      <p className="text-sm text-foreground-muted">Descarga las partidas, los supuestos y los escenarios calculados.</p>
      <button type="button" onClick={() => downloadBudgetWorkbook(budgetItems, budgetScenarios, budgetTotals)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-primary-hover"><Download size={16} /> Descargar libro XLSX</button>
    </div>
    <InfoPanel tone="dark"><p className="font-mono text-xs uppercase tracking-widest text-primary">Responsable</p><p className="mt-2 text-xl font-display font-bold uppercase">Dirección de Tecnología y Presupuesto · Leandro Colque</p><p className="mt-3 text-sm text-stone-300">CAPEX agrupa inversiones iniciales en activos; OPEX reúne costos recurrentes de operación. Separarlos permite entender el desembolso inicial y el costo anual de continuidad.</p></InfoPanel>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><KpiCard value={formatBs(budgetTotals.monthlyOpex)} label="OPEX mensual calculado" subtext="Incluye estimaciones marcadas en la tabla" /><KpiCard value={formatBs(budgetTotals.capex)} label="CAPEX de partidas conocidas" accent="dark" /><KpiCard value={formatBs(budgetTotals.opexAnnual)} label="OPEX anual calculado" accent="amber" /><KpiCard value={formatBs(budgetTotals.firstYear)} label="Primer año estimado" accent="emerald" subtext="CAPEX conocido + OPEX anual" /></div>
    <ContentSection title="Partidas presupuestarias" eyebrow="Valores editables · bolivianos">
      <InfoPanel tone="orange"><p className="text-sm leading-relaxed">Los importes del plan son referencias presupuestarias. Las partidas que requieren cotizacion deben confirmarse con los proveedores. El inhibidor de senales requiere validacion legal y cotizacion antes de considerar una compra.</p></InfoPanel>
      <DataTable data={rows} columns={columns} searchPlaceholder="Buscar concepto, fuente o tipo…" exportFilename="presupuesto-hardware-referencial" searchKeys={['concepto', 'tipo', 'frecuencia', 'fuente']} filters={[{ key: 'tipo', label: 'Tipo', options: ['CAPEX', 'OPEX'], getValue: (row: any) => row.tipo }]} />
      <p className="text-xs text-foreground-muted">Precios referenciales en bolivianos (Bs.), sujetos a cambio y a cotización formal. Los totales calculados excluyen partidas sin importe.</p>
    </ContentSection>
    <ContentSection title="Comparativa de conectividad" eyebrow="Escenarios de continuidad">
      <div className="grid gap-4 md:grid-cols-2">{budgetScenarios.map((scenario) => <InfoPanel key={scenario.name}><p className="font-mono text-xs uppercase tracking-widest text-primary">{scenario.name}</p><p className="mt-3 font-display text-3xl font-bold">{formatBs(scenario.monthly)} <span className="text-base font-medium">/ mes</span></p><p className="mt-2 text-sm">Primer año: <b>{formatBs(scenario.firstYear)}</b></p><p className="mt-2 text-xs text-foreground-muted">{scenario.note}</p></InfoPanel>)}</div>
      <InfoPanel><p className="text-sm">Diferencia del escenario con respaldo: <b className="text-primary">+{formatBs(budgetScenarios[1].monthly - budgetScenarios[0].monthly)} al mes</b> y <b className="text-primary">+{formatBs(budgetScenarios[1].firstYear - budgetScenarios[0].firstYear)}</b> el primer año.</p></InfoPanel>
      <InfoPanel><p className="text-sm leading-relaxed"><b>Argumento de continuidad:</b> el segundo enlace aumenta el gasto recurrente, pero puede mantener conectividad ante la caída del proveedor principal. La decisión requiere validar cobertura, condiciones comerciales, equipos y pruebas de conmutación.</p></InfoPanel>
      <div className="grid gap-4 lg:grid-cols-2"><InfoPanel title="Distribución CAPEX / OPEX"><div className="h-72"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={capexOpex} dataKey="value" nameKey="name" outerRadius={90} label>{capexOpex.map((row, index) => <Cell key={row.name} fill={index ? '#1F1E1D' : '#C1522A'} />)}</Pie><Tooltip formatter={(value: any) => formatBs(Number(value))} /></PieChart></ResponsiveContainer></div></InfoPanel><InfoPanel title="Costo por área · estimación académica"><div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={areaCosts} margin={{ top: 8, right: 8, left: 10, bottom: 30 }}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" angle={-20} textAnchor="end" tick={{ fontSize: 10 }} /><YAxis tickFormatter={(value) => `${Math.round(value / 1000)}k`} tick={{ fontSize: 10 }} /><Tooltip formatter={(value: any) => formatBs(Number(value))} /><Bar dataKey="value" fill="#C1522A" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div></InfoPanel></div>
    </ContentSection>
    <ContentSection title="Criterios de compra y riesgos" eyebrow="Gobernanza del gasto">
      <div className="grid gap-4 md:grid-cols-2"><InfoPanel title="Criterios de priorización"><ul className="space-y-2 text-sm">{['Criticidad para servicios clínicos y de negocio.', 'Riesgo de falla y disponibilidad de repuestos.', 'Vida útil, condición y costo total del ciclo de vida.', 'Normativa técnica y de salud aplicable.', 'Impacto de la compra en continuidad y seguridad.'].map((item) => <li key={item}>• {item}</li>)}</ul></InfoPanel><InfoPanel title="Riesgos presupuestarios"><ul className="space-y-2 text-sm">{['Variación del tipo de cambio y costos de importación.', 'Precios sujetos a cambio y diferencias entre cotización y factura.', 'Contratos con permanencia mínima o renovación automática.', 'Licencias cuyo alcance depende de edición, sensores o número de usuarios.'].map((item) => <li key={item}>• {item}</li>)}</ul></InfoPanel></div>
    </ContentSection>
  </ContentPage>;
}
