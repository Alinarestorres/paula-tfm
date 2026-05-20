import { useEffect, useRef, useState } from 'react'

/* ════════════════════════════════════════════════════════════════
   AudioCard — Tarjeta de testimonio auditivo
   Figma: nodes 31:4282 (activa) · 34:4805 (disabled)

   Variantes:
   · Activa (default)  — bg oscuro, controles funcionales
   · Disabled          — bg crema claro, controles inertes, todo
                         atenuado en tonos border-* / text-disabled

   Funcionalidad activa:
   · play/pause sobre un <audio> HTML5
   · click en cualquier punto del waveform → salta a esa posición
   · click + arrastre sobre el waveform → scrub fluido
   · las barras se colorean en azul a medida que avanza el audio

   Disabled:
   · Sin reproducción ni scrub
   · Si se pasa `onClick`, toda la card es clicable (útil para el
     carousel: clickar una card inactiva la hace activa)
   ════════════════════════════════════════════════════════════════ */

/* Alturas (px) de las 60 barras del waveform — patrón del diseño Figma */
const BAR_HEIGHTS = [
  11, 20, 14, 25, 17,  8, 22, 14, 20, 11,
  17, 25, 14, 20, 11, 22, 17, 14, 25, 11,
  20, 17,  8, 22, 14, 20, 11, 25, 17, 14,
  20, 22, 11, 17, 25, 14, 20, 11, 22, 17,
  11, 20, 14, 25, 17, 11, 11, 11, 20, 20,
  20, 14, 14, 14, 25, 25, 25, 17, 17, 17,
]

