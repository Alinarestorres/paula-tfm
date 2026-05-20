/* ════════════════════════════════════════════════════════════════
   QuoteXXL — Cita destacada XXL con icono y atribución
   Figma: node 89:1999 · 1090x122

   Anatomía:
   ┌─────────────────────────────────────────────────────┬───────┐
   │ ●   "Nos alegra que pienses en venir a València."   │  │ Web │
   │ ←──── 58px circle + texto ────→     ←── empty ──→   │  │ ofi.│
   └─────────────────────────────────────────────────────┴───────┘
   ↑                                                     ↑     ↑
   border-strong + rounded-24                       línea 1px  pad

   · Container: border 1px border-strong, rounded-24, overflow-hidden
     para que la caja oscura herede las esquinas.
   · Izq: circle 58 (secondary-500) + svg quote-glyph blanco +
     texto Helvetica Neue extralight 24/36, text-primary.
   · Der: shrink-0 + ml-auto → se pega al borde derecho. Al crecer
     el viewport, queda más espacio en el medio (no se estira).
     Fondo surface-inverse, línea vertical 1px border-strong en
     left:0, atribución Helvetica Neue medium 20/32 blanco.

   Props:
   · quote       — texto principal de la cita
   · attribution — texto pequeño de la caja oscura derecha
   ════════════════════════════════════════════════════════════════ */

export default function QuoteXXL({
  quote = 'Nos alegra que pienses en venir a València. Porque aquí la vida se vive mejor.',
  attribution = 'Web oficial de Visit València.',
}) {
  return (
    <div
      className="
        flex items-stretch w-full
        rounded-[24px] border border-border-strong
        bg-surface-fg
        overflow-hidden
      "
    >

      {/* ── Izquierda: icono circular + cita ── */}
      <div className="flex items-center gap-4 pl-6 py-5 min-w-0">

        {/* Círculo azul con quote-glyph blanco. Tamaño y color
            tomados directamente del Figma. */}
        <div className="w-[58px] h-[58px] rounded-full bg-secondary-500 flex items-center justify-center shrink-0">
          <svg
            width="28"
            height="20"
            viewBox="0 0 28 20"
            fill="#FDFCFA"
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 20V11.5C0 5.2 3.9 0.5 10.6 0L11.4 3.6C7.7 4.3 5 7 5 10H11V20H0Z" />
            <path d="M17 20V11.5C17 5.2 20.9 0.5 27.6 0L28.4 3.6C24.7 4.3 22 7 22 10H28V20H17Z" />
          </svg>
        </div>

        {/* Cita: el max-w-[460px] reproduce el wrap a 2 líneas
            del Figma con un texto del tamaño del de referencia.
            Con textos más cortos cabe en 1 línea sin forzar. */}
        <p
          className="
            font-sans font-extralight
            text-2xl leading-9
            text-text-primary
            max-w-[460px]
          "
        >
          {quote}
        </p>
      </div>

      {/* ── Derecha: caja oscura con atribución ──
          shrink-0 + ml-auto = se pega al borde derecho y al crecer
          el viewport queda más aire en el medio entre la cita y
          esta caja.
          relative + <span absolute left:0> dibuja la línea vertical
          de 1px en el borde izquierdo de la caja, alineada con la
          altura completa, sin depender de gaps. */}
      <div
        className="
          shrink-0 ml-auto self-stretch
          bg-surface-inverse
          flex items-center
          pl-[38px] pr-6
          relative
        "
      >
        <span
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-px bg-border-strong"
        />
        <p
          className="
            font-sans font-medium
            text-xl leading-8
            text-text-inverse
            max-w-[144px]
          "
        >
          {attribution}
        </p>
      </div>

    </div>
  )
}
