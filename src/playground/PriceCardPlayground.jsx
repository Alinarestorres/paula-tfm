import PriceCard from '../components/PriceCard'
import PlaygroundLayout from './PlaygroundLayout'

export default function PriceCardPlayground() {
  return (
    <PlaygroundLayout
      title="Price Card"
      description="Card editorial de precio con cifra grande, círculo de variación porcentual y texto contextual. Reutilizable con cualquier indicador económico."
    >
      <section className="flex flex-col gap-10">

        {/* ── Variante del Figma: precio obra nueva ── */}
        <div>
          <h2 className="font-sans font-medium text-xs uppercase tracking-[0.15em] text-text-tertiary mb-4">
            Precio obra nueva
          </h2>
          <PriceCard
            label="PRECIO OBRA NUEVA"
            number="4.000"
            unit="€/m²"
            changeSign="+"
            changePercent="113%"
            changeContext="Desde 2019"
            description="El precio medio de la vivienda plurifamiliar en Valencia ciudad ha superado los 4.000 €/m² (específicamente 4.086 €/m²), lo que supone un incremento del 19% respecto al año anterior y un 113% desde 2019."
            source="2025 · Observatorio de Vivienda UPV"
          />
        </div>

        {/* ── Variante: alquiler medio ── */}
        <div>
          <h2 className="font-sans font-medium text-xs uppercase tracking-[0.15em] text-text-tertiary mb-4">
            Alquiler medio
          </h2>
          <PriceCard
            label="ALQUILER MEDIO"
            number="1.659"
            unit="€/mes"
            changeSign="+"
            changePercent="78%"
            changeContext="Desde 2019"
            description="El alquiler medio en la ciudad de Valencia se ha duplicado en seis años, alcanzando los 1.659 €/mes y consolidando un esfuerzo financiero que ya supera el 68% del ingreso medio de los hogares trabajadores."
            source="2025 · Observatorio de Vivienda UPV"
          />
        </div>

      </section>
    </PlaygroundLayout>
  )
}
