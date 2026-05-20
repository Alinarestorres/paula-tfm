import { useRef, useEffect } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion'
import Manifesto from '../Manifesto'
import AudioCardCarousel from '../AudioCardCarousel'

/* ════════════════════════════════════════════════════════════════
   Section3 — La "ciudad turística"
   Figma: node 62:6408

   Estructura (top → bottom):
   · Hero infographic — bloque oscuro con la cifra "2,5 millones"
     + subheading; fade-in al hacer scroll y counter animado del
     número (0,0 → 0,1 → … → 2,5) al estilo velocímetro.
   · Heading "La 'ciudad turística'" + 3 párrafos
   · Manifesto (componente reutilizado)
   · AudioCardCarousel con 4 cards, alineado a la izquierda
   · Párrafo final
   ════════════════════════════════════════════════════════════════ */

/* Numeración global continua de testimonios auditivos en la landing.
   Section 2: 001-003 · aquí continuamos en 004-008.
   encodeURI() en src maneja espacios, comas y tildes de los nombres
   de archivo en /public. */
const AUDIO_ITEMS = [
  {
    label: 'TESTIMONIO AUDITIVO',
    number: '004',
    title: 'Me dejaré próximamente el empleo por esta inestabilidad que al final perturba tu día a día y tu organización',
    author: 'Cris Blanco – Dependienta',
    src: encodeURI('/AUDIO 4_Cris conciliación.mp3'),
  },
  {
    label: 'TESTIMONIO AUDITIVO',
    number: '005',
    title: 'Medidas de conciliación no tengo ninguna porque trabajo todos los días',
    author: 'Lucía Castro – Camarera de Pisos',
    src: encodeURI('/AUDIO 5_medidas ninguna.mp3'),
  },
  {
    label: 'TESTIMONIO AUDITIVO',
    number: '006',
    title: 'Aún faltan algunas cositas',
    author: 'Cris Blanco – Dependienta',
    src: encodeURI('/AUDIO 6_Condiciones.mp3'),
  },
  {
    label: 'TESTIMONIO AUDITIVO',
    number: '007',
    title: 'Se ve como un trabajo de paso',
    author: 'Lucía Castro – Camarera de Pisos',
    src: encodeURI('/AUDIO 7_Trabajo-de-paso.mp3'),
  },
  {
    label: 'TESTIMONIO AUDITIVO',
    number: '008',
    title: 'Es un trabajo absolutamente invisible',
    author: 'Teresa Alvarruiz – Camarera',
    src: encodeURI('/AUDIO 8_Trabajo invisible, denigrante.mp3'),
  },
]

/* Counter animado tipo velocímetro: arranca en 0,0 y sube en pasos
   visibles hasta 2,5 cuando se dispara `trigger`. Formato Spanish
   con coma decimal. tabular-nums evita "saltos" de layout entre
   dígitos de distinto ancho. */
function CountUpNumber({ trigger }) {
  const count = useMotionValue(0)
  const display = useTransform(count, (v) => v.toFixed(1).replace('.', ','))

  useEffect(() => {
    if (!trigger) return
    const controls = animate(count, 2.5, {
      duration: 2,
      ease: 'easeOut',
    })
    return () => controls.stop()
  }, [trigger, count])

  return <motion.span className="tabular-nums">{display}</motion.span>
}

export default function Section3() {
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  return (
    <section id="seccion-3" className="pt-24 pb-12 flex flex-col gap-16">

      {/* ── Bloque 1 (agrupado): infographic dark + content text ── */}
      <div className="flex flex-col gap-20 lg:gap-28">

        {/* Hero con fade-in + counter del número (sobre fondo claro) */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col gap-3 lg:gap-2"
        >
          {/* Número grande con countdown a 2,5 + " millones" */}
          <h2
            className="
              font-display font-bold leading-[0.95]
              text-accent-400 tracking-tight
              text-[72px] sm:text-[110px] md:text-[150px]
              lg:text-[180px] xl:text-[220px]
            "
          >
            <CountUpNumber trigger={isHeroInView} /> millones
          </h2>

          {/* Subheading — offset a la derecha en lg+ */}
          <p
            className="
              font-sans font-medium leading-tight
              text-accent-600
              text-xl sm:text-2xl lg:text-[32px]
              max-w-[640px]
              lg:self-end lg:max-w-[60%]
            "
          >
            En 2025, València recibió a 2,5 millones de visitantes, según datos
            de Visit València.
          </p>
        </motion.div>

        {/* Content text — "La ciudad turística" + 3 párrafos */}
        <div className="flex flex-col gap-6">
          <h3
            className="
              font-sans font-medium leading-tight
              text-text-primary
              text-3xl sm:text-4xl lg:text-[48px]
            "
          >
            La “ciudad turística”
          </h3>

          <div className="flex flex-col gap-6 text-text-secondary">
            <p className="font-sans text-base leading-7">
              Al recorrer sus calles, las paredes y balcones nos recuerdan el
              malestar de la población local, igual que en muchas otras
              ciudades europeas, desde el manido “Tourist go home!” hasta el
              grito local “Veïnat en perill d’extinció” o “València no està en
              venda!”. Denuncias que señalan directamente a la gentrificación
              y la turistificación como agentes de expulsión.
            </p>
            <p className="font-sans text-base leading-7">
              Este descontento tiene una raíz multifactorial. Los y las
              expertas en turismo lo definen como la masificación que
              condiciona la vida en los destinos haciendo de éstos, simplemente
              un activo turístico, una “ciudad turística”. Existe, además, un
              componente moral y emocional complejo: el conflicto nos
              interpela directamente porque, en algún momento, todos y
              todas hemos sido o seremos turistas.
            </p>
            <p className="font-sans text-base leading-7">
              Ante esta crisis, el “Manifiesto Turismo Que Suma” (2025),
              impulsado por EXCELTUR, propone una hoja de ruta para un turismo
              responsable y regenerativo basado en cinco ejes estratégicos:
            </p>
          </div>
        </div>
      </div>

      {/* ── Bloque 2: Manifesto component ── */}
      <Manifesto />

      {/* ── Bloque 3: Audio carousel (4 cards) — sin breakout, las
            cards se dimensionan al ancho de columna en runtime. */}
      <AudioCardCarousel items={AUDIO_ITEMS} align="left" />

      {/* ── Bloque 4: Párrafo final ── */}
      <p className="font-sans text-base leading-7 text-text-secondary">
        Frente a los millones de visitantes y la teoría de los planes
        estratégicos que prometen dignificar el sector y mejorar la
        convivencia, las voces de las propias trabajadoras evidencian que las
        medidas institucionales de conciliación y estabilidad aún no han
        bajado a sus puestos de trabajo, donde el empleo turístico se sigue
        viviendo como una realidad inestable, precaria y de paso.
      </p>
    </section>
  )
}
