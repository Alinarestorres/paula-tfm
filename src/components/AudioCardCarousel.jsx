import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import AudioCard from './AudioCard'

/* ════════════════════════════════════════════════════════════════
   AudioCardCarousel — Carousel horizontal de AudioCards
   Figma: nodes 77:1363 (2-cards) · 50:5420 (Section 2 context)

   ARQUITECTURA:
   Las cards se rendrizan como hijas FLEX de una sola "strip" con
   `gap: 20px`. Ser hijas flex garantiza por construcción que nunca
   se solapen entre sí — el navegador siempre las separa por el gap
   definido. La animación de slide (cuando es necesaria) se aplica
   al CONTENEDOR flex completo, no a cada card individualmente.

   Esto reemplaza una versión anterior basada en posicionamiento
   absoluto + translateX individual, donde cada card era un elemento
   independiente y existía riesgo (durante transiciones / renders
   tempranos) de que dos cards acabaran en la misma x.

   COMPORTAMIENTO:
   · Cards responsive — cardWidth = (viewport − GAP) / 2, medido en
     runtime, igual al ancho de la AudioCard standalone de Section 6.
   · Click en card no-activa o en un dot → cambia el activo:
       - Con ≤ 2 cards (Sections 2 / 5): las dos cards conviven
         siempre visibles. El click solo conmuta el estado vía
         crossfade dark ↔ cream; el strip no se desplaza.
       - Con > 2 cards (Section 3): el strip se desplaza para que
         la activa quede a la izquierda y, si hay previa, ésta
         asome PEEK px desde el borde izquierdo.
   · Hover sobre card no-activa → todas las cards se desplazan
     HOVER_SHIFT px hacia el centro, manteniendo los 20px de gap.
   · Dots con grow/shrink + crossfade activo/disabled al cambiar.

   Props:
   · items     — array de { label, number, title, author, src }
   · align     — 'center' (default) o 'left'
   · className — clases extra para el root (rara vez necesario)
   ════════════════════════════════════════════════════════════════ */

const GAP = 20
const CARDS_VISIBLE = 2

/* Píxeles de la card prev visibles a la izquierda cuando align="left"
   y hay una card previa (modo > 2 cards). */
const PEEK = 60

/* Desplazamiento del strip cuando se hace hover sobre una card no
   activa, hacia el lado opuesto al hover. */
const HOVER_SHIFT = 10

const DOT_SIZE_ACTIVE = 12
const DOT_SIZE_INACTIVE = 7

const VIEWPORT_HEIGHT = 294

export default function AudioCardCarousel({
  items,
  align = 'center',
  className = '',
}) {
  const viewportRef = useRef(null)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const isLeftAligned = align === 'left'

  /* ── Medición responsive del viewport ──
     ResizeObserver mantiene viewportWidth sincronizado en mount +
     resize. useLayoutEffect aplica la primera medida antes del
     primer paint → sin flicker. */
  useLayoutEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const update = () => setViewportWidth(el.clientWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const cardWidth = viewportWidth > 0
    ? Math.max(0, (viewportWidth - GAP) / CARDS_VISIBLE)
    : 0
  const step = cardWidth + GAP
  const needsScroll = items.length > CARDS_VISIBLE

  /* ── Traslación del strip completo ──
     · align="left" + ≤ 2 cards → 0 (ambas siempre visibles)
     · align="left" + > 2 cards → activa pegada a la izquierda con
       PEEK opcional para asomar la prev
     · align="center" → activa centrada en el viewport */
  let stripX = 0
  if (isLeftAligned && needsScroll) {
    const peekOffset = activeIndex > 0 ? (PEEK + GAP) : 0
    stripX = -(activeIndex * step) + peekOffset
  } else if (!isLeftAligned && cardWidth > 0) {
    stripX = -activeIndex * step + (viewportWidth / 2) - (cardWidth / 2)
  }

  /* ── Hover shift en bloque ──
     Cuando el cursor está sobre una card no-activa, TODO el strip
     se desplaza HOVER_SHIFT px hacia el lado opuesto. Mover en
     bloque preserva los 20px de gap entre cualquier par de cards. */
  const hoverActive = hoveredIndex !== null && hoveredIndex !== activeIndex
  const hoverDirection = hoverActive
    ? ((hoveredIndex - activeIndex) < 0 ? +1 : -1)
    : 0
  const groupShiftX = hoverActive ? hoverDirection * HOVER_SHIFT : 0

  /* No renderizamos el strip hasta tener un ancho real; el div
     viewport sí se renderiza siempre (ResizeObserver lo necesita). */
  const ready = cardWidth > 0

  return (
    <div className={`w-full ${className}`}>

      {/* ── Viewport: enmascara el strip ── */}
      <div
        ref={viewportRef}
        className="relative overflow-hidden w-full"
        style={{ height: VIEWPORT_HEIGHT }}
      >
        {ready && (
          <motion.div
            className="absolute top-0 left-0 flex items-stretch"
            style={{ gap: GAP, height: VIEWPORT_HEIGHT }}
            initial={false}
            animate={{ x: stripX + groupShiftX }}
            transition={{
              type: 'tween',
              duration: 0.55,
              ease: [0.42, 0, 0.58, 1],
            }}
          >
            {items.map((item, i) => {
              const isActive = i === activeIndex
              return (
                <div
                  key={i}
                  className="relative shrink-0"
                  style={{ width: cardWidth, height: VIEWPORT_HEIGHT }}
                  onMouseEnter={isActive ? undefined : () => setHoveredIndex(i)}
                  onMouseLeave={isActive ? undefined : () => setHoveredIndex(null)}
                >
                  {/* Capa disabled — visible cuando NO es la activa */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ opacity: isActive ? 0 : 1 }}
                    style={{ pointerEvents: isActive ? 'none' : 'auto' }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                  >
                    <AudioCard
                      {...item}
                      disabled
                      onClick={isActive ? undefined : () => setActiveIndex(i)}
                    />
                  </motion.div>

                  {/* Capa activa — visible cuando ES la activa */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                  >
                    <AudioCard {...item} />
                  </motion.div>
                </div>
              )
            })}
          </motion.div>
        )}
      </div>

      {/* ── Dots — centrados bajo la card activa de la izquierda en
          align="left", o globalmente en align="center".
          Solo se renderizan cuando hay más de 2 cards (= 3 o más):
          con 1 o 2 cards no aporta navegación (ambas ya conviven en
          pantalla) y los dots quedan ruidosos. */}
      {needsScroll && (
        <div
          className="flex items-center gap-2 mt-5 justify-center"
          style={isLeftAligned && ready ? { width: cardWidth } : undefined}
        >
          {items.map((_, i) => {
            const isActive = i === activeIndex
            return (
              <motion.button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`
                  rounded-full cursor-pointer transition-colors duration-300
                  ${isActive ? 'bg-text-disabled' : 'bg-border-subtle hover:bg-border-default'}
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300
                `}
                animate={{
                  width: isActive ? DOT_SIZE_ACTIVE : DOT_SIZE_INACTIVE,
                  height: isActive ? DOT_SIZE_ACTIVE : DOT_SIZE_INACTIVE,
                }}
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 360,
                  damping: 22,
                  mass: 0.8,
                }}
                aria-label={`Ir al testimonio ${i + 1}`}
                aria-current={isActive ? 'true' : undefined}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
