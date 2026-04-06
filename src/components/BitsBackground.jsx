import React from 'react';
import { motion } from 'framer-motion';
import Particles from '@tsparticles/react';
import { loadBasic } from '@tsparticles/basic';
import PixelSnow from './PixelSnow';

/**
 * BitsBackground - Reliable animated background
 * Combines gradient mesh, particles, and optional snow
 * NO BLACK - always shows visible gradients
 */
export default function BitsBackground({
  fps = 30,
  enableParticles = true,
  enableSnow = true,
  colorScheme = 'neutral' // 'neutral', 'warm', 'cool', 'monochrome'
}) {
  const particlesInit = async (engine) => {
    await loadBasic(engine);
  };

  // Color palettes
  const palettes = {
    neutral: { primary: '#ffffff', secondary: '#a1a1aa', bgFrom: '#1a1a1a', bgTo: '#0f0f0f' },
    warm: { primary: '#ff7a18', secondary: '#ff9f43', bgFrom: '#1a1208', bgTo: '#0f0a04' },
    cool: { primary: '#00d4ff', secondary: '#00b8cc', bgFrom: '#0a1520', bgTo: '#050a10' },
    monochrome: { primary: '#e5e5e5', secondary: '#a3a3a3', bgFrom: '#1a1a1a', bgTo: '#0f0f0f' }
  };

  const colors = palettes[colorScheme] || palettes.neutral;

  const particleOptions = {
    fpsLimit: fps,
    background: { color: { value: 'transparent' } },
    fullScreen: { enable: false, zIndex: 0 },
    detectRetina: true,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        resize: true,
      },
      modes: {
        grab: { distance: 150, links: { opacity: 0.1 } },
      },
    },
    particles: {
      color: { value: [colors.primary, colors.secondary] },
      links: {
        color: colors.primary,
        distance: 140,
        enable: true,
        opacity: 0.04,
        width: 0.5,
        triangles: { enable: false },
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: { default: 'out' },
        speed: 0.4,
      },
      number: {
        density: { enable: true, area: 1200 },
        value: 60,
        limit: 120,
      },
      opacity: {
        animation: { enable: true, minimumValue: 0.1, speed: 0.5, sync: false },
        value: { min: 0.2, max: 0.5 },
      },
      shape: { type: 'circle' },
      size: {
        value: { min: 0.5, max: 1.5 },
      },
    },
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. BASE GRADIENT - Always visible, not black */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-slate-900/95 to-gray-800/95" />

      {/* 2. ANIMATED LIGHT ORBS */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: ['-10%', '10%', '-10%'],
            y: ['-10%', '10%', '-10%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-radial from-white/10 via-transparent to-transparent rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: ['10%', '-10%', '10%'],
            y: ['10%', '-10%', '10%'],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-white/8 via-transparent to-transparent rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-white/6 via-transparent to-transparent rounded-full blur-[100px]"
        />
      </div>

      {/* 3. PARTICLES */}
      {enableParticles && (
        <Particles
          id="bits-particles"
          init={particlesInit}
          options={particleOptions}
          className="absolute inset-0"
        />
      )}

      {/* 4. PIXEL SNOW EFFECT */}
      {enableSnow && <PixelSnow density={80} speed={0.8} color="rgba(255,255,255,0.3)" size={2} />}

      {/* 5. GRID OVERLAY */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* 6. VIGNETTE - Prevent pure black edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}
