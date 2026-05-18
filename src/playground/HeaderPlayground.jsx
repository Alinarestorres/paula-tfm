import Header from '../components/Header'
import PlaygroundLayout from './PlaygroundLayout'

export default function HeaderPlayground() {
  return (
    <PlaygroundLayout
      title="Header"
      description="Cabecera editorial de la landing. Layout asimétrico con 'Las' en BioRhyme coral a la izquierda y el resto del titular + descripción + autora a la derecha."
    >
      {/* Mostramos el Header tal cual aparecerá en la landing, sin contenedor adicional */}
      <div className="-mx-6">
        <Header />
      </div>
    </PlaygroundLayout>
  )
}
