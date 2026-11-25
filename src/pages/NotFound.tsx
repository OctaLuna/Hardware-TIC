import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ContentPage, ContentSection, InfoPanel } from '../components/ContentBlocks';

export default function NotFound() {
  return (
    <ContentPage title="Página no encontrada" subtitle="La dirección solicitada no corresponde a una sección del sitio." category="Error 404">
      <ContentSection title="Volver a la navegación" eyebrow="Ruta inexistente">
        <InfoPanel>
          <p className="mb-5 text-sm leading-relaxed">Revisa la dirección o vuelve al inicio para continuar explorando Tiradores Hardware.</p>
          <Link to="/" className="btn-primary inline-flex items-center gap-2 px-5 py-3 text-sm font-bold">
            <ArrowLeft size={16} /> Ir al inicio
          </Link>
        </InfoPanel>
      </ContentSection>
    </ContentPage>
  );
}
