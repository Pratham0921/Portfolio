import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioData } from '../data/portfolio'

export default function AssistiveTouch() {
  const [isOpen, setIsOpen] = useState(false)

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.assistive-touch-container')) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  return (
    <div className="assistive-touch-container fixed bottom-6 right-6 z-50">
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 w-80 glass-card p-6 mb-4"
          >
            {/* Quick Bio Card */}
            <div className="text-center">
              {portfolioData.bioPhoto && (
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-500/50">
                  <img
                    src={portfolioData.bioPhoto}
                    alt={portfolioData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h4 className="text-lg font-bold text-white mb-1">{portfolioData.name}</h4>
              <p className="text-blue-400 text-sm font-mono mb-4">{portfolioData.title}</p>
              <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                {portfolioData.about.bio}
              </p>
              <div className="flex justify-center gap-4 mb-4">
                {portfolioData.contact.socials.slice(0, 4).map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl text-slate-400 hover:text-white transition-colors"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                {portfolioData.contact.email}
              </a>
            </div>

            {/* Triangle pointer */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-slate-800/80 backdrop-blur border border-white/10 rotate-45 transform" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="assistive-touch-btn w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg hover:shadow-purple-500/50 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <span className="text-2xl">
          {isOpen ? '×' : '👤'}
        </span>
      </motion.button>
    </div>
  )
}
