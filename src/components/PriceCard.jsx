import { useEffect, useRef } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion'

/* ════════════════════════════════════════════════════════════════
   PriceCard — Card editorial de precio con cifra grande y contexto
   Figma: node 48:5062 · 535x295 px

   Layout:
   ┌──────────────────────────────────────────────────────────┐
   │ PRECIO OBRA NUEVA                       ╭─────────╮      │
   │                                         │ +113%   │      │
   │                                         │Desde2019│      │
   │                                         ╰─────────╯      │
   │ 4.000 €/m²                                               │
   │                                                          │
   │ El precio medio de la vivienda...                        │
   │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
   │ 2025 · Observatorio de Vivienda UPV                      │
   └──────────────────────────────────────────────────────────┘

   Props:
   · label          — etiqueta uppercase (ej. "PRECIO OBRA NUEVA")
   · number         — cifra principal ya formateada (ej. "4.000")
   · unit           — unidad completa (ej. "€/m²" o "€/mes")
   · changeSign     — "+" / "−" (default "+")
   · changePercent  — porcentaje con símbolo (ej. "113%")
   · changeContext  — contexto del cambio (ej. "Desde 2019")
   · description    — texto contextual amplio
   · source         — fuente del dato (ej. "2025 · Observatorio…")

   Animaciones (al entrar en viewport, una sola vez):
   · La card hace un fade-in suave + ligero deslizamiento desde
     abajo (opacity 0→1, y 16→0).
   · Pasado un breve delay, el círculo blanco del cambio aparece
     con un spring pop-in (scale 0→1, opacity 0→1).
   · Simultáneamente al pop-in, el % cuenta de 0 al objetivo
     incrementando de 1 en 1 (efecto velocímetro como el de
     "2,5 millones" en Section3, pero en pasos enteros).
   ════════════════════════════════════════════════════════════════ */

const CARD_REVEAL_DURATION = 0.6
const BADGE_DELAY = 0.45
const BADGE_SPRING = { type: 'spring', stiffness: 220, damping: 16, mass: 0.7 }
const COUNTER_DURATION = 1.6

/* Sube de 0 → target enteros, formato 'X' (sin símbolo); el % vive
   fuera para no tener que reparsearlo. `floor` garantiza que solo
   se muestren números enteros aunque internamente la motion-value
   sea continua. */
function CountUpInteger({ trigger, target, delay = 0 }) {
  const count = useMotionValue(0)
  const display = useTransform(count, (v) => Math.floor(v).toString())

  useEffect(() => {
    if (!trigger) return
    const controls = animate(count, target, {
      duration: COUNTER_DURATION,
      ease: 'easeOut',
      delay,
    })
    return () => controls.stop()
  }, [trigger, target, count, delay])

  return <motion.span className="tabular-nums">{display}</motion.span>
}

export default function PriceCard({
  label = 'PRECIO OBRA NUEVA',
  number = '4.000',
  unit = '€/m²',
  changeSign = '+',
  changePercent = '113%',
  changeContext = 'Desde 2019',
  description,
  source,
}) {
  /* Separamos la unidad en moneda (€) y medida (/m², /mes, …) para
     poder aplicarles tamaños/fuentes distintas como en el Figma. */
  const unitMatch = unit.match(/^(€|\$)(\/.+)$/)
  const currency = unitMatch?.[1] ?? unit
  const measure = unitMatch?.[2] ?? ''

  /* Extraemos el entero del % ("113%" → 113) para animarlo.
     Cualquier sufijo no numérico (el %) se reescribe estático
     justo después del span animado. */
  const percentMatch = String(changePercent).match(/(\d+)/)
  const percentTarget = percentMatch ? parseInt(percentMatch[1], 10) : 0
  const percentSuffix = String(changePercent).replace(/\d+/, '').trim() || '%'

  /* Reveal único al entrar en viewport — amount 0.3 garantiza que
     la card esté "claramente" en pantalla antes de animar. */
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.article
      ref={ref}
      className="bg-surface-fg border border-border-default rounded-3xl pt-4 pr-6 pb-6 pl-6 w-full max-w-[535px] flex flex-col"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: CARD_REVEAL_DURATION, ease: [0.25, 0.1, 0.25, 1] }}
    >

      {/* ── Cabecera: label izquierda + círculo de cambio derecha ── */}
      <header className="flex items-center justify-between gap-4">
        <span className="font-sans font-medium text-xs uppercase tracking-[0.08em] text-text-tertiary">
          {label}
        </span>

        {/* Badge circular con pop-in retardado. transform-origin
            centrado → el spring se siente como un "aterrizaje" en
            su sitio sin moverse de posición. */}
        <motion.div
          className="w-[88px] h-[88px] rounded-full bg-surface-elevated flex flex-col items-center justify-center gap-1 shrink-0"
          style={{ transformOrigin: 'center center' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ ...BADGE_SPRING, delay: BADGE_DELAY }}
        >
          <div className="flex items-baseline">
            <span className="font-sans font-medium text-xl leading-none text-text-secondary">
              {changeSign}
            </span>
            <span className="font-display font-bold text-2xl leading-none text-text-secondary">
              <CountUpInteger
                trigger={isInView}
                target={percentTarget}
                delay={BADGE_DELAY}
              />
              {percentSuffix}
            </span>
          </div>
          <span className="font-sans font-medium text-[10px] leading-none text-text-disabled">
            {changeContext}
          </span>
        </motion.div>
      </header>

      {/* ── Cifra principal: número + € + /unidad, baseline-aligned ── */}
      <div className="flex items-baseline gap-1 mt-4">
        <span className="font-display font-bold text-[80px] leading-none text-accent-600 tabular-nums">
          {number}
        </span>
        <span className="font-display font-bold text-[40px] leading-none text-accent-600">
          {currency}
        </span>
        {measure && (
          <span className="font-sans font-medium text-[32px] leading-none text-accent-600">
            {measure}
          </span>
        )}
      </div>

      {/* ── Descripción + línea dashed + fuente ── */}
      <div className="flex flex-col gap-2 mt-4">
        {description && (
          <p className="font-sans font-normal text-sm leading-[22px] text-text-primary">
            {description}
          </p>
        )}
        <hr className="border-t border-dashed border-border-default mt-1" />
        {source && (
          <p className="font-sans font-medium text-[10px] leading-[14px] text-border-default">
            {source}
          </p>
        )}
      </div>
    </motion.article>
  )
}
