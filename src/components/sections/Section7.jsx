/* ════════════════════════════════════════════════════════════════
   Section7 — Conclusiones
   Última sección de la landing.

   Estructura:
   · Heading "Conclusiones" + 3 párrafos a ancho completo de
     columna (mismo patrón que Section 1: párrafos full-width
     dentro del área de contenido, sin grid lateral).
   · Imagen de cierre dentro de un contenedor con rounded-3xl
     (24px) que recorta las esquinas.
   · pb-20 (80px) en el <section> reserva el espacio vacío
     pedido al final de la landing.
   ════════════════════════════════════════════════════════════════ */

export default function Section7() {
  return (
    <section id="seccion-7" className="pt-24 pb-20 flex flex-col gap-10">

      {/* Heading + 3 párrafos */}
      <div className="flex flex-col gap-6">
        <h2 className="font-sans font-medium text-4xl lg:text-[48px] leading-[1.125] tracking-[-0.01em] text-text-primary">
          Conclusiones
        </h2>

        <div className="flex flex-col gap-6 text-text-secondary">
          <p className="font-sans text-base leading-[26px]">
            El éxito del modelo turístico actual en València se financia
            gracias al trabajo de la clase trabajadora, especialmente en
            sectores feminizados y precarizados (86,2% del sector
            servicios). A esta precariedad, se suma una crisis habitacional
            sin precedentes en la que los alquileres, con unos precios
            disparados casi un 80% desde 2019, han obligado ya a un 31% de
            los inquilinos e inquilinas a desplazarse hacia la periferia.
          </p>
          <p className="font-sans text-base leading-[26px]">
            Así, València se sostiene sobre un trabajo indispensable que
            alimenta la maquinaria turística, mientras sus propios
            habitantes asisten a la transformación de sus barrios en una
            “ciudad turística”.
          </p>
          <p className="font-sans text-base leading-[26px]">
            Frente a planes y promesas institucionales que no acaban de
            materializarse, las trabajadoras exigen con urgencia regular
            los horarios comerciales, fomentar la conciliación y mejorar
            sus condiciones laborales. Dar respuesta a profesionales como
            Cris, Lucía, Teresa y el resto de trabajadoras, no es una
            necesidad concreta, sino una obligación colectiva si València
            aspira a ser un destino sostenible que cuide de sus residentes
            y les priorice frente al beneficio ajeno.
          </p>
        </div>
      </div>

      {/* Imagen de cierre en contenedor rounded-3xl (24px).
          bg-accent-100 actúa como fallback si la imagen no carga.
          object-cover + h-auto mantienen el aspect ratio natural
          de la foto adaptándose al ancho de la columna. */}
      <div className="w-full rounded-3xl overflow-hidden bg-accent-100">
        <img
          src="/foto-final.png"
          alt="Imagen de cierre del reportaje sobre las trabajadoras del sector turístico de València."
          className="w-full h-auto block"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </div>
    </section>
  )
}
