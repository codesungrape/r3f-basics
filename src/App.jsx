import './App.css'
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei'; 
import { useErrorBoundary} from 'use-error-boundary';
import Cube from './components/Cube';
import Sphere from './components/Sphere';
import Torus from './components/Torus';
import TorusKnot from './components/TorusKnot';
import { useEffect, useState } from 'react';
import ShapeWithImage from './components/ShapeWithImage';




const App = () => {

  // safeguarding the canavs against WebGL context crashes
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();

  // state variable track scroll position
  const [scrollPosition, setScrollPosition ] = useState(0)

  useEffect(() => {

    // function to update scroll position
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    }

    // listen for scroll events
    window.addEventListener('scroll', handleScroll)

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })


  
  return didCatch ? (<div>{error.message}</div>) :
    (
    <ErrorBoundary>
      <Canvas fallback={<div>Sorry no WebGL supported!</div>}>
        
        {/* Environment setup */}
      {/* <ambientLight intensity={0.4} />
      <directionalLight position={[2, 5, 5]} intensity={1} /> */}
      <Environment preset="dawn" />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        dampingFactor={0.05}
        rotateSpeed={0.5}
        // enabled={scrollPosition < 100}
      />

      <group position={[-2, -2, -2]}>
        {/* <Cube 
          position={[1, 0, 0]}
          args={[1, 1, 1]}
          color={"yellow"}
        /> */}
        {/* <Cube 
          position={[-1, 0, 1]}
          args={[1, 1, 1]}
          color={"lightgreen"}
        /> */}
        {/* <Cube 
          position={[-1, 2, 0]}
          args={[1, 1, 1]}
          color={"pink"}
        /> */}
        {/* <Cube 
          position={[0, 1, 0]}
          args={[1, 1, 1]}
          color={"lightblue"}
        /> */}
      </group>
          <Sphere
            position={[-2, 0, 1]}
            // args={[radius, widthSegments, heightSegments]}
            args={[1, 25, 40]}
            isHovered={"hotpink"}
          />
          {/* <Torus 
            position={[2, 0, 0]}
            // args={[radius, widthSegments, heightSegments]}
            args={[0.25, 0.2, 5]}
            color={"hotpink"}
          /> */}
          {/* <TorusKnot
            position={[0, 3, 2]}
            // args={[radius, widthSegments, heightSegments]}
            args={[1, 0.1, 50, 25, 2, 5]}
            color={"hotpink"}
          /> */}
          <>
            {/* Row 1 - need to be mapped */}
            <ShapeWithImage position={[0, 1, 0]}/>
            <ShapeWithImage position={[2, 1, 0]}/>
            <ShapeWithImage position={[4, 1, 0]}/>

            {/* Row 2 */}
            <ShapeWithImage position={[0, 3, 0]}/>
            <ShapeWithImage position={[2, 3, 0]}/>
            <ShapeWithImage position={[4, 3, 0]}/>

            {/* Row 3 */}
            <ShapeWithImage position={[0, 5, 0]}/>
            <ShapeWithImage position={[2, 5, 0]}/>
            <ShapeWithImage position={[4, 5, 0]}/>
          </>
          
      </Canvas>
    </ErrorBoundary>

  )
}

export default App
