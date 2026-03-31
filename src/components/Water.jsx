import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */`
  uniform float uTime;
  varying vec2  vUv;

  void main() {
    vUv = uv;
    vec3 p = position;
    // gentle sine-wave ripple
    p.z += sin(p.x * 1.4 + uTime * 0.9) * 0.13
         + cos(p.y * 1.1 + uTime * 0.6) * 0.10;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const fragmentShader = /* glsl */`
  varying vec2 vUv;

  void main() {
    vec3 deep    = vec3(0.17, 0.33, 0.55);
    vec3 shallow = vec3(0.33, 0.58, 0.85);
    float f = vUv.y * 0.6 + sin(vUv.x * 6.28) * 0.15;
    vec3 col = mix(deep, shallow, clamp(f, 0.0, 1.0));
    gl_FragColor = vec4(col, 0.80);
  }
`

/**
 * Animated water plane near the Starfall Harbor (contact zone).
 * Uses a ShaderMaterial so waves run entirely on the GPU.
 */
export default function Water() {
  const matRef = useRef()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), [])

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[18, 0.15, 10]}>
      <planeGeometry args={[28, 22, 32, 32]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
