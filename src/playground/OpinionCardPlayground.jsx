import OpinionCard, { OpinionCardGroup } from '../components/OpinionCard'
import PlaygroundLayout from './PlaygroundLayout'

/* ════════════════════════════════════════════════════════════════
   OpinionCardPlayground

   Tres bloques:
   1. Variantes individuales — una card por cada color del sistema
   2. Auto-numeración en grupo — 4 cards con badges 1..4
   3. Card individual ancha (1090px ref Figma) demostrando
      adaptabilidad del texto largo
   ════════════════════════════════════════════════════════════════ */

const ALL_VARIANTS = [
  { variant: 'green',  label: 'Verde (success / data-4)' },
  { variant: 'purple', label: 'Púrpura (data-5)' },
  { variant: 'coral',  label: 'Coral (accent-400 / data-1)' },
  { variant: 'blue',   label: 'Azul (secondary-500 / data-2)' },
  { variant: 'amber',  label: 'Ámbar (warning / data-3)' },
]

const GROUP_ITEMS = [
  {
    variant: 'green',
    author: 'TRABAJADORA ANÓNIMA',
    quote: 'A mi me gusta que haya turismo',
  },
  {
    variant: 'purple',
    author: 'TRABAJADORA ANÓNIMA',
    quote: 'Considero que el turismo se está comiendo la ciudad, ha dejado de pertenecernos a los valencianos para ser un parque de atracciones para los turistas, que nos tratan con una superioridad impactante',
  },
  {
    variant: 'coral',
    author: 'TRABAJADORA ANÓNIMA',
    quote: 'Lo que más me duele no es trabajar de cara al público, es ya no poder permitirme vivir en el barrio donde crecí',
  },
  {
    variant: 'blue',
    author: 'TRABAJADORA ANÓNIMA',
    quote: 'Nos exigen sonreír siempre, aunque por dentro estés vacía después de doce horas de pie',
  },
]

export default function OpinionCardPlayground() {
  return (
    <PlaygroundLayout
      title="Opinion Card"
      description="Card editorial de opinión / cita literal con variantes cromáticas, pill autor + badge numerado. El número del badge se autoasigna según el total de cards del grupo."
    >
      <section className="flex flex-col gap-16">

        {/* ── 1. Variantes individuales ── */}
        <div className="flex flex-col gap-4">
          <h2 className="font-sans font-medium text-xs uppercase tracking-[0.15em] text-text-tertiary">
            Variantes de color
          </h2>

          <div className="flex flex-col gap-6">
            {ALL_VARIANTS.map((v, i) => (
              <div key={v.variant} className="flex flex-col gap-2">
                <span className="font-sans text-[11px] uppercase tracking-[0.1em] text-text-tertiary">
                  {v.label}
                </span>
                <OpinionCard
                  variant={v.variant}
                  number={i + 1}
                  quote="A mi me gusta que haya turismo"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── 2. Grupo con auto-numeración ── */}
        <div className="flex flex-col gap-4">
          <h2 className="font-sans font-medium text-xs uppercase tracking-[0.15em] text-text-tertiary">
            Grupo con auto-numeración (4 cards → 1..4)
          </h2>
          <OpinionCardGroup items={GROUP_ITEMS} />
        </div>

        {/* ── 3. Card ancha — replica el bloque 1090px del Figma ── */}
        <div className="flex flex-col gap-4">
          <h2 className="font-sans font-medium text-xs uppercase tracking-[0.15em] text-text-tertiary">
            Card individual (texto largo, ancho extendido)
          </h2>
          <OpinionCard
            variant="purple"
            number={1}
            quote="Considero que el turismo se está comiendo la ciudad, ha dejado de pertenecernos a los valencianos para ser un parque de atracciones para los turistas, que nos tratan con una superioridad impactante"
          />
        </div>

      </section>
    </PlaygroundLayout>
  )
}
