import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TestimonialCard from './TestimonialCard'

/* ════════════════════════════════════════════════════════════════
   TestimonialCardStack — Pila interactiva de TestimonialCards
   Figma: nodes 34:4529 (stack) · 34:4602 (con texto adicional)

   Comportamiento:
   · Todas las cards tienen el MISMO tamaño (la más grande condiciona
     al resto). Esto se consigue con CSS grid: todas comparten celda,
     la celda se dimensiona al contenido más alto y cada card lleva
     h-full para estirarse.
   · Ninguna card asoma por DEBAJO de la frontal — solo por encima.
     Esto se garantiza con transform-origin: top center + escala
     decreciente + translateY negativo en cards traseras.
   · La card del fondo del stack NO lleva sombra; las demás SÍ.
   · Hover sobre el stack → las cards de atrás suben un poco más.
   · Click en una card de atrás → esa card pasa al frente con un
     movimiento spring (ease in/out natural, sensación 3D suave).

   Variante con texto adicional:
   · Si pasas `extraTextPosition` ("left" | "right"), se reserva un
     área al lado del stack para mostrar un texto contextual.
   · Cada testimonial puede incluir un campo `extraText`. Cuando esa
     card está en el frente, su texto se muestra con un fundido
     suave. Al cambiar de card, el texto anterior se disuelve y
     entra el nuevo (o desaparece si la nueva no tiene texto).
   · Si la primera card cargada tiene `extraText`, se muestra desde
     el inicio (entrada con fade-in).
   ════════════════════════════════════════════════════════════════ */

const PEEK_DEFAULT = 12  // offset Y entre cards en reposo
const PEEK_HOVER = 24    // offset Y al pasar el cursor por el stack
const SCALE_STEP = 0.03  // reducción de escala por cada nivel hacia atrás

export default function TestimonialCardStack({
  testimonials,
  extraTextPosition,  // 'left' | 'right' | undefined
}) {
  const [order, setOrder] = useState(() => testimonials.map((_, i) => i))
  const [hovering, setHovering] = useState(false)

  const bringToFront = (origIdx) => {
    setOrder(prev => {
      if (prev[0] === origIdx) return prev
      return [origIdx, ...prev.filter(i => i !== origIdx)]
    })
  }

  const reservedTop = (order.length - 1) * PEEK_HOVER
  const frontExtraText = testimonials[order[0]]?.extraText

  /* ── Stack en sí ── */
  const stack = (
    <div
      className="grid w-full max-w-[535px]"
      style={{
        perspective: '1200px',
        paddingTop: `${reservedTop}px`,
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {order.map((origIdx, stackPos) => {
        const isFront = stackPos === 0
        const isBack = stackPos === order.length - 1
        const peek = hovering && !isFront ? PEEK_HOVER : PEEK_DEFAULT
        const targetY = -stackPos * peek
        const targetScale = 1 - stackPos * SCALE_STEP

        return (
          <motion.div
            key={origIdx}
            className="col-start-1 row-start-1"
            style={{
              zIndex: order.length - stackPos,
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
            }}
            animate={{
              y: targetY,
              scale: targetScale,
            }}
            transition={{
              type: 'spring',
              stiffness: 220,
              damping: 26,
              mass: 0.9,
            }}
            onClick={isFront ? undefined : () => bringToFront(origIdx)}
            role={isFront ? undefined : 'button'}
            tabIndex={isFront ? -1 : 0}
            onKeyDown={
              isFront
                ? undefined
                : (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      bringToFront(origIdx)
                    }
                  }
            }
            aria-label={
              isFront
                ? undefined
                : `Llevar al frente el testimonio de ${testimonials[origIdx].name}`
            }
          >
            <div className={`h-full ${isFront ? '' : 'cursor-pointer'}`}>
              <TestimonialCard
                {...testimonials[origIdx]}
                hasShadow={!isBack}
              />
            </div>
          </motion.div>
        )
      })}
    </div>
  )

  /* ── Sin texto adicional: devolvemos solo el stack ── */
  if (!extraTextPosition) return stack

  /* ── Texto adicional con fade in/out al cambiar de card ── */
  const text = (
    <div className="flex-1 max-w-[535px] min-w-0">
      <AnimatePresence mode="wait">
        {frontExtraText && (
          <motion.p
            key={frontExtraText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="font-sans text-base leading-[26px] text-text-secondary whitespace-pre-line"
          >
            {frontExtraText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <div className="flex items-center gap-[22px] flex-wrap lg:flex-nowrap">
      {extraTextPosition === 'left' && text}
      <div className="shrink-0 w-full max-w-[535px]">{stack}</div>
      {extraTextPosition === 'right' && text}
    </div>
  )
}
