import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

// ──────────────────────────────────────────────────────────────────
//  Individual landmark geometry sub-components
// ──────────────────────────────────────────────────────────────────

function CrystalTower({ hovered }) {
  const shardRefs = useRef([])
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    shardRefs.current.forEach((m, i) => {
      if (m) m.rotation.y = t * 0.6 + i * 1.57
    })
  })
  const ei = hovered ? 0.9 : 0.3
  const ec = '#0ea5e9'
  return (
    <group>
      {/* Base disc */}
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <cylinderGeometry args={[2.2, 2.6, 0.4, 8]} />
        <meshLambertMaterial color="#1e293b" flatShading />
      </mesh>
      {/* Tower body */}
      <mesh position={[0, 3.3, 0]} castShadow>
        <cylinderGeometry args={[0.55, 1.1, 6, 6]} />
        <meshStandardMaterial color="#06b6d4" emissive={ec} emissiveIntensity={ei} flatShading />
      </mesh>
      {/* Crystal spire */}
      <mesh position={[0, 8.2, 0]} castShadow>
        <coneGeometry args={[0.45, 4.5, 6]} />
        <meshStandardMaterial color="#7dd3fc" emissive="#38bdf8" emissiveIntensity={hovered ? 1.2 : 0.6} flatShading />
      </mesh>
      {/* Orbiting crystal shards */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          ref={el => (shardRefs.current[i] = el)}
          position={[Math.sin(i * 1.57) * 1.6, 4.5 + Math.cos(i) * 0.4, Math.cos(i * 1.57) * 1.6]}
          castShadow
        >
          <boxGeometry args={[0.18, 0.9, 0.18]} />
          <meshStandardMaterial color="#bae6fd" emissive="#0ea5e9" emissiveIntensity={0.7} />
        </mesh>
      ))}
      {/* Inner glow light */}
      <pointLight position={[0, 4, 0]} color="#06b6d4" intensity={hovered ? 4 : 1.8} distance={18} />
    </group>
  )
}

function StoneCastle({ hovered }) {
  const flagRef = useRef()
  useFrame(({ clock }) => {
    if (flagRef.current) flagRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 2) * 0.2
  })
  return (
    <group>
      {/* Base platform */}
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <boxGeometry args={[5.5, 0.4, 5.5]} />
        <meshLambertMaterial color="#374151" flatShading />
      </mesh>
      {/* Main keep */}
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 4.5, 3.5]} />
        <meshLambertMaterial color="#4b5563" flatShading />
      </mesh>
      {/* Corner towers */}
      {[[-1.5, -1.5], [1.5, -1.5], [-1.5, 1.5], [1.5, 1.5]].map(([tx, tz], i) => (
        <mesh key={i} position={[tx, 3.2, tz]} castShadow>
          <cylinderGeometry args={[0.65, 0.65, 5.5, 8]} />
          <meshLambertMaterial color="#374151" flatShading />
        </mesh>
      ))}
      {/* Tower cone caps */}
      {[[-1.5, -1.5], [1.5, -1.5], [-1.5, 1.5], [1.5, 1.5]].map(([tx, tz], i) => (
        <mesh key={`cap${i}`} position={[tx, 6.2, tz]} castShadow>
          <coneGeometry args={[0.7, 1.2, 8]} />
          <meshLambertMaterial color="#1f2937" flatShading />
        </mesh>
      ))}
      {/* Battlements */}
      {[-1, 0, 1].map((bx, i) => (
        <mesh key={`batt${i}`} position={[bx * 1.2, 5.2, -1.75]} castShadow>
          <boxGeometry args={[0.5, 0.6, 0.3]} />
          <meshLambertMaterial color="#374151" flatShading />
        </mesh>
      ))}
      {/* Flagpole */}
      <mesh position={[0, 8.5, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 3.5, 6]} />
        <meshLambertMaterial color="#9ca3af" />
      </mesh>
      {/* Flag */}
      <mesh ref={flagRef} position={[0.5, 9.8, 0]} castShadow>
        <boxGeometry args={[1.0, 0.55, 0.05]} />
        <meshStandardMaterial color="#ef4444" emissive="#b91c1c" emissiveIntensity={hovered ? 0.6 : 0.2} />
      </mesh>
      {/* Inner torch light */}
      <pointLight position={[0, 3, 0]} color="#fbbf24" intensity={hovered ? 3 : 1.2} distance={15} />
    </group>
  )
}

