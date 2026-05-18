/* ════════════════════════════════════════════════════════════════
   Manifesto — Card editorial del Manifiesto Turismo Que Suma 2025
   Figma: node 47:5005 · 1091x490 px

   Layout:
   ┌──────────────────────────────────────────────────────────┐
   │ ╭───── card 1 ─────╮  ╭───── card 2 ─────╮               │
   │ │ 1 Gestión...     │  │ 2 Identidad...   │               │
   │ │   Fomentar...    │  │   Evitar...      │               │
   │ ╰──────────────────╯  ╰──────────────────╯               │
   │ ╭───── card 3 ─────╮  ╭───── card 4 ─────╮               │
   │ │ 3 Dignificación..│  │ 4 Protección...  │               │
   │ │   Atraer...      │  │   Acelerar...    │               │
   │ ╰──────────────────╯  ╰──────────────────╯               │
   │ ╭───── card 5 ─────╮     Manifiesto                      │
   │ │ 5 Gobernanza...  │     Turismo Que Suma                │
   │ │   Crear...       │     2025                            │
   │ ╰──────────────────╯                                     │
   └──────────────────────────────────────────────────────────┘

   · Card exterior: bg blanco, border 1px border-default, radius 32
   · Cards internas: border 1px border-subtle, radius 16
   · Todas las cards internas comparten dimensiones (grid stretch)
   · Título editorial en la esquina inferior derecha, sin borde
   · Componente puramente visual — sin animaciones ni interacción
   ════════════════════════════════════════════════════════════════ */

const MANIFESTO_ITEMS = [
  {
    n: '1',
    title: 'Gestión de la saturación',
    text: 'Fomentar la escucha ciudadana, combatir la oferta ilegal y las viviendas turísticas no reguladas.',
  },
  {
    n: '2',
    title: 'Identidad cultural',
    text: 'Evitar la estandarización global, proteger el patrimonio y fomentar el consumo de proximidad (Km 0).',
  },
  {
    n: '3',
    title: 'Dignificación laboral',
    text: 'Atraer talento mediante estabilidad contractual, salarios equitativos y medidas reales de conciliación.',
  },
  {
    n: '4',
    title: 'Protección medioambiental',
    text: 'Acelerar la descarbonización (uso de combustibles SAF en aviación) y optimizar el consumo de recursos básicos.',
  },
  {
    n: '5',
    title: 'Gobernanza participativa',
    text: 'Crear "Consejos Turísticos Ciudadanos" que integren a la sociedad civil en la toma de decisiones.',
  },
]

export default function Manifesto() {
  return (
    <article className="bg-surface-fg border border-border-default rounded-[32px] p-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {MANIFESTO_ITEMS.map(item => (
          <ManifestoBullet key={item.n} {...item} />
        ))}
        <ManifestoTitle />
      </div>
    </article>
  )
}

/* Card individual de cada bullet del manifiesto */
function ManifestoBullet({ n, title, text }) {
  return (
    <div
      className="
        border border-border-subtle rounded-2xl p-4
        flex flex-col gap-3 h-full
      "
    >
      {/* Heading: número grande + título, bottom-aligned */}
      <header className="flex items-end gap-2">
        <span className="font-display font-bold text-[56px] leading-none text-accent-400 shrink-0">
          {n}
        </span>
        <h3 className="font-sans font-medium text-2xl leading-[32px] text-text-primary mb-0.5">
          {title}
        </h3>
      </header>

      {/* Descripción, indentada para alinearse con el texto del título */}
      <p className="font-sans font-light text-base leading-[26px] text-text-secondary pl-[44px]">
        {text}
      </p>
    </div>
  )
}

/* Bloque editorial del título — ocupa la 6ª celda del grid sin borde */
function ManifestoTitle() {
  return (
    <div className="flex flex-col justify-center pl-6 h-full">
      <h2 className="font-sans text-[32px] leading-[36px] tracking-[-0.005em]">
        <span className="font-medium text-text-primary block">Manifiesto</span>
        <span className="font-bold text-accent-400 block">Turismo Que Suma</span>
      </h2>
      <p className="font-sans text-base leading-[26px] text-text-tertiary mt-1">
        2025
      </p>
    </div>
  )
}
