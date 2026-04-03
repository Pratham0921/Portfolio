import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Tree clusters ─────────────────────────────────── */
function Tree({ x, y, size = 1, dark = false }) {
  const c = dark ? '#1a3a1a' : '#2d5a2d'
  const c2 = dark ? '#143014' : '#255025'
  const s = size
  return (
    <g transform={`translate(${x},${y})`} className="tree-sway">
      <ellipse cx={0} cy={-s * 14} rx={s * 7} ry={s * 12} fill={c} opacity={0.95} />
      <ellipse cx={0} cy={-s * 20} rx={s * 5} ry={s * 9} fill={c2} opacity={0.9} />
      <ellipse cx={0} cy={-s * 26} rx={s * 3.5} ry={s * 7} fill={c} opacity={0.85} />
      <rect x={-s * 1.5} y={-s * 4} width={s * 3} height={s * 4} fill="#5c3a1a" rx={1} />
    </g>
  )
}

function TreeCluster({ x, y, count = 6, spread = 25, dense = false }) {
  // Deterministic positions using a seeded pattern
  const offsets = [
    [0, 0, 1, true], [-spread * 0.6, spread * 0.3, 0.85, false],
    [spread * 0.5, spread * 0.2, 0.9, true], [-spread * 0.3, -spread * 0.5, 0.95, false],
    [spread * 0.7, -spread * 0.3, 0.8, true], [-spread * 0.8, -spread * 0.1, 0.85, false],
    [spread * 0.1, spread * 0.7, 0.9, true], [-spread * 0.4, spread * 0.6, 0.75, false],
  ].slice(0, count)
  return (
    <g>
      {offsets.map(([dx, dy, s, dark], i) => (
        <Tree key={i} x={x + dx} y={y + dy} size={s} dark={dense || dark} />
      ))}
    </g>
  )
}

/* ─── Mountain ────────────────────────────────────── */
function Mountain({ x, y, size = 1, snow = true }) {
  const s = size
  return (
    <g transform={`translate(${x},${y})`}>
      {/* Shadow base */}
      <polygon
        points={`0,${-s * 80} ${-s * 55},${s * 20} ${s * 55},${s * 20}`}
        fill="#6b7280" opacity={0.6}
      />
      {/* Main peak */}
      <polygon
        points={`0,${-s * 90} ${-s * 50},${s * 15} ${s * 50},${s * 15}`}
        fill="#9ca3af"
      />
      {/* Secondary face (darker) */}
      <polygon
        points={`0,${-s * 90} ${s * 10},${-s * 30} ${s * 50},${s * 15}`}
        fill="#6b7280"
      />
      {/* Snow cap */}
      {snow && (
        <>
          <polygon
            points={`0,${-s * 90} ${-s * 18},${-s * 55} ${s * 18},${-s * 55}`}
            fill="white" opacity={0.9}
          />
          <polygon
            points={`${s * 5},${-s * 70} ${s * 22},${-s * 48} ${s * 18},${-s * 55}`}
            fill="white" opacity={0.6}
          />
        </>
      )}
    </g>
  )
}

/* ─── Castle ─────────────────────────────────────── */
function Castle({ x, y, scale = 1 }) {
  const s = scale
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      {/* Main wall */}
      <rect x={-45} y={-30} width={90} height={50} fill="#8b9aaa" rx={2} />
      {/* Battlements top */}
      {[-38, -24, -10, 4, 18, 32].map((bx, i) => (
        <rect key={i} x={bx} y={-38} width={10} height={10} fill="#9aabb8" rx={1} />
      ))}
      {/* Gate */}
      <rect x={-12} y={0} width={24} height={22} fill="#3d2a1a" rx={2} />
      <ellipse cx={0} cy={0} rx={12} ry={8} fill="#3d2a1a" />
      {/* Left tower */}
      <rect x={-60} y={-50} width={28} height={70} fill="#8b9aaa" rx={2} />
      {[-55, -42, -30].map((bx, i) => (
        <rect key={i} x={bx} y={-58} width={10} height={10} fill="#9aabb8" rx={1} />
      ))}
      {/* Right tower */}
      <rect x={32} y={-50} width={28} height={70} fill="#8b9aaa" rx={2} />
      {[37, 50].map((bx, i) => (
        <rect key={i} x={bx} y={-58} width={10} height={10} fill="#9aabb8" rx={1} />
      ))}
      {/* Flags */}
      <line x1={-46} y1={-58} x2={-46} y2={-75} stroke="#4a3a2a" strokeWidth={1.5} />
      <polygon points={`-46,-75 -33,-70 -46,-65`} fill="#c0392b" />
      <line x1={46} y1={-58} x2={46} y2={-75} stroke="#4a3a2a" strokeWidth={1.5} />
      <polygon points={`46,-75 59,-70 46,-65`} fill="#2980b9" />
      {/* Windows */}
      <rect x={-52} y={-35} width={8} height={10} fill="#1a2a3a" rx={1} />
      <rect x={44} y={-35} width={8} height={10} fill="#1a2a3a" rx={1} />
    </g>
  )
}