function WarmTavern({ hovered }) {
  // Flickering torch light
  const lightRef = useRef()
  useFrame(({ clock }) => {
    if (lightRef.current) {
      const t = clock.getElapsedTime()
      lightRef.current.intensity = (hovered ? 3 : 1.5) + Math.sin(t * 8) * 0.4 + Math.sin(t * 13) * 0.2
    }
  })
  return (
    <group>
      {/* Stone base */}
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <boxGeometry args={[5.5, 0.4, 4.5]} />
        <meshLambertMaterial color="#92400e" flatShading />
      </mesh>
      {/* Main body */}
      <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 3.0, 3.8]} />
        <meshLambertMaterial color="#b45309" flatShading />
      </mesh>
      {/* Roof — pyramid / hipped shape using 4-sided cone */}
      <mesh position={[0, 3.85, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[3.3, 2.0, 4]} />
        <meshLambertMaterial color="#7f1d1d" flatShading />
      </mesh>
      {/* Chimney */}
      <mesh position={[-1.2, 5.0, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 1.8, 6]} />
        <meshLambertMaterial color="#6b7280" flatShading />
      </mesh>
      {/* Chimney smoke (small sphere) */}
      <mesh position={[-1.2, 6.3, 0]}>
        <sphereGeometry args={[0.35, 5, 4]} />
        <meshLambertMaterial color="#9ca3af" transparent opacity={0.5} flatShading />
      </mesh>
      {/* Sign post */}
      <mesh position={[2.6, 1.8, 0.5]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 2.5, 6]} />
        <meshLambertMaterial color="#92400e" />
      </mesh>
      <mesh position={[2.6, 2.4, 0.5]} castShadow>
        <boxGeometry args={[0.9, 0.4, 0.08]} />
        <meshStandardMaterial color="#fef3c7" emissive="#fbbf24" emissiveIntensity={hovered ? 0.6 : 0.2} />
      </mesh>
      {/* Windows */}
      {[[-1.2, 1.9, 1.92], [1.2, 1.9, 1.92]].map(([wx, wy, wz], i) => (
        <mesh key={i} position={[wx, wy, wz]}>
          <boxGeometry args={[0.7, 0.7, 0.05]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={hovered ? 1 : 0.5} />
        </mesh>
      ))}
      {/* Flickering torch light */}
      <pointLight ref={lightRef} position={[0, 2.5, 0]} color="#f97316" distance={20} />
    </group>
  )
}

function SnowMountain({ hovered }) {
  // Pre-computed tree positions (stable, no Math.random)
  const trees = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => {
      const angle  = (i / 18) * Math.PI * 2
      const radius = 4 + (i % 4) * 1.4
      return {
        id: i,
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        scale: 0.38 + (i % 5) * 0.1,
      }
    })
  }, [])

  return (
    <group>
      {/* Side peaks */}
      <mesh position={[-2.5, 2.5, 0.5]} castShadow>
        <coneGeometry args={[2.0, 5.0, 7]} />
        <meshLambertMaterial color="#94a3b8" flatShading />
      </mesh>
      <mesh position={[2.2, 1.8, -0.5]} castShadow>
        <coneGeometry args={[1.6, 4.0, 7]} />
        <meshLambertMaterial color="#64748b" flatShading />
      </mesh>
      {/* Main peak */}
      <mesh position={[0, 4.5, 0]} castShadow>
        <coneGeometry args={[2.8, 9.0, 8]} />
        <meshLambertMaterial color="#cbd5e1" flatShading />
      </mesh>
      {/* Snow cap */}
      <mesh position={[0, 9.5, 0]} castShadow>
        <coneGeometry args={[1.0, 3.5, 8]} />
        <meshStandardMaterial color="#f1f5f9" emissive="#e2e8f0" emissiveIntensity={hovered ? 0.6 : 0.15} flatShading />
      </mesh>
      {/* Pine trees around base */}
      {trees.map(t => (
        <group key={t.id} position={[t.x, 0, t.z]} scale={t.scale}>
          <mesh position={[0, 0.9, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.22, 1.1, 5]} />
            <meshLambertMaterial color="#92400e" flatShading />
          </mesh>
          <mesh position={[0, 2.5, 0]} castShadow>
            <coneGeometry args={[0.9, 2.2, 6]} />
            <meshLambertMaterial color="#166534" flatShading />
          </mesh>
          <mesh position={[0, 3.6, 0]} castShadow>
            <coneGeometry args={[0.6, 1.6, 6]} />
            <meshLambertMaterial color="#15803d" flatShading />
          </mesh>
        </group>
      ))}
      {/* Summit glow */}
      <pointLight position={[0, 10, 0]} color="#e0f2fe" intensity={hovered ? 3 : 0.8} distance={20} />
    </group>
  )
}

