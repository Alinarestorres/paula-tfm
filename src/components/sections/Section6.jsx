import MapValenciaProvincia from '../MapValenciaProvincia'
import Infographic from '../Infographic'
import AudioCard from '../AudioCard'

/* ════════════════════════════════════════════════════════════════
   Section6 — Precio de la vivienda por comarcas / transporte
   Figma: node 75:890

   Estructura (top → bottom, gap 10 = 40px):

   · Bloque 1 — Título + 2 párrafos introductorios

   · Bloque 2 — Mapa interactivo de comarcas + leyenda
     (MapValenciaProvincia con los mismos datos COMARCA_DATA
      que ya usaba el playground)

   · Bloque 3 — Grid 2 cols:
       ┌────────────────────┬────────────────────────────────┐
       │ Infographic 73%    │ Detrás de la red…              │
       │ + dots 100%        │ En este flujo diario…          │
       │ + texto descriptivo│                                │
       └────────────────────┴────────────────────────────────┘

   · Bloque 4 — Grid 2 cols:
       ┌────────────────────────────────┬──────────────────┐
       │ Con estos datos…               │  AudioCard       │
       │ Para mujeres como Laura…       │  "El barrio del  │
       │ Así, mientras las estadísticas │   Carmen…"       │
       └────────────────────────────────┴──────────────────┘
     items-start en ambos grids para que las columnas no se
     estiren a la altura de la más alta — el componente lateral
     (infographic / audio) mantiene su altura natural.
   ════════════════════════════════════════════════════════════════ */

/* Mismos datos COMARCA_DATA que el playground del mapa. Mantener
   en sync si se actualizan precios o esfuerzo. */
const COMARCA_DATA = [
  { id: 'valencia',    priceM2: 4086, rent: 1659, effort: 68.0 },
  { id: 'hortanord',   priceM2: 3120, rent: 1150, effort: 48.0 },
  { id: 'hortasud',    priceM2: 2650, rent:  920, effort: 39.0 },
  { id: 'hortaoest',   priceM2: 2580, rent:  890, effort: 37.0 },
  { id: 'turia',       priceM2: 1850, rent:  740, effort: 30.0 },
  { id: 'morvedre',    priceM2: 2150, rent:  780, effort: 32.0 },
  { id: 'riberaalta',  priceM2: 1620, rent:  620, effort: 26.0 },
  { id: 'riberabaixa', priceM2: 1980, rent:  750, effort: 31.0 },
  { id: 'safor',       priceM2: 1590, rent:  590, effort: 24.0 },
  { id: 'vall',        priceM2: 1350, rent:  520, effort: 21.0 },
  { id: 'costera',     priceM2: 1420, rent:  550, effort: 22.0 },
  { id: 'navarres',    priceM2: 1100, rent:  450, effort: 18.0 },
  { id: 'hoya',        priceM2: 1550, rent:  600, effort: 24.0 },
  { id: 'requena',     priceM2: 1200, rent:  480, effort: 19.0 },
  { id: 'serranos',    priceM2: 1050, rent:  420, effort: 17.0 },
  { id: 'rincon',      priceM2:  950, rent:  380, effort: 15.0 },
  { id: 'cofrentes',   priceM2: 1000, rent:  400, effort: 16.0 },
]

const MAP_LEGEND = [
  { label: '≥ 60%',    cls: 'bg-secondary-700' },
  { label: '45–59%',   cls: 'bg-secondary-600' },
  { label: '35–44%',   cls: 'bg-secondary-500' },
  { label: '25–34%',   cls: 'bg-secondary-400' },
  { label: '20–24%',   cls: 'bg-secondary-300' },
  { label: '17–19%',   cls: 'bg-secondary-200' },
  { label: '< 17%',    cls: 'bg-secondary-100' },
]

