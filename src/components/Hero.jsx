import React from "react";
import { Navbar } from "./Navbar";

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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[20]">
        <div className="flex flex-col items-center">
          <span className="text-white/50 text-sm mb-2 font-light tracking-wider">
            Explore
          </span>
        </div>
      </div>
    </section>
  );
}
