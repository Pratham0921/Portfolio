import { useState } from 'react'
import { motion } from 'framer-motion'
import SplitText from './SplitText'
import SpotlightCard from './SpotlightCard'

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  const techStack = [
    { name: 'C++', icon: '⚙️' },
    { name: 'Blueprint', icon: '🔷' },
    { name: 'Niagara', icon: '✨' },
    { name: 'AI/Behavior', icon: '🧠' },
    { name: 'Multiplayer', icon: '🌐' },
    { name: 'PCG', icon: '🎲' },
  ]

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      {/* Content */}
      <div className="content-width relative z-10 grid lg:grid-cols-[60%_40%] gap-8 items-center py-8">
        {/* Left Side - WebGL Demo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative bg-black/40 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm"
          >
            <div className="aspect-video relative">
              {!isPlaying ? (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/60 cursor-pointer group"
                  onClick={() => setIsPlaying(true)}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-full border-2 border-white/60 flex items-center justify-center"
                  >
                    <svg className="w-10 h-10 text-white/80 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                  <p className="absolute bottom-8 text-white/60 font-mono text-sm">Launch Demo</p>
                </div>
              ) : (
                <iframe
                  className="w-full h-full border-0"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                  title="WebGL Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            <div className="absolute bottom-4 left-4 flex gap-4 text-xs font-mono text-white/60 bg-black/40 px-3 py-1.5 rounded backdrop-blur-sm">
              <span>WASD</span>
              <span>Mouse</span>
              <span>Space</span>
            </div>
          </motion.div>

          <div className="mt-3 text-xs font-mono text-text-secondary">
            <span className="text-white">●</span> LIVE UE 5.4 build | 47 MB | 60 FPS target
          </div>
        </motion.div>

        {/* Right Side - Hero Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col justify-center space-y-8"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-white/70 font-mono text-sm tracking-[0.3em] uppercase mb-4"
            >
              Gameplay Engineer
            </motion.p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              <SplitText
                text="Pratham"
                delay={0.02}
                animationFrom={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animationTo={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              />
              <br />
              <SplitText
                text="Goyal"
                delay={0.02}
                animationFrom={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animationTo={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                className="text-white/90"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-lg text-text-secondary font-light"
            >
              Unreal Engine specialist
              <br />
              <span className="text-white/80">Systems | AI | Multiplayer</span>
            </motion.p>
          </div>

          {/* Tech Stack Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="grid grid-cols-2 gap-3"
          >
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + i * 0.05 }}
              >
                <SpotlightCard
                  className="p-3 bg-white/5 border-white/10"
                  spotlightColor="rgba(255, 255, 255, 0.08)"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono px-2 py-1 rounded bg-white/10 text-white/90">{tech.icon}</span>
                    <span className="text-sm font-medium text-white/80">{tech.name}</span>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-white text-black font-semibold rounded transition-all font-mono text-sm"
            >
              Download Resume
            </motion.a>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 border border-white/30 text-white rounded hover:bg-white/5 transition-all font-mono text-sm"
            >
              GitHub
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 border border-white/20 text-white/80 rounded hover:border-white/40 hover:text-white transition-all font-mono text-sm"
            >
              Contact
            </motion.a>
          </motion.div>

          {/* Work Authorization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="text-sm text-text-secondary space-y-2 pt-4 border-t border-white/10"
          >
            <p>
              <span className="text-white font-mono">Timezone:</span> IST (UTC+5:30) | Available 9AM-6PM IST
            </p>
            <p>
              <span className="text-white font-mono">Work Auth:</span> Open to relocation | Visa sponsorship not required
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
