import React, { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    let rafId = null
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const updateCursor = () => {
      // Smooth lerp for lag effect
      const dx = mouseX - cursorX
      const dy = mouseY - cursorY

      cursorX += dx * 0.15
      cursorY += dy * 0.15

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(${isClicked ? 0.8 : 1})`
      }

      rafId = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX - 12 // Center the cursor (24px size / 2)
      mouseY = e.clientY - 12
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleMouseDown = () => {
      setIsClicked(true)
    }

    const handleMouseUp = () => {
      setIsClicked(false)
    }

    // Track touch devices - don't show custom cursor
    if (window.matchMedia('(pointer:fine)').matches) {
      document.body.style.cursor = 'none'
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseleave', handleMouseLeave)
      window.addEventListener('mouseenter', handleMouseEnter)
      window.addEventListener('mousedown', handleMouseDown)
      window.addEventListener('mouseup', handleMouseUp)

      updateCursor()
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
    }
  }, [isClicked])

  if (!isVisible) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
      style={{
        width: '24px',
        height: '24px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 40%, transparent 70%)',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
        transition: 'scale 0.1s ease-out',
        willChange: 'transform',
      }}
    />
  )
}
