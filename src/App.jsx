import { useState, useRef, useCallback } from 'react'
import World        from './components/World'
import Navbar       from './components/Navbar'
import SectionPanel from './components/SectionPanel'
import { LANDMARKS } from './data/portfolio'

/**
 * Root App component.
 *
 * State:
 *  - activeSection  — which landmark zone is open (null = none)
 *  - isNight        — day/night cycle toggle
 *
 * Camera actions (flyTo, resetCamera) are passed up from the 3D scene
 * via the onCameraReady callback and stored in a ref so they're always
 * current without causing re-renders.
 */
export default function App() {
  const [activeSection, setActiveSection] = useState(null)
  const [isNight, setIsNight]             = useState(false)

  // Camera control functions exposed by the R3F scene
  const cameraActionsRef = useRef(null)

  const handleCameraReady = useCallback((actions) => {
    cameraActionsRef.current = actions
  }, [])

  // Click on a 3D landmark or nav link → fly camera + open panel
  const handleSelect = useCallback((sectionId) => {
    const lm = LANDMARKS.find(l => l.id === sectionId)
    if (lm && cameraActionsRef.current) {
      cameraActionsRef.current.flyTo(lm.cameraPos, lm.cameraTarget)
    }
    setActiveSection(sectionId)
  }, [])

  // Close panel + reset camera to birds-eye overview
  const handleClose = useCallback(() => {
    setActiveSection(null)
    cameraActionsRef.current?.resetCamera()
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 3D world — canvas fills viewport */}
      <World
        onCameraReady={handleCameraReady}
        onSelect={handleSelect}
        isNight={isNight}
      />

      {/* Fixed top navbar */}
      <Navbar
        onNavClick={handleSelect}
        activeSection={activeSection}
        isNight={isNight}
        onToggleNight={() => setIsNight(n => !n)}
        onResetCamera={() => {
          setActiveSection(null)
          cameraActionsRef.current?.resetCamera()
        }}
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
            className="glass px-5 py-2.5 rounded-full text-xs text-slate-400 tracking-wider"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            🗺️ CLICK A LANDMARK · DRAG TO ROTATE · SCROLL TO ZOOM
          </div>
        </div>
      )}
    </div>
  )
}
