import TestimonialCard from '../components/TestimonialCard'
import TestimonialCardStack from '../components/TestimonialCardStack'
import PlaygroundLayout from './PlaygroundLayout'

/* Testimonios de muestra. Algunos llevan `extraText` (texto contextual
   que se mostrará al lado del stack cuando esa card esté en el frente). */
const SAMPLE_TESTIMONIALS = [
  {
    name: 'Cristina',
    age: 36,
    number: '001',
    quote: 'Un turista responsable no afectaría negativamente a nuestro día a día, pero València está en venta y el turismo nos está echando de nuestra propia ciudad. A la masificación estacional, que genera picos de precariedad y contratos basura, se suma la falta de civismo. Mi calidad de vida ha caído en picado; el problema de la vivienda me afecta emocionalmente de forma grave.',
    extraText: 'Cristina vive el turismo como un proceso de expulsión directa y estructural. Denuncia la precariedad y el impacto que le genera en su calidad de vida un mercado de la vivienda que la empuja a mudarse cada dos por tres.',
  },
  {
    name: 'Lucía',
    age: 53,
    number: '002',
    quote: 'Llevo veinte años limpiando habitaciones. Cada año los turnos son más largos, los salarios no suben y el alquiler se ha duplicado. No sé cuánto tiempo más podré seguir trabajando en la ciudad donde nací.',
    extraText: 'Lucía representa a una generación de trabajadoras del sector hotelero atrapadas entre salarios estancados y un coste de vida disparado. Su testimonio expone la cara más estructural de la precariedad turística.',
  },
  {
    name: 'Natalia',
    age: 41,
    number: '003',
    quote: 'Las soluciones existen: regulación de los alquileres turísticos, tasa turística, horarios de comercio coordinados. Lo que falta es la voluntad política. Y mientras tanto, somos las trabajadoras quienes pagamos el coste.',
    /* Esta no tiene extraText — al pasarla al frente el texto debe desaparecer */
  },
  {
    name: 'Laura',
    age: 40,
    number: '004',
    quote: 'Cuando termino el turno me cuesta llegar a casa porque vivo a treinta kilómetros. Los precios del centro me expulsaron hace años. Trabajo en una ciudad a la que ya no pertenezco.',
    extraText: 'Laura forma parte de las trabajadoras desplazadas del núcleo urbano. Su rutina diaria refleja el conflicto entre un puesto de trabajo en el centro y una vivienda imposible en el mismo barrio.',
  },
]

export default function TestimonialCardPlayground() {
  return (
    <PlaygroundLayout
      title="Testimonial Card"
      description="Tarjeta de testimonio escrito. Versión individual, stack apilado y stack con texto contextual a izquierda o derecha que se disuelve al cambiar de card."
    >
      <section className="flex flex-col gap-20">

        {/* ── Card individual ── */}
        <div>
          <h2 className="font-sans font-medium text-xs uppercase tracking-[0.15em] text-text-tertiary mb-6">
            Card individual (con sombra)
          </h2>
          <div className="max-w-[535px]">
            <TestimonialCard {...SAMPLE_TESTIMONIALS[0]} />
          </div>
        </div>

        {/* ── Stack sin texto ── */}
        <div>
          <h2 className="font-sans font-medium text-xs uppercase tracking-[0.15em] text-text-tertiary mb-6">
            Stack — hover + click para reordenar
          </h2>
          <TestimonialCardStack testimonials={SAMPLE_TESTIMONIALS} />
        </div>

        {/* ── Stack con texto a la DERECHA ── */}
        <div>
          <h2 className="font-sans font-medium text-xs uppercase tracking-[0.15em] text-text-tertiary mb-6">
            Stack con texto adicional a la derecha
          </h2>
          <TestimonialCardStack
            testimonials={SAMPLE_TESTIMONIALS}
            extraTextPosition="right"
          />
        </div>

        {/* ── Stack con texto a la IZQUIERDA ── */}
        <div>
          <h2 className="font-sans font-medium text-xs uppercase tracking-[0.15em] text-text-tertiary mb-6">
            Stack con texto adicional a la izquierda
          </h2>
          <TestimonialCardStack
            testimonials={SAMPLE_TESTIMONIALS}
            extraTextPosition="left"
          />
        </div>

      </section>
    </PlaygroundLayout>
  )
}
