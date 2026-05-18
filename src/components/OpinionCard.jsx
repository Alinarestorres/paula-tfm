import { Children, cloneElement, isValidElement, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ════════════════════════════════════════════════════════════════
   OpinionCard — Card editorial de opinión / cita literal
   Figma: nodes 71:215 (verde) · 71:225 (púrpura)

   Anatomía (de arriba a abajo):
   ┌──────────────────────────────────────────────────────────────┐
   │  ╭─ pill ──────────────────╮ ╭badge╮               OPINIÓN  │
   │  │ ● TRABAJADORA ANÓNIMA   │ │  1  │                         │
   │  ╰─────────────────────────╯ ╰─────╯                         │
   │                                                              │
   │  “Cita literal en blanco, grande, con comillas curvas”       │
   └──────────────────────────────────────────────────────────────┘

   · Fondo: color de variante (verde, púrpura, coral, azul, ámbar)
   · Pill autor: fondo oscuro #252525 con texto + dot en color variante
   · Badge: círculo oscuro con número en color variante
   · "OPINIÓN": label minúsculo arriba a la derecha (text-primary)
   · Cita: blanca, Helvetica Neue 500, 32/40

   Props:
   · variant  — 'green' | 'purple' | 'coral' | 'blue' | 'amber'
   · author   — texto del pill (default "TRABAJADORA ANÓNIMA")
   · number   — número que muestra el badge (auto si va en Group)
   · quote    — texto de la cita SIN comillas (se añaden auto)

   Para auto-numerar varias cards usa <OpinionCardGroup>.
   ════════════════════════════════════════════════════════════════ */

const PALETTE = {
  green:  '#459662',  /* --color-success / --color-data-4 */
  purple: '#67477F',  /* --color-data-5                   */
  coral:  '#E4705B',  /* --color-accent-400 / --color-data-1 */
  blue:   '#3579B5',  /* --color-secondary-500 / --color-data-2 */
  amber:  '#E89B38',  /* --color-warning / --color-data-3 */
}

export default function OpinionCard({
  variant = 'green',
  author = 'TRABAJADORA ANÓNIMA',
  number = 1,
  quote = '',
}) {
  const bg = PALETTE[variant] ?? PALETTE.green

  /* ── Reveal al entrar en viewport + hover scale ──
     · `useInView` con `once: true` dispara la entrada UNA vez por card
       y se conserva visible aunque salga del viewport.
     · `amount: 0.25` exige que un 25% de la card sea visible antes
       de disparar — sensación de "ahora aparece" más natural.
     · El delay escala con `number` (1..N): genera el efecto cascada
       cuando varias cards entran simultáneamente, y queda invisible
       cuando entran de una en una porque ya hay separación de scroll
       entre ellas.
     · El hover define su propia `transition` (spring suave) para que
       no herede el delay/duración del reveal — son animaciones
       independientes. */
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })
  const revealDelay = Math.max(0, Number(number) - 1) * 0.12

  return (
    <motion.article
      ref={ref}
      className="
        w-full rounded-[24px]
        p-6 sm:p-8
        flex flex-col gap-6 sm:gap-8
        will-change-transform
      "
      style={{ backgroundColor: bg }}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
        delay: revealDelay,
      }}
      whileHover={{
        scale: 1.015,
        transition: { type: 'spring', stiffness: 260, damping: 22, mass: 0.6 },
      }}
    >

      {/* ── Heading: pill+badge a la izquierda, "OPINIÓN" a la derecha ── */}
      <header className="flex items-center justify-between gap-4 flex-wrap">

        {/* Grupo izquierdo: pill autor + badge número */}
        <div className="flex items-center gap-2">

          {/* Pill autor — fondo oscuro, dot + texto en color variante */}
          <div
            className="
              flex items-center gap-1
              bg-surface-inverse rounded-full
              pl-2 pr-3 py-2
            "
          >
            <span
              className="block w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: bg }}
            />
            <span
              className="font-sans font-medium text-xs leading-4 uppercase"
              style={{ color: bg, letterSpacing: '0.08em' }}
            >
              {author}
            </span>
          </div>

          {/* Badge número — círculo oscuro 32x32 con cifra en color variante */}
          <div
            className="
              w-8 h-8 rounded-full bg-surface-inverse
              flex items-center justify-center shrink-0
            "
          >
            <span
              className="font-sans font-medium text-base leading-none"
              style={{ color: bg, letterSpacing: '0.08em' }}
            >
              {number}
            </span>
          </div>
        </div>

        {/* "OPINIÓN" — label pequeño en texto oscuro */}
        <span
          className="font-sans font-normal text-[11px] leading-[14px] uppercase text-text-primary"
          style={{ letterSpacing: '0.04em' }}
        >
          OPINIÓN
        </span>
      </header>

      {/* ── Cita literal en blanco — se añaden comillas curvas auto ── */}
      <blockquote
        className="
          font-sans font-medium text-text-inverse
          text-2xl sm:text-[28px] lg:text-[32px]
          leading-[1.25] tracking-[-0.01em]
          m-0
        "
      >
        {`“${quote}”`}
      </blockquote>
    </motion.article>
  )
}

