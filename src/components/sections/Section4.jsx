import TestimonialCardStack from '../TestimonialCardStack'
import { OpinionCardGroup } from '../OpinionCard'

/* ════════════════════════════════════════════════════════════════
   Section4 — Género y cuidados (II) · ¿Desafíos o fractura social?
   Figma: node 68:6894

   Estructura (top → bottom, gap 41px / 10 entre bloques):
   · Bloque 1 — texto + imagen (2 columnas)
       ┌──────────────────┬──────────────────┐
       │ Título             │                  │
       │                    │                  │
       │ Párrafo largo (3   │  Imagen fallera  │
       │ párrafos)          │  rounded-3xl     │
       └────────────────────┴──────────────────┘
     La imagen alcanza la altura del párrafo (las columnas se
     estiran a la mayor de las dos).

   · Bloque 2 — TestimonialCardStack (Laura + Natalia) + texto
     contextual a la derecha, fade al cambiar de card al frente.

   · Bloque 3 — Bloque "Otras trabajadoras…" en 3 filas:
       Row 1: Título + card verde
       Row 2: Card púrpura full-width
       Row 3: Card ámbar + card coral
     Auto-numeración 1..4.
   ════════════════════════════════════════════════════════════════ */

const TESTIMONIALS = [
  {
    number: '001',
    name: 'Laura',
    age: 36,
    quote: 'Las malas condiciones y los horarios interminables existen porque nosotros mismos queremos consumir a cualquier hora. En los países de origen de muchos turistas internacionales, el comercio cierra mucho antes. Los límites empiezan por nosotros mismos.',
    extraText:
      'Laura, trabajadora del sector, apunta a la responsabilidad compartida y hace autocrítica.',
  },
  {
    number: '002',
    name: 'Natalia',
    age: 27,
    quote: 'Un turista responsable no afectaría negativamente a nuestro día a día, pero València está en venta y el turismo nos está echando de nuestra propia ciudad. A la masificación estacional, que genera picos de precariedad y contratos basura, se suma la falta de civismo. Mi calidad de vida ha caído en picado; el problema de la vivienda me afecta emocionalmente de forma grave.',
    extraText:
      'Para otras trabajadoras, la solución no es únicamente un cambio de mentalidad individual, sino que requiere de una intervención institucional más amplia y contundente.\n\nNatalia enumera una serie de cambios que considera necesarios y acaba por resumirlo como “tantas cosas…”.',
  },
]

const OPINION_ROWS = [
  {
    title: 'Otras trabajadoras a las que hemos consultado:',
    items: [
      { variant: 'green', quote: 'A mi me gusta que haya turismo' },
    ],
  },
  {
    items: [
      {
        variant: 'purple',
        quote: 'Considero que el turismo se está comiendo la ciudad, ha dejado de pertenecernos a los valencianos para ser un parque de atracciones para los turistas, que nos tratan con una superioridad impactante',
      },
    ],
  },
  {
    items: [
      { variant: 'amber', quote: 'Hay mucha gentrificación y todo pensado por y para turistas' },
      { variant: 'coral', quote: 'Afecta negativamente porque cierran locales comerciales y abren más pisos turísticos.' },
    ],
  },
]

export default function Section4() {
  return (
    <section id="seccion-4" className="pt-24 pb-12 flex flex-col gap-10">

      {/* ── Bloque 1: heading arriba; debajo, párrafo (izq) + imagen (der)
          El heading queda fuera del grid 2-col, ocupando solo la fila
          superior. La imagen vive en la segunda fila junto al párrafo,
          de modo que su altura coincide con la del párrafo (no incluye
          el heading). object-cover + object-center mantienen la imagen
          centrada y sin deformación. */}
      <div className="flex flex-col gap-6">
        <h2 className="font-sans font-medium text-4xl lg:text-[48px] leading-[1.125] tracking-[-0.01em] text-text-primary">
          Género y cuidados
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Columna izquierda: párrafo */}
          <div className="flex flex-col gap-6 text-text-secondary">
            <p className="font-sans text-base leading-[26px]">
              ¿Desafíos de gestión o fractura social? El propio manifiesto
              reconoce que la saturación estacional y la gentrificación
              dificultan el acceso a la vivienda y deterioran la convivencia.
              Sin embargo, para las trabajadoras, el problema va más allá de la
              teoría y se traduce en el aumento del coste de la vida y la
              desaparición del comercio tradicional, sustituido por servicios
              orientados exclusivamente al visitante.
            </p>
            <p className="font-sans text-base leading-[26px]">
              La perspectiva de la academia es crítica. Aurora Pedro, profesora
              de Economía Aplicada de la Universitat de València, señala la
              urgencia de abordar una fractura no resuelta que es la
              financiación municipal. La transferencia de recursos para el
              sostén de la ciudad es silenciosa pero constante y advierte que,
              fondos públicos que deberían destinarse a blindar servicios
              básicos y necesidades vecinales, terminan sufragando servicios
              para el turismo ya que la presencia de más gente en la ciudad
              requiere de infraestructuras y mantenimiento. Para Pedro, es
              imperativo evaluar quién asume los costes y quién se queda con
              los beneficios de este modelo.
            </p>
            <p className="font-sans text-base leading-[26px]">
              Resulta contradictorio que, mientras València encabeza los
              ránkings de calidad de vida en el sur de Europa según el índice
              Numbeo, quienes sostienen la industria perciben la ciudad como
              una realidad asfixiante. Una paradoja, una ciudad excelente para
              visitar y teletrabajar choca con la percepción de otros y otras
              trabajadoras.
            </p>
          </div>

          {/* Columna derecha: imagen rounded 24, altura = altura del
              párrafo. Fondo accent suave como fallback si la imagen
              no carga. */}
          <div className="w-full h-full min-h-[280px] rounded-3xl overflow-hidden bg-accent-100">
            <img
              src="/img-fallera.png"
              alt="Mural callejero en València con la figura de una fallera con gafas de sol."
              className="w-full h-full object-cover object-center block -scale-x-100"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          </div>
        </div>
      </div>

      {/* ── Bloque 2: stack de testimonios escritos + texto contextual ── */}
      <TestimonialCardStack
        testimonials={TESTIMONIALS}
        extraTextPosition="right"
      />

      {/* ── Bloque 3: opiniones en 3 filas con auto-numeración 1..4 ── */}
      <OpinionCardGroup rows={OPINION_ROWS} />
    </section>
  )
}
