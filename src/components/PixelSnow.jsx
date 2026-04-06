import { useEffect, useRef } from 'react';

/**
 * PixelSnow - Retro pixelated snow effect
 * Lightweight canvas-based animation, no heavy particles
 */
export default function PixelSnow({
  density = 100,
  speed = 1,
  color = 'rgba(255, 255, 255, 0.8)',
  size = 2
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let width, height;
    const snowflakes = [];

    // Initialize snowflakes
    const initSnow = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      snowflakes.length = 0;

      for (let i = 0; i < density; i++) {
        snowflakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * size + 1,
          speedY: Math.random() * speed + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.6 + 0.2
        });
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      snowflakes.forEach(flake => {
        // Update position
        flake.y += flake.speedY;
        flake.x += flake.speedX;

        // Wrap around
        if (flake.y > height) {
          flake.y = -flake.size;
          flake.x = Math.random() * width;
        }
        if (flake.x > width) flake.x = 0;
        if (flake.x < 0) flake.x = width;

        // Draw pixel snowflake (rectangle for pixel look)
        ctx.fillStyle = color;
        ctx.globalAlpha = flake.opacity;
        ctx.fillRect(flake.x, flake.y, flake.size, flake.size);
      });

      animationId = requestAnimationFrame(animate);
    };

    initSnow();
    animate();

    const handleResize = () => {
      initSnow();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [density, speed, color, size]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
