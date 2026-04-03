import React, { useEffect, useRef, useState } from 'react'

export default function SkillBar({ name, level, icon, delay = 0 }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="mb-4" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {name}
        </span>
        <span
          className={`text-sm font-mono text-blue-400 transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {isVisible ? `${level}%` : '0%'}
        </span>
      </div>
      <div className="h-2 bg-slate-800/80 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 skill-bar-fill rounded-full"
          style={{
            width: isVisible ? `${level}%` : '0%',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}