function WoodenDock({ hovered }) {
  const sailRef = useRef()
  useFrame(({ clock }) => {
    if (sailRef.current) {
      sailRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.12
    }
  })
  return (
    <group>
      {/* Dock planks */}
      {[-1.5, 0, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 0.15, 1.5]} castShadow receiveShadow>
          <boxGeometry args={[1.1, 0.15, 7]} />
          <meshLambertMaterial color="#92400e" flatShading />
        </mesh>
      ))}
      {/* Dock posts */}
      {[[-2.2, -1], [-2.2, 2], [-2.2, 5], [2.2, -1], [2.2, 2], [2.2, 5]].map(([px, pz], i) => (
        <mesh key={`post${i}`} position={[px, -0.5, pz]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 1.6, 6]} />
          <meshLambertMaterial color="#78350f" flatShading />
        </mesh>
      ))}
      {/* Ship hull */}
      <mesh position={[0, 0.4, -2.5]} castShadow>
        <boxGeometry args={[2.8, 1.0, 5.0]} />
        <meshLambertMaterial color="#1e3a5f" flatShading />
      </mesh>
      {/* Ship deck */}
      <mesh position={[0, 0.95, -2.5]} castShadow>
        <boxGeometry args={[2.4, 0.18, 4.4]} />
        <meshLambertMaterial color="#92400e" flatShading />
      </mesh>
      {/* Mast */}
      <mesh position={[0, 2.8, -2.5]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 4.0, 6]} />
        <meshLambertMaterial color="#78350f" flatShading />
      </mesh>
      {/* Sail */}
      <mesh ref={sailRef} position={[0, 3.5, -2.5]} castShadow>
        <boxGeometry args={[1.8, 2.2, 0.06]} />
        <meshStandardMaterial
          color="#f1f5f9" emissive="#818cf8"
          emissiveIntensity={hovered ? 0.5 : 0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Harbour lantern */}
      <mesh position={[2.5, 1.2, -1]} castShadow>
        <sphereGeometry args={[0.25, 6, 4]} />
        <meshStandardMaterial color="#fef3c7" emissive="#f59e0b" emissiveIntensity={1.5} />
      </mesh>
      <pointLight position={[0, 2, -1]} color="#818cf8" intensity={hovered ? 3.5 : 1.2} distance={20} />
    </group>
  )
}

// ──────────────────────────────────────────────────────────────────
//  Main Landmark component — handles hover, click, tooltip
// ──────────────────────────────────────────────────────────────────

const LANDMARK_COMPONENTS = {
  projects:   CrystalTower,
  about:      StoneCastle,
  experience: WarmTavern,
  skills:     SnowMountain,
  contact:    WoodenDock,
}

export default function Landmark({ id, label, subtitle, icon, position, color, onSelect }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Pointer cursor
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    return () => { document.body.style.cursor = 'auto' }
  }, [hovered])

  const LandmarkMesh = LANDMARK_COMPONENTS[id]

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(id) }}
    >
      <LandmarkMesh hovered={hovered} />

      {/* Hover tooltip via Drei <Html> */}
      {hovered && (
        <Html
          position={[0, 12, 0]}
          center
          style={{ pointerEvents: 'none' }}
          zIndexRange={[100, 0]}
        >
          <div className="tooltip-pill">
            {icon} {label} · <span style={{ color: '#94a3b8' }}>{subtitle}</span>
          </div>
        </Html>
      )}

      {/* Ground ring glow */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.6, 3.2, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.55 : 0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
