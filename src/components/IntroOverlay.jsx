import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * IntroOverlay - Dramatic opening sequence
 * Shows name prominently on first visit, then fades out to reveal portfolio
 */
export default function IntroOverlay({ onComplete }) {
  const [showIntro, setShowIntro] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
      if (onComplete) onComplete();
    }, 3000);

    const handleClick = () => {
      setShowIntro(false);
      if (onComplete) onComplete();
      clearTimeout(timer);
    };

    window.addEventListener('click', handleClick);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleClick);
    };
  }, [onComplete]);

  if (!showIntro) return null;

  const createParticles = () => {
    const count = 30;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 3,
      repeatDelay: Math.random() * 2,
    }));
  };

  const particles = createParticles();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, duration: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background cursor-pointer overflow-hidden"
      >
        {/* Background gradient with moving orbs */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-black/90 to-slate-900/90" />

        {/* Animated orbs behind text */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -30, 20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-[80px]"
          />
          <motion.div
            animate={{
              x: [0, -40, 20, 0],
              y: [0, 40, -20, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-[100px]"
          />
        </div>

        {/* Central name display */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 text-center"
        >
          <motion.h1
            initial={{ y: 30, filter: 'blur(20px)' }}
            animate={{ y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-8xl lg:text-[10rem] font-bold text-white tracking-tighter mb-4"
            style={{ fontFamily: 'Inter, sans-serif', textShadow: '0 0 40px rgba(255,255,255,0.1)' }}
          >
            Pratham
            <br />
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="inline-block"
            >
              Goyal
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <p className="text-sm md:text-base text-white/60 font-mono tracking-[0.3em] uppercase mb-4">
              Gameplay Engineer
            </p>
            <div className="h-px w-24 bg-white/20 mx-auto mb-6" />
            <p className="text-xs text-white/40 font-mono">
              Loading portfolio experience...
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="mt-8 relative w-64 h-1 bg-white/10 mx-auto rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.4, duration: 2.5, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-white/30 via-white/60 to-white/30"
            />
          </div>

          {/* Click hint with pulse */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
            className="mt-12 text-white/40 text-xs font-mono"
          >
            Click to enter
          </motion.p>
        </motion.div>

        {/* Floating particle system */}
        <div className="absolute inset-0 pointer-events-none">
          {isClient &&
            particles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{ x: `${Math.random() * 100}%`, y: '100%', opacity: 0 }}
                animate={{
                  y: '-20%',
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  repeatDelay: particle.repeatDelay,
                  ease: "easeOut"
                }}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{ left: particle.left }}
              />
            ))}
        </div>

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent h-1 w-full animate-scan" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
