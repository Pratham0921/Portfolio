import { useState, useCallback } from 'react'
import InteractiveMap from './components/InteractiveMap'
import Navbar       from './components/Navbar'
import SectionPanel from './components/SectionPanel'
import { MAP_ZONES } from './data/portfolio'

/**
 * Root App component (2D Map Version).
 *
 * State:
 *  - activeSection  — which landmark zone is open (null = none)
 *  - isNight        — day/night cycle toggle (optional UI feature)
 */
export default function App() {
  const [activeSection, setActiveSection] = useState(null)
  const [isNight, setIsNight]             = useState(false)

  // Click on a map landmark or nav link → open panel
  const handleSelect = useCallback((sectionId) => {
    setActiveSection(sectionId)
  }, [])

  // Close panel
  const handleClose = useCallback(() => {
    setActiveSection(null)
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0d0a1e]">
      {/* 2D Interactive Map */}
      <InteractiveMap
        onSelect={handleSelect}
        activeSection={activeSection}
        isNight={isNight}
      />

      {/* Fixed top navbar */}
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

      {/* Map hint shown when no section is selected */}
      {!activeSection && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none">
          <div
            className="glass px-5 py-2.5 rounded-full text-xs text-slate-400 tracking-wider flex items-center gap-2"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            <span>🗺️</span> <span>CLICK A LANDMARK TO EXPLORE</span>
          </div>
        </div>
      )}
    </div>
  )
}
