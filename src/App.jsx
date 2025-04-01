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
import { Model } from './components/Model';
import React from 'react'


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

  // state to track mouse position
  const [mousePosition, setMousePosition] = useState({ x:0 , y:0})

  // Handle click anywhere on the page
  const handleGlobalClick = useCallback(() => {
    setIsContracted(prev => !prev);
  }, []);

  const handleMouseMove = useCallback((event)=> {
    // calculate normalized mouse position (-1 to 1)
    const x = (event.clientX) / window.innerWidth * 2 -1;
    const y = (event.clientY) / window.innerHeight * 2 -1;

    setMousePosition({ x, y })
  })

  useEffect(() => {
    // // function to update scroll position
    // const handleScroll = () => {
    //   setScrollPosition(window.scrollY);
    // }

    // // listen for scroll events
    // window.addEventListener('scroll', handleScroll);
    
    // listen for click events
    window.addEventListener('click', handleGlobalClick);

    // listen for mouse movements
    window.addEventListener('mousemove', handleMouseMove)

    // Clean up
    return () => {
      // window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleGlobalClick);
      window.addEventListener('mousemove', handleMouseMove)
    }
  }, [handleGlobalClick, handleMouseMove]);
  
  return didCatch ? (<div>{error.message}</div>) :
    (
    <ErrorBoundary>
      <div className="canvas-container">
        <Canvas 
          fallback={<div>Sorry no WebGL supported!</div>}
          camera={{ position: [2, 0, 12], fov: 60 }}
          style={{ height: '100vh', position: 'fixed', top: 0, left: 0 }}>
          
          {/* Improved lighting setup */}
  <ambientLight intensity={1.0} />
  <hemisphereLight skyColor="#ffffff" groundColor="#444444" intensity={0.8} />
  <directionalLight 
    position={[10, 10, 5]} 
    intensity={0.8}
    castShadow 
    shadow-mapSize-width={1024} 
    shadow-mapSize-height={1024}
  />
  <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#ffffff" />

          {/* Environment setup */}
          <Environment preset="park" />

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 0.0}  // Limits left rotation
            maxAzimuthAngle={Math.PI / 2}   // Limits right rotation
            dampingFactor={0.05}
            rotateSpeed={0.15}
          />
          <Model 
          position={[2, 0, 2]}
          rotation={[mousePosition.y * 0.0001, mousePosition.x * 0.4, 0]}
          />
            {/* <Sphere
            position={[-3, 0, 1]}
            // args={[radius, widthSegments, heightSegments]}
            args={[1, 25, 40]}
            isHovered={"hotpink"}
          /> */}
          
          {/* Grid of ShapeWithImage components */}
          {/* {importedTextureList.map((texture, index) => (
            <ShapeWithImage 
              key={index}
              imageTexture={texture} 
              position={isContracted ? contractedPositions[index] : expandedPositions[index]}
              isContracted={isContracted}
              index={index}
            />
          ))} */}
          
        </Canvas>
      </div>
    </ErrorBoundary>
  )
}

export default App

