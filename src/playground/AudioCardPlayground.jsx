import AudioCard from '../components/AudioCard'
import AudioCardCarousel from '../components/AudioCardCarousel'
import PlaygroundLayout from './PlaygroundLayout'

/* Audio público de prueba (SoundHelix). Sustituir más adelante por los reales. */
const SAMPLE_AUDIO = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

const CAROUSEL_ITEMS = [
  {
    label: 'TESTIMONIO AUDITIVO',
    number: '001',
    title: 'El barrio del Carmen ya no es lo que era',
    author: 'Lucía Martínez – Limpiadora de Hotel',
    src: SAMPLE_AUDIO,
  },
  {
    label: 'TESTIMONIO AUDITIVO',
    number: '002',
    title: 'Ya no puedo acceder a Ciutat Vella',
    author: 'Cristina García – Dependienta',
    src: SAMPLE_AUDIO,
  },
  {
    label: 'TESTIMONIO AUDITIVO',
    number: '003',
    title: 'Cada año el alquiler sube y el sueldo no',
    author: 'Laura Pérez – Camarera de piso',
    src: SAMPLE_AUDIO,
  },
  {
    label: 'TESTIMONIO AUDITIVO',
    number: '004',
    title: 'Trabajo en una ciudad donde ya no puedo vivir',
    author: 'Natalia Ruiz – Hostelería',
    src: SAMPLE_AUDIO,
  },
]

export default function AudioCardPlayground() {
  return (
    <PlaygroundLayout
      title="Audio Card"
      description="Tarjeta de testimonio auditivo en sus tres formatos: activa con reproductor funcional, disabled (variante visual sin interacción) y dentro de un carousel deslizable con dots de navegación."
    >
      <section className="flex flex-col gap-16">

        {/* ── Variante activa ── */}
        <div>
          <h2 className="font-sans font-medium text-xs uppercase tracking-[0.15em] text-text-tertiary mb-4">
            Activa — con audio funcional
          </h2>
          <div className="max-w-[607px]">
            <AudioCard
              label="TESTIMONIO AUDITIVO"
              number="001"
              title="El barrio del Carmen ya no es lo que era"
              author="Cristina – Dependienta tienda"
              src={SAMPLE_AUDIO}
            />
          </div>
        </div>

        {/* ── Variante disabled ── */}
        <div>
          <h2 className="font-sans font-medium text-xs uppercase tracking-[0.15em] text-text-tertiary mb-4">
            Disabled — visual, sin interacción
          </h2>
          <div className="max-w-[607px]">
            <AudioCard
              label="TESTIMONIO AUDITIVO"
              number="002"
              title="Ya no puedo acceder a Ciutat Vella"
              author="Cristina García – Dependienta"
              disabled
            />
          </div>
        </div>

        {/* ── Carousel ── */}
        <div>
          <h2 className="font-sans font-medium text-xs uppercase tracking-[0.15em] text-text-tertiary mb-4">
            Carousel — click en card adyacente o en cualquier dot
          </h2>
          <AudioCardCarousel items={CAROUSEL_ITEMS} />
        </div>

      </section>
    </PlaygroundLayout>
  )
}
