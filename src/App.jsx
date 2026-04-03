import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EnhancedBackground from './components/EnhancedBackground'
import GlassCard from './components/GlassCard'
import MotionSection from './components/MotionSection'
import SkillBar from './components/SkillBar'
import CustomCursor from './components/CustomCursor'
import PageTransition from './components/PageTransition'
import AssistiveTouch from './components/AssistiveTouch'
import { portfolioData } from './data/portfolio'

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = useCallback((id) => {
    setIsNavigating(true)
    const el = document.getElementById(id)
    if (el) {
      const headerOffset = 80
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }

    // Reset navigating state after animation
    setTimeout(() => setIsNavigating(false), 600)
  }, [])

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ]

  // Header variants for scroll state
  const headerVariants = {
    transparent: {
      backgroundColor: 'rgba(10, 10, 15, 0)',
      borderColor: 'rgba(255, 255, 255, 0)',
      backdropFilter: 'blur(0px)',
    },
    solid: {
      backgroundColor: 'rgba(10, 10, 15, 0.85)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
    },
  }

  return (
    <div className="relative min-h-screen">
      {/* Enhanced Background */}
      <EnhancedBackground />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Assistive Touch Button */}
      <AssistiveTouch />

      {/* Navigation */}
      <motion.nav
        initial="transparent"
        animate={scrolled ? 'solid' : 'transparent'}
        variants={headerVariants}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 border-b transition-all"
        style={{ borderBottomStyle: 'solid', borderBottomWidth: '1px' }}
      >
        <div className="content-width flex items-center justify-between h-20">
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('hero') }}
            className="text-2xl font-bold text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="gradient-text">{portfolioData.name}</span>
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                onClick={() => scrollTo(item.id)}
                className="group relative text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                {item.label}
                {/* Animated underline */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                {/* Glow effect */}
                <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-20 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-xl -z-10 transition-opacity" />
              </motion.button>
            ))}
          </div>

          <motion.a
            href={portfolioData.contact.socials[0]?.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="hidden md:inline-block px-6 py-2.5 text-sm font-medium bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Resume</span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </div>
      </motion.nav>

      {/* Page Content with Transitions */}
      <PageTransition isNavigating={isNavigating}>
        {/* Hero Section */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Parallax background elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <motion.div
              animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
            />
          </motion.div>

          <div className="content-width relative z-10 text-center pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-amber-400 font-mono text-sm md:text-base tracking-[0.2em] uppercase mb-6"
              >
                {portfolioData.title}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 tracking-tight leading-none"
              >
                {portfolioData.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.4, 0, 0.2, 1] }}
                className="text-xl md:text-2xl lg:text-3xl text-slate-400 max-w-4xl mx-auto leading-relaxed font-light"
              >
                {portfolioData.tagline}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mt-16 flex flex-wrap gap-6 justify-center items-center"
            >
              <motion.button
                onClick={() => scrollTo('projects')}
                className="btn-gradient magnetic-btn group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <span>→</span>
                  <span>View My Work</span>
                </span>
              </motion.button>
              <motion.button
                onClick={() => scrollTo('contact')}
                className="px-8 py-4 border border-slate-600 hover:border-amber-500 text-slate-300 hover:text-white rounded-full transition-all duration-300 hover:bg-white/5 hover:shadow-lg hover:shadow-amber-500/10 backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.button>
            </motion.div>
          </div>

          {/* Enhanced scroll indicator */}
        </section>

        {/* About Section */}
        <section id="about" className="py-24 relative overflow-hidden">
          <div className="content-width">
            <MotionSection>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 section-header">
                About Me
              </h2>
              <p className="text-slate-400 text-lg">The story behind the code</p>
            </MotionSection>

            <div className="grid md:grid-cols-2 gap-12 items-start mt-16">
              <MotionSection delay={0.1}>
                <GlassCard className="p-8 md:p-10 h-full">
                  <div className="space-y-6 text-slate-300 leading-relaxed">
                    <p className="text-lg">{portfolioData.about.bio}</p>
                    <p>{portfolioData.about.bio2}</p>
                  </div>
                </GlassCard>
              </MotionSection>

              <MotionSection delay={0.2} className="space-y-6">
                {portfolioData.bioPhoto && (
                  <GlassCard hover className="p-6 text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full p-[2px] bg-gradient-to-r from-blue-500 to-purple-500">
                      <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden">
                        <img
                          src={portfolioData.bioPhoto}
                          alt={portfolioData.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextElementSibling.style.display = 'flex'
                          }}
                        />
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-4xl font-bold text-white" style={{ display: 'none' }}>
                          {portfolioData.name.charAt(0)}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{portfolioData.name}</h3>
                    <p className="text-amber-400 text-sm font-mono mb-4">{portfolioData.title}</p>
                    <div className="flex justify-center gap-3 text-sm text-slate-400">
                      {portfolioData.contact.socials.slice(0, 3).map((social) => (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors"
                          title={social.name}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </GlassCard>
                )}

                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                    <span className="text-2xl text-amber-400">{'</>'}</span>
                    Quick Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {portfolioData.about.stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-amber-500/30 transition-all duration-300 group"
                      >
                        <p className="text-slate-500 text-xs uppercase tracking-wider mb-2 group-hover:text-amber-400 transition-colors">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                    <span className="text-2xl text-rose-400">⚡</span>
                    Core Skills
                  </h3>
                  <div className="space-y-4">
                    {portfolioData.about.attributes.slice(0, 4).map((attr, i) => (
                      <SkillBar
                        key={i}
                        name={attr.name}
                        level={attr.value}
                        delay={i * 150}
                      />
                    ))}
                  </div>
                </GlassCard>
              </MotionSection>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 relative bg-dark-800/30 overflow-hidden">
          <div className="content-width">
            <MotionSection className="mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 section-header">
                Experience
              </h2>
              <p className="text-slate-400 text-lg">My professional journey</p>
            </MotionSection>

            <div className="max-w-3xl">
              {portfolioData.experience.map((exp, i) => (
                <MotionSection key={exp.id} delay={i * 0.15} className="relative pl-8 md:pl-12">
                  {/* Timeline line */}
                  <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />

                  {/* Timeline dot with pulse */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, type: 'spring' }}
                    className="absolute left-0 top-6 w-6 h-6 md:left-2 rounded-full border-4 border-dark-900 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-purple-500/30"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-white"
                      style={{ transform: 'scale(0.5)', opacity: 0.3 }}
                    />
                  </motion.div>

                  <GlassCard hover className="p-6 md:p-8 ml-4">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-4 py-1.5 text-xs font-mono font-semibold text-amber-300 bg-amber-500/20 rounded-full border border-amber-500/30">
                        {exp.period}
                      </span>
                      <span
                        className={`px-4 py-1.5 text-xs font-semibold rounded-full border ${
                          exp.type === 'EPIC QUEST'
                            ? 'text-rose-300 bg-rose-500/20 border-rose-500/30'
                            : exp.type === 'MAIN QUEST'
                            ? 'text-cyan-300 bg-violet-500/20 border-cyan-500/30'
                            : 'text-emerald-300 bg-emerald-500/20 border-emerald-500/30'
                        }`}
                      >
                        {exp.type}
                      </span>
                    </div>

                    <motion.h3
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="text-xl md:text-2xl font-bold text-white mb-2"
                    >
                      {exp.role}
                    </motion.h3>
                    <p className="text-slate-400 mb-4 text-lg">{exp.company}</p>
                    <p className="text-slate-300 mb-6 leading-relaxed">{exp.description}</p>

                    <ul className="space-y-2">
                      {exp.achievements.map((a, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: j * 0.1 }}
                          className="flex items-start gap-3 text-slate-400 group"
                        >
                          <span className="text-rose-400 mt-0.5 transition-transform group-hover:translate-x-1">→</span>
                          <span>{a}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </GlassCard>
                </MotionSection>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 relative overflow-hidden">
          <div className="content-width">
            <MotionSection className="mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 section-header">
                Projects
              </h2>
              <p className="text-slate-400 text-lg">Selected works that pushed boundaries</p>
            </MotionSection>

            <div className="grid md:grid-cols-2 gap-8">
              {portfolioData.projects.map((project, i) => (
                <MotionSection key={project.id} delay={i * 0.1}>
                  <GlassCard hover className="p-0 overflow-hidden flex flex-col h-full">
                    {/* Project Image */}
                    <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden group">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <motion.span
                            className="text-6xl"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            {project.emoji}
                          </motion.span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start gap-5 mb-6">
                        <motion.span
                          className="text-5xl"
                          whileHover={{ scale: 1.3, rotate: 15 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          {project.emoji}
                        </motion.span>
                        <div>
                          <motion.h3
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-xl font-bold text-white mb-2"
                          >
                            {project.name}
                          </motion.h3>
                          <p className="text-slate-400 leading-relaxed">{project.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6 flex-1">
                        {project.tech.map((tech, j) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: j * 0.05 }}
                            className="px-3 py-1.5 text-xs font-mono bg-amber-500/10 text-amber-300 rounded-lg border border-blue-500/20 hover:bg-amber-500/20 transition-colors"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      <div className="flex gap-6 pt-4 border-t border-white/10">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group"
                          whileHover={{ x: 4 }}
                        >
                          <span className="text-lg">🐙</span>
                          <span>GitHub</span>
                        </motion.a>
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium flex items-center gap-2 group"
                          whileHover={{ x: 4 }}
                        >
                          <span className="text-lg">🚀</span>
                          <span>Live Demo</span>
                        </motion.a>
                      </div>
                    </div>
                  </GlassCard>
                </MotionSection>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 relative bg-dark-800/30 overflow-hidden">
          <div className="content-width">
            <MotionSection className="mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 section-header">
                Skills
              </h2>
              <p className="text-slate-400 text-lg">Technologies and tools I master</p>
            </MotionSection>

            <div className="grid md:grid-cols-2 gap-8">
              {portfolioData.skills.map((category, i) => (
                <MotionSection key={category.category} delay={i * 0.1}>
                  <GlassCard className="p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-8">
                      <motion.span
                        className="text-3xl"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        {category.icon}
                      </motion.span>
                      <h3 className="text-xl font-bold text-white">{category.category}</h3>
                    </div>

                    <div className="space-y-5">
                      {category.items.map((skill, j) => (
                        <SkillBar
                          key={skill.name}
                          name={skill.name}
                          level={skill.level}
                          delay={j * 120 + i * 200}
                        />
                      ))}
                    </div>
                  </GlassCard>
                </MotionSection>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 relative overflow-hidden">
          <div className="content-width max-w-5xl">
            <MotionSection className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Let's Connect
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Have a project in mind? I'm always excited to collaborate on innovative ideas.
              </p>
            </MotionSection>

            <MotionSection delay={0.2}>
              <GlassCard hover className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12 mb-12">
                  <div className="space-y-10">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-slate-500 text-xs uppercase tracking-[0.2em] mb-3">
                        Email
                      </h3>
                      <a
                        href={`mailto:${portfolioData.contact.email}`}
                        className="text-2xl md:text-3xl font-semibold text-white hover:text-amber-400 transition-colors block"
                      >
                        {portfolioData.contact.email}
                      </a>
                    </motion.div>

                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="text-slate-500 text-xs uppercase tracking-[0.2em] mb-4">
                        Social
                      </h3>
                      <div className="flex gap-8">
                        {portfolioData.contact.socials.map((social) => (
                          <motion.a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-4xl text-slate-400 hover:text-white transition-colors"
                            whileHover={{ scale: 1.3, y: -5, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            title={social.name}
                          >
                            {social.icon}
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <motion.form
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    onSubmit={(e) => {
                      e.preventDefault()
                      alert('Thanks for your message! I\'ll get back to you soon.')
                    }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Message</label>
                      <textarea
                        rows={4}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/30 relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <span>Send Message</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </motion.form>
                </div>
              </GlassCard>
            </MotionSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/10 text-center relative z-10 bg-dark-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-500 text-sm mb-2 font-mono">
              © {new Date().getFullYear()} {portfolioData.name}
            </p>
            <p className="text-slate-600 text-xs">
              Built with React, Tailwind, Framer Motion
            </p>
          </motion.div>
        </footer>
      </PageTransition>
    </div>
  )
}
