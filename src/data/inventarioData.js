// Muestra académica editable. Sustituir por el inventario validado del equipo.
export const INVENTORY_LABEL = 'INVENTARIO DE ACTIVOS · TIRADORES HARDWARE';

export const inventoryData = [
  { id: 'SRV-001', tipo: 'Servidor', descripcion: 'Servidor de virtualización rack 2U', criticidad: 'Crítica', anio: 2021, area: 'Gestión de Infraestructura Global', estado: 'Activo', ubicacion: 'Sala de equipos · Rack A1' },
  { id: 'SRV-002', tipo: 'Servidor', descripcion: 'Servidor de respaldo NAS y copias', criticidad: 'Alta', anio: 2020, area: 'Gestión de Infraestructura Global', estado: 'En mantenimiento', ubicacion: 'Sala de equipos · Rack A2' },
  { id: 'NET-001', tipo: 'Switch', descripcion: 'Switch administrable de distribución 48 puertos', criticidad: 'Alta', anio: 2022, area: 'Gestión de Infraestructura Global', estado: 'Activo', ubicacion: 'Sala de equipos · Rack B1' },
  { id: 'NET-002', tipo: 'Router', descripcion: 'Router de borde con VPN', criticidad: 'Alta', anio: 2021, area: 'Gestión de Infraestructura Global', estado: 'Activo', ubicacion: 'Sala de equipos · Rack B1' },
  { id: 'SEC-001', tipo: 'Firewall', descripcion: 'Firewall perimetral de red', criticidad: 'Crítica', anio: 2023, area: 'Aseguramiento de Calidad y Recursos', estado: 'Activo', ubicacion: 'Sala de equipos · Rack B2' },
  { id: 'PC-001', tipo: 'PC', descripcion: 'Estación de trabajo para análisis y gestión tecnológica', criticidad: 'Media', anio: 2022, area: 'Dirección de Tecnología y Presupuesto', estado: 'Activo', ubicacion: 'Área de Tecnología · Puesto 01' },
  { id: 'PC-002', tipo: 'PC', descripcion: 'Estación de trabajo de soporte técnico', criticidad: 'Media', anio: 2019, area: 'Operaciones de Soporte y Entorno de Trabajo', estado: 'Obsoleto', ubicacion: 'Laboratorio · Puesto 02' },
  { id: 'IOT-001', tipo: 'Equipo médico IoT', descripcion: 'Gateway de telemetría clínica', criticidad: 'Crítica', anio: 2024, area: 'Aseguramiento de Calidad y Recursos', estado: 'Activo', ubicacion: 'Laboratorio · Banco IoT' },
  { id: 'UPS-001', tipo: 'UPS', descripcion: 'UPS online para rack de red', criticidad: 'Alta', anio: 2020, area: 'Aseguramiento de Calidad y Recursos', estado: 'En mantenimiento', ubicacion: 'Sala de equipos · Rack A' },
  { id: 'PER-001', tipo: 'Periférico', descripcion: 'Consola KVM para administración local', criticidad: 'Baja', anio: 2019, area: 'Operaciones de Soporte y Entorno de Trabajo', estado: 'Obsoleto', ubicacion: 'Sala de equipos · Rack A' },
  { id: 'PC-003', tipo: 'PC', descripcion: 'Equipo de diagnóstico y monitoreo', criticidad: 'Media', anio: 2026, area: 'Operaciones de Soporte y Entorno de Trabajo', estado: 'Activo', ubicacion: 'Mesa de ayuda · Puesto 01' },
  { id: 'UPS-002', tipo: 'UPS', descripcion: 'UPS de respaldo para gateway IoT', criticidad: 'Alta', anio: 2021, area: 'Aseguramiento de Calidad y Recursos', estado: 'Obsoleto', ubicacion: 'Laboratorio · Banco IoT' },
];

export const inventoryTypes = ['Servidor', 'Switch', 'Router', 'Firewall', 'PC', 'Equipo médico IoT', 'UPS', 'Periférico'];
export const inventoryStates = ['Activo', 'Obsoleto', 'En mantenimiento'];
export const inventoryAreas = [...new Set(inventoryData.map((asset) => asset.area))];

export const countBy = (key) => inventoryData.reduce((counts, row) => {
  counts[row[key]] = (counts[row[key]] || 0) + 1;
  return counts;
}, {});

export const inventorySummary = {
  total: inventoryData.length,
  active: inventoryData.filter((row) => row.estado === 'Activo').length,
  obsolete: inventoryData.filter((row) => row.estado === 'Obsoleto').length,
  maintenance: inventoryData.filter((row) => row.estado === 'En mantenimiento').length,
  highCriticality: inventoryData.filter((row) => ['Crítica', 'Alta'].includes(row.criticidad)).length,
};
