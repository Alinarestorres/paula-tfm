import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/* ════════════════════════════════════════════════════════════════
   SectionNav — Navegación lateral con dots conectados por una línea
   Figma: nodes 31:4414 (estado base) · 31:4465 (estado scroll)

   Funcionamiento:
   · Detecta qué sección de la landing está en el viewport
   · Tres estados visuales para cada dot:
       - Futura (i > activeIndex)   → stroke oscuro, interior blanco
       - Activa (i === activeIndex) → stroke azul,  interior blanco
       - Pasada (i < activeIndex)   → relleno azul completo (mismo
                                       azul que la línea de progreso)
   · La línea vertical entre el dot activo y el siguiente se rellena
     de azul progresivamente según el avance dentro de la sección
   · Al cambiar de sección, el progreso reinicia y avanza la sgte línea

   Props:
   · sections — array de { id, label }. Cada id debe corresponder
                a un <section id="..."> en la landing.
   ════════════════════════════════════════════════════════════════ */

const DEFAULT_SECTIONS = [
  { id: 'seccion-1', label: 'Introducción' },
  { id: 'seccion-2', label: 'Género y cuidados' },
  { id: 'seccion-3', label: 'La “ciudad turística”' },
  { id: 'seccion-4', label: '¿Desafíos de gestión o fractura social?' },
  { id: 'seccion-5', label: 'El derecho a techo' },
  { id: 'seccion-6', label: 'Precio de la vivienda' },
]

export default function SectionNav({ sections = DEFAULT_SECTIONS }) {
  const dotRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [geo, setGeo] = useState({ top: 0, height: 0, blueHeight: 0 })

  /* ── Tracking de scroll: sección activa + progreso dentro de ella ── */
  useEffect(() => {
    let rafId = null

    const update = () => {
      const els = sections.map(s => document.getElementById(s.id))
      /* Si ninguna sección existe aún (playground sin scroll), salir */
      if (els.every(e => !e)) return

      /* Tomamos como referencia el centro del viewport */
      const viewportMid = window.scrollY + window.innerHeight / 2

      let found = 0
      let prog = 0
      for (let i = els.length - 1; i >= 0; i--) {
        const el = els[i]
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const top = window.scrollY + rect.top
        if (viewportMid >= top) {
          found = i
          prog = rect.height > 0
            ? Math.min(1, Math.max(0, (viewportMid - top) / rect.height))
            : 0
          break
        }
      }
      setActiveIndex(found)
      setProgress(prog)
    }

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        update()
        rafId = null
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [sections])

  /* ── Geometría de la línea: medimos las posiciones reales de los dots ──
     La línea termina en el BOTTOM del último dot (no en su centro)
     para evitar que el interior blanco del círculo deje un hueco
     visual entre la línea y el último círculo. */
  useLayoutEffect(() => {
    const dots = dotRefs.current.filter(Boolean)
    if (dots.length < 2) return

    const centerY = el => el.offsetTop + el.offsetHeight / 2
    const lastDot = dots[dots.length - 1]
    const lineEnd = lastDot.offsetTop + lastDot.offsetHeight

    const firstY = centerY(dots[0])
    const activeY = dots[activeIndex] ? centerY(dots[activeIndex]) : firstY
    const nextY = dots[activeIndex + 1] ? centerY(dots[activeIndex + 1]) : null

    /* En la última sección no hay "next" — interpolamos hacia el final
       de la línea para que el azul también llegue al último dot. */
    const targetY = nextY ?? lineEnd
    const interpolatedY = activeY + (targetY - activeY) * progress

    setGeo({
      top: firstY,
      height: lineEnd - firstY,
      blueHeight: Math.max(0, interpolatedY - firstY),
    })
  }, [activeIndex, progress, sections])

  return (
    <nav className="w-[202px] flex flex-col select-none">

      {/* ── Cabecera oscura con icono + "SECCIONES" ── */}
      <header className="bg-surface-inverse h-8 flex items-center gap-1 px-2 shrink-0 rounded-t-lg">
        <span
          className="w-4 h-4 rounded-full bg-accent-400 flex items-center justify-center shrink-0"
          aria-hidden
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 5h5m-1.5-2L7 5 5.5 7"
              stroke="#FDFCFA"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="font-sans font-medium text-xs uppercase tracking-[0.08em] text-text-inverse leading-none">
          SECCIONES
        </span>
      </header>

      {/* ── Cuerpo blanco con dots + líneas ── */}
      <div className="bg-surface-fg border border-text-primary pl-[10px] pr-2 py-3 relative rounded-b-lg">

        {/* Línea negra de fondo (conecta todos los dots) */}
        <span
          className="absolute left-[14px] w-1 bg-text-primary pointer-events-none"
          style={{ top: `${geo.top}px`, height: `${geo.height}px` }}
          aria-hidden
        />

        {/* Línea azul que crece según el scroll */}
        <span
          className="absolute left-[14px] w-1 bg-secondary-500 pointer-events-none"
          style={{ top: `${geo.top}px`, height: `${geo.blueHeight}px` }}
          aria-hidden
        />

        {/* Lista de secciones */}
        <ul className="relative flex flex-col gap-6">
          {sections.map((s, i) => {
            const isActive = i === activeIndex
            const isPast = i < activeIndex
            /* Tres estados del dot:
               · pasada → relleno azul completo (mismo secondary-500
                          de la línea de progreso) + borde azul
               · activa → interior blanco + borde azul (stroke)
               · futura → interior blanco + borde oscuro */
            const dotClasses = isPast
              ? 'bg-secondary-500 border-secondary-500'
              : isActive
                ? 'bg-surface-fg border-secondary-500'
                : 'bg-surface-fg border-text-primary'
            return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="flex items-start gap-3 group"
                aria-current={isActive ? 'true' : undefined}
              >
                <span
                  ref={el => { dotRefs.current[i] = el }}
                  className={`
                    w-3 h-3 rounded-full shrink-0
                    border-[3px] mt-[5px]
                    transition-colors duration-200
                    ${dotClasses}
                  `}
                  aria-hidden
                />
                <span className="flex flex-col gap-0.5">
                  <span className="font-sans font-light text-[11px] leading-4 text-text-tertiary">
                    Sección {i + 1}
                  </span>
                  <span className="font-sans font-bold text-xs leading-[14px] text-text-primary group-hover:text-secondary-500 transition-colors">
                    {s.label}
                  </span>
                </span>
              </a>
            </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
