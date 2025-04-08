import React from "react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex justify-between items-center z-50 py-6 px-10">
      <span className="top-0 right-5 fixed text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-cyan-300 to-cyan-500 uppercase">
        CM.
      </span>
    </nav>
  );
}
