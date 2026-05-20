import TestimonialCardStack from '../TestimonialCardStack'
import QuoteXXL from '../QuoteXXL'

/* ════════════════════════════════════════════════════════════════
   Section1 — Primera sección de contenido de la landing
   Figma: node 48:5340

   Esta sección NO incluye SectionNav ni padding horizontal:
   · La nav lateral está en MainLanding (App.jsx) como sticky para
     que persista durante toda la landing
   · Los márgenes laterales 16/32/64 los aplica el wrapper común
   ════════════════════════════════════════════════════════════════ */

const TESTIMONIOS = [
  {
    name: 'Cris',
    age: 36,
    number: '001',
    avatarSrc: '/Cris.png',
    quote: 'Un turista responsable no afectaría negativamente a nuestro día a día, pero València está en venta y el turismo nos está echando de nuestra propia ciudad. A la masificación estacional, que genera picos de precariedad y contratos basura, se suma la falta de civismo. Mi calidad de vida ha caído en picado; el problema de la vivienda me afecta emocionalmente de forma grave.',
    extraText: 'Cris lo describe con crudeza.\n\nVive el turismo como un proceso de expulsión directa y estructural. Denuncia la precariedad y el impacto que le genera en su calidad de vida un mercado de la vivienda que la empuja a mudarse cada dos por tres.',
  },
  {
    name: 'Natalia',
    age: 38,
    number: '002',
    avatarSrc: '/Tere.png',
    quote: 'El turismo me está afectando tanto a nivel personal que me estoy planteando cambiar de ciudad. El alquiler que tengo en el centro es muy bajo comparado con el resto porque es antiguo, no podría mudarme a otro sitio. Pero el descanso, el ocio y la vida cotidiana en general, se hace insoportable.',
    extraText: 'En cambio, Natalia (38 años) pone el foco en las consecuencias cotidianas de habitar el centro debido a la saturación.\n\nEs una de las pocas "afortunadas" que continúa resistiendo con su residencia y su puesto de trabajo en una tienda en el centro de Valencia. Sin embargo, se encuentra en una situación de fragilidad y hastío.',
  },
]

export default function Section1() {
  return (
    <section id="seccion-1" className="pt-24 pb-12 flex flex-col gap-8">

      {/* Cita destacada — eslogan institucional de Visit València */}
      <QuoteXXL />

      {/* Body text — 4 párrafos separados por gap-6 (24px) */}
      <div className="flex flex-col gap-6 text-text-secondary">
        <p className="font-sans text-base leading-7">
          El eslogan institucional que se encuentran millones de visitantes
          cuando llegan a Valencia oculta la realidad de quienes habitan y
          trabajan en ella.
        </p>
        <p className="font-sans text-base leading-7">
          El turismo suele proyectarse como el principal motor económico de
          las ciudades, pero rara vez el foco recae sobre las manos que lo
          sostienen. Jornadas largas, salarios bajos y ritmos de trabajos
          frenéticos se han normalizado para blindar una marca: la de
          València como una de las mejores ciudades del mundo para visitar.
        </p>
        <p className="font-sans text-base leading-7">
          El conflicto no reside únicamente en el volumen de visitantes,
          sino en un modelo de ciudad diseñado por y para ellos. Es un
          sistema que prioriza la inmediatez y el beneficio cortoplacista
          frente al bienestar social, laboral y ambiental de la población
          local. En un escenario donde el turismo de masas encarece la
          vivienda y transforma la identidad de los barrios, quienes
          trabajan en el sector a menudo no pueden permitirse residir cerca
          de sus empleos. De este modo, terminan sosteniendo un engranaje
          que, lejos de beneficiarles, les expulsa.
        </p>
        <p className="font-sans text-base leading-7">
          Este reportaje cruza los testimonios de varias trabajadoras con
          la realidad sociolaboral de la ciudad para responder a una
          pregunta incómoda:{' '}
          <strong className="font-bold">
            ¿para quién se diseña un destino internacional si las personas
            que lo hacen funcionar ya no pueden permitirse vivir en él?
          </strong>
        </p>
      </div>

      {/* Stack de testimoniales con texto contextual a la derecha */}
      <TestimonialCardStack
        testimonials={TESTIMONIOS}
        extraTextPosition="right"
      />
    </section>
  )
}
