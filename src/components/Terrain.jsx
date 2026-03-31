import { useMemo } from 'react'
import * as THREE from 'three'
import { noise2D, getTerrainHeight } from '../utils/terrain'

/**
 * Procedural terrain mesh.
 * Uses simplex noise (same instance as utils/terrain.js) to displace
 * vertices of a 90×90 PlaneGeometry. Vertex colours encode elevation zones.
 */
export default function Terrain() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(90, 90, 100, 100)
    geo.rotateX(-Math.PI / 2) // lay flat

    const pos = geo.attributes.position
    const colors = []

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const h = getTerrainHeight(x, z)
      pos.setY(i, h)

      // colour zones by elevation
      if (h > 5.5) {
        colors.push(0.94, 0.94, 0.97)  // snow white
      } else if (h > 3.8) {
        colors.push(0.50, 0.50, 0.50)  // stone grey
      } else if (h > 1.5) {
        colors.push(0.17, 0.35, 0.15)  // dark forest
      } else if (h > 0.4) {
        colors.push(0.24, 0.50, 0.21)  // mid green
      } else {
        colors.push(0.78, 0.72, 0.55)  // sandy shore
      }
    }

    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <mesh geometry={geometry} receiveShadow>
      <meshLambertMaterial vertexColors flatShading />
    </mesh>
  )
}
