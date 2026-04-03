import React from 'react'
import { motion } from 'framer-motion'

export default function MotionSection({
  children,
  className = '',
  delay = 0,
  y = 50,
  ...props
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  )
}
