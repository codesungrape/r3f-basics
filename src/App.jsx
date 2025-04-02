// File: src/App.jsx
import './App.css'
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { useErrorBoundary} from 'use-error-boundary';
import { useEffect, useState, useCallback } from 'react';
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
  }, []);
  
  useEffect(() => {
    // listen for mouse movements
    window.addEventListener('mousemove', handleMouseMove)

    // Ensure scroll position starts at the top on component mount
    window.scrollTo(0, 0);
    
    // Clean up 
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove]);
  
  return didCatch ? (<div>{error.message}</div>) : (
    <ErrorBoundary>
      {/* Main container that holds both canvas and scrollable content */}
      <div className="main-container">
        {/* Canvas container */}
        <div className="canvas-container">
          <Canvas
            fallback={<div>Sorry no WebGL supported!</div>}
            camera={{ position: [2, 0, 12], fov: 60 }}>
            
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
              enableZoom={false} // Disable zoom to prevent conflicts
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2}
              minAzimuthAngle={-Math.PI / 0.0} // Limits left rotation
              maxAzimuthAngle={Math.PI / 2} // Limits right rotation
              dampingFactor={0.05}
              rotateSpeed={0.15}
            />
            
            <Model
              position={[5, -1, 1]}
              scale={[3, 3, 3]}
              rotation={[mousePosition.y * 0.0001, mousePosition.x * 0.4, 0]}
            />
          </Canvas>
        </div>
        
        {/* Scrollable content */}
        <div className="scroll-content">
          <section>
            <h1>About Me</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..</p>
          </section>
          <section>
            <h2>I build...</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </section>
          <section>
            <h2>I teach .....</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </section>
          <section>
            <h2>I speak</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </section>
          <section>
            <h2>AI</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </section>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App
