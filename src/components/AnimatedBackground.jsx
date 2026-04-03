import React from 'react'

export default function AnimatedBackground() {
  const orbs = [
    { size: 400, top: '10%', left: '20%', delay: 0, color: 'rgba(59, 130, 246, 0.4)' },
    { size: 500, top: '60%', left: '70%', delay: 5, color: 'rgba(139, 92, 246, 0.35)' },
    { size: 300, top: '80%', left: '10%', delay: 10, color: 'rgba(6, 182, 212, 0.3)' },
    { size: 350, top: '30%', left: '80%', delay: 15, color: 'rgba(236, 72, 153, 0.25)' },
  ]

  return (
    <>
      {/* Mesh gradient base */}
      <div className="bg-gradient-mesh" />

      {/* Noise texture */}
      <div className="bg-noise" />

      {/* Animated floating orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {orbs.map((orb, i) => (
          <div
            key={i}
            className="floating-orb"
            style={{
              width: orb.size,
              height: orb.size,
              top: orb.top,
              left: orb.left,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              animationDelay: `${orb.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  )
}
