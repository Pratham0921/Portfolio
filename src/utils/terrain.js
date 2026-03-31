import { createNoise2D } from 'simplex-noise'

// ── Deterministic Mulberry32 PRNG so terrain is identical on every load ──
function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Shared noise instance — fixed seed guarantees the same map every refresh */
export const noise2D = createNoise2D(mulberry32(12345))

/**
 * Returns the terrain height (Y) at world XZ coordinates.
 * Must match the formula used in Terrain.jsx exactly.
 */
export function getTerrainHeight(x, z) {
  const n1 = noise2D(x * 0.03, z * 0.03) * 5.0
  const n2 = noise2D(x * 0.09, z * 0.09) * 1.5
  const n3 = noise2D(x * 0.22, z * 0.22) * 0.5
  return Math.max(0, n1 + n2 + n3)
}
