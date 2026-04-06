import React from 'react';

/**
 * SimpleBits - A minimal gradient background with floating orbs
 * Works instantly, no external dependencies beyond Tailwind
 */
export default function SimpleBitsBg() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large gradient orbs with animations */}
      <div
        className="absolute w-96 h-96 bg-accent/25 rounded-full blur-3xl animate-pulse"
        style={{
          top: '10%',
          left: '20%',
          animationDelay: '0s',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse"
        style={{
          bottom: '10%',
          right: '15%',
          animationDelay: '2s',
        }}
      />
      <div
        className="absolute w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animationDelay: '4s',
        }}
      />
    </div>
  );
}
