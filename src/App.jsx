// App.jsx

import './App.css'
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei'; 
import { useErrorBoundary} from 'use-error-boundary';
import { useEffect, useState, useCallback, useFrame } from 'react';
import { Model } from './components/Model';
import React from 'react'


const App = () => {
  // safeguarding the canvas against WebGL context crashes
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();

  // state to track mouse position
  const [mousePosition, setMousePosition] = useState({ x:0 , y:0})

  const handleMouseMove = useCallback((event)=> {
    // calculate normalized mouse position (-1 to 1)
    const x = (event.clientX) / window.innerWidth * 2 -1;
    const y = (event.clientY) / window.innerHeight * 2 -1;

    setMousePosition({ x, y })
  })

  useEffect(() => {

    // listen for mouse movements
    window.addEventListener('mousemove', handleMouseMove)

    // Clean up
    return () => {
  
      window.addEventListener('mousemove', handleMouseMove)
    }
  }, [ handleMouseMove]);
  
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
          position={[5, 0, 2]}
          scale={[1.5, 1.5, 1.5]}
          rotation={[mousePosition.y * 0.0001, mousePosition.x * 0.4, 0]}
          />
          
        </Canvas>
      </div>
    </ErrorBoundary>
  )
}

export default App

