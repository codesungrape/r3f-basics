import React from 'react';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex justify-between items-center z-50 py-6 px-10">
      <div className="flex-1"></div> {/* Spacer */}
      <div 
        className="logo-container"
        style={{
          textShadow: `
            0 0 5px rgba(96, 165, 250, 0.4),
            0 0 8px rgba(59, 130, 246, 0.3)
          `,
          animation: 'logoPulse 4s infinite alternate ease-in-out'
        }}
      >
        <span className="text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-cyan-300 to-cyan-500 uppercase">
          CM.
        </span>
      </div>

      {/* Add keyframe animation */}
      <style jsx>{`
        @keyframes logoPulse {
          0% {
            text-shadow: 
              0 0 5px rgba(96, 165, 250, 0.4),
              0 0 8px rgba(59, 130, 246, 0.3);
          }
          100% {
            text-shadow: 
              0 0 6px rgba(96, 165, 250, 0.5),
              0 0 10px rgba(59, 130, 246, 0.4);
          }
        }
        
        .logo-container {
          padding: 0.5rem 1.5rem;
          border-radius: 0.5rem;
          position: relative;
          overflow: hidden;
        }
        
        .logo-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(59, 130, 246, 0.05);
          border-radius: 0.5rem;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .logo-container:hover::before {
          opacity: 1;
        }
      `}</style>
    </nav>
  );
} 