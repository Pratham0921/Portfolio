import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

import Terrain  from './Terrain'
import Water    from './Water'
import Clouds   from './Clouds'
import Landmark from './Landmark'

import { useCameraFly }   from '../hooks/useCameraFly'
import { getTerrainHeight } from '../utils/terrain'
import { LANDMARKS }       from '../data/portfolio'

// ── Inner scene — rendered inside Canvas so it can use R3F hooks ──
function Scene({ onCameraReady, onSelect, isNight }) {
  const controlsRef = useRef()

  // Camera fly-to hook (GSAP)
  useCameraFly(controlsRef, onCameraReady)

  // Sky / background colours shift with day-night cycle
  const skyColor  = isNight ? '#0d0a1e' : '#5ba3d9'
  const fogColor  = isNight ? '#0d0a1e' : '#8ec8f0'
  const ambInt    = isNight ? 0.15 : 0.55
  const dirColor  = isNight ? '#1e2d5e' : '#fffbe8'
  const dirInt    = isNight ? 0.3  : 1.2

  return (
    <>
      {/* Background + fog */}
      <color attach="background" args={[skyColor]} />
      <fogExp2 attach="fog" color={fogColor} density={isNight ? 0.008 : 0.006} />

      {/* Lighting */}
      <ambientLight intensity={ambInt} color={isNight ? '#6070c0' : '#ffffff'} />
      <directionalLight
        position={[30, 40, 20]}
        color={dirColor}
        intensity={dirInt}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={120}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
      />
      {/* Warm fill from the other side */}
      <directionalLight position={[-20, 10, -30]} color="#ff9966" intensity={isNight ? 0.05 : 0.25} />

      {/* World geometry */}
      <Terrain />
      <Water />
      <Clouds />

      {/* Landmark zones — Y position sampled from terrain heightmap */}
      {LANDMARKS.map(lm => {
        const ty = getTerrainHeight(lm.position[0], lm.position[2])
        return (
          <Landmark
            key={lm.id}
            {...lm}
            position={[lm.position[0], ty, lm.position[2]]}
            onSelect={onSelect}
          />
        )
      })}

      {/* Camera controls */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.06}
        minDistance={8}
        maxDistance={80}
        maxPolarAngle={Math.PI / 2.05}
      />
    </>
  )
}

// ── Loading screen shown while 3D assets initialise ──
function LoadingScreen() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0a1e]">
      <div className="text-amber-400 text-5xl mb-6 animate-spin" style={{ animationDuration: '3s' }}>⚙️</div>
      <p className="loading-glyph text-amber-400/80">LOADING THE REALM…</p>
      <p className="text-slate-500 text-xs mt-2 font-inter tracking-widest">PLEASE WAIT</p>
    </div>
  )
}

/**
 * World — the R3F Canvas wrapper.
 * Passes camera control callbacks up to App via onCameraReady.
 */
export default function World({ onCameraReady, onSelect, isNight }) {
  return (
    <div className="absolute inset-0">
      <Suspense fallback={<LoadingScreen />}>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ fov: 55, near: 0.5, far: 300 }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: isNight ? 0.6 : 1.0 }}
        >
          <Scene onCameraReady={onCameraReady} onSelect={onSelect} isNight={isNight} />
        </Canvas>
      </Suspense>
    </div>
  )
}
