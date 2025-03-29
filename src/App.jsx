import './App.css'
import { Canvas } from '@react-three/fiber';
import { useErrorBoundary} from 'use-error-boundary';
import Cube from './components/Cube';
import Sphere from './components/Sphere';
import Torus from './components/Torus';
import TorusKnot from './components/TorusKnot';


const App = () => {

  // safeguarding the canavs against WebGL context crashes
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();


  
  return didCatch ? (<div>{error.message}</div>) :
    (
    <ErrorBoundary>
      <Canvas fallback={<div>Sorry no WebGL supported!</div>}>
        
        {/* Environment setup */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 5, 5]} intensity={1} />

      <group position={[0, 0, 0]}>
          <Cube 
            position={[1, 0, 0]}
            args={[1, 1, 1]}
            color={"yellow"}
          />
          {/* <Cube 
            position={[-1, 0, 1]}
            args={[1, 1, 1]}
            color={"lightgreen"}
          /> */}
          <Cube 
            position={[-1, 2, 0]}
            args={[1, 1, 1]}
            color={"pink"}
          />
          <Cube 
            position={[0, 1, 0]}
            args={[1, 1, 1]}
            color={"lightblue"}
          />
      </group>
          <Sphere
            position={[-2, 0, 1]}
            // args={[radius, widthSegments, heightSegments]}
            args={[1, 25, 40]}
            isHovered={"hotpink"}
          />
          <Torus 
            position={[2, 0, 0]}
            // args={[radius, widthSegments, heightSegments]}
            args={[0.25, 0.2, 5]}
            color={"hotpink"}
          />
          <TorusKnot
            position={[0, 3, 2]}
            // args={[radius, widthSegments, heightSegments]}
            args={[1, 0.1, 50, 25, 2, 5]}
            color={"hotpink"}
          />

          
      </Canvas>
    </ErrorBoundary>

  )
}

export default App
