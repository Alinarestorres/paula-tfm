import { useEffect, useState } from 'react'
import Header from './components/Header'
import SectionNav from './components/SectionNav'
import Section1 from './components/sections/Section1'
import Section2 from './components/sections/Section2'
import Section3 from './components/sections/Section3'
import Section4 from './components/sections/Section4'
import Section5 from './components/sections/Section5'
import Section6 from './components/sections/Section6'
import PlaygroundIndex from './playground/PlaygroundIndex'
import AudioCardPlayground from './playground/AudioCardPlayground'
import HeaderPlayground from './playground/HeaderPlayground'
import SectionNavPlayground from './playground/SectionNavPlayground'
import TestimonialCardPlayground from './playground/TestimonialCardPlayground'
import MapPlayground from './playground/MapPlayground'
import ManifestoPlayground from './playground/ManifestoPlayground'
import PriceCardPlayground from './playground/PriceCardPlayground'
import OpinionCardPlayground from './playground/OpinionCardPlayground'
import InfographicPlayground from './playground/InfographicPlayground'
import './index.css'

/* Botón flotante discreto que da acceso al playground desde la landing. */
function PlaygroundLink() {
  return (
    <a
      href="#/playground"
      className="
        fixed top-4 right-4 z-50
        font-sans text-xs uppercase tracking-[0.15em]
        bg-[#1A1A1C] text-text-disabled
        border border-[#3A3A3A]
        px-3 py-2 rounded-full
        hover:text-text-inverse hover:border-secondary-500
        transition-colors
      "
    >
      Playground →
    </a>
  )
}

/* Landing principal: Header oscuro + área de contenido claro con SectionNav
   sticky a la izquierda que persiste a través de TODAS las secciones.

   Estructura:
     · Outer wrapper full-width con bg-surface-bg (cubre todo el viewport,
       sirve de "telón" en pantallas anchas)
     · Header (full-width, bg oscuro propio, rounded-b 32px)
     · Área de contenido con MAX-WIDTH 1440 centrada — incluye nav lateral,
       sections y márgenes laterales. En pantallas > 1440 queda centrada
       con el bg light del outer en los laterales (sin cortes visuales).
       · Padding horizontal responsive 16/32/64 (mobile/tablet/desktop)
       · Flex row con:
         - <aside> sticky con SectionNav (solo desktop ≥ lg)
         - <main> con todas las secciones apiladas verticalmente

   El aside, al ser un flex item con items-stretch (default), se estira al
   alto total de <main>, lo que permite que el sticky funcione a lo largo
   de la página entera. */
function MainLanding() {
  return (
    <div className="bg-surface-bg min-h-screen">
      <PlaygroundLink />
      <Header />

      <div className="max-w-[1440px] mx-auto">
        <div className="px-4 md:px-8 lg:px-16">
          <div className="flex gap-5 lg:gap-6">

            {/* Navegación lateral — sticky a lo largo de toda la landing */}
            <aside className="hidden lg:block shrink-0 pt-24">
              <div className="sticky top-8">
                <SectionNav />
              </div>
            </aside>

            {/* Columna de secciones */}
            <main className="flex-1 min-w-0">
              <Section1 />
              <Section2 />
              <Section3 />
              <Section4 />
              <Section5 />
              <Section6 />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Router mínimo basado en window.location.hash, sin dependencias externas. */
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const handler = () => setHash(window.location.hash)
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])
  return hash
}

export default function App() {
  const hash = useHashRoute()

  if (hash === '#/playground') return <PlaygroundIndex />
  if (hash === '#/playground/header') return <HeaderPlayground />
  if (hash === '#/playground/section-nav') return <SectionNavPlayground />
  if (hash === '#/playground/testimonial-card') return <TestimonialCardPlayground />
  if (hash === '#/playground/audio-card') return <AudioCardPlayground />
  if (hash === '#/playground/map') return <MapPlayground />
  if (hash === '#/playground/manifesto') return <ManifestoPlayground />
  if (hash === '#/playground/price-card') return <PriceCardPlayground />
  if (hash === '#/playground/opinion-card') return <OpinionCardPlayground />
  if (hash === '#/playground/infographic') return <InfographicPlayground />
  return <MainLanding />
}
