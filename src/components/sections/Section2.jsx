import AudioCardCarousel from '../AudioCardCarousel'

/* ════════════════════════════════════════════════════════════════
   Section2 — Género y cuidados
   Figma: node 50:5420

   Layout:
   ┌──────────────────────────────────────────────────────────────┐
   │  ╭─ Texto ─╮  ╭─── Imagen ───╮     ← Bloque 1 (HORIZONTAL)   │
   │  │ Título  │  │              │                               │
   │  │ Párrafo │  │  (mockup     │                               │
   │  │ Párrafo │  │   pendiente) │                               │
   │  │ Párrafo │  │              │                               │
   │  ╰─────────╯  ╰──────────────╯                               │
   │                                                              │
   │  [────── AudioCardCarousel ──────]   ← Bloque 2 (VERTICAL)   │
   │                                                              │
   │  Párrafos sobre Lucía…                                       │
   └──────────────────────────────────────────────────────────────┘

   Audio carousel con 2 cards (sin src aún — pendiente de subir).
   ════════════════════════════════════════════════════════════════ */

/* Cards 001-002 del conteo global de testimonios auditivos. */
const AUDIO_ITEMS = [
  {
    label: 'TESTIMONIO AUDITIVO',
    number: '001',
    title: 'Se aprovechan un poco de nuestra disposición y nuestro tiempo.',
    author: 'Cristina Blanco – Dependienta',
    /* src pendiente de añadir */
  },
  {
    label: 'TESTIMONIO AUDITIVO',
    number: '002',
    title: 'Las jornadas completas las suelen tener las personas más mayores.',
    author: 'Teresa Alvarruiz – Camarera',
    /* src pendiente de añadir */
  },
]

export default function Section2() {
  return (
    <section id="seccion-2" className="pt-24 pb-12 flex flex-col gap-20">

      {/* ── Bloque 1: heading + texto a la izq + imagen a la der ── */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-5">

        {/* Texto izquierdo */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <h2 className="font-sans font-medium text-4xl lg:text-[48px] leading-[1.05] text-text-primary">
            Género y cuidados
          </h2>

          <div className="flex flex-col gap-6 text-text-secondary">
            <p className="font-sans text-base leading-7">
              Las trabajadoras del sector servicios: limpiadoras, dependientas,
              camareras, recepcionistas, cargan con el peso de ser la imagen
              de una industria que les exige una “hospitalidad constante” a
              cambio de condiciones, en muchos casos, de extrema precariedad.
            </p>
            <p className="font-sans text-base leading-7">
              El Informe de CCOO sobre la situación sociolaboral de las
              mujeres en el País Valencià (2026) es revelador: la ocupación
              femenina se concentra masivamente en el sector servicios. Un
              86,2% de las mujeres ocupadas desempeñan su labor en esta área,
              frente al 62,4% de los hombres. Esta segregación convierte a
              los servicios en la única rama de actividad con predominio
              femenino (53,6% del total).
            </p>
            <p className="font-sans text-base leading-7">
              No obstante, esta alta representación no se traduce en calidad
              laboral. Los sectores feminizados lideran las tasas de empleo a
              tiempo parcial que, como señala el informe, rara vez es una
              elección voluntaria, sino la única vía de acceso al mercado de
              trabajo.
            </p>
          </div>
        </div>

        {/* Imagen derecha — archivo servido desde /public/.
            El fondo azul actúa como fallback si la imagen falla al cargar. */}
        <div className="lg:w-1/2 lg:pt-[78px]">
          <div className="aspect-[535/407] w-full bg-secondary-200 rounded-3xl overflow-hidden">
            <img
              src="/img-content-section-2.png"
              alt="Conversación de WhatsApp con el código del avión que usan las camareras de piso para indicar la urgencia de la limpieza."
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          </div>
        </div>
      </div>

      {/* ── Bloque 2: carousel de audios + texto inferior ── */}
      <div className="flex flex-col gap-[72px]">

        {/* Carousel alineado a la izquierda — sin breakout. El propio
            carousel mide su viewport en runtime y dimensiona las cards
            como mitad de columna (= mismo ancho que la AudioCard
            standalone de Section 6), así que las dos cards encajan
            limpiamente dentro del área de contenido. */}
        <AudioCardCarousel items={AUDIO_ITEMS} align="left" />

        <div className="flex flex-col gap-6 text-text-secondary">
          <p className="font-sans text-base leading-7">
            Lucía (53 años) representa el trasfondo del éxito turístico en el
            centro de Valencia. Aunque celebra haber dejado atrás la
            precariedad de trabajos a media jornada para alcanzar estabilidad
            de un contrato completo, denuncia que el volumen de trabajo es
            asfixiante en los hoteles. “Nuestras jornadas son larguísimas”,
            afirma.
          </p>
          <p className="font-sans text-base leading-7">
            La presión por tener todo listo se gestiona mediante un código
            visual que resulta casi irónico: el emoji del avión. Este símbolo
            indica la urgencia de la limpieza de las habitaciones. “A mayor
            número de aviones, menor es el tiempo para dejar la pieza
            impecable antes de la llegada de los siguientes turistas.
            Nosotras decimos, voy volando volando” comenta alegremente.
          </p>
          <p className="font-sans text-base leading-7">
            Para Lucía, la solución de su situación laboral pasa por
            contratar a más personal y reducir la carga horaria.
          </p>
        </div>
      </div>
    </section>
  )
}
