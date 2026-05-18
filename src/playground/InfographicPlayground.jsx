import Infographic from '../components/Infographic'
import PlaygroundLayout from './PlaygroundLayout'

/* Muestra varios valores de `percent` para verificar que el
   coloreado de los dots y la cuenta del número se sincronizan
   en cualquier punto del rango 0..100. */
export default function InfographicPlayground() {
  return (
    <PlaygroundLayout
      title="Infographic"
      description="Card infográfica de % sobre 100 puntos. El número anima de 0 al objetivo y los dots se iluminan en sincronía con la cuenta."
    >
      <section className="flex flex-col gap-16 bg-surface-bg p-10 rounded-2xl text-text-primary">

        <div className="flex flex-col gap-4">
          <h2 className="font-sans font-medium text-xs uppercase tracking-[0.15em] text-text-tertiary">
            Variante del Figma (73%)
          </h2>
          <Infographic
            percent={73}
            description="De los usuarios se desplaza por motivos laborales o académicos."
          />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-sans font-medium text-xs uppercase tracking-[0.15em] text-text-tertiary">
            Valor bajo (12%)
          </h2>
          <Infographic
            percent={12}
            description="De los hogares destina más del 60% de sus ingresos al alquiler."
          />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-sans font-medium text-xs uppercase tracking-[0.15em] text-text-tertiary">
            Valor alto (94%)
          </h2>
          <Infographic
            percent={94}
            description="De los testimonios recogidos cita la conciliación como su principal problema."
          />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-sans font-medium text-xs uppercase tracking-[0.15em] text-text-tertiary">
            Extremos: 0 y 100
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Infographic percent={0} description="Sin coincidencias." />
            <Infographic percent={100} description="Todas las trabajadoras consultadas." />
          </div>
        </div>

      </section>
    </PlaygroundLayout>
  )
}
