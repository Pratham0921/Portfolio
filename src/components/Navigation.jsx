import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function Navigation({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = useCallback((id) => {
    if (onNavigate) onNavigate()
    const el = document.getElementById(id)
    if (!el) return

    const headerOffset = 80
    const elementPosition = el.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }, [onNavigate])

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'toolbox', label: 'Toolbox' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'journey', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
  ]

  const navVariants = {
    transparent: {
      backgroundColor: 'rgba(9, 7, 4, 0)',
      borderColor: 'rgba(255, 122, 24, 0)',
      backdropFilter: 'blur(0px)',
    },
    solid: {
      backgroundColor: 'rgba(9, 7, 4, 0.88)',
      borderColor: 'rgba(255, 122, 24, 0.25)',
      backdropFilter: 'blur(20px)',
    },
  }

  return (
    <motion.nav
      initial="transparent"
      animate={scrolled ? 'solid' : 'transparent'}
      variants={navVariants}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all"
      style={{ borderBottomStyle: 'solid', borderBottomWidth: '1px' }}
    >
      <div className="content-width flex items-center justify-between h-16 md:h-20">
        <motion.a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('hero') }}
          className="text-lg md:text-xl font-bold text-white font-mono"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="accent-text">PG</span>_Studio
        </motion.a>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.04 }}
              onClick={() => scrollTo(item.id)}
              className="relative text-sm font-medium text-text-secondary hover:text-accent transition-colors font-mono"
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        <motion.a
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollTo('contact') }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55 }}
          className="hidden md:inline-block px-6 py-2.5 text-sm font-medium bg-accent text-black rounded hover:shadow-glow-accent transition-all duration-300 relative overflow-hidden group font-mono"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10">START A PROJECT</span>
          <motion.span
            className="absolute inset-0 bg-accent-dark"
            initial={{ x: '-100%' }}
            whileHover={{ x: '0%' }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden text-white"
          onClick={() => scrollTo('hero')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
      </div>
    </motion.nav>
  )
}
