import React, { useState, useEffect, useRef } from 'react';
import Particles from '@tsparticles/react';
import { loadBasic } from '@tsparticles/basic';

/**
 * BitsBackground - Advanced Multi-Effect Background System
 * Multiple animation modes: particles, waves, mesh, aurora
 * Configurable with props
 */
export default function BitsBackground({
  fps = 30,
  effectMode = 'particles', // 'particles', 'waves', 'mesh', 'aurora', 'mixed'
  colorScheme = 'neutral', // 'neutral', 'warm', 'cool', 'monochrome'
  density = 'medium' // 'low', 'medium', 'high'
}) {
  const particlesInit = async (engine) => {
    await loadBasic(engine);
  };

  // Color palettes
  const palettes = {
    neutral: { primary: '#ffffff', secondary: '#a1a1aa', tertiary: '#52525b' },
    warm: { primary: '#ff7a18', secondary: '#ff9f43', tertiary: '#ffb14a' },
    cool: { primary: '#00d4ff', secondary: '#00b8cc', tertiary: '#7ee787' },
    monochrome: { primary: '#e5e5e5', secondary: '#a3a3a3', tertiary: '#52525b' }
  };

  const colors = palettes[colorScheme] || palettes.neutral;

  // Particle count based on density
  const particleCount = { low: 40, medium: 80, high: 150 }[density];

  // Effect-specific configurations
  const getParticlesOptions = () => ({
    fpsLimit: fps,
    background: { color: { value: 'transparent' } },
    fullScreen: { enable: false, zIndex: 0 },
    detectRetina: true,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' },
        resize: true,
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.15 } },
        push: { quantity: 8 },
      },
    },
    particles: {
      color: { value: [colors.primary, colors.secondary] },
      links: {
        color: colors.primary,
        distance: 160,
        enable: true,
        opacity: 0.06,
        width: 0.5,
        triangles: { enable: false },
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: { default: 'out' },
        speed: 0.5,
        random: true,
        straight: false,
        attract: { enable: true, distance: 100, rotate: { x: 300, y: 600 } },
      },
      number: {
        density: { enable: true, area: 1000 },
        value: particleCount,
        limit: particleCount * 1.5,
      },
      opacity: {
        animation: { enable: true, minimumValue: 0.1, speed: 0.6, sync: false },
        value: { min: 0.2, max: 0.6 },
      },
      shape: { type: 'circle' },
      size: {
        animation: { enable: true, minimumValue: 0.3, speed: 1, sync: false },
        value: { min: 0.5, max: 2 },
      },
    },
  });

  const getWavesOptions = () => ({
    fpsLimit: fps,
    background: { color: { value: 'transparent' } },
    fullScreen: { enable: false, zIndex: 0 },
    detectRetina: true,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'repulse' },
        resize: true,
      },
      modes: {
        repulse: { distance: 120, duration: 0.3 },
      },
    },
    particles: {
      color: { value: colors.primary },
      links: { enable: false },
      move: {
        direction: 'top',
        enable: true,
        outModes: { default: 'destroy', top: 'none', bottom: 'destroy' },
        speed: { min: 0.3, max: 1.5 },
        random: true,
        straight: false,
        path: {
          enable: true,
          delay: { value: 0 },
          generator: (t) => ({
            x: Math.sin(t * 0.4) * 30 + Math.cos(t * 0.6) * 20,
            y: Math.cos(t * 0.3) * 15,
          }),
        },
      },
      number: {
        density: { enable: true, area: 600 },
        value: 100,
        limit: 200,
      },
      opacity: {
        animation: {
          enable: true,
          minimumValue: 0.05,
          speed: 0.7,
          sync: false,
          startValue: 'max',
          destroy: 'min',
        },
        value: { min: 0.15, max: 0.8 },
      },
      shape: { type: 'circle' },
      size: {
        animation: { enable: true, minimumValue: 0.2, speed: 1.2, sync: false },
        value: { min: 0.3, max: 2.5 },
      },
    },
  });

  const getAuroraOptions = () => ({
    fpsLimit: fps,
    background: { color: { value: 'transparent' } },
    fullScreen: { enable: false, zIndex: 0 },
    detectRetina: true,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'bubble' },
        resize: true,
      },
      modes: {
        bubble: { distance: 100, size: 4, duration: 0.4 },
      },
    },
    particles: {
      color: { value: [colors.primary, colors.secondary, colors.tertiary] },
      links: { enable: false },
      move: {
        direction: 'none',
        enable: true,
        outModes: { default: 'out' },
        speed: 0.3,
        random: true,
        vibrate: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: 60,
        limit: 120,
      },
      opacity: {
        value: 0.3,
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
          minimumValue: 0.1,
        },
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 4 },
        animation: {
          enable: true,
          speed: 0.4,
          minimumValue: 0.5,
          sync: false,
        },
      },
    },
  });

  // Get options based on mode
  const getOptions = () => {
    switch (effectMode) {
      case 'waves': return getWavesOptions();
      case 'aurora': return getAuroraOptions();
      default: return getParticlesOptions();
    }
  };

  const options = getOptions();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Dynamic gradient mesh background */}
      <div className="absolute inset-0">
        {effectMode === 'mesh' || effectMode === 'mixed' ? (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-slate-900/80 to-black/80">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-gradient-shift" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/3 to-transparent animate-gradient-shift-delayed" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-slate-900/60 to-black/60" />
        )}
      </div>

      {/* Particle system */}
      <Particles
        id="bits-bg-particles"
        init={particlesInit}
        options={options}
        className="absolute inset-0"
      />

      {/* Additional effects based on mode */}
      {effectMode === 'mixed' && (
        <>
          {/* Large orbs for depth */}
          <div className="absolute inset-0">
            <div
              className="absolute top-[-15%] left-[-15%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] animate-float"
              style={{ animationDuration: '25s' }}
            />
            <div
              className="absolute bottom-[-15%] right-[-15%] w-[700px] h-[700px] bg-white/4 rounded-full blur-[140px] animate-float-delayed"
              style={{ animationDuration: '30s' }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/3 rounded-full blur-[100px] animate-float-slow"
              style={{ animationDuration: '35s' }}
            />
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '48px 48px',
              }}
            />
          </div>
        </>
      )}

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