function formatTime(seconds) {
  if (!isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

/* Mapas de colores por variante — todo desde tokens del DS */
const PALETTE = {
  active: {
    card: 'bg-[#1A1A1C]',
    headerBorder: 'border-[#3A3A3A]',
    headerDot: 'bg-secondary-500',
    label: 'text-text-disabled',
    number: 'text-text-tertiary',
    title: 'text-text-inverse',
    author: 'text-text-tertiary',
    playerBg: 'bg-surface-inverse',
    playButton: 'bg-secondary-500 hover:bg-secondary-600',
    waveBar: 'bg-text-tertiary',
    waveBarActive: 'bg-secondary-500',
    timerMain: 'text-text-inverse',
    timerSep: 'text-text-tertiary',
    timerTotal: 'text-text-tertiary',
  },
  disabled: {
    card: 'bg-surface-elevated',
    headerBorder: 'border-border-subtle',
    headerDot: 'bg-border-default',
    label: 'text-border-default',
    number: 'text-text-disabled',
    title: 'text-text-disabled',
    author: 'text-text-disabled',
    playerBg: 'bg-border-subtle',
    playButton: 'bg-border-default',
    waveBar: 'bg-surface-elevated',
    waveBarActive: 'bg-surface-elevated',
    timerMain: 'text-text-inverse',
    timerSep: 'text-border-default',
    timerTotal: 'text-border-default',
  },
}

export default function AudioCard({
  label = 'TESTIMONIO AUDITIVO',
  number = '001',
  title,
  author,
  src,
  disabled = false,
  onClick,
}) {
  const audioRef = useRef(null)
  const waveRef = useRef(null)
  const draggingRef = useRef(false)

  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  /* Sincroniza estado React con eventos del <audio> (solo si activa).
     Los listeners `play`/`pause` son cruciales: cuando otra AudioCard
     nos pausa programáticamente (mutex global, ver más abajo), el
     evento `pause` se dispara y aquí actualizamos React → el botón
     de esta card vuelve a mostrar el icono de play correctamente. */
  useEffect(() => {
    if (disabled) return
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setCurrentTime(audio.currentTime)
    const onLoaded = () => setDuration(audio.duration || 0)
    const onEnded = () => setPlaying(false)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('durationchange', onLoaded)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    /* Mutex global de reproducción: solo una card de audio puede
       sonar a la vez en toda la página. Cuando CUALQUIER otro
       <audio> arranca su reproducción, pausamos el nuestro.
       · El evento `play` NO burbujea → necesita capture: true.
       · Comparamos por referencia con el elemento de esta card
         para no auto-pausarnos cuando somos nosotros los que
         empezamos. */
    const onAnyAudioPlay = (e) => {
      if (e.target !== audio && e.target instanceof HTMLAudioElement) {
        audio.pause()
      }
    }
    document.addEventListener('play', onAnyAudioPlay, true)

    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('durationchange', onLoaded)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      document.removeEventListener('play', onAnyAudioPlay, true)
    }
  }, [src, disabled])

  /* togglePlay delega el cambio de estado a los listeners `play`/
     `pause` del propio <audio>: ellos llaman a setPlaying. Así
     funciona también cuando el cambio viene desde fuera (otra
     card disparando el mutex global, o el evento `ended`). */
  const togglePlay = () => {
    if (disabled) return
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }

  const seekFromPointer = (clientX) => {
    if (disabled) return
    const audio = audioRef.current
    const wave = waveRef.current
    if (!audio || !wave || !duration) return
    const rect = wave.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const newTime = ratio * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const onPointerDown = (e) => {
    if (disabled) return
    e.currentTarget.setPointerCapture(e.pointerId)
    draggingRef.current = true
    seekFromPointer(e.clientX)
  }
  const onPointerMove = (e) => {
    if (disabled || !draggingRef.current) return
    seekFromPointer(e.clientX)
  }
  const onPointerUp = (e) => {
    if (disabled) return
    try { e.currentTarget.releasePointerCapture(e.pointerId) } catch {}
    draggingRef.current = false
  }

  const progress = !disabled && duration ? currentTime / duration : 0

  const s = disabled ? PALETTE.disabled : PALETTE.active
  const clickable = disabled && typeof onClick === 'function'

  /* Para el waveform en estado disabled: pointer-events: none deja que
     el click atraviese hasta el contenedor article (que tiene el onClick). */
  return (
    <article
      className={`
        ${s.card} rounded-3xl p-6 sm:p-8 w-full h-full
        ${clickable ? 'cursor-pointer' : ''}
      `}
      onClick={clickable ? onClick : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
      aria-label={clickable ? `Activar testimonio: ${title}` : undefined}
    >

      {/* ── Cabecera con borde inferior dashed ── */}
      <header className={`flex items-center justify-between pb-3 border-b border-dashed ${s.headerBorder}`}>
        <div className="flex items-center gap-3">
          <span className={`w-3 h-3 rounded-full ${s.headerDot} shrink-0`} aria-hidden />
          <span className={`font-sans font-medium text-xs uppercase tracking-[0.08em] ${s.label}`}>
            {label}
          </span>
        </div>
        <span className={`font-sans text-[11px] tracking-[0.04em] ${s.number}`}>
          Nº {number}
        </span>
      </header>

      {/* ── Contenido: título + autor ──
          `truncate` en el <h3> corta el título a una sola línea con
          "…" cuando no cabe en el ancho de la card. El title HTML
          permite ver el texto completo en tooltip nativo del browser
          al hacer hover, sin sustituir el comportamiento accesible. */}
      <div className="pt-10 pb-6 min-w-0">
        <h3
          className={`font-sans font-bold text-[22px] leading-7 tracking-[-0.01em] truncate ${s.title}`}
          title={title}
        >
          {title}
        </h3>
        <p className={`font-sans text-sm leading-[22px] mt-2 truncate ${s.author}`} title={author}>
          {author}
        </p>
      </div>

      {/* ── Reproductor (pill) ── */}
      <div className={`${s.playerBg} rounded-full flex items-center gap-4 sm:gap-5 p-4 pr-5 sm:pr-6`}>

        {/* Botón play / pause */}
        <button
          onClick={disabled ? undefined : togglePlay}
          aria-disabled={disabled}
          className={`
            w-12 h-12 rounded-full ${s.playButton}
            flex items-center justify-center shrink-0
            transition-colors
            focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
          aria-label={playing ? 'Pausar audio' : 'Reproducir audio'}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#FDFCFA" aria-hidden>
              <rect x="3" y="2" width="4" height="12" rx="1" />
              <rect x="9" y="2" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#FDFCFA" aria-hidden>
              <path d="M5 2.5L14 8l-9 5.5V2.5z" />
            </svg>
          )}
        </button>

        {/* Waveform — interactivo solo en estado activo */}
        <div
          ref={waveRef}
          onPointerDown={disabled ? undefined : onPointerDown}
          onPointerMove={disabled ? undefined : onPointerMove}
          onPointerUp={disabled ? undefined : onPointerUp}
          onPointerCancel={disabled ? undefined : onPointerUp}
          role={disabled ? undefined : 'slider'}
          aria-label={disabled ? undefined : 'Progreso del audio'}
          aria-valuemin={disabled ? undefined : 0}
          aria-valuemax={disabled ? undefined : (Math.floor(duration) || 0)}
          aria-valuenow={disabled ? undefined : Math.floor(currentTime)}
          tabIndex={disabled ? -1 : 0}
          className={`
            flex-1 h-8 flex items-center justify-start gap-[3px] overflow-hidden
            ${disabled ? 'pointer-events-none' : 'cursor-pointer touch-none select-none'}
          `}
        >
          {BAR_HEIGHTS.map((h, i) => {
            const isActive = i / BAR_HEIGHTS.length < progress
            return (
              <span
                key={i}
                className={`block w-[2px] rounded-full shrink-0 transition-colors duration-75 ${
                  isActive ? s.waveBarActive : s.waveBar
                }`}
                style={{ height: `${h}px` }}
              />
            )
          })}
        </div>

        {/* Timer: actual / total */}
        <div className="flex items-baseline gap-1 shrink-0">
          <span className={`font-display font-bold text-[28px] sm:text-[32px] leading-none tabular-nums ${s.timerMain}`}>
            {formatTime(disabled ? 0 : currentTime)}
          </span>
          <span className={`font-sans text-xs ${s.timerSep}`}>/</span>
          <span className={`font-display font-bold text-sm tabular-nums ${s.timerTotal}`}>
            {formatTime(disabled ? 4 * 60 + 32 : duration)}
          </span>
        </div>
      </div>

      {/* Elemento de audio HTML5 (solo en estado activo y con src) */}
      {!disabled && src && <audio ref={audioRef} src={src} preload="metadata" />}
    </article>
  )
}
