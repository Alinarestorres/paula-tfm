/**
 * PlaygroundLayout — Wrapper visual para cada página del playground.
 * Incluye un breadcrumb arriba y un contenedor centrado para el componente.
 */
export default function PlaygroundLayout({ title, description, children }) {
  return (
    <div className="min-h-screen bg-surface-inverse text-text-inverse">

      {/* Barra superior */}
      <header className="border-b border-[#3A3A3A]">
        <div className="max-w-[1100px] mx-auto px-6 py-5 flex items-center justify-between">
          <a
            href="#/playground"
            className="font-sans text-xs uppercase tracking-[0.15em] text-text-tertiary hover:text-text-inverse transition-colors"
          >
            ← Playground
          </a>
          <span className="font-sans text-xs uppercase tracking-[0.15em] text-text-tertiary">
            Componente
          </span>
        </div>
      </header>

      {/* Encabezado de la página */}
      <div className="max-w-[1100px] mx-auto px-6 pt-12 pb-8 border-b border-[#3A3A3A]">
        <h1 className="font-display font-bold text-4xl text-text-inverse">{title}</h1>
        {description && (
          <p className="font-sans text-text-tertiary mt-3 max-w-[640px]">{description}</p>
        )}
      </div>

      {/* Contenido */}
      <main className="max-w-[1100px] mx-auto px-6 py-12">
        {children}
      </main>
    </div>
  )
}