/* ─── House ───────────────────────────────────────── */
function House({ x, y, type = 'thatched', scale = 1 }) {
  const s = scale
  const colors = {
    thatched: { wall: '#d4b896', roof: '#8b7355', door: '#5c3a1a' },
    tavern:   { wall: '#c8a870', roof: '#6b4c2a', door: '#3d1f0a' },
    stone:    { wall: '#9aabb8', roof: '#6b7280', door: '#2a1a0a' },
  }
  const c = colors[type] || colors.thatched
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <rect x={-14} y={-10} width={28} height={18} fill={c.wall} rx={1} />
      <polygon points={`-18,-10 0,-26 18,-10`} fill={c.roof} />
      <rect x={-4} y={0} width={8} height={8} fill={c.door} rx={1} />
      <rect x={6} y={-6} width={5} height={5} fill="#87ceeb" opacity={0.7} rx={1} />
      <rect x={-11} y={-6} width={5} height={5} fill="#87ceeb" opacity={0.7} rx={1} />
    </g>
  )
}

/* ─── Lighthouse ─────────────────────────────────── */
function Lighthouse({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-6} y={-50} width={12} height={50} fill="#e8e8e8" />
      {/* Red stripes */}
      <rect x={-6} y={-45} width={12} height={8} fill="#c0392b" />
      <rect x={-6} y={-29} width={12} height={8} fill="#c0392b" />
      <rect x={-6} y={-13} width={12} height={8} fill="#c0392b" />
      {/* Top light */}
      <rect x={-8} y={-58} width={16} height={10} fill="#6b7280" rx={1} />
      <ellipse cx={0} cy={-56} rx={5} ry={4} fill="#ffd700" opacity={0.9} />
      <ellipse cx={0} cy={-56} rx={12} ry={8} fill="#ffd700" opacity={0.15} />
    </g>
  )
}

/* ─── Ship ───────────────────────────────────────── */
function Ship({ x, y, scale = 1, flip = false }) {
  const s = scale
  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`} className="ship-bob">
      {/* Hull */}
      <path d="M-35,0 Q-35,15 -20,18 L20,18 Q35,15 35,0 Z" fill="#5c3a1a" />
      <path d="M-35,0 L35,0 L30,-3 L-30,-3 Z" fill="#7a5230" />
      {/* Mast */}
      <line x1={0} y1={-18} x2={0} y2={-60} stroke="#3d1f0a" strokeWidth={2} />
      <line x1={-5} y1={33} x2={-5} y2={-22} stroke="#3d1f0a" strokeWidth={2} />
      {/* Sails */}
      <path d="M0,-58 Q18,-42 15,-22 L0,-22 Z" fill="#e8dcc8" opacity={0.95} />
      <path d="M0,-58 Q-16,-42 -13,-22 L0,-22 Z" fill="#ddd0bc" opacity={0.9} />
      <path d="M-5,31 Q12,20 10,5 L-5,5 Z" fill="#e8dcc8" opacity={0.9} />
      {/* Flag */}
      <polygon points="0,-60 10,-55 0,-50" fill="#c0392b" />
    </g>
  )
}

/* ─── Sea Creature ───────────────────────────────── */
function SeaCreature({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`} opacity={0.75}>
      {/* Body coils */}
      <ellipse cx={0} cy={0} rx={18} ry={10} fill="#2d6b4a" />
      <ellipse cx={25} cy={-12} rx={12} ry={7} fill="#2d6b4a" />
      <ellipse cx={40} cy={-22} rx={8} ry={5} fill="#2d6b4a" />
      {/* Head */}
      <ellipse cx={48} cy={-30} rx={10} ry={8} fill="#1f5038" />
      <ellipse cx={53} cy={-34} rx={2} ry={2} fill="#ffd700" />
      {/* Spikes */}
      {[0, 12, 22, 33, 43].map((sx, i) => (
        <polygon key={i} points={`${sx},-10 ${sx + 4},-22 ${sx + 8},-10`} fill="#1f5038" opacity={0.8} />
      ))}
    </g>
  )
}

