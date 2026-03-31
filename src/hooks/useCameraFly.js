import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Default birds-eye overview position
const DEFAULT_POS    = [0, 38, 45]
const DEFAULT_TARGET = [0, 0, 0]

/**
 * Hook used INSIDE the R3F Canvas.
 * Exposes flyTo() and resetCamera() via the onReady callback so that
 * components outside the Canvas (Navbar, SectionPanel) can trigger them.
 */
export function useCameraFly(controlsRef, onReady) {
  const { camera } = useThree()
  const readyCalled = useRef(false)

  const flyTo = (position, target, duration = 1.8) => {
    const ctrl = controlsRef.current
    gsap.killTweensOf(camera.position)
    if (ctrl) gsap.killTweensOf(ctrl.target)

    gsap.to(camera.position, {
      x: position[0], y: position[1], z: position[2],
      duration,
      ease: 'power3.inOut',
    })

    if (ctrl) {
      gsap.to(ctrl.target, {
        x: target[0], y: target[1], z: target[2],
        duration,
        ease: 'power3.inOut',
        onUpdate: () => ctrl.update(),
      })
    }
  }

  const resetCamera = () => flyTo(DEFAULT_POS, DEFAULT_TARGET)

  useEffect(() => {
    // Set initial camera position immediately
    camera.position.set(...DEFAULT_POS)
    if (!readyCalled.current && onReady) {
      readyCalled.current = true
      onReady({ flyTo, resetCamera })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { flyTo, resetCamera }
}
