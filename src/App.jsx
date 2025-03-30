// App.jsx

import './App.css'
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei'; 
import { useErrorBoundary} from 'use-error-boundary';
import { useEffect, useState, useCallback } from 'react';
import ShapeWithImage from './components/ShapeWithImage';
import Instructions from './components/Instructions';
import segment_0_0 from './assets/ChrisAI/segment_0_0.png';
import segment_0_1 from './assets/ChrisAI/segment_0_1.png';
import segment_0_2 from './assets/ChrisAI/segment_0_2.png';
import segment_1_0 from './assets/ChrisAI/segment_1_0.png';
import segment_1_1 from './assets/ChrisAI/segment_1_1.png';
import segment_1_2 from './assets/ChrisAI/segment_1_2.png';
import segment_2_0 from './assets/ChrisAI/segment_2_0.png';
import segment_2_1 from './assets/ChrisAI/segment_2_1.png';
import segment_2_2 from './assets/ChrisAI/segment_2_2.png';
import Sphere from './components/Sphere';

const importedTextureList = [
  segment_0_0, segment_0_1, segment_0_2,
  segment_1_0, segment_1_1, segment_1_2,
  segment_2_0, segment_2_1, segment_2_2
];

// Define the grid layout positions (when expanded)
const expandedPositions = [
  // Row 1
  [0, 1, 0], [2, 1, 0], [4, 1, 0],
  // Row 2
  [0, -1, 0], [2, -1, 0], [4, -1, 0],
  // Row 3
  [0, -3, 0], [2, -3, 0], [4, -3, 0]
];

// Define the contracted positions (forming a 3x3 grid with no gaps)
const contractedPositions = [
  // Row 1
  [0, 1, 0], [1, 1, 0], [2, 1, 0],
  // Row 2
  [0, 0, 0], [1, 0, 0], [2, 0, 0],
  // Row 3
  [0, -1, 0], [1, -1, 0], [2, -1, 0]
];

const App = () => {
  // safeguarding the canvas against WebGL context crashes
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();

  // state variable to track scroll position
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // state to track if the image is contracted (showing the full image)
  const [isContracted, setIsContracted] = useState(false);

  // Handle click anywhere on the page
  const handleGlobalClick = useCallback(() => {
    setIsContracted(prev => !prev);
  }, []);

  useEffect(() => {
    // function to update scroll position
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    }

    // listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // listen for click events
    window.addEventListener('click', handleGlobalClick);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleGlobalClick);
    }
  }, [handleGlobalClick]);
  
  return didCatch ? (<div>{error.message}</div>) :
    (
    <ErrorBoundary>
      <div className="canvas-container">
        <Instructions isContracted={isContracted} />
        <Canvas 
          fallback={<div>Sorry no WebGL supported!</div>}
          camera={{ position: [2, 0, 8], fov: 45 }}>
          {/* Add better lighting for the contracted image */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          
          {/* Environment setup */}
          <Environment preset="night" />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
            dampingFactor={0.05}
            rotateSpeed={0.5}
          />
            <Sphere
            position={[-3, 0, 1]}
            // args={[radius, widthSegments, heightSegments]}
            args={[1, 25, 40]}
            isHovered={"hotpink"}
          />
          
          {/* Grid of ShapeWithImage components */}
          {importedTextureList.map((texture, index) => (
            <ShapeWithImage 
              key={index}
              imageTexture={texture} 
              position={isContracted ? contractedPositions[index] : expandedPositions[index]}
              isContracted={isContracted}
              index={index}
            />
          ))}
          
        </Canvas>
      </div>
    </ErrorBoundary>
  )
}

export default App


// <group position={[-2, -2, -2]}>
// import Torus from './components/Torus';
// import TorusKnot from './components/TorusKnot';
// import Cube from './components/Cube';
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