/* ─── Compass Rose ───────────────────────────────── */
function CompassRose({ x, y, size = 40 }) {
  const s = size
  return (
    <g transform={`translate(${x},${y})`}>
      {/* Outer ring */}
      <circle cx={0} cy={0} r={s * 1.3} fill="none" stroke="#c8a96e" strokeWidth={2} opacity={0.7} />
      <circle cx={0} cy={0} r={s * 1.1} fill="none" stroke="#c8a96e" strokeWidth={0.5} opacity={0.4} />
      {/* Cardinal arrows */}
      {['N','S','E','W'].map((dir, i) => {
        const angle = i * 90
        const rad = (angle - 90) * Math.PI / 180
        const tx = Math.cos(rad) * s * 1.5
        const ty = Math.sin(rad) * s * 1.5
        return (
          <g key={dir}>
            <polygon
              points={`${Math.cos(rad)*s*1.15},${Math.sin(rad)*s*1.15} ${Math.cos(rad - 0.2)*s*0.4},${Math.sin(rad-0.2)*s*0.4} ${Math.cos(rad + 0.2)*s*0.4},${Math.sin(rad+0.2)*s*0.4}`}
              fill={dir === 'N' ? '#c0392b' : '#c8a96e'}
            />
            <polygon
              points={`${-Math.cos(rad)*s*1.15},${-Math.sin(rad)*s*1.15} ${Math.cos(rad - 0.2)*s*0.4},${Math.sin(rad-0.2)*s*0.4} ${Math.cos(rad + 0.2)*s*0.4},${Math.sin(rad+0.2)*s*0.4}`}
              fill="#8b7355" opacity={0.8}
            />
            <text x={tx} y={ty + 4} textAnchor="middle" fill="#c8a96e" fontSize={s * 0.35} fontFamily="Cinzel,serif" fontWeight="700">{dir}</text>
          </g>
        )
      })}
      {/* Center jewel */}
      <circle cx={0} cy={0} r={s * 0.18} fill="#c8a96e" />
      <circle cx={0} cy={0} r={s * 0.10} fill="#ffd700" />
    </g>
  )
}

