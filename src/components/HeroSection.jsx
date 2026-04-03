import { useState } from 'react'
import { motion } from 'framer-motion'

export default function HeroSection() {
  console.log('HeroSection rendering')
  const [isPlaying, setIsPlaying] = useState(false)

  const techStack = [
    { name: 'C++', icon: '⚙️' },
    { name: 'Blueprint', icon: '🔷' },
    { name: 'Niagara', icon: '✨' },
    { name: 'AI/Behavior', icon: '🧠' },
    { name: 'Multiplayer', icon: '🌐' },
    { name: 'PCG', icon: '🎲' },
  ]

  const handlePlay = () => {
    setIsPlaying(true)
    // In production, this would initialize the WebGL context
    // For now, we'll show a placeholder
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Grid Pattern (UE5 Editor style) */}
      <div className="absolute inset-0 bg-background">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="content-width relative z-10 grid lg:grid-cols-[60%_40%] gap-8 items-center py-8">
        {/* Left Side - WebGL Demo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative bg-black border border-accent/30 rounded-lg overflow-hidden shadow-glow-accent">
            {/* WebGL Canvas / YouTube Embed */}
            <div className="aspect-video relative">
              {!isPlaying ? (
                // Play button overlay
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/80 cursor-pointer group"
                  onClick={handlePlay}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-full border-4 border-accent flex items-center justify-center"
                  >
                    <svg className="w-10 h-10 text-accent ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                  <p className="absolute bottom-8 text-accent font-mono text-sm">Click to Play</p>
                </div>
              ) : (
                // Placeholder for WebGL build or YouTube video
                <iframe
                  className="w-full h-full border-0"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                  title="WebGL Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            {/* Controls hint */}
            <div className="absolute bottom-4 left-4 flex gap-4 text-xs font-mono text-accent/80 bg-black/60 px-3 py-2 rounded">
              <span>WASD</span>
              <span>Mouse</span>
              <span>Space</span>
            </div>
          </div>

          {/* Technical note */}
          <div className="mt-3 text-xs font-mono text-text-secondary">
            <span className="text-accent">●</span> Built with UE 5.4 | 47 MB | 60 FPS
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
            <p className="text-accent font-mono text-sm tracking-[0.2em] uppercase mb-4">
              Gameplay Programmer
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Pratham Goyal
            </h1>
            <p className="text-xl text-text-secondary font-light">
              Unreal Engine 5 Expert<br />
              <span className="text-accent">Systems • AI • Multiplayer</span>
            </p>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-2 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-3 p-3 bg-surface/50 border border-surface rounded"
              >
                <span className="text-2xl">{tech.icon}</span>
                <span className="text-sm font-medium text-text-primary">{tech.name}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="/resume.pdf"
              download
              className="px-6 py-3 bg-accent text-black font-semibold rounded hover:shadow-glow-accent transition-all font-mono text-sm"
            >
              ↓ Resume
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-accent text-accent rounded hover:bg-accent/10 transition-all font-mono text-sm"
            >
              GitHub
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-surface text-white rounded hover:border-accent hover:text-accent transition-all font-mono text-sm"
            >
              Contact
            </a>
          </div>

          {/* Work Authorization */}
          <div className="text-sm text-text-secondary space-y-2 pt-4 border-t border-surface">
            <p>
              <span className="text-accent font-mono">Timezone:</span> IST (UTC+5:30) • Available 9AM-6PM IST
            </p>
            <p>
              <span className="text-accent font-mono">Work Auth:</span> Open to relocation • Visa sponsorship not required
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
