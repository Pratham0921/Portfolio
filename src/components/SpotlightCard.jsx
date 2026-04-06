import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(0, 212, 255, 0.15)',
  spotlightSize = 400,
}) => {
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const background = useMotionTemplate`
    radial-gradient(
      ${spotlightSize}px circle at ${smoothX}px ${smoothY}px,
      ${spotlightColor},
      transparent 80%
    )
  `;

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-lg border border-white/10 bg-surface/50 p-6 ${className}`}
      ref={cardRef}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
