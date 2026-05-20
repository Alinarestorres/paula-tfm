/**
 * PlaygroundIndex — Página índice del playground.
 * Lista todos los componentes disponibles para inspección aislada.
 *
 * Para añadir un componente nuevo:
 * 1. Crear su página en src/playground/<nombre>Playground.jsx
 * 2. Importarla y enrutarla en App.jsx
 * 3. Añadir su entrada al array COMPONENTS aquí abajo
 */
const COMPONENTS = [
  {
    slug: 'header',
    name: 'Header',
    desc: 'Cabecera editorial de la landing. Titular asimétrico + descripción + autora.',
  },
  {
    slug: 'section-nav',
    name: 'Section Nav',
    desc: 'Navegación lateral con dots conectados por línea que se rellena de azul según el scroll.',
  },
  {
    slug: 'testimonial-card',
    name: 'Testimonial Card',
    desc: 'Tarjeta de testimonio escrito en versión individual y stack interactivo con hover y reordenado.',
  },
  {
    slug: 'audio-card',
    name: 'Audio Card',
    desc: 'Tarjeta de testimonio auditivo con reproductor funcional, scrub por click y drag.',
  },
  {
    slug: 'map',
    name: 'Mapa de Comarcas',
    desc: 'Mapa minimalista de la provincia de València con 17 comarcas coloreadas por esfuerzo financiero y modal de datos al hover.',
  },
  {
    slug: 'manifesto',
    name: 'Manifiesto',
    desc: 'Card editorial con los cinco puntos del Manifiesto Turismo Que Suma 2025 + título en la esquina inferior derecha.',
  },
  {
    slug: 'price-card',
    name: 'Price Card',
    desc: 'Card de precio con cifra grande, círculo de variación porcentual y texto contextual con fuente.',
  },
  {
    slug: 'opinion-card',
    name: 'Opinion Card',
    desc: 'Card editorial de opinión / cita literal con variantes cromáticas, pill de autor y badge numerado que se autoasigna según el total de cards.',
  },
  {
    slug: 'infographic',
    name: 'Infographic',
    desc: 'Infografía de porcentaje sobre 100 dots. Número con cuenta animada de 0 al objetivo y dots que se iluminan progresivamente en sincronía.',
  },
  {
    slug: 'quote-xxl',
    name: 'Quote XXL',
    desc: 'Cita destacada con icono circular azul y atribución en caja oscura a la derecha. Responsive: la caja derecha queda pegada al borde y crece el espacio entre cita y caja al ampliar el viewport.',
  },
]

export default function PlaygroundIndex() {
  return (
    <div className="min-h-screen bg-surface-inverse text-text-inverse">

      <header className="border-b border-[#3A3A3A]">
        <div className="max-w-[1100px] mx-auto px-6 py-5">
          <span className="font-sans text-xs uppercase tracking-[0.15em] text-text-tertiary">
            TFM Paula · Inspector
          </span>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-6 pt-16 pb-8 border-b border-[#3A3A3A]">
        <h1 className="font-display font-bold text-5xl text-text-inverse">Playground</h1>
        <p className="font-sans text-text-tertiary mt-3 max-w-[640px]">
          Inspector aislado de componentes del proyecto. Los componentes aquí mostrados
          no forman parte aún del diseño final.
        </p>
      </div>

      <main className="max-w-[1100px] mx-auto px-6 py-12">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPONENTS.map(c => (
            <li key={c.slug}>
              <a
                href={`#/playground/${c.slug}`}
                className="
                  block bg-[#1A1A1C] border border-[#3A3A3A] rounded-2xl p-6
                  hover:border-secondary-500 transition-colors
                "
              >
                <div className="font-sans font-bold text-lg text-text-inverse mb-2">
                  {c.name}
                </div>
                <div className="font-sans text-sm leading-6 text-text-tertiary">
                  {c.desc}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
