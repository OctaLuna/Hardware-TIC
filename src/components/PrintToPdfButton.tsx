import React from 'react';
import { Download } from 'lucide-react';

export default function PrintToPdfButton({ title }: { title: string }) {
  return <div className="print-hidden flex justify-end">
    <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white shadow-hard transition-colors hover:bg-primary-hover" aria-label={`Imprimir o guardar ${title} como PDF`}>
      <Download size={16} /> Imprimir / Guardar como PDF
    </button>
  </div>;
}
