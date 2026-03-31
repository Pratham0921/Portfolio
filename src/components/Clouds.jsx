import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

// Generate cloud data once at module level so it's stable
const CLOUD_DATA = Array.from({ length: 12 }, (_, i) => {
  // Deterministic spread using index-based formula (no Math.random drift)
  const angle  = (i / 12) * Math.PI * 2
  const radius = 20 + (i % 4) * 10
  return {
    id: i,
    x: Math.cos(angle) * radius,
    y: 14 + (i % 3) * 3,
    z: Math.sin(angle) * radius,
    scale: 0.6 + (i % 5) * 0.25,
    speed: 0.25 + (i % 4) * 0.1,
  }
})

function CloudPuff({ cloudData }) {
  const ref = useRef()
  const { x, y, z, scale, speed } = cloudData

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.position.x += speed * delta
    if (ref.current.position.x > 55) ref.current.position.x = -55
  })

  return (
    <group ref={ref} position={[x, y, z]} scale={scale}>
      <mesh castShadow>
        <sphereGeometry args={[1.6, 6, 4]} />
        <meshLambertMaterial color="#dde8f5" flatShading />
      </mesh>
      <mesh position={[1.4, 0.3, 0]} castShadow>
        <sphereGeometry args={[1.1, 5, 3]} />
        <meshLambertMaterial color="#c5d8ee" flatShading />
      </mesh>
      <mesh position={[-1.1, 0.2, 0.3]} castShadow>
        <sphereGeometry args={[1.2, 5, 3]} />
        <meshLambertMaterial color="#dde8f5" flatShading />
      </mesh>
      <mesh position={[0.3, 0.5, -0.8]} castShadow>
        <sphereGeometry args={[0.9, 5, 3]} />
        <meshLambertMaterial color="#eaf2ff" flatShading />
      </mesh>
    </group>
  )
}

/** 12 slowly drifting low-poly cloud puffs */
export default function Clouds() {
  return (
    <group>
      {CLOUD_DATA.map(c => <CloudPuff key={c.id} cloudData={c} />)}
    </group>
  )
}
