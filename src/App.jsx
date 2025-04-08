import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Float } from "@react-three/drei";
import { useErrorBoundary } from "use-error-boundary";
import { useEffect, useState, useCallback, useRef } from "react";
import { Model } from "./components/Model";
import React from "react";
import { StickyScrollRevealDemo } from "./components/parallax";
import { HeroSection } from "./components/Hero";
import { motion } from "framer-motion";
import { Navbar } from "./components/Navbar";
import * as THREE from "three";

function App() {
  // safeguarding the canvas against WebGL context crashes
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();

  // state to track mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // State for tracking the active card - initialize to 0 for Hero section
  const [activeCardIndex, setActiveCardIndex] = useState(0); // Initialize to 0 instead of undefined

  // Background colors for different cards
  const backgroundColors = [
    "#0f172a", // slate-900 - hero colour
    "#000000", // black
    "#16172e", // deep blue
    "#0c0a20", // deep indigo
    "#171717", // neutral-900
  ];

  const handleMouseMove = useCallback((event) => {
    // calculate normalized mouse position (-1 to 1)
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = (event.clientY / window.innerHeight) * 2 - 1;

    // Use lerp to smoothly transition to the new mouse position
    setMousePosition((prev) => ({
      x: prev.x + (x - prev.x) * 0.03, // Lower value = slower, more flowy movement
      y: prev.y + (y - prev.y) * 0.03, // 0.03 is very slow and smooth
    }));
  }, []);

  // Handle card change from the parallax component
  const handleCardChange = useCallback((index) => {
    setActiveCardIndex(index);
  }, []);

  useEffect(() => {
    // listen for mouse movements
    window.addEventListener("mousemove", handleMouseMove);

    // Ensure scroll position starts at the top on component mount
    window.scrollTo(0, 0);

    // Explicitly set the Hero section's background color index
    setActiveCardIndex(0);

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return didCatch ? (
    <div>{error.message}</div>
  ) : (
    <>
      <Navbar />
      <ErrorBoundary>
        {/* Full-page background that animates with color changes */}
        <motion.div
          className="fixed inset-0 w-full h-screen"
          animate={{
            backgroundColor:
              backgroundColors[activeCardIndex % backgroundColors.length],
          }}
          transition={{ duration: 1.2 }}
          style={{ zIndex: -1 }}
        />

        {/* Main container */}
        {/* <div className="main-container"> */}
        {/* Canvas container */}
        <div className="canvas-container">
          <Canvas
            fallback={<div>Sorry no WebGL supported!</div>}
            camera={{ position: [2, 0, 12], fov: 60 }}
          >
            {/* Improved lighting setup */}
            <ambientLight intensity={1.0} />
            <hemisphereLight
              skyColor="#ffffff"
              groundColor="#444444"
              intensity={0.8}
            />
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
              enableRotate={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2}
              minAzimuthAngle={-Math.PI / 0.0} // Limits left rotation
              maxAzimuthAngle={Math.PI / 2} // Limits right rotation
              dampingFactor={0.05}
              rotateSpeed={0.15}
            />

            <Float
              speed={1.5} // Animation speed
              rotationIntensity={0.5} // XYZ rotation intensity
              floatIntensity={0.5} // Up/down float intensity
            >
              <Model
                position={[5, -1, 1]}
                scale={[3, 3, 3]}
                rotation={[mousePosition.y * 0.08, mousePosition.x * 0.3, 0]}
              />
            </Float>
          </Canvas>
        </div>

        {/* Scrollable content */}
        {/* Hero section */}
        <section className="w-full h-screen">
          <HeroSection />
        </section>

        <div className="scroll-content">
          {/* Parallax section */}
          <section className="w-full h-screen">
            <StickyScrollRevealDemo onCardChange={handleCardChange} />
          </section>
        </div>
        {/* </div> */}
      </ErrorBoundary>
    </>
  );
}

export default App;
