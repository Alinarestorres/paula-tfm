/* ════════════════════════════════════════════════════════════════
   ComarcaDataCard — Tarjeta de datos de comarca (tooltip del mapa)
   Figma: node 34:4954

   Dimensiones reducidas (~280px wide) para encajar como tooltip
   compacto dentro del container 16:9 del mapa. Todas las
   proporciones internas escalan respecto al diseño original.
   ════════════════════════════════════════════════════════════════ */

export default function ComarcaDataCard({ name, priceM2, rent, effort }) {
  return (
    <article
      className="bg-surface-elevated rounded-2xl w-full max-w-[280px] pt-3 pr-4 pb-4 pl-4 flex flex-col gap-3"
      style={{ boxShadow: '0 0 20px 0 rgba(8, 21, 50, 0.20)' }}
    >

      {/* ── Cabecera ── */}
      <header className="flex items-center justify-between gap-2">
        <span className="font-sans font-medium text-[9px] uppercase tracking-[0.06em] text-text-disabled">
          COMARCA
        </span>
        <div className="bg-secondary-300 rounded-full px-2 py-[5px] inline-flex items-center">
          <span className="font-sans font-normal text-[11px] leading-none text-text-primary whitespace-nowrap">
            Esfuerzo Financiero: <span className="font-medium">{effort}%</span>
          </span>
        </div>
      </header>

      {/* ── Título + datos ── */}
      <div className="flex flex-col gap-2">
        <h3 className="font-sans font-medium text-sm leading-none text-text-primary">
          {name}
        </h3>

        <div className="flex flex-col gap-1.5">
          <DataRow label="Precio obra nueva:" value={priceM2} unit="m²" />
          <DataRow label="Alquiler medio:" value={rent} unit="mes" />
        </div>
      </div>
    </article>
  )
}

/* Fila de datos: etiqueta + línea dashed que rellena el hueco + valor grande */
function DataRow({ label, value, unit }) {
  return (
    <div className="flex items-end gap-2">
      <span className="font-sans text-[10px] text-text-secondary shrink-0 mb-1.5">
        {label}
      </span>
      <span className="flex-1 border-b border-dashed border-border-default mb-1.5" aria-hidden />
      <div className="flex items-baseline gap-0.5 shrink-0">
        <span className="font-display font-bold text-[22px] leading-none text-secondary-400 tabular-nums">
          {value.toLocaleString('es-ES')}
        </span>
        <span className="font-display font-bold text-[12px] leading-none text-secondary-400">
          €
        </span>
        <span className="font-sans font-medium text-[10px] leading-none text-secondary-400">
          /{unit}
        </span>
      </div>
    </div>
  )
}
