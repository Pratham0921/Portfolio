import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageTransition({ children, isNavigating }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => setIsReady(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isReady && (
        <motion.div
          key="content"
          initial={isNavigating ? { opacity: 0, y: 20 } : undefined}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