/* ─── Region hotspot marker ─────────────────────── */
function RegionMarker({ x, y, label, sublabel, color, active, onClick }) {
  const [hovered, setHovered] = useState(false)
  const show = hovered || active
  return (
    <g
      transform={`translate(${x},${y})`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* Pulse rings */}
      {[1, 2].map(i => (
        <circle key={i} cx={0} cy={0} r={16}
          fill="none" stroke={color} strokeWidth={2} opacity={0}
          style={{
            animation: `pulse-ring ${1.8 + i * 0.4}s ease-out ${i * 0.4}s infinite`,
            transformOrigin: 'center',
          }}
        />
      ))}
      {/* Main marker circle */}
      <motion.circle
        cx={0} cy={0} r={14}
        fill={active ? color : 'rgba(20,10,5,0.85)'}
        stroke={color} strokeWidth={2}
        animate={{ scale: active ? 1.2 : 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
      {/* Icon text */}
      <text x={0} y={5} textAnchor="middle" fontSize={14} style={{ userSelect: 'none', pointerEvents: 'none' }}>
        {sublabel}
      </text>

      {/* Tooltip */}
      <AnimatePresence>
        {show && (
          <motion.g
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            <rect x={-55} y={-48} width={110} height={30} rx={4} fill="rgba(20,10,5,0.95)" stroke={color} strokeWidth={1} />
            <text x={0} y={-30} textAnchor="middle" fill="#f4e4b8" fontSize={8.5} fontFamily="Cinzel,serif" fontWeight="700" style={{ letterSpacing: 1 }}>
              {label}
            </text>
            <text x={0} y={-20} textAnchor="middle" fill={color} fontSize={7} fontFamily="Cinzel,serif">
              {sublabel} click to explore
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </g>
  )
}

/* ─── Scale Bar ──────────────────────────────────── */
function ScaleBar({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={0} y={0} width={60} height={6} fill="#3d1f0a" />
      <rect x={0} y={0} width={30} height={6} fill="#c8a96e" />
      <line x1={0} y1={-3} x2={0} y2={9} stroke="#3d1f0a" strokeWidth={1.5} />
      <line x1={30} y1={-3} x2={30} y2={9} stroke="#3d1f0a" strokeWidth={1.5} />
      <line x1={60} y1={-3} x2={60} y2={9} stroke="#3d1f0a" strokeWidth={1.5} />
      <text x={0} y={20} textAnchor="middle" fill="#3d1f0a" fontSize={8} fontFamily="Cinzel,serif">0</text>
      <text x={30} y={20} textAnchor="middle" fill="#3d1f0a" fontSize={8} fontFamily="Cinzel,serif">1</text>
      <text x={60} y={20} textAnchor="middle" fill="#3d1f0a" fontSize={8} fontFamily="Cinzel,serif">2 leagues</text>
    </g>
  )
}

/* ═══════════════════════════════════════════════════
   MAIN MAP SCENE
═══════════════════════════════════════════════════ */
export default function MapScene({ onSelect, activeSection }) {
  const W = 1000
  const H = 1000

  const zones = [
    { id: 'projects',    x: 340, y: 400, label: 'The Gloomwood',   icon: '🌲', color: '#22c55e' },
    { id: 'about',       x: 700, y: 220, label: 'The Frostpeaks',  icon: '🏰', color: '#94a3b8' },
    { id: 'experience',  x: 720, y: 520, label: 'Tavern Village',  icon: '🍺', color: '#f59e0b' },
    { id: 'skills',      x: 200, y: 720, label: "Serpent's Shore", icon: '⛰️', color: '#60a5fa' },
    { id: 'contact',     x: 820, y: 820, label: 'Starfall Harbor', icon: '⚓', color: '#a78bfa' },
  ]

  return (
    <div className="map-svg-wrapper">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Ocean pattern */}
          <pattern id="ocean-wave" x={0} y={0} width={60} height={20} patternUnits="userSpaceOnUse">
            <path d="M0,10 Q15,0 30,10 Q45,20 60,10" fill="none" stroke="#4a90d9" strokeWidth={1.5} opacity={0.3} />
          </pattern>
          {/* Deep ocean gradient */}
          <radialGradient id="ocean-grad" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#2a6496" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#1a4a7a" stopOpacity={1} />
          </radialGradient>
          {/* Land gradient */}
          <radialGradient id="land-grad" cx="40%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#7db55a" />
            <stop offset="60%" stopColor="#6aa045" />
            <stop offset="100%" stopColor="#5a8a35" />
          </radialGradient>
          {/* Forest deeper gradient */}
          <radialGradient id="forest-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2d5a2d" />
            <stop offset="100%" stopColor="#1a3a1a" />
          </radialGradient>
          {/* Mountain gradient */}
          <linearGradient id="mtn-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4d8e0" />
            <stop offset="50%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="#6b7280" />
          </linearGradient>
          {/* Parchment gradient for the landmass */}
          <radialGradient id="cliff-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c8a664" />
            <stop offset="100%" stopColor="#9a7840" />
          </radialGradient>
          {/* Drop shadow filter */}
          <filter id="land-shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx={4} dy={6} stdDeviation={6} floodColor="#0a1a3a" floodOpacity={0.5} />
          </filter>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── OCEAN BACKGROUND ── */}
        <rect width={W} height={H} fill="url(#ocean-grad)" />
        {/* Animated wave overlay */}
        <rect width={W} height={H} fill="url(#ocean-wave)" className="wave-anim" opacity={0.6} />
        <rect width={W} height={H} fill="url(#ocean-wave)" className="wave-anim" opacity={0.3}
          style={{ animationDuration: '12s', animationDirection: 'reverse' }}
        />

        {/* ── MAIN LANDMASS ── */}
        <path
          d={`
            M 160,80  Q 200,50 270,70  Q 340,40 420,65
            Q 480,45 550,70  Q 610,55 660,85
            Q 710,65 760,90  Q 820,75 870,110
            Q 920,140 940,200 Q 960,260 940,330
            Q 950,400 920,460 Q 935,530 910,590
            Q 920,650 880,710 Q 860,770 820,810
            Q 790,850 750,870 Q 710,900 660,890
            Q 620,910 570,895 Q 530,880 490,900
            Q 450,920 410,900 Q 370,920 330,900
            Q 290,890 260,860 Q 220,840 200,800
            Q 170,760 180,720 Q 160,680 170,640
            Q 150,600 165,560 Q 145,520 155,480
            Q 135,440 150,400 Q 130,360 145,320
            Q 120,280 140,240 Q 120,200 135,160
            Q 145,120 160,80 Z
          `}
          fill="url(#land-grad)"
          filter="url(#land-shadow)"
        />

        {/* Coastal cliff edge detail */}
        <path
          d={`
            M 160,80  Q 200,50 270,70  Q 340,40 420,65
            Q 480,45 550,70  Q 610,55 660,85
            Q 710,65 760,90  Q 820,75 870,110
          `}
          fill="none" stroke="#9a7840" strokeWidth={4} opacity={0.5}
        />

        {/* ── COASTAL CLIFFS (bottom) ── */}
        <path
          d={`M 620,870 Q 660,890 710,870 Q 750,855 790,870 Q 830,885 860,860 Q 880,830 870,800`}
          fill="none" stroke="#9a7840" strokeWidth={5} opacity={0.6}
        />
        <path
          d={`M 620,870 Q 650,900 690,910 Q 730,920 770,900 Q 810,880 840,860`}
          fill="#c8a664" opacity={0.4}
        />

        {/* Cliff detail texture staircase bottom area */}
        {[0,1,2,3,4].map(i => (
          <rect key={i} x={620 + i * 30} y={860 + i * 4} width={28} height={14}
            fill="#9a7840" opacity={0.3} rx={2}
          />
        ))}

        {/* ── RIVER (Serpent's Vein) ── */}
        <path
          d={`M 460,130 Q 490,180 480,230 Q 470,280 490,330
              Q 505,370 490,420 Q 475,470 490,520
              Q 505,565 480,610 Q 460,650 470,690
              Q 480,730 460,770`}
          fill="none" stroke="#5ba8d4" strokeWidth={10} opacity={0.65} strokeLinecap="round"
        />
        <path
          d={`M 460,130 Q 490,180 480,230 Q 470,280 490,330
              Q 505,370 490,420 Q 475,470 490,520
              Q 505,565 480,610 Q 460,650 470,690
              Q 480,730 460,770`}
          fill="none" stroke="#87ceeb" strokeWidth={3} opacity={0.4} strokeLinecap="round"
          strokeDasharray="10 15"
        />
        {/* River label */}
        <text fill="#2a6496" fontSize={10} fontFamily="Cinzel,serif" fontStyle="italic" opacity={0.8}>
          <textPath href="#river-path" startOffset="50%">Serpent's Vein</textPath>
        </text>
        <path id="river-path" d={`M 460,350 Q 495,400 490,450`} fill="none" />

        {/* ── WETLAND / SWAMP (bottom-left) ── */}
        <ellipse cx={240} cy={730} rx={100} ry={65} fill="#3a6040" opacity={0.45} />
        <ellipse cx={200} cy={760} rx={65} ry={40} fill="#2d5030" opacity={0.4} />
        <ellipse cx={270} cy={700} rx={50} ry={30} fill="#4a7050" opacity={0.35} />
        {/* Swamp water pools */}
        <ellipse cx={210} cy={745} rx={28} ry={16} fill="#3a7a5a" opacity={0.6} />
        <ellipse cx={255} cy={720} rx={18} ry={10} fill="#3a7a5a" opacity={0.5} />
        <ellipse cx={195} cy={770} rx={22} ry={12} fill="#3a7a5a" opacity={0.55} />

        {/* ── DARK FOREST (center-left "Gloomwood") ── */}
        <ellipse cx={330} cy={420} rx={165} ry={145} fill="#1f4a1f" opacity={0.45} />
        <ellipse cx={300} cy={390} rx={120} ry={110} fill="#163816" opacity={0.4} />
        {/* Dense tree clusters across the forest */}
        <TreeCluster x={290} y={520} count={8} spread={35} dense />
        <TreeCluster x={380} y={480} count={8} spread={30} dense />
        <TreeCluster x={330} y={430} count={8} spread={40} dense />
        <TreeCluster x={260} y={450} count={7} spread={28} dense />
        <TreeCluster x={360} y={380} count={8} spread={32} dense />
        <TreeCluster x={310} y={360} count={6} spread={25} dense />
        <TreeCluster x={240} y={400} count={6} spread={28} dense />
        <TreeCluster x={410} y={430} count={7} spread={30} dense />
        <TreeCluster x={280} y={510} count={6} spread={25} dense />
        {/* Stone circle / ruins in forest */}
        {[0,1,2,3,4,5,6,7].map(i => {
          const a = (i / 8) * Math.PI * 2
          return <ellipse key={i} cx={330 + Math.cos(a) * 22} cy={460 + Math.sin(a) * 14} rx={6} ry={4} fill="#7a8a8a" opacity={0.6} />
        })}
        {/* Forest label */}
        <text x={310} y={395} textAnchor="middle" fill="#d4e8c8" fontSize={13} fontFamily="Cinzel,serif" fontStyle="italic" fontWeight="600" className="map-label" onClick={() => onSelect('projects')} opacity={0.9}>
          The Gloomwood
        </text>

        {/* ── LIGHTER FOREST patches (north, coastal) ── */}
        <TreeCluster x={220} y={200} count={6} spread={35} />
        <TreeCluster x={170} y={280} count={5} spread={28} />
        <TreeCluster x={280} y={240} count={5} spread={30} />
        <TreeCluster x={180} y={350} count={5} spread={25} />
        <TreeCluster x={230} y={310} count={4} spread={22} />
        <TreeCluster x={155} y={180} count={4} spread={20} />
        {/* Bottom forest strips */}
        <TreeCluster x={560} y={570} count={5} spread={25} />
        <TreeCluster x={620} y={590} count={5} spread={28} />
        <TreeCluster x={520} y={600} count={4} spread={20} />
        <TreeCluster x={590} y={640} count={4} spread={22} />

        {/* ── SNOWY MOUNTAIN RANGE (top-right) ── */}
        <ellipse cx={720} cy={240} rx={200} ry={140} fill="#c8d4e0" opacity={0.15} />
        {/* Back mountains */}
        <Mountain x={840} y={290} size={1.1} snow />
        <Mountain x={780} y={310} size={0.9} snow />
        <Mountain x={900} y={260} size={1.0} snow />
        <Mountain x={760} y={260} size={0.8} snow />
        <Mountain x={680} y={280} size={0.75} snow />
        <Mountain x={850} y={210} size={0.85} snow />
        {/* Front mountains */}
        <Mountain x={700} y={310} size={1.0} snow />
        <Mountain x={820} y={330} size={1.2} snow />
        <Mountain x={760} y={345} size={0.95} snow />
        {/* Mountain trees at base */}
        <TreeCluster x={650} y={320} count={5} spread={22} />
        <TreeCluster x={640} y={360} count={5} spread={25} />
        {/* "Frostpeaks" label */}
        <text x={790} y={180} textAnchor="middle" fill="#e0e8f0" fontSize={13} fontFamily="Cinzel,serif" fontStyle="italic" fontWeight="600" className="map-label" onClick={() => onSelect('about')} opacity={0.9} filter="url(#glow)">
          The Frostpeaks
        </text>

        {/* ── CASTLE (below mountains, top-right) ── */}
        <Castle x={700} y={390} scale={1.1} />
        {/* Castle road / path */}
        <path d={`M 700,430 Q 710,480 720,520`} fill="none" stroke="#c8a664" strokeWidth={4} opacity={0.5} strokeDasharray="6 4" />

        {/* ── PATHS / ROADS ── */}
        {/* Main road from north to village */}
        <path d={`M 500,100 Q 510,150 520,200 Q 530,250 545,300 Q 555,350 560,400 Q 565,450 580,500 Q 595,545 615,580 Q 640,615 670,640 Q 710,665 740,680`}
          fill="none" stroke="#c8a664" strokeWidth={5} opacity={0.6} strokeLinecap="round"
        />
        {/* West road through forest */}
        <path d={`M 200,500 Q 250,490 300,500 Q 350,510 400,505 Q 440,500 480,510`}
          fill="none" stroke="#c8a664" strokeWidth={4} opacity={0.45} strokeLinecap="round"
        />
        {/* Road to harbor */}
        <path d={`M 740,680 Q 760,720 790,745 Q 810,760 830,780 Q 845,795 840,820`}
          fill="none" stroke="#c8a664" strokeWidth={4} opacity={0.5} strokeLinecap="round"
        />

        {/* ── VILLAGE (right of river, center-right) ── */}
        {/* Field patches */}
        <rect x={580} y={490} width={55} height={35} fill="#8fb060" opacity={0.5} rx={3} />
        <rect x={640} y={500} width={45} height={30} fill="#7aa050" opacity={0.4} rx={3} />
        <rect x={600} y={530} width={50} height={25} fill="#8fb060" opacity={0.45} rx={3} />
        {/* Houses */}
        <House x={700} y={590} type="thatched" scale={1.2} />
        <House x={730} y={610} type="thatched" scale={0.9} />
        <House x={670} y={605} type="thatched" scale={1.0} />
        <House x={745} y={580} type="thatched" scale={1.1} />
        <House x={660} y={630} type="thatched" scale={0.85} />
        <House x={720} y={640} type="thatched" scale={1.0} />
        <House x={690} y={650} type="thatched" scale={0.9} />
        <House x={754} y={645} type="thatched" scale={1.1} />
        {/* Tavern (larger, special) */}
        <g transform="translate(720,560) scale(1.5)">
          <rect x={-18} y={-14} width={36} height={22} fill="#c8a870" rx={2} />
          <polygon points={"-22,-14 0,-32 22,-14"} fill="#7a5230" />
          <rect x={-6} y={2} width={12} height={8} fill="#3d1f0a" rx={1} />
          <rect x={8} y={-8} width={6} height={6} fill="#87ceeb" opacity={0.7} rx={1} />
          <rect x={-14} y={-8} width={6} height={6} fill="#87ceeb" opacity={0.7} rx={1} />
          {/* Chimney smoke */}
          <rect x={10} y={-35} width={4} height={10} fill="#6b4a2a" rx={1} />
        </g>
        {/* Church/chapel */}
        <g transform="translate(770,610)">
          <rect x={-10} y={-12} width={20} height={20} fill="#9aabb8" rx={1} />
          <polygon points={"-14,-12 0,-26 14,-12"} fill="#6b7280" />
          <line x1={0} y1={-26} x2={0} y2={-38} stroke="#6b7280" strokeWidth={2} />
          <line x1={-5} y1={-34} x2={5} y2={-34} stroke="#6b7280" strokeWidth={2} />
        </g>
        {/* Village label */}
        <text x={715} y={560} textAnchor="middle" fill="#7a3a0a" fontSize={11} fontFamily="Cinzel,serif" fontStyle="italic" fontWeight="600" className="map-label" onClick={() => onSelect('experience')} opacity={0.9}>
          Hearthstone Village
        </text>

        {/* ── HARBOR (bottom-right) ── */}
        {/* Harbor landmass extension */}
        <path d={`M 720,820 Q 760,800 800,810 Q 840,815 870,840 Q 890,860 880,890 Q 860,910 830,910 Q 780,920 740,905 Q 700,895 710,870 Z`}
          fill="#7a9a50" opacity={0.7}
        />
        {/* Dock planks */}
        {[0,1,2,3,4].map(i => (
          <rect key={i} x={810 + i * 10} y={850} width={8} height={55} fill="#5c3a1a" rx={1} opacity={0.8} />
        ))}
        <rect x={805} y={850} width={60} height={6} fill="#7a5230" rx={1} />
        <rect x={805} y={890} width={60} height={6} fill="#7a5230" rx={1} />
        {/* Harbor buildings */}
        <House x={762} y={845} type="stone" scale={1.1} />
        <House x={800} y={838} type="stone" scale={1.3} />
        <House x={740} y={860} type="thatched" scale={1.0} />
        {/* Lighthouse */}
        <Lighthouse x={870} y={850} />
        {/* Harbor ocean / water */}
        <ellipse cx={870} cy={905} rx={80} ry={30} fill="url(#ocean-grad)" opacity={0.6} />
        {/* Ships */}
        <Ship x={870} y={920} scale={0.9} />
        <Ship x={920} y={940} scale={0.7} flip />
        <Ship x={180} y={180} scale={0.7} />
        <Ship x={880} y={140} scale={0.75} flip />
        {/* Harbor label */}
        <text x={810} y={825} textAnchor="middle" fill="#2a1a6a" fontSize={11} fontFamily="Cinzel,serif" fontStyle="italic" fontWeight="600" className="map-label" onClick={() => onSelect('contact')} opacity={0.9}>
          Starfall Harbor
        </text>

        {/* ── SEA CREATURES ── */}
        <SeaCreature x={100} y={680} />
        <SeaCreature x={890} y={510} />
        {/* Smaller sea drake (left) */}
        <g transform="translate(80,820)" opacity={0.7}>
          <ellipse cx={0} cy={0} rx={12} ry={7} fill="#2d6b4a" />
          <ellipse cx={15} cy={-8} rx={8} ry={5} fill="#1f5038" />
          <ellipse cx={20} cy={-14} rx={5} ry={4} fill="#1f5038" />
          <ellipse cx={24} cy={-19} rx={3} ry={3} fill="#1f5038" />
        </g>

        {/* ── SKILLS REGION LABEL (bottom left, swamp+coast) ── */}
        <text x={210} y={770} textAnchor="middle" fill="#1a4a2a" fontSize={11} fontFamily="Cinzel,serif" fontStyle="italic" fontWeight="600" className="map-label" onClick={() => onSelect('skills')} opacity={0.9}>
          Serpent's Shore
        </text>

        {/* ── ABOUT CLICKABLE LABEL ── */}
        <text x={700} y={420} textAnchor="middle" fill="#2a3a5a" fontSize={10} fontFamily="Cinzel,serif" fontStyle="italic" onClick={() => onSelect('about')} style={{ cursor: 'pointer' }} opacity={0.85}>
          ← Castle Ironhold
        </text>

        {/* ── COMPASS ROSE ── */}
        <CompassRose x={120} y={880} size={38} />

        {/* ── SCALE BAR ── */}
        <ScaleBar x={155} y={925} />

        {/* ── LEGEND TITLE (top-left corner flourish) ── */}
        <text x={68} y={60} textAnchor="middle" fill="#3d1f0a" fontSize={11} fontFamily="Cinzel,serif" fontStyle="italic" opacity={0.7}>✦</text>
        <text x={68} y={80} textAnchor="middle" fill="#3d1f0a" fontSize={8} fontFamily="Cinzel,serif" opacity={0.6}>WORLD MAP</text>

        {/* ── DECORATIVE CORNER ORNAMENTS ── */}
        {[[30, 30, 0], [W - 30, 30, 90], [30, H - 30, 270], [W - 30, H - 30, 180]].map(([cx, cy, rot], i) => (
          <g key={i} transform={`translate(${cx},${cy}) rotate(${rot})`}>
            <text textAnchor="middle" fill="#7a5230" fontSize={22} fontFamily="serif" opacity={0.5}>✦</text>
          </g>
        ))}

        {/* ── REGION HOTSPOT MARKERS ── */}
        {zones.map(z => (
          <RegionMarker
            key={z.id}
            x={z.x} y={z.y}
            label={z.label}
            sublabel={z.icon}
            color={z.color}
            active={activeSection === z.id}
            onClick={() => onSelect(z.id)}
          />
        ))}
      </svg>
    </div>
  )
}
