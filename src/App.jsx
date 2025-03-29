import './App.css'
import { Canvas } from '@react-three/fiber';
import { useErrorBoundary} from 'use-error-boundary';
import Cube from './components/Cube';
import Sphere from './components/Sphere';

const App = () => {

  // safeguarding the canavs against WebGL context crashes
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();

  
  return didCatch ? (<div>{error.message}</div>) :
    (
    <ErrorBoundary>
      <Canvas fallback={<div>Sorry no WebGL supported!</div>}>
        
        {/* Environment setup */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 5, 5]} intensity={1} />

      
          {/* fundamental building block for rendering any building bocks. A mesh needs a germetry shape and everything within the mesh are its properties- like a container*/}
          <Cube 
            position={[1, 0, 0]}
            args={[1, 1, 1]}
            color={"yellow"}
          />
          <Cube 
            position={[-1, 0, 1]}
            args={[1, 1, 1]}
            color={"lightgreen"}
          />
          <Cube 
            position={[-1, 2, 0]}
            args={[1, 1, 1]}
            color={"pink"}
          />
          <Sphere
            position={[2, 0, 1]}
            args={[1, 1, 1]}
            color={"#ff7700"}
          />
          <Cube 
            position={[0, 1, 0]}
            args={[1, 1, 1]}
            color={"lightblue"}
          />
      </Canvas>
    </ErrorBoundary>

  )
}

export default App
