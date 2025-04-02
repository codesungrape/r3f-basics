import React from 'react';
import { Navbar } from './ui/Navbar';

export function HeroSection() {
  return (
    <section className="hero-container h-screen w-full relative overflow-hidden flex items-center justify-center">
      {/* Include Navbar component */}
      <Navbar />

      {/* Background "THE AI DOCTOR" text */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-1/2 left-1/6 transform -translate-x-1/6 -translate-y-1/2 text-white/[0.08] text-[17vw] font-black tracking-tighter leading-none whitespace-nowrap">
          <span className="font-display uppercase select-none block relative">
            <span className="block mb-[-0.2em]">THE AI</span>
            <span className="block">DOCTOR</span>
          </span>
        </div>
      </div>
      
      {/* Content container */}
      <div className="relative z-[10] flex flex-col items-center w-full max-w-7xl px-8">
        <div className="flex items-center justify-center w-full">
          {/* Left side - for Chris Meah text */}
          <div className="w-full flex flex-col items-start justify-center pr-4">
            {/* Main title */}
            <div className="relative left-8 ">
              <h1 
                className="text-[7vw] font-bold relative z-[20] uppercase text-blue-400 " 
                style={{
                  textShadow: `
                    0 0 5px rgba(96, 165, 250, 0.7),
                    0 0 10px rgba(59, 130, 246, 0.6),
                    0 0 15px rgba(37, 99, 235, 0.4),
                    0 0 20px rgba(29, 78, 216, 0.2)
                  `,
                  animation: 'textPulse 3s infinite alternate ease-in-out'
                }}
              >
              </h1>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[20]">
        <div className="flex flex-col items-center">
          <span className="text-white/50 text-sm mb-2 font-light tracking-wider">
            Scroll to explore
          </span>
        </div>
      </div>

      {/* Add keyframe animation */}
      <style jsx>{`
        @keyframes textPulse {
          0% {
            text-shadow: 
              0 0 5px rgba(96, 165, 250, 0.7),
              0 0 10px rgba(59, 130, 246, 0.6),
              0 0 15px rgba(37, 99, 235, 0.4),
              0 0 20px rgba(29, 78, 216, 0.2);
          }
          100% {
            text-shadow: 
              0 0 7px rgba(96, 165, 250, 0.9),
              0 0 14px rgba(59, 130, 246, 0.8),
              0 0 21px rgba(37, 99, 235, 0.6),
              0 0 28px rgba(29, 78, 216, 0.3);
          }
        }
      `}</style>
    </section>
  );
}