import React from 'react';
import Particles from '@tsparticles/react';
import { loadBasic } from '@tsparticles/basic';

/**
 * BitsBackground - A composite animated background component
 * Combines particle network with gradient orbs for a rich, performant effect
 *
 * Props:
 * - enableParticles: boolean (default: true)
 * - enableGradientOrbs: boolean (default: true)
 * - fps: number (default: 30)
 */
export default function BitsBackground({
  enableParticles = true,
  enableGradientOrbs = true,
  fps = 30
}) {
  const particlesInit = async (engine) => {
    // Load the basic preset which includes the particle shapes, movement, etc.
    await loadBasic(engine);
  };

  const particlesOptions = {
    fpsLimit: fps,
    background: {
      color: {
        value: 'transparent',
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 0,
    },
    detectRetina: true,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'grab',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 150,
          links: {
            opacity: 0.25,
          },
        },
      },
    },
    particles: {
      color: {
        value: ['#00d4ff', '#00b8cc'],
      },
      links: {
        color: '#00d4ff',
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
        triangles: {
          enable: true,
          opacity: 0.04,
        },
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'out',
        },
        speed: 0.6,
      },
      number: {
        density: {
          enable: true,
          area: 1200,
        },
        value: 60,
      },
      opacity: {
        animation: {
          enable: true,
          minimumValue: 0.2,
          speed: 0.8,
          sync: false,
        },
        value: { min: 0.2, max: 0.6 },
      },
      shape: {
        type: 'circle',
      },
      size: {
        animation: {
          enable: true,
          minimumValue: 1,
          speed: 1.5,
          sync: false,
        },
        value: { min: 1, max: 2.5 },
      },
    },
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Particle network layer */}
      {enableParticles && (
        <Particles
          id="bits-bg-particles"
          init={particlesInit}
          options={particlesOptions}
          className="absolute inset-0"
        />
      )}

      {/* Gradient orbs layer */}
      {enableGradientOrbs && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/8 rounded-full blur-[120px] animate-float"
            style={{ animationDuration: '25s' }}
          />
          <div
            className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-purple-500/8 rounded-full blur-[140px] animate-float-delayed"
            style={{ animationDuration: '30s' }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/6 rounded-full blur-[100px] animate-float-slow"
            style={{ animationDuration: '35s' }}
          />
        </div>
      )}
    </div>
  );
}
