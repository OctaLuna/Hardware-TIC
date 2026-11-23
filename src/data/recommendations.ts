export type RecommendationPriority = 'Alta' | 'Media';

export interface Recommendation {
  priority: RecommendationPriority;
  text: string;
  owner: string;
}

export const recommendations: Recommendation[] = [
  { priority: 'Alta', text: 'Mantener el inventario actualizado y relacionar los activos críticos con los sensores y alertas de monitoreo.', owner: 'Einar Guillén' },
  { priority: 'Alta', text: 'Definir umbrales de PRTG por servicio y revisar periódicamente alertas ruidosas o duplicadas.', owner: 'Huascar Duran' },
  { priority: 'Alta', text: 'Evaluar un enlace de respaldo y probar la conmutación con simulacros documentados.', owner: 'Leandro Colque' },
  { priority: 'Alta', text: 'Validar cotizaciones, condiciones de proveedor y regulación aplicable antes de contratar servicios sensibles, incluida la inhibición de señales.', owner: 'Leandro Colque' },
  { priority: 'Media', text: 'Automatizar reportes de disponibilidad, MTTR, incidentes y ejecución presupuestaria.', owner: 'Octavio Luna' },
  { priority: 'Media', text: 'Capacitar al equipo en PRTG, Tableau, Weka y buenas prácticas de inventario.', owner: 'Leonardo Ibarra' },
  { priority: 'Media', text: 'Revisar y actualizar la documentación de procesos y continuidad en cada sprint.', owner: 'Huascar Duran' },
];
