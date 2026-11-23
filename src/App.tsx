import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const GestionTecnologia = lazy(() => import('./pages/GestionTecnologia'));
const CienciaTecnologia = lazy(() => import('./pages/CienciaTecnologia'));
const MisionVision = lazy(() => import('./pages/MisionVision'));
const Organigrama = lazy(() => import('./pages/Organigrama'));
const MBTI = lazy(() => import('./pages/MBTI'));
const Scrum = lazy(() => import('./pages/Scrum'));
const IDEF0 = lazy(() => import('./pages/IDEF0'));
const BPMN = lazy(() => import('./pages/BPMN'));
const Monitoreo = lazy(() => import('./pages/Monitoreo'));
const ServiciosExternos = lazy(() => import('./pages/ServiciosExternos'));
const Contacto = lazy(() => import('./pages/Contacto'));
const Posiciones = lazy(() => import('./pages/Posiciones'));
const Objetivos = lazy(() => import('./pages/Objetivos'));
const Inventarios = lazy(() => import('./pages/Inventarios'));
const Tableau = lazy(() => import('./pages/Tableau'));
const Weka = lazy(() => import('./pages/Weka'));
const Presupuesto = lazy(() => import('./pages/Presupuesto'));
const Contingencia = lazy(() => import('./pages/Contingencia'));
const Conclusiones = lazy(() => import('./pages/Conclusiones'));
const Recomendaciones = lazy(() => import('./pages/Recomendaciones'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="gestion-tecnologia" element={<GestionTecnologia />} />
          <Route path="ciencia-tecnologia-innovacion" element={<CienciaTecnologia />} />
          <Route path="mision-vision" element={<MisionVision />} />
          <Route path="organigrama" element={<Organigrama />} />
          <Route path="mbti" element={<MBTI />} />
          <Route path="scrum" element={<Scrum />} />
          <Route path="idef0" element={<IDEF0 />} />
          <Route path="bpmn" element={<BPMN />} />
          <Route path="monitoreo" element={<Monitoreo />} />
          <Route path="servicios-externos" element={<ServiciosExternos />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="posiciones" element={<Posiciones />} />
          <Route path="objetivos" element={<Objetivos />} />
          <Route path="inventarios" element={<Inventarios />} />
          <Route path="tableau" element={<Tableau />} />
          <Route path="weka" element={<Weka />} />
          <Route path="presupuesto" element={<Presupuesto />} />
          <Route path="contingencia" element={<Contingencia />} />
          <Route path="conclusiones" element={<Conclusiones />} />
          <Route path="recomendaciones" element={<Recomendaciones />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
