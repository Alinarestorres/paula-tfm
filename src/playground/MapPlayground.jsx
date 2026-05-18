import MapValenciaProvincia from '../components/MapValenciaProvincia'
import PlaygroundLayout from './PlaygroundLayout'

/* Datos de cada comarca — fuente: tabla aportada por la usuaria.
   El id debe coincidir con el id usado en MapValenciaProvincia.jsx */
const COMARCA_DATA = [
  { id: 'valencia',    priceM2: 4086, rent: 1659, effort: 68.0 },
  { id: 'hortanord',   priceM2: 3120, rent: 1150, effort: 48.0 },
  { id: 'hortasud',    priceM2: 2650, rent:  920, effort: 39.0 },
  { id: 'hortaoest',   priceM2: 2580, rent:  890, effort: 37.0 },
  { id: 'turia',       priceM2: 1850, rent:  740, effort: 30.0 },
  { id: 'morvedre',    priceM2: 2150, rent:  780, effort: 32.0 },
  { id: 'riberaalta',  priceM2: 1620, rent:  620, effort: 26.0 },
  { id: 'riberabaixa', priceM2: 1980, rent:  750, effort: 31.0 },
  { id: 'safor',       priceM2: 1590, rent:  590, effort: 24.0 },
  { id: 'vall',        priceM2: 1350, rent:  520, effort: 21.0 },
  { id: 'costera',     priceM2: 1420, rent:  550, effort: 22.0 },
  { id: 'navarres',    priceM2: 1100, rent:  450, effort: 18.0 },
  { id: 'hoya',        priceM2: 1550, rent:  600, effort: 24.0 },
  { id: 'requena',     priceM2: 1200, rent:  480, effort: 19.0 },
  { id: 'serranos',    priceM2: 1050, rent:  420, effort: 17.0 },
  { id: 'rincon',      priceM2:  950, rent:  380, effort: 15.0 },
  { id: 'cofrentes',   priceM2: 1000, rent:  400, effort: 16.0 },
]

/* Leyenda con los rangos de color para que el lector entienda
   la codificación cromática. */
const LEGEND = [
  { label: '≥ 60%',    cls: 'bg-secondary-700' },
  { label: '45–59%',   cls: 'bg-secondary-600' },
  { label: '35–44%',   cls: 'bg-secondary-500' },
  { label: '25–34%',   cls: 'bg-secondary-400' },
  { label: '20–24%',   cls: 'bg-secondary-300' },
  { label: '17–19%',   cls: 'bg-secondary-200' },
  { label: '< 17%',    cls: 'bg-secondary-100' },
]

export default function MapPlayground() {
  return (
    <PlaygroundLayout
      title="Mapa de Comarcas"
      description="Mapa minimalista de la provincia de València. 17 comarcas coloreadas según el esfuerzo financiero en vivienda (% del ingreso). Pasa el cursor sobre una comarca para ver sus datos detallados; el modal hace fundido suave al cambiar."
    >
      <section className="flex flex-col gap-10">

        {/* ── Mapa ── */}
        <div>
          <h2 className="font-sans font-medium text-xs uppercase tracking-[0.15em] text-text-tertiary mb-6">
            Mapa interactivo
          </h2>
          <MapValenciaProvincia data={COMARCA_DATA} />
        </div>

        {/* ── Leyenda ── */}
        <div>
          <h2 className="font-sans font-medium text-xs uppercase tracking-[0.15em] text-text-tertiary mb-4">
            Leyenda — esfuerzo financiero
          </h2>
          <div className="flex flex-wrap gap-3">
            {LEGEND.map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded ${l.cls}`} />
                <span className="font-sans text-sm text-text-disabled">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

      </section>
    </PlaygroundLayout>
  )
}
