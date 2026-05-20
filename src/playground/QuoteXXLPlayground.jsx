import QuoteXXL from '../components/QuoteXXL'
import PlaygroundLayout from './PlaygroundLayout'

export default function QuoteXXLPlayground() {
  return (
    <PlaygroundLayout
      title="Quote XXL"
      description="Cita destacada XXL con icono circular y atribución en caja oscura a la derecha. El componente se adapta al ancho del contenedor; la caja derecha se mantiene pegada al borde y crece el espacio vacío en el medio."
    >
      <section className="flex flex-col gap-8 bg-surface-bg p-10 rounded-2xl">

        <div className="flex flex-col gap-3">
          <span className="font-sans text-xs uppercase tracking-[0.15em] text-text-tertiary">
            Variante del Figma
          </span>
          <QuoteXXL />
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-sans text-xs uppercase tracking-[0.15em] text-text-tertiary">
            Cita corta
          </span>
          <QuoteXXL
            quote="València es la mejor ciudad del mundo."
            attribution="Visit València, 2025."
          />
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-sans text-xs uppercase tracking-[0.15em] text-text-tertiary">
            Cita larga (test del max-w del texto)
          </span>
          <QuoteXXL
            quote="Una ciudad pensada para quienes la visitan ocasionalmente, mientras quienes la sostienen cada día deben buscar refugio cada vez más lejos de su propio centro."
            attribution="Reportaje TFM"
          />
        </div>

      </section>
    </PlaygroundLayout>
  )
}
