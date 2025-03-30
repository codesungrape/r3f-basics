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
import segment_0_0 from './assets/ChrisAI/segment_0_0.png';
import segment_0_1 from './assets/ChrisAI/segment_0_1.png';
import segment_0_2 from './assets/ChrisAI/segment_0_2.png';
import segment_1_0 from './assets/ChrisAI/segment_1_0.png';
import segment_1_1 from './assets/ChrisAI/segment_1_1.png';
import segment_1_2 from './assets/ChrisAI/segment_1_2.png';
import segment_2_0 from './assets/ChrisAI/segment_2_0.png';
import segment_2_1 from './assets/ChrisAI/segment_2_1.png';
import segment_2_2 from './assets/ChrisAI/segment_2_2.png';

const importedTextureList = [
  segment_0_0, segment_0_1, segment_0_2,
  segment_1_0, segment_1_1, segment_1_2,
  segment_2_0, segment_2_1, segment_2_2
];

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
          <Sphere
            position={[-2, 0, 1]}
            // args={[radius, widthSegments, heightSegments]}
            args={[1, 25, 40]}
            isHovered={"hotpink"}
          />
      
          {/* Using a grid of ShapeWithImage components with different textures */}
          <>
            {/* Row 1 - need to be mapped */}
            <ShapeWithImage imageTexture={importedTextureList[0]} position={[0, 1, 0]}/>
            <ShapeWithImage imageTexture={importedTextureList[1]} position={[2, 1, 0]}/>
            <ShapeWithImage imageTexture={importedTextureList[2]} position={[4, 1, 0]}/>

            {/* Row 2 */}
            <ShapeWithImage imageTexture={importedTextureList[3]} position={[0, -1, 0]}/>
            <ShapeWithImage imageTexture={importedTextureList[4]} position={[2, -1, 0]}/>
            <ShapeWithImage imageTexture={importedTextureList[5]} position={[4, -1, 0]}/>

            {/* Row 3 */}
            <ShapeWithImage imageTexture={importedTextureList[6]} position={[0, -3, 0]}/>
            <ShapeWithImage imageTexture={importedTextureList[7]} position={[2, -3, 0]}/>
            <ShapeWithImage imageTexture={importedTextureList[8]} position={[4, -3, 0]}/>
          </>
          
      </Canvas>
    </ErrorBoundary>

  )
}

export default App


// <group position={[-2, -2, -2]}>
// {/* <Cube 
//   position={[1, 0, 0]}
//   args={[1, 1, 1]}
//   color={"yellow"}
// /> */}
// {/* <Cube 
//   position={[-1, 0, 1]}
//   args={[1, 1, 1]}
//   color={"lightgreen"}
// /> */}
// {/* <Cube 
//   position={[-1, 2, 0]}
//   args={[1, 1, 1]}
//   color={"pink"}
// /> */}
// {/* <Cube 
//   position={[0, 1, 0]}
//   args={[1, 1, 1]}
//   color={"lightblue"}
// /> */}
//     {/* <Torus 
//     position={[2, 0, 0]}
//     // args={[radius, widthSegments, heightSegments]}
//     args={[0.25, 0.2, 5]}
//     color={"hotpink"}
//   /> */}
//   {/* <TorusKnot
//     position={[0, 3, 2]}
//     // args={[radius, widthSegments, heightSegments]}
//     args={[1, 0.1, 50, 25, 2, 5]}
//     color={"hotpink"}
//   /> */}

// </group>