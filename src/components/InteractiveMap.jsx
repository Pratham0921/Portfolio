import React from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { MAP_ZONES } from '../data/portfolio'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

export default function InteractiveMap({ onSelect, activeSection, isNight }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden transition-colors duration-700" style={{ backgroundColor: isNight ? '#050308' : '#0a0814' }}>
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerOnInit={true}
        wheel={{ step: 0.1 }}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <TransformComponent wrapperClass="w-full h-full" contentClass="relative w-[1500px] max-w-none transition-all duration-700">
              {/* Map background */}
              <img 
                src="/map.jpg" 
                alt="Fantasy Map" 
                className={`w-full h-auto object-contain pointer-events-none drop-shadow-2xl transition-all duration-700 ${
                  isNight 
                    ? 'brightness-50 saturate-50 sepia-0 hue-rotate-15' 
                    : 'brightness-90 saturate-110 sepia-[0.1]'
                }`}
              />

              {/* Map Markers */}
              {MAP_ZONES.map((zone) => {
                const isActive = activeSection === zone.id
                return (
                  <button
                    key={zone.id}
                    onClick={() => onSelect(zone.id)}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group outline-none"
                    style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                  >
                    {/* Pulsing ring for active/hover state */}
                    <div 
                      className={`absolute inset-0 rounded-full scale-150 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none ${isActive ? 'opacity-70 animate-pulse' : ''}`}
                      style={{ backgroundColor: zone.color }}
                    />
                    
                    {/* Pin Icon / Marker */}
                    <motion.div
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-full border-2 bg-[#0d0a1e]/90 backdrop-blur-sm shadow-xl transition-colors duration-300 ${isActive ? 'border-amber-400' : 'border-white/20'}`}
                      style={{ 
                        boxShadow: isActive ? `0 0 20px ${zone.color}` : '0 4px 6px -1px rgb(0 0 0 / 0.5)'
                      }}
                    >
                      <span className="text-xl drop-shadow-md">{zone.icon}</span>
                      
                      {/* Tooltip on hover */}
                      <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                        <div className="tooltip-pill flex flex-col items-center">
                          <span className="text-[10px] text-amber-200/70">{zone.subtitle}</span>
                          <span className="font-bold text-amber-400 tracking-wider text-sm">{zone.label}</span>
                        </div>
                      </div>
                    </motion.div>
                  </button>
                )
              })}
            </TransformComponent>

            {/* Map Controls Navbar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 p-2 glass rounded-full shadow-2xl items-center">
              <button onClick={() => zoomOut()} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-amber-400 font-bold transition">
                -
              </button>
              <button onClick={() => resetTransform()} className="px-4 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-amber-400 text-xs font-bold font-['Cinzel'] tracking-widest transition">
                RESET MAP
              </button>
              <button onClick={() => zoomIn()} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-amber-400 font-bold transition">
                +
              </button>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  )
}
