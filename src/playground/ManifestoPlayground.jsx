import Manifesto from '../components/Manifesto'
import PlaygroundLayout from './PlaygroundLayout'

export default function ManifestoPlayground() {
  return (
    <PlaygroundLayout
      title="Manifiesto"
      description="Card editorial del Manifiesto Turismo Que Suma 2025. Cinco puntos en cards del mismo tamaño dentro de un container, con el bloque de título en la esquina inferior derecha. Componente puramente visual, sin animaciones."
    >
      <Manifesto />
    </PlaygroundLayout>
  )
}
