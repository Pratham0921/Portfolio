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
    console.log('Particles initializing...', engine);
    // Load the basic preset which includes the particle shapes, movement, etc.
    await loadBasic(engine);
    console.log('Particles loaded!');
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
        opacity: 0.3,
        width: 1,
        triangles: {
          enable: true,
          opacity: 0.1,
        },
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'out',
        },
        speed: 1,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 100, // Increased for visibility
      },
      opacity: {
        value: 0.8,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 2, max: 4 },
      },
    },
  };

  console.log('BitsBackground rendering...');

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Debug border to see the container */}
      <div className="absolute inset-0 border-4 border-red-500 pointer-events-none" />

      {/* Particle network layer */}
      {enableParticles && (
        <Particles
          id="bits-bg-particles"
          init={particlesInit}
          options={particlesOptions}
          className="absolute inset-0"
        />
      )}

      {/* Gradient orbs layer - MORE VISIBLE */}
      {enableGradientOrbs && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-[80px] animate-float"
            style={{ animationDuration: '25s' }}
          />
          <div
            className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-purple-500/20 rounded-full blur-[100px] animate-float-delayed"
            style={{ animationDuration: '30s' }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[80px] animate-float-slow"
            style={{ animationDuration: '35s' }}
          />
        </div>
      )}
    </div>
  );
}
