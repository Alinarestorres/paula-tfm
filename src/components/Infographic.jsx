import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  animate,
} from 'framer-motion'

/* ════════════════════════════════════════════════════════════════
   Infographic — Card infográfica de % sobre 100 puntos
   Figma: node 75:1223 · 540 px ancho

   Layout (vertical):
   ┌──────────────────────────────────────────────────────────┐
   │ 73%                ← BioRhyme 160px, accent-400          │
   │                                                          │
   │ ● ● ● ● ● ● ● ● ● ●  ● ● ● ● ● ● ● ● ● ●                 │
   │ ● ● ● ● ● ● ● ● ● ●  ● ● ● ● ● ● ● ● ● ●                 │
   │ ● ● ● ● ● ● ● ● ● ●  ● ● ● ● ● ● ● ● ● ●                 │
   │ ● ● ● ● ● ● ● ● ● ●  ● ● ● ○ ○ ○ ○ ○ ○ ○   ← 73 activos │
   │ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○                 │
   │                                                          │
   │ De los usuarios se desplaza por motivos…                 │
   └──────────────────────────────────────────────────────────┘

   · Cada fila contiene 2 medio-filas de 10 dots con gap 8px entre
     ellas (estructura del Figma — produce un sutil "respiro" en
     el centro de cada fila).
   · 100 dots totales (5 filas × 20).
   · Dot activo: accent-600 · Dot inactivo: accent-100 (suave).

   Animaciones (al entrar en viewport, una sola vez):
   · El número del % cuenta de 0 → percent paso a paso enteros
     (mismo efecto que el badge de PriceCard y el "2,5 millones"
     de Section 3 — duración 1.6s easeOut).
   · Los dots se iluminan en sincronía con la cuenta: cuando el
     contador pasa por N, los dots 0..N-1 ya están encendidos.
     Una breve transición CSS (180ms) entre colores hace que cada
     dot "encienda" suavemente en lugar de hacer flip duro.

   Props:
   · percent      — entero 0..100 (default 73)
   · description  — texto bajo los dots
   ════════════════════════════════════════════════════════════════ */

const TOTAL_DOTS = 100
const DOTS_PER_ROW = 20
const DOTS_PER_HALF = 10
const ROWS = 5
const COUNTER_DURATION = 1.6

export default function Infographic({
  percent = 73,
  description = 'De los usuarios se desplaza por motivos laborales o académicos.',
}) {
  /* Clamp para que `percent` siempre quede en [0, 100]. Si llega
     algo fuera de rango (NaN, negativo, > 100), el componente
     sigue siendo coherente. */
  const target = Math.max(0, Math.min(100, Math.round(Number(percent) || 0)))

  /* Reveal único al entrar en viewport. amount 0.3 = "claramente
     visible" antes de disparar. */
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  /* MotionValue que pasea de 0 → target durante la animación.
     · `display` (string) alimenta el texto del % en pantalla.
     · `activeCount` (estado React) alimenta el coloreado de los
       dots — usamos useMotionValueEvent('change') para volcar el
       floor a un estado: React re-renderiza solo cuando ese
       entero cambia (≈ 1 vez por dot encendido), no cada frame. */
  const count = useMotionValue(0)
  const display = useTransform(count, (v) => Math.floor(v).toString())
  const [activeCount, setActiveCount] = useState(0)
  useMotionValueEvent(count, 'change', (latest) => {
    setActiveCount(Math.floor(latest))
  })

  useEffect(() => {
    if (!isInView) return
    const controls = animate(count, target, {
      duration: COUNTER_DURATION,
      ease: 'easeOut',
    })
    return () => controls.stop()
  }, [isInView, target, count])

  return (
    <article ref={ref} className="w-full max-w-[540px] flex flex-col gap-8">

      {/* ── 73% — número protagonista ── */}
      <span
        className="
          font-display font-bold text-accent-400 tabular-nums
          tracking-tight
          text-[88px] sm:text-[120px] lg:text-[160px]
          leading-[0.92]
        "
      >
        <motion.span>{display}</motion.span>%
      </span>

      {/* ── Bloque dots + descripción (gap 16) ── */}
      <div className="flex flex-col gap-4">

        {/* Grid de dots: 5 filas, cada fila = 2 medio-filas de 10
            dots. pl-2 alinea el grid con la descripción.
            Tamaños responsive: dots más pequeños y gaps más
            estrechos en mobile para que las 20 columnas quepan
            en una columna estrecha. */}
        <div
          className="
            flex flex-col pl-2
            gap-[8px] sm:gap-[11px]
          "
        >
          {Array.from({ length: ROWS }, (_, rowIdx) => (
            <div
              key={rowIdx}
              className="flex gap-1.5 sm:gap-2"
            >
              {[0, 1].map((halfIdx) => (
                <div
                  key={halfIdx}
                  className="flex gap-[7px] sm:gap-[11px]"
                >
                  {Array.from({ length: DOTS_PER_HALF }, (_, colIdx) => {
                    const i =
                      rowIdx * DOTS_PER_ROW +
                      halfIdx * DOTS_PER_HALF +
                      colIdx
                    const isActive = i < activeCount
                    return (
                      <span
                        key={colIdx}
                        aria-hidden
                        className={`
                          block rounded-full
                          w-2 h-2 sm:w-3 sm:h-3
                          transition-colors duration-200 ease-out
                          ${isActive ? 'bg-accent-600' : 'bg-accent-100'}
                        `}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── Descripción ── */}
        <p
          className="
            font-sans font-medium
            text-xl sm:text-2xl
            leading-[1.33]
            tracking-[-0.005em]
            text-text-primary
            pl-2
          "
        >
          {description}
        </p>
      </div>

      {/* Accesibilidad: número leído como porcentaje, dots ocultos
          a lectores. */}
      <span className="sr-only">{`${target}% — ${description}`}</span>
    </article>
  )
}
