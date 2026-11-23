import React from 'react';
import KpiCard from '../components/KpiCard';
import { ContentPage, ContentSection, InfoPanel } from '../components/ContentBlocks';
import VideoEmbed from '../components/VideoEmbed';
import { wekaResults } from '../data/wekaResults';

const steps = ['Preparar el inventario en CSV', 'Convertir el archivo a ARFF', 'Preprocesar atributos y discretizar el año', 'Ejecutar algoritmos en Explorer', 'Interpretar métricas y validar límites', 'Usar hallazgos como apoyo a decisiones'];

export default function Weka() {
  return <ContentPage title="Patrones con Weka" subtitle="Cómo Weka transforma el inventario de activos en reglas, grupos y modelos predictivos, y por qué ese conocimiento es útil para decidir en el área de Hardware." category="Minería de datos">
    <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
      <InfoPanel tone="dark"><p className="font-mono text-xs uppercase tracking-widest text-primary">Waikato Environment for Knowledge Analysis</p><p className="mt-4 leading-relaxed text-stone-200">Weka es una suite gratuita de aprendizaje automático y minería de datos desarrollada en la Universidad de Waikato, Nueva Zelanda. Está escrita en Java e incluye Explorer, una interfaz que permite aplicar algoritmos sin programar. Los datos pueden prepararse en formato ARFF.</p></InfoPanel>
      <InfoPanel title="Qué permite descubrir"><ul className="space-y-3 text-sm"><li><b>Reglas de asociación</b> · atributos que aparecen juntos.</li><li><b>Clustering</b> · grupos de registros parecidos sin etiqueta previa.</li><li><b>Clasificación</b> · categoría estimada a partir de casos etiquetados.</li><li><b>Soporte y confianza</b> · frecuencia y fiabilidad observada de una regla.</li></ul></InfoPanel>
    </div>
    <ContentSection title="Proceso de análisis" eyebrow="De inventario a decisión">
      <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{steps.map((step, index) => <li key={step} className="flex gap-4 rounded-xl border-2 border-surface bg-white p-4 shadow-hard"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-display text-lg font-bold text-white">{index + 1}</span><span className="pt-1 text-sm font-medium">{step}</span></li>)}</ol>
    </ContentSection>
    <ContentSection title="Algoritmos y métricas" eyebrow="Herramientas de Explorer">
      <div className="grid gap-4 md:grid-cols-3"><InfoPanel title="Apriori · asociación"><p className="text-sm leading-relaxed">Busca reglas entre atributos del inventario. Revisar soporte, confianza y lift para distinguir patrones frecuentes de asociaciones poco informativas.</p></InfoPanel><InfoPanel title="SimpleKMeans · agrupamiento"><p className="text-sm leading-relaxed">Forma tres grupos (k = 3) según similitud. Revisar centroides, tamaño de cada grupo y suma de errores cuadráticos.</p></InfoPanel><InfoPanel title="J48 · clasificación"><p className="text-sm leading-relaxed">Árbol de decisión tipo C4.5. Evaluar con validación cruzada de 10 pliegues, exactitud, matriz de confusión y comparación con la clase mayoritaria.</p></InfoPanel></div>
    </ContentSection>
    <ContentSection title="Resultados" eyebrow="Resultados del analisis">
      
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><KpiCard value={wekaResults.instances} label="Instancias analizadas" subtext="Activos registrados" /><KpiCard value={wekaResults.associationRules.length} label="Reglas de asociación" /><KpiCard value={wekaResults.clusters.length} label="Grupos (k = 3)" /><KpiCard value={wekaResults.majorityClass} label="Clase mayoritaria" accent="dark" /></div>
      <div className="grid gap-5 lg:grid-cols-2">
        <InfoPanel title="Reglas Apriori"><div className="overflow-x-auto"><table className="w-full min-w-[520px] text-left text-xs"><thead className="bg-surface text-white"><tr>{['Regla', 'Soporte', 'Confianza', 'Lift'].map((label) => <th key={label} className="px-3 py-2 font-mono uppercase">{label}</th>)}</tr></thead><tbody>{wekaResults.associationRules.map((row) => <tr key={row.rule} className="border-b border-stone-200"><td className="px-3 py-3">{row.rule}</td><td className="px-3 py-3">{row.support}</td><td className="px-3 py-3">{row.confidence}</td><td className="px-3 py-3">{row.lift}</td></tr>)}</tbody></table></div><p className="mt-4 text-sm"><b>Lectura:</b> {wekaResults.readings.association}</p></InfoPanel>
        <InfoPanel title="Grupos SimpleKMeans"><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-xs"><thead className="bg-surface text-white"><tr>{['Grupo', 'Perfil', 'Centroide', 'Tamaño', 'SSE'].map((label) => <th key={label} className="px-3 py-2 font-mono uppercase">{label}</th>)}</tr></thead><tbody>{wekaResults.clusters.map((row) => <tr key={row.group} className="border-b border-stone-200"><td className="px-3 py-3 font-bold">{row.group}</td><td className="px-3 py-3">{row.profile}</td><td className="px-3 py-3">{row.centroid}</td><td className="px-3 py-3">{row.size}</td><td className="px-3 py-3">{row.sse}</td></tr>)}</tbody></table></div><p className="mt-4 text-sm"><b>Lectura:</b> {wekaResults.readings.clusters}</p></InfoPanel>
      </div>
      <InfoPanel title="Clasificación J48"><div className="grid gap-5 md:grid-cols-[1fr_auto]"><div><p className="text-sm">Objetivo: {wekaResults.classification.target}</p><p className="mt-2 text-sm">Exactitud: <b className="text-primary">{wekaResults.classification.accuracy}</b> · Línea base: {wekaResults.classification.baseline}</p><p className="mt-2 text-xs text-foreground-muted">{wekaResults.classification.algorithm}</p></div><div className="overflow-x-auto"><table className="text-center text-xs"><caption className="mb-2 font-mono uppercase">Matriz de confusión</caption><tbody>{wekaResults.classification.matrix.map((row, rowIndex) => <tr key={rowIndex}>{row.map((value, colIndex) => <td key={colIndex} className="border border-stone-300 bg-[#FAF5DC] px-5 py-3 font-bold">{value}</td>)}</tr>)}</tbody></table><p className="mt-1 text-center text-[10px] text-foreground-muted">Filas: real · columnas: predicho</p></div></div><p className="mt-4 text-sm"><b>Lectura:</b> {wekaResults.readings.classification}</p></InfoPanel>
    </ContentSection>
    <ContentSection title="Decisiones que los hallazgos pueden apoyar" eyebrow="Aplicación en el área">
      <div className="grid gap-4 md:grid-cols-3">{[['Priorizar renovaciones', 'Identificar activos obsoletos de criticidad alta para revisión técnica y presupuestaria.'], ['Enfocar mantenimiento', 'Concentrar inspecciones en grupos con antigüedad o estado que indiquen mayor riesgo.'], ['Ajustar reposiciones', 'Usar patrones observados como insumo para escenarios de presupuesto y ciclo de vida.']].map(([title, text]) => <InfoPanel key={title} title={title}><p className="text-sm leading-relaxed">{text}</p></InfoPanel>)}</div>
      <InfoPanel title="Limitaciones"><p className="text-sm leading-relaxed">La calidad y el tamaño de los datos afectan los patrones; un lift cercano a 1 indica asociación débil, y modelos complejos pueden sobreajustarse. Validar los hallazgos con el equipo y con datos actualizados antes de tomar decisiones.</p></InfoPanel>
    </ContentSection>
    <ContentSection title="Video de apoyo" eyebrow="Curso oficial de Weka">
      <p className="text-sm text-foreground-muted">Introducción al proceso de minería de datos con Weka, publicada como parte del curso de la Universidad de Waikato.</p>
      <VideoEmbed title="Data Mining with Weka: Introduction" channel="WekaMOOC · Universidad de Waikato" url="https://www.youtube.com/watch?v=Exe4Dc8FmiM" />
      <a href="https://weka.waikato.ac.nz/weka/courses.html" target="_blank" rel="noreferrer" className="text-sm font-bold text-primary hover:underline">Ver cursos y materiales oficiales de Weka ↗</a>
    </ContentSection>
  </ContentPage>;
}
