import React from 'react'

export default function EnhancedBackground() {
  const shapes = [
    { type: 'circle', size: 300, top: '10%', left: '15%', color: 'rgba(249, 115, 22, 0.15)', delay: 0 },
    { type: 'circle', size: 400, top: '60%', left: '70%', color: 'rgba(236, 72, 153, 0.12)', delay: 5 },
    { type: 'square', size: 200, top: '30%', left: '80%', color: 'rgba(168, 85, 247, 0.1)', delay: 10, rotate: 15 },
    { type: 'circle', size: 250, top: '70%', left: '20%', color: 'rgba(244, 63, 94, 0.12)', delay: 15 },
    { type: 'triangle', size: 350, top: '20%', left: '50%', color: 'rgba(249, 115, 22, 0.08)', delay: 8 },
    { type: 'square', size: 180, top: '80%', left: '60%', color: 'rgba(168, 85, 247, 0.1)', delay: 12, rotate: -20 },
  ]

  const renderShape = (shape, i) => {
    const commonStyle = {
      position: 'absolute',
      top: shape.top,
      left: shape.left,
      width: shape.size,
      height: shape.size,
      background: `radial-gradient(circle, ${shape.color} 0%, transparent 70%)`,
      animationDelay: `${shape.delay}s`,
    }

    if (shape.type === 'circle') {
      return (
        <div
          key={i}
          className="floating-orb"
          style={{
            ...commonStyle,
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />
      )
    } else if (shape.type === 'square') {
      return (
        <div
          key={i}
          className="floating-orb"
          style={{
            ...commonStyle,
            borderRadius: '30%',
            transform: `rotate(${shape.rotate || 0}deg)`,
            opacity: 0.4,
            filter: 'blur(50px)',
          }}
        />
      )
    } else if (shape.type === 'triangle') {
      return (
        <div
          key={i}
          className="floating-orb"
          style={{
            ...commonStyle,
            width: 0,
            height: 0,
            background: 'transparent',
            borderLeft: `${shape.size/2}px solid transparent`,
            borderRight: `${shape.size/2}px solid transparent`,
            borderBottom: `${shape.size}px solid ${shape.color}`,
            filter: 'blur(40px)',
            opacity: 0.25,
          }}
        />
      )
    }
    return null
  }

  return (
    <>
      {/* Base dark gradient */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-[#0a0a0f] to-slate-900" />

      {/* Animated floating shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {shapes.map((shape, i) => renderShape(shape, i))}
      </div>

      {/* Noise texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  )
}
