/* ════════════════════════════════════════════════════════════════
   Header — Cabecera editorial de la landing
   Figma: node 31:4365 · 1440 × 598 px · TFM Paula

   Layout (desktop ≥ lg):
   ┌──────────────────────────────────────────────────────────────┐
   │  pad-l 280 │ Las (auto) │ gap 20 │ derecha (646) │ pad-r 64 │
   └──────────────────────────────────────────────────────────────┘
   · "Las" arranca arriba del todo (pad-t 160).
   · La columna derecha se desplaza 74px más abajo para alinear
     visualmente el titular con la mitad de "Las".

   Tipografía (siguiendo el DS):
   · "Las"                  → BioRhyme 160px coral
     (Figma marca peso 500 — Google Fonts solo trae 300/400/700/800,
      uso 700 como aproximación visual más fiel)
   · "que sostienen…"       → Helvetica Neue Bold 64px / 64
   · Descripción            → Helvetica Neue ExtraLight 24px / 36
   · Píldora autora         → bg secondary-300 + texto text-primary
                              (HN Medium 20px)
   · Tiempo de lectura      → HN Regular 16px, text-disabled
   ════════════════════════════════════════════════════════════════ */

export default function Header() {
  return (
    <header className="bg-surface-inverse w-full overflow-hidden rounded-b-[32px]">
      <div
        className="
          max-w-[1440px] mx-auto
          px-6 py-14
          lg:px-0 lg:pt-[160px] lg:pb-0 lg:pl-[280px] lg:pr-16
          lg:min-h-[598px]
          flex flex-col
          lg:flex-row lg:items-start lg:gap-5
        "
      >

        {/* ── Columna izquierda: "Las" ──
            lg:w-auto (no fijo a 294) para que la columna se ajuste al
            ancho real del glifo y el gap-5 (20px) sea la distancia
            visual real entre "Las" y "que sostienen el centro.". */}
        <div className="lg:w-auto lg:shrink-0 mb-2 lg:mb-0">
          <span
            className="
              font-display font-bold text-accent-600 block
              text-[80px] leading-[0.92]
              sm:text-[110px]
              lg:text-[160px] lg:leading-[148px]
              tracking-[-0.015em]
            "
          >
            Las
          </span>
        </div>

        {/* ── Columna derecha: titular + descripción + autora ── */}
        <div className="flex flex-col gap-5 lg:pt-[74px] lg:max-w-[646px]">

          {/* Titular */}
          <h1
            className="
              font-sans font-bold text-text-inverse
              text-[36px] leading-[1.05]
              sm:text-[48px] sm:leading-[1.05]
              lg:text-[64px] lg:leading-[64px]
              tracking-[-0.015em]
            "
          >
            que sostienen<br />el centro.
          </h1>

          {/* Descripción / entradilla */}
          <p
            className="
              font-sans font-extralight text-text-inverse
              text-lg leading-7
              sm:text-xl sm:leading-8
              lg:text-[24px] lg:leading-9
              lg:max-w-[535px]
            "
          >
            Un análisis multimedia sobre precariedad laboral, crisis de
            la vivienda y género en la ciudad de València.
          </p>

          {/* Fila autora + tiempo de lectura */}
          <div className="flex flex-wrap items-center gap-3 lg:gap-5 mt-2">

            {/* Píldora con avatar + nombre */}
            <div
              className="
                bg-secondary-300 rounded-full
                inline-flex items-center gap-2
                h-8 pl-2 pr-3
              "
            >
              <span
                className="w-4 h-4 rounded-full bg-text-inverse shrink-0"
                aria-hidden
              />
              <span
                className="
                  font-sans font-medium text-text-primary
                  text-base lg:text-[20px]
                  leading-none whitespace-nowrap
                "
              >
                Paula Sáez Valero
              </span>
            </div>

            {/* Tiempo de lectura */}
            <span className="font-sans text-text-disabled text-sm lg:text-base">
              Lectura: 12 minutos
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
