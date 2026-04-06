import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * AppDock - macOS-style dock with magnification effect
 * Hover over icons to see them grow, with spring physics
 */
export default function AppDock({ items = [] }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dockRef = useRef(null);
  const mouseX = useMotionValue(0);

  // Spring configuration for smooth scaling
  const springConfig = {
    stiffness: 300,
    damping: 30,
    mass: 1
  };

  // Base size and max magnification
  const baseSize = 48;
  const maxScale = 2.2;

  return (
    <motion.div
      ref={dockRef}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
    >
      {/* Dock background with glass effect */}
      <div className="relative px-6 py-4">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl" />

        {/* Icons container */}
        <div className="relative flex items-center gap-3">
          {items.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const scale = useSpring(
              mouseX,
              springConfig
            );

            // Calculate distance from mouse to item position for proximity scaling
            // For simplicity, we'll just use hover state for now
            const currentScale = isHovered ? maxScale : 1;

            return (
              <motion.div
                key={item.id || index}
                className="relative flex flex-col items-center gap-2"
                style={{
                  width: baseSize * currentScale,
                  height: baseSize * currentScale,
                }}
                animate={{
                  scale: currentScale,
                  y: isHovered ? -10 : 0
                }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 25
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                {/* Icon button */}
                <div
                  className="w-full h-full rounded-xl flex items-center justify-center cursor-pointer relative overflow-hidden group"
                  style={{
                    background: item.gradient || 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: isHovered ? '0 8px 32px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.2)'
                  }}
                >
                  {/* Icon image or SVG */}
                  {item.icon ? (
                    typeof item.icon === 'string' ? (
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-12 h-12 object-contain"
                        draggable={false}
                      />
                    ) : (
                      <item.icon className="w-10 h-10 text-white" />
                    )
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                      <span className="text-white/80 text-xl font-bold">
                        {item.label?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}

                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-lg border border-white/10 whitespace-nowrap"
                  >
                    <span className="text-xs text-white/90 font-mono">
                      {item.label}
                    </span>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
                  </motion.div>

                  {/* Glow effect on hover */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 rounded-xl bg-white/10 blur-xl"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// Default dock items (customize with your apps/links)
export const defaultDockItems = [
  {
    id: 'portfolio',
    label: 'Home',
    icon: '/icon-home.svg', // You'll need to create/add these icons
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: '/icon-projects.svg',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 'about',
    label: 'About',
    icon: '/icon-about.svg',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: '/icon-skills.svg',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: '/icon-contact.svg',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  }
];
