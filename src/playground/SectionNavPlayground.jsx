import SectionNav from '../components/SectionNav'
import PlaygroundLayout from './PlaygroundLayout'

/* 6 secciones de prueba con altura grande, para poder scrollear y ver
   cómo el dot activo cambia y la línea azul crece. */
const DEMO_SECTIONS = [
  { id: 'seccion-1', label: 'Introducción' },
  { id: 'seccion-2', label: 'Género y cuidados' },
  { id: 'seccion-3', label: 'La “ciudad turística”' },
  { id: 'seccion-4', label: '¿Desafíos de gestión o fractura social?' },
  { id: 'seccion-5', label: 'El derecho a techo' },
  { id: 'seccion-6', label: 'Precio de la vivienda' },
]

export default function SectionNavPlayground() {
  return (
    <PlaygroundLayout
      title="Section Nav"
      description="Navegación lateral con dots conectados por una línea. La línea azul crece progresivamente según avanzas el scroll dentro de cada sección. Cuando entras en la siguiente, el dot cambia a azul. Haz scroll para verlo."
    >
      <div className="flex gap-12 items-start">

        {/* Nav sticky a la izquierda */}
        <div className="sticky top-8 self-start shrink-0">
          <SectionNav sections={DEMO_SECTIONS} />
        </div>

        {/* Contenido scrolleable a la derecha */}
        <div className="flex-1 flex flex-col gap-0">
          {DEMO_SECTIONS.map((s, i) => (
            <section
              id={s.id}
              key={s.id}
              className="min-h-[80vh] py-12 border-b border-[#3A3A3A] flex flex-col gap-4"
            >
              <span className="font-sans text-xs uppercase tracking-[0.15em] text-text-tertiary">
                Sección {i + 1}
              </span>
              <h2 className="font-display font-bold text-4xl text-text-inverse">
                {s.label}
              </h2>
              <p className="font-sans text-text-disabled max-w-prose">
                Contenido de prueba para esta sección. Scrollea hacia abajo
                para ver cómo la línea azul de la navegación se llena
                progresivamente, y cómo el dot activo cambia al pasar de
                una sección a otra. La sección {i + 1} ocupa al menos un
                80% de la altura del viewport para tener recorrido suficiente.
              </p>
            </section>
          ))}
        </div>

      </div>
    </PlaygroundLayout>
  )
}
