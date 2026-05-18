/* ════════════════════════════════════════════════════════════════
   TestimonialCard — Tarjeta de testimonio escrito
   Figma: node 34:4588 · 535x274 px · TFM Paula

   Visual estático, sin animación. Las interacciones del stack
   (hover, click, reordenado) las gestiona <TestimonialCardStack/>.

   Props:
   · name           — nombre de la persona
   · age            — edad (número)
   · number         — número del testimonio ("001", "002"...)
   · quote          — texto del testimonio (sin comillas, se añaden)
   · avatarSrc      — URL opcional para la imagen del avatar
   · hasShadow      — si true, muestra sombra hacia arriba (default true).
                      La card del fondo del stack debe pasar false.
   ════════════════════════════════════════════════════════════════ */

export default function TestimonialCard({
  name = 'Cristina',
  age = 36,
  number = '001',
  quote = '',
  avatarSrc,
  hasShadow = true,
}) {
  return (
    <article
      className={`
        bg-accent-50 rounded-3xl
        w-full h-full flex flex-col gap-12
        p-6
        ${hasShadow ? 'shadow-[0_-4px_24px_-8px_rgba(79,27,20,0.20)]' : ''}
      `}
    >

      {/* ── Cabecera: TESTIMONIO ESCRITO  |  Nº 001 ── */}
      <header className="flex items-center justify-between border-b border-accent-100 pb-2">
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full bg-accent-400 shrink-0"
            aria-hidden
          />
          <span className="font-sans font-medium text-xs uppercase tracking-[0.05em] text-text-primary leading-none">
            TESTIMONIO ESCRITO
          </span>
        </div>
        <span className="font-sans text-[11px] text-text-tertiary leading-none">
          Nº {number}
        </span>
      </header>

      {/* ── Contenido: avatar + nombre  |  cita ── */}
      <div className="flex gap-8 items-start">

        {/* Columna izquierda: avatar circular + nombre + edad */}
        <div className="flex flex-col gap-[14px] shrink-0 w-[85px]">
          <div className="w-16 h-16 rounded-full bg-[#D9D9D9] overflow-hidden shrink-0">
            {avatarSrc && (
              <img
                src={avatarSrc}
                alt={name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-sans font-medium text-2xl text-text-primary leading-none">
              {name}
            </span>
            <span className="font-sans text-xs text-text-tertiary leading-none">
              {age} años
            </span>
          </div>
        </div>

        {/* Columna derecha: cita en cursiva */}
        <p className="font-sans italic font-normal text-sm leading-7 text-text-secondary flex-1">
          “{quote}”
        </p>
      </div>
    </article>
  )
}
