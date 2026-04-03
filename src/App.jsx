import { useState, useCallback } from 'react'
import MapScene    from './components/MapScene'
import Navbar      from './components/Navbar'
import SectionPanel from './components/SectionPanel'

/**
 * Root App — Interactive Fantasy RPG Map Portfolio
 */
export default function App() {
  const [activeSection, setActiveSection] = useState(null)
  const [isNight, setIsNight]             = useState(false)

  const handleSelect = useCallback((sectionId) => {
    setActiveSection(sectionId)
  }, [])

  const handleClose = useCallback(() => {
    setActiveSection(null)
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#1a0e05' }}>
      {/* Parchment frame wrapping the whole map */}
      <div className="map-frame" style={{ paddingTop: '56px' }}>
        {/* SVG Map Scene */}
        <MapScene
          onSelect={handleSelect}
          activeSection={activeSection}
          isNight={isNight}
        />

        {/* Night overlay */}
        {isNight && (
          <div
            className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-700"
            style={{ background: 'rgba(10,5,40,0.55)', mixBlendMode: 'multiply' }}
          />
        )}

        {/* Map hint */}
        {!activeSection && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none">
            <div
              className="px-5 py-2 rounded-full text-xs tracking-widest flex items-center gap-2"
              style={{
                background: 'rgba(60,25,5,0.9)',
                border: '1px solid #7a5230',
                color: '#c8a96e',
                fontFamily: 'Cinzel, serif',
                fontSize: '0.65rem',
                boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
              }}
            >
              <span>🗺️</span>
              <span>CLICK A LANDMARK TO EXPLORE · SCROLL TO ZOOM</span>
            </div>
          </div>
        )}
      </div>

      {/* Fixed top navbar (above frame) */}
      <Navbar
        onNavClick={handleSelect}
        activeSection={activeSection}
        isNight={isNight}
        onToggleNight={() => setIsNight(n => !n)}
        onResetCamera={() => setActiveSection(null)}
      />

      {/* Slide-in content panel */}
      <SectionPanel
        activeSection={activeSection}
        onClose={handleClose}
      />
    </div>
  )
}
