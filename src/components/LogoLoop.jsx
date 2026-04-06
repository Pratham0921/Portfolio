import { motion } from 'framer-motion';

/**
 * LogoLoop - Animated logo with continuous rotation/loop effect
 * Perfect for loading or brand showcase
 */
export default function LogoLoop({
  size = 80,
  color = 'currentColor',
  speed = 3,
  className = ''
}) {
  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: 'linear'
      }}
      style={{ width: size, height: size }}
    >
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/20"
        animate={{ rotate: -360 }}
        transition={{
          duration: speed * 1.5,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Inner ring */}
      <motion.div
        className="absolute inset-2 rounded-full border border-white/30"
        animate={{ rotate: 360 }}
        transition={{
          duration: speed * 0.8,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Center symbol */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: speed * 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <svg
          width={size * 0.5}
          height={size * 0.5}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Your initials or logo shape - Customize this! */}
          <motion.path
            d="M30 70 L50 30 L70 70 M35 55 L65 55"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            animate={{ strokeDashoffset: [0, 20] }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        </svg>
      </motion.div>

      {/* Orbiting dots */}
      {[0, 120, 240].map((rotation, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/60 rounded-full"
          style={{
            top: '10%',
            left: '50%',
            transformOrigin: '0 0',
          }}
          animate={{ rotate: rotation + 360 }}
          transition={{
            duration: speed * (i + 1) * 0.7,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </motion.div>
  );
}
