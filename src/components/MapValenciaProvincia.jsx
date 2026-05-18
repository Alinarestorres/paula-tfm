import { useState, useRef, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ComarcaDataCard from './ComarcaDataCard'

/* ════════════════════════════════════════════════════════════════
   MapValenciaProvincia — Mapa minimalista de la provincia de València
   Figma: nodes 34:4951 (base) · 34:4952 (con hover)

   Versión 2 (ajustes):
   · Encerrado en un container 16:9 responsive (aspect-[16/9] w-full)
   · ViewBox más horizontal y ajustado al contenido (790x600) para
     que el mapa ocupe ~65% del ancho del container, centrado, con
     márgenes laterales — proporción cercana al Figma
   · Comarcas más pequeñas y con gaps más estrechos (6–10 px en
     viewBox units) → sensación compacta y minimalista
   · Tooltip reducido a 280px de ancho
   · Disolución del tooltip suavizada: 0.45s sin mode="wait" para
     que el viejo y el nuevo se crucen (cross-dissolve real)
   ════════════════════════════════════════════════════════════════ */

const VIEWBOX_W = 790
const VIEWBOX_H = 600

/* Layout geográfico de las 17 comarcas con dimensiones reducidas y
   gaps de 5–10 viewBox units entre vecinas. */
const COMARCAS = [
  // Norte exclavado
  { id: 'rincon',      x: 185, y: 10,  w: 145, h: 48,  label: 'El Rincón\nde Ademuz', fullName: 'El Rincón de Ademuz' },

  // Norte
  { id: 'serranos',    x: 195, y: 70,  w: 225, h: 72,  label: 'Los Serranos', fullName: 'Los Serranos' },
  { id: 'morvedre',    x: 635, y: 85,  w: 130, h: 58,  label: 'Camp de\nMorvedre', fullName: 'Camp de Morvedre' },

  // Centro-norte
  { id: 'requena',     x: 25,  y: 165, w: 195, h: 115, label: 'Requena-Utiel', fullName: 'Requena-Utiel' },
  { id: 'turia',       x: 230, y: 160, w: 215, h: 72,  label: 'Camp de Túria', fullName: 'Camp de Túria' },
  { id: 'hortanord',   x: 635, y: 160, w: 130, h: 50,  label: "L'Horta Nord", fullName: "L'Horta Nord" },

  // Centro
  { id: 'hoya',        x: 230, y: 240, w: 180, h: 65,  label: 'La Hoya\nde Buñol', fullName: 'La Hoya de Buñol' },
  { id: 'hortaoest',   x: 420, y: 240, w: 85,  h: 42,  label: "L'Horta\nOest", fullName: "L'Horta Oest" },
  { id: 'valencia',    x: 515, y: 220, w: 130, h: 70,  label: 'València', fullName: 'València' },

  // Centro-sur
  { id: 'cofrentes',   x: 25,  y: 290, w: 195, h: 120, label: 'Valle de\nCofrentes-Ayora', fullName: 'El Valle de Cofrentes-Ayora' },
  { id: 'hortasud',    x: 515, y: 300, w: 130, h: 50,  label: "L'Horta Sud", fullName: "L'Horta Sud" },

  // Sur centro
  { id: 'navarres',    x: 230, y: 315, w: 170, h: 80,  label: 'Canal de\nNavarrés', fullName: 'La Canal de Navarrés' },
  { id: 'riberaalta',  x: 420, y: 295, w: 85,  h: 70,  label: 'Ribera\nAlta', fullName: 'La Ribera Alta' },
  { id: 'riberabaixa', x: 515, y: 360, w: 130, h: 65,  label: 'Ribera Baixa', fullName: 'La Ribera Baixa' },

  // Sur
  { id: 'safor',       x: 415, y: 375, w: 95,  h: 140, label: 'La Safor', fullName: 'La Safor' },
  { id: 'costera',     x: 230, y: 405, w: 170, h: 70,  label: 'La Costera', fullName: 'La Costera' },

  // Far sur
  { id: 'vall',        x: 230, y: 485, w: 180, h: 65,  label: "Vall d'Albaida", fullName: "La Vall d'Albaida" },
]

/* Mapeo % esfuerzo → token de color (paleta secondary).
   Más esfuerzo = más oscuro. Textos blancos en todos los niveles. */
function getFillClass(effort) {
  if (effort >= 60) return 'fill-secondary-700'
  if (effort >= 45) return 'fill-secondary-600'
  if (effort >= 35) return 'fill-secondary-500'
  if (effort >= 25) return 'fill-secondary-400'
  if (effort >= 20) return 'fill-secondary-300'
  if (effort >= 17) return 'fill-secondary-200'
  return 'fill-secondary-100'
}

/* Tooltip mucho más pequeño que la versión inicial (280×130). */
const TOOLTIP_W = 280
const TOOLTIP_H = 130

export default function MapValenciaProvincia({ data }) {
  const containerRef = useRef(null)
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 })
  const [hoveredId, setHoveredId] = useState(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  /* Observa el tamaño del contenedor para clamp del tooltip */
  useLayoutEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current
    const ro = new ResizeObserver(([entry]) => {
      setContainerSize({ w: entry.contentRect.width, h: entry.contentRect.height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  /* En cada movimiento del cursor: actualizamos posición Y determinamos
     si está exactamente sobre una comarca. Usamos closest() para subir
     desde el target del evento hasta el <g data-comarca-id="..."> más
     cercano. Si no hay → hoveredId = null y el tooltip desaparece.
     Esto garantiza que el tooltip solo se muestra cuando el cursor
     está literalmente sobre el rect de una comarca, no en los gaps. */
  const onMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })

    const target = e.target.closest?.('[data-comarca-id]')
    const newId = target?.getAttribute('data-comarca-id') ?? null
    setHoveredId(prev => (prev === newId ? prev : newId))
  }

  const hoveredData = hoveredId ? data.find(d => d.id === hoveredId) : null
  const hoveredComarca = hoveredId ? COMARCAS.find(c => c.id === hoveredId) : null

  /* Clamp del tooltip para que no se salga del container */
  const tooltipX = Math.max(
    0,
    Math.min(cursor.x + 12, containerSize.w - TOOLTIP_W - 8),
  )
  const tooltipY = Math.max(
    0,
    Math.min(cursor.y + 12, containerSize.h - TOOLTIP_H - 8),
  )

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] overflow-hidden"
      onMouseMove={onMouseMove}
      onMouseLeave={() => setHoveredId(null)}
    >
      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full block"
        role="img"
        aria-label="Mapa de las comarcas de la provincia de València"
      >
        {COMARCAS.map(c => {
          const d = data.find(d => d.id === c.id)
          const fillClass = d ? getFillClass(d.effort) : 'fill-secondary-100'
          const isHovered = hoveredId === c.id
          const isDimmed = hoveredId && !isHovered

          return (
            <g
              key={c.id}
              data-comarca-id={c.id}
              className="cursor-pointer"
              style={{
                opacity: isDimmed ? 0.55 : 1,
                transition: 'opacity 200ms ease',
              }}
            >
              <rect
                x={c.x}
                y={c.y}
                width={c.w}
                height={c.h}
                rx={10}
                className={fillClass}
                stroke="#FDFCFA"
                strokeWidth={isHovered ? 1.5 : 0}
                style={{ transition: 'stroke-width 150ms ease' }}
              />
              <text
                x={c.x + c.w / 2}
                y={c.y + c.h / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-sans font-medium fill-white pointer-events-none select-none"
                style={{ fontSize: 11 }}
              >
                {(() => {
                  const lines = c.label.split('\n')
                  const lineHeight = 13
                  return lines.map((line, i) => (
                    <tspan
                      key={i}
                      x={c.x + c.w / 2}
                      dy={
                        i === 0
                          ? -((lines.length - 1) * lineHeight) / 2
                          : lineHeight
                      }
                    >
                      {line}
                    </tspan>
                  ))
                })()}
              </text>
            </g>
          )
        })}
      </svg>

      {/* ── Tooltip con la card de datos ──
          La envoltura permanece siempre montada (CSS opacity) para que
          la posición se actualice suavemente. AnimatePresence interno
          gestiona el cross-dissolve entre cards al cambiar de comarca. */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300 ease-in-out"
        style={{
          left: tooltipX,
          top: tooltipY,
          width: TOOLTIP_W,
          opacity: hoveredId ? 1 : 0,
        }}
      >
        <AnimatePresence>
          {hoveredData && hoveredComarca && (
            <motion.div
              key={hoveredId}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
            >
              <ComarcaDataCard
                name={hoveredComarca.fullName}
                priceM2={hoveredData.priceM2}
                rent={hoveredData.rent}
                effort={hoveredData.effort}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
