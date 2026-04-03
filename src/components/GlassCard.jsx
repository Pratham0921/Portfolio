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
      className={`${hover ? 'glass-card' : 'glass'} ${glow ? 'glow-border' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
