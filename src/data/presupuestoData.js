// Plan presupuestario de Tiradores Hardware; cada partida indica su fuente y estado de cotizacion.
export const budgetItems = [
  { concepto: 'Internet dedicado AXS Fibra Negocio 200 Mbps', tipo: 'OPEX', cantidad: 1, unitario: 1329, frecuencia: 'Mensual', fuente: 'Tarifario indicado por el equipo (agosto 2026); verificar vigencia' },
  { concepto: 'Instalación AXS', tipo: 'CAPEX', cantidad: 1, unitario: 199, frecuencia: 'Único', fuente: 'Tarifario indicado por el equipo; verificar vigencia' },
  { concepto: 'Starlink Residencial Lite de respaldo', tipo: 'OPEX', cantidad: 1, unitario: 400, frecuencia: 'Mensual', fuente: 'Referencia indicada por el equipo; confirmar con proveedor' },
  { concepto: 'Kit estándar Starlink', tipo: 'CAPEX', cantidad: 1, unitario: 2800, frecuencia: 'Único', fuente: 'Referencia indicada por el equipo; confirmar con proveedor' },
  { concepto: 'Servidor de virtualización', tipo: 'CAPEX', cantidad: 2, unitario: 85000, frecuencia: 'Único', fuente: 'Estimación académica pendiente de cotización' },
  { concepto: 'Switches y router administrables', tipo: 'CAPEX', cantidad: 3, unitario: 8500, frecuencia: 'Único', fuente: 'Estimación académica pendiente de cotización' },
  { concepto: 'UPS online para sala y puestos críticos', tipo: 'CAPEX', cantidad: 3, unitario: 6000, frecuencia: 'Único', fuente: 'Estimación académica pendiente de cotización' },
  { concepto: 'Estaciones de trabajo', tipo: 'CAPEX', cantidad: 5, unitario: 8500, frecuencia: 'Único', fuente: 'Estimación académica pendiente de cotización' },
  { concepto: 'Equipos médicos IoT', tipo: 'CAPEX', cantidad: 4, unitario: 3500, frecuencia: 'Único', fuente: 'Estimación académica pendiente de cotización' },
  { concepto: 'PRTG · monitoreo y sensores/licencia', tipo: 'OPEX', cantidad: 1, unitario: 500, frecuencia: 'Mensual estimado', fuente: 'Estimación académica; verificar edición gratuita y licencias comerciales' },
  { concepto: 'Smartsheet · cinco usuarios', tipo: 'OPEX', cantidad: 5, unitario: 150, frecuencia: 'Mensual estimado', fuente: 'Estimación académica pendiente de cotización' },
  { concepto: 'Tableau · licencia de visualización', tipo: 'OPEX', cantidad: 1, unitario: 700, frecuencia: 'Mensual estimado', fuente: 'Estimación académica; confirmar producto y plan' },
  { concepto: 'Inhibidor de señales', tipo: 'CAPEX', cantidad: 1, unitario: null, frecuencia: 'Por definir', fuente: 'No presupuestado: requiere cotización y validación legal previa' },
];

export const budgetScenarios = [
  { name: 'A · Solo AXS', monthly: 1329, firstYear: 16147, note: '12 mensualidades + instalación' },
  { name: 'B · AXS + Starlink', monthly: 1729, firstYear: 23747, note: '12 mensualidades + instalación + kit de respaldo' },
];

export const budgetTotals = budgetItems.reduce((totals, item) => {
  if (item.unitario == null) return totals;
  const subtotal = item.cantidad * item.unitario;
  if (item.tipo === 'CAPEX') totals.capex += subtotal;
  if (item.tipo === 'OPEX' && item.frecuencia.startsWith('Mensual')) totals.monthlyOpex += subtotal;
  if (item.tipo === 'OPEX' && item.frecuencia.startsWith('Mensual')) totals.firstYearOpex += subtotal * 12;
  return totals;
}, { capex: 0, monthlyOpex: 0, firstYearOpex: 0, firstYear: 0, opexAnnual: 0 });

budgetTotals.firstYear = budgetTotals.capex + budgetTotals.firstYearOpex;
budgetTotals.opexAnnual = budgetTotals.firstYearOpex;