/* ════════════════════════════════════════════════════════════════
   OpinionCardGroup — Apila OpinionCards y autonumera el badge.

   Uso 1 (children):
     <OpinionCardGroup>
       <OpinionCard variant="green"  quote="..." />
       <OpinionCard variant="purple" quote="..." />
     </OpinionCardGroup>

   Uso 2 (items array — apilado vertical simple):
     <OpinionCardGroup
       items={[
         { variant: 'green',  quote: '...' },
         { variant: 'purple', quote: '...' },
       ]}
     />

   Uso 3 (rows — layout en filas con título opcional a la izquierda):
     <OpinionCardGroup
       rows={[
         { title: 'Otras trabajadoras...', items: [{ variant: 'green', quote: '...' }] },
         { items: [{ variant: 'purple', quote: '...' }] },           // fila full-width
         { items: [{ variant: 'amber', quote: '...' }, { variant: 'coral', quote: '...' }] },
       ]}
     />

     · Las filas se separan 20px (gap-5) y las cards dentro de cada
       fila también 20px.
     · Cuando una fila tiene `title`, ocupa la mitad izquierda del
       ancho (en desktop) y la card a la derecha. En mobile, el
       título queda encima de la card.
     · Las cards de filas con 2 items reparten el ancho 50/50.
     · Una fila con 1 item y sin título ocupa todo el ancho.

   En todos los modos el número del badge se asigna automáticamente
   como índice+1 sobre el TOTAL de cards (flat, atravesando filas).
   Si una card define `number` explícito, se respeta.
   ════════════════════════════════════════════════════════════════ */
export function OpinionCardGroup({
  items,
  rows,
  children,
  gap = 'gap-5',
  className = '',
}) {
  /* Modo rows — layout estructurado en filas */
  if (Array.isArray(rows)) {
    let counter = 0
    return (
      <div className={`flex flex-col ${gap} ${className}`}>
        {rows.map((row, ri) => {
          const rowItems = row.items ?? []
          const hasTitle = Boolean(row.title)
          /* Card "huérfana" sin título y única → ocupa toda la fila */
          const isSingleFull = !hasTitle && rowItems.length === 1

          return (
            <div
              key={ri}
              className={`
                grid ${gap}
                ${isSingleFull
                  ? 'grid-cols-1'
                  : 'grid-cols-1 md:grid-cols-2 items-start'}
              `}
            >
              {hasTitle && (
                <h3
                  className="
                    font-sans font-medium text-text-primary
                    text-2xl sm:text-[28px] lg:text-[32px]
                    leading-[1.25] tracking-[-0.01em]
                    self-start
                  "
                >
                  {row.title}
                </h3>
              )}
              {rowItems.map((item, ii) => {
                counter += 1
                return (
                  <OpinionCard
                    key={ii}
                    number={item.number ?? counter}
                    {...item}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }

  /* Modo items array */
  if (Array.isArray(items)) {
    return (
      <div className={`flex flex-col ${gap} ${className}`}>
        {items.map((item, i) => (
          <OpinionCard
            key={i}
            number={item.number ?? i + 1}
            {...item}
          />
        ))}
      </div>
    )
  }

  /* Modo children — clonar inyectando número si no lo trae */
  const arr = Children.toArray(children).filter(isValidElement)
  return (
    <div className={`flex flex-col ${gap} ${className}`}>
      {arr.map((child, i) =>
        cloneElement(child, {
          number: child.props.number ?? i + 1,
          key: i,
        })
      )}
    </div>
  )
}
