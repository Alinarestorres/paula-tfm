import TestimonialCard from '../TestimonialCard'
import PriceCard from '../PriceCard'
import AudioCardCarousel from '../AudioCardCarousel'

/* ════════════════════════════════════════════════════════════════
   Section5 — El derecho a techo
   Figma: node 72:301

   Estructura (top → bottom, gap 10 entre bloques):
   · Bloque 1 — grid 2 columnas (responsive: 1 en mobile)
       ┌──────────────────┬──────────────────┐
       │ Título            │ PriceCard         │
       │ Párrafo (2 párr)  │  obra nueva       │
       │                   │                   │
       │ TestimonialCard   │ PriceCard         │
       │  (Cris, sin extra)│  alquiler         │
       └───────────────────┴───────────────────┘

   · Bloque 2 — AudioCardCarousel align="left" con 2 cards
     (cardWidth 533 → ambas visibles en el ancho de la columna).
     Mismo set de testimonios que Section 2; aquí entran en un
     contexto distinto (vivienda) reforzando la misma voz.
   ════════════════════════════════════════════════════════════════ */

const PRICE_CARDS = [
  {
    label: 'PRECIO OBRA NUEVA',
    number: '4.000',
    unit: '€/m²',
    changeSign: '+',
    changePercent: '113%',
    changeContext: 'Desde 2019',
    description:
      'El precio medio de la vivienda plurifamiliar en Valencia ciudad ha superado los 4.000 €/m² (específicamente 4.086 €/m²), lo que supone un incremento del 19% respecto al año anterior y un 113% desde 2019.',
    source: '2025 · Observatorio de Vivienda UPV',
  },
  {
    label: 'PRECIO ALQUILER',
    number: '1.659',
    unit: '€/mes',
    changeSign: '+',
    changePercent: '78%',
    changeContext: 'Desde 2019',
    description:
      'El precio medio de alquiler en Valencia ciudad se sitúa en 1.659 €, habiendo subido un 78% desde finales de 2019. La oferta se ha reducido un 5% en el último año.',
    source: '2025 · Observatorio de Vivienda UPV',
  },
]

const AUDIO_ITEMS = [
  {
    label: 'TESTIMONIO AUDITIVO',
    number: '001',
    title: 'El barrio del Carmen ya no es lo que era',
    author: 'Lucía Martínez – Limpiadora de Hotel',
  },
  {
    label: 'TESTIMONIO AUDITIVO',
    number: '002',
    title: 'Ya no puedo acceder a Ciutat Vella',
    author: 'Cristina García – Dependienta',
  },
]

export default function Section5() {
  return (
    <section id="seccion-5" className="pt-24 pb-12 flex flex-col gap-10">

      {/* ── Bloque 1: contenido textual + testimonio (izq) | PriceCards (der) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Columna izquierda: heading + párrafos, y debajo el testimonial */}
        <div className="flex flex-col gap-10">

          {/* Texto */}
          <div className="flex flex-col gap-6">
            <h2 className="font-sans font-medium text-4xl lg:text-[48px] leading-[1.125] tracking-[-0.01em] text-text-primary">
              El derecho a techo.
            </h2>

            <div className="flex flex-col gap-6 text-text-secondary">
              <p className="font-sans text-base leading-[26px]">
                La crisis de la vivienda en España ha dejado de ser un problema
                coyuntural para convertirse en uno estructural. En València, la
                situación es límite: el 31% de los inquilinos se ha visto
                obligado a desplazarse a municipios del área metropolitana
                (Mislata, Torrent, Paterna o Burjassot) ante la imposibilidad
                de pagar los precios de la capital.
              </p>
              <p className="font-sans text-base leading-[26px]">
                Solo en el último año, el precio de compra ha escalado un 15%,
                según Idealista. Por su parte, la Cátedra de Vivienda de la UPV
                y portales como Fotocasa alertan de un incremento del 17,1% en
                los alquileres respecto al año anterior. Este encarecimiento no
                es solo una cifra macroeconómica, es un factor de exclusión que
                impide proyectar vidas estables en la ciudad a quienes,
                precisamente, la hacen funcionar cada día.
              </p>
            </div>
          </div>

          {/* TestimonialCard solo, sin texto adicional ni stack.
              hasShadow=false porque ya no está dentro del stack
              (en el stack la sombra hacia arriba sugería las cards
              traseras; suelta no tiene sentido). */}
          <TestimonialCard
            number="001"
            name="Cris"
            age={36}
            quote="Yo sigo compartiendo piso con otras personas. En general ya no resulta sencillo buscar un piso y no, encontrar un piso cerca de mi trabajo actualmente no es una opción. El foco es: primero que encuentre un piso y segundo si podré pagarlo. Fin"
            hasShadow={false}
          />
        </div>

        {/* Columna derecha: dos PriceCards apiladas con gap 20 */}
        <div className="flex flex-col gap-5">
          {PRICE_CARDS.map((card, i) => (
            <PriceCard key={i} {...card} />
          ))}
        </div>
      </div>

      {/* ── Bloque 2: carousel de audio align="left" — sin breakout.
            El carousel mide su viewport en runtime y dimensiona las
            cards como mitad de columna, así que las dos cards encajan
            exactamente dentro del área de contenido con gap 20px. */}
      <AudioCardCarousel items={AUDIO_ITEMS} align="left" />
    </section>
  )
}
