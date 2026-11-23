export const wekaResults = {
  label: 'RESULTADOS DEL AN?LISIS ? INVENTARIO TIRADORES',
  instances: 12,
  associationRules: [
    { rule: 'criticidad = Alta ⇒ recomendación = Revisar renovación', support: '25%', confidence: '75%', lift: '1,50' },
    { rule: 'tipo = Servidor ⇒ criticidad = Crítica o Alta', support: '25%', confidence: '100%', lift: '1,50' },
    { rule: 'año de adquisición ≤ 2021 ⇒ estado = Obsoleto o mantenimiento', support: '33,3%', confidence: '66,7%', lift: '1,33' },
  ],
  clusters: [
    { group: 'Grupo 1', profile: 'Infraestructura de red y seguridad · criticidad alta', centroid: 'Criticidad 3,0 · antigüedad 3,0 años', size: 4, sse: '0,42' },
    { group: 'Grupo 2', profile: 'Puestos de trabajo y periféricos · criticidad media/baja', centroid: 'Criticidad 1,8 · antigüedad 4,2 años', size: 5, sse: '0,68' },
    { group: 'Grupo 3', profile: 'Activos críticos con revisión prioritaria', centroid: 'Criticidad 3,7 · antigüedad 5,0 años', size: 3, sse: '0,31' },
  ],
  classification: {
    target: 'Condición operativa: operativo / requiere revisión',
    algorithm: 'J48 ? validaci?n cruzada de 10 pliegues',
    accuracy: '83,3%',
    baseline: '66,7%',
    classes: ['Operativo', 'Requiere revisión'],
    matrix: [[7, 1], [1, 3]],
  },
  majorityClass: 'Operativo (8 de 12)',
  readings: {
    association: 'Los activos de criticidad alta se asocian con la recomendacion de revision. La asociacion orienta una inspeccion; no demuestra causalidad.',
    clusters: 'Los tres grupos permiten separar perfiles para planificar mantenimiento y renovaci?n.',
    classification: 'La matriz resume los aciertos y errores del modelo para cada condici?n operativa.',
  },
};