export default function Section6() {
  return (
    <section id="seccion-6" className="pt-24 pb-12 flex flex-col gap-20">

      {/* ── Título + párrafos introductorios ──
          Wrapper propio con gap-6 (24px) para que el título quede
          cerca del primer párrafo, sin heredar el gap-16 (64px) que
          la sección usa para separar bloques mayores. */}
      <div className="flex flex-col gap-6">
        <h2 className="font-sans font-medium text-4xl lg:text-[48px] leading-[1.125] tracking-[-0.01em] text-text-primary">
          Precio de la vivienda por comarcas en la Provincia de València.
        </h2>

        <div className="flex flex-col gap-6 text-text-secondary">
          <p className="font-sans text-base leading-[26px]">
            Con los testimonios de muchas de estas trabajadoras observamos que
            la única tregua ante este escenario es la suerte de “haber llegado
            antes” de que estallara la burbuja, sintiéndose privilegiadas por
            haber sorteado este conflicto por pura cuestión de tiempo.
          </p>
          <p className="font-sans text-base leading-[26px]">
            Sin embargo, este alivio convive con la certeza de que su
            estabilidad acabará con la escisión de sus contratos. Será
            entonces, cuando se verán obligadas a sumarse al éxodo hacia la
            periferia y las áreas metropolitanas como el resto de habitantes
            de la ciudad, que como se refleja en los datos, tampoco serán
            accesibles para entonces.
          </p>
        </div>
      </div>

      {/* ── Mapa interactivo + leyenda integrada ──
          Map y leyenda comparten el mismo contenedor oscuro #1A1A1C
          (mismo negro de la AudioCard activa, esquinas 24px). El mapa
          se renderiza edge-to-edge (16:9 sin padding) y debajo, dentro
          del mismo recuadro, la leyenda con padding lateral e inferior
          para que respire respecto al borde. Texto en text-text-disabled
          (#B4B5B5) para legibilidad sobre el fondo oscuro, mismo token
          que la AudioCard activa usa para sus labels. */}
      <div className="bg-[#1A1A1C] rounded-3xl overflow-hidden">
        <MapValenciaProvincia data={COMARCA_DATA} />
        <div className="flex flex-wrap gap-x-4 gap-y-2 px-6 pb-6 pt-2">
          {MAP_LEGEND.map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded ${l.cls}`} />
              <span className="font-sans text-xs text-text-disabled">
                {l.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bloque infografía + texto contextual ──
          items-start para que la Infographic no se estire a la altura
          del texto cuando éste es más largo. */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">

        <Infographic
          percent={73}
          description="De los usuarios se desplaza por motivos laborales o académicos."
        />

        <div className="flex flex-col gap-6 text-text-secondary">
          <p className="font-sans text-base leading-[26px]">
            Detrás de la red de transporte también encontramos historias
            laborales más allá de los trayectos realizados. Según el índice
            de Satisfacción de Cliente para el año 2025 realizado por
            Metrovalencia,{' '}
            <strong className="font-bold">
              el 73,3% de los usuarios se desplaza por motivos laborales o
              académicos.
            </strong>
          </p>
          <p className="font-sans text-base leading-[26px]">
            En este flujo diario, los datos revelan que los y las
            trabajadoras del sector servicios son una parte sustancial de
            este porcentaje.{' '}
            <strong className="font-bold">
              El comercio (13,5%) y la hostelería (9,6%)
            </strong>{' '}
            se sitúan entre los principales sectores de actividad de los
            pasajeros, seguidos de cerca por sectores esenciales pero a
            menudo invisibilizados como la{' '}
            <strong className="font-bold">
              limpieza (6,3%) y los cuidados o empleo del hogar (5,8%).
            </strong>
          </p>
        </div>
      </div>

      {/* ── Bloque texto + AudioCard ──
          items-start: AudioCard mantiene su altura natural mientras el
          texto (potencialmente más alto) crece a su lado.
          La AudioCard usa `w-full h-full` internamente, así que la
          envolvemos en un div `self-start` para que no estire. */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">

        <div className="flex flex-col gap-6 text-text-secondary">
          <p className="font-sans text-base leading-[26px]">
            Con estos datos, vuelve a materializarse la necesidad de mejorar
            la red que conecta la periferia con el centro por el aumento de
            desplazamientos diarios.
          </p>
          <p className="font-sans text-base leading-[26px]">
            Para mujeres como Laura, Cristina o Lucía, el trayecto diario
            que implica entre 20 y 40 minutos de ida al trabajo, supone una
            previsión marcada por andenes masificados, retrasos y la
            sensación de una ciudad colapsada.
          </p>
          <p className="font-sans text-base leading-[26px]">
            Así, mientras las estadísticas confirman que el sector servicios
            sostiene el flujo del transporte público, las demandas de las
            trabajadoras incluyen mejorar las frecuencias, limpieza y sobre
            todo, el reconocimiento económico de un tiempo de viaje que
            también es una parte más extensa de su jornada.
          </p>
        </div>

        <div className="self-start w-full">
          {/* Última card de audio de la landing en el conteo global:
              Section 2: 001-003 · Section 3: 004-008 · Section 5: 009-011 ·
              aquí: 012. */}
          <AudioCard
            label="TESTIMONIO AUDITIVO"
            number="012"
            title="Es un trabajo estacional y en momentos con fallas o verano el transporte puede fallar"
            author="Lucía Castro – Camarera de Pisos"
            src={encodeURI('/AUDIO 12_Trabajo-estacional_.mp3')}
          />
        </div>
      </div>
    </section>
  )
}
