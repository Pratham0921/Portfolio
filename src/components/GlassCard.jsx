import React from 'react'

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = true,
  ...props
}) {
  return (
    <div
      className={`${hover ? 'glass-card' : 'glass'} ${glow ? 'glow-accent' : ''} ${className}`}
      style={{
        '--glow-color': 'rgba(0, 212, 255, 0.15)'
      }}
      {...props}
    >
      {children}
    </div>
  )
}
