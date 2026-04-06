import { useState } from 'react'
import { motion } from 'framer-motion'
import SplitText from './SplitText'
import ShinyText from './ShinyText'
import LogoWall from './LogoWall'

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  const frameworkLogos = [
    { name: 'React', icon: '⚛️' },
    { name: 'Vite', icon: '⚡' },
    { name: 'Tailwind CSS', icon: '🌊' },
    { name: 'Framer Motion', icon: '✨' },
    { name: 'Three.js', icon: '🧊' },
    { name: 'Unreal Engine', icon: '🎮' },
    { name: 'C++', icon: '⚙️' },
    { name: 'Node.js', icon: '🟩' },
  ];

  const frameworkLogos2 = [
    { name: 'Niagara', icon: '✨' },
    { name: 'Blueprints', icon: '🔷' },
    { name: 'AI/Behavior', icon: '🧠' },
    { name: 'Multiplayer', icon: '🌐' },
    { name: 'PCG', icon: '🎲' },
    { name: 'Python', icon: '🐍' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-12">
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

      <div className="content-width w-full relative z-10 flex flex-col items-center flex-grow justify-center">
        {/* Name and Title Segment */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="text-center w-full max-w-4xl mx-auto flex flex-col items-center"
        >
           <div className="inline-block px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-6 backdrop-blur-sm">
             <ShinyText text="● AVAILABLE FOR WORK" disabled={false} speed={3} className="text-emerald-400 font-mono text-sm tracking-widest" />
           </div>

           <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight tracking-tighter">
             <SplitText
               text="Pratham Goyal"
               delay={0.05}
               animationFrom={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
               animationTo={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
             />
           </h1>

           <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1, duration: 0.6 }}
             className="text-xl md:text-2xl text-text-secondary font-light mt-4"
           >
             Gameplay Engineer & Unreal Engine Specialist
           </motion.p>
           
           <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1.2, duration: 0.6 }}
             className="text-lg text-white/50 font-mono mt-2"
           >
             Systems | AI | Multiplayer
           </motion.p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex flex-wrap gap-4 mt-8 justify-center"
          >
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-white text-black font-semibold rounded-full transition-all font-mono text-sm"
            >
              Download Resume
            </motion.a>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 border border-white/30 text-white rounded-full hover:bg-white/5 transition-all font-mono text-sm"
            >
              GitHub
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 border border-white/20 text-white/80 rounded-full hover:border-white/40 hover:text-white transition-all font-mono text-sm"
            >
              Contact
            </motion.a>
          </motion.div>

          {/* WebGL Demo Embed - Made smaller and centered below */}
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 1.6 }}
             className="w-full max-w-3xl mt-16 relative"
          >
             <div className="relative bg-black/40 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm shadow-2xl">
              <div className="aspect-video relative">
                {!isPlaying ? (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black/60 cursor-pointer group hover:bg-black/40 transition-all"
                    onClick={() => setIsPlaying(true)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 rounded-full border-2 border-white/60 flex items-center justify-center bg-white/5 backdrop-blur-md"
                    >
                      <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                    <p className="absolute bottom-8 text-white/60 font-mono text-sm">Launch WebGL Demo</p>
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
              <div className="absolute bottom-4 left-4 flex gap-4 text-xs font-mono text-white/60 bg-black/60 px-3 py-1.5 rounded backdrop-blur-sm">
                <span>WASD</span>
                <span>Mouse</span>
                <span>Space</span>
              </div>
            </div>
          </motion.div>
      </div>

      {/* Logo Carousel - Frameworks effects added to bottom */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 2, duration: 1 }}
         className="w-full mt-16 flex flex-col gap-4 relative z-10"
      >
        <div className="text-center mb-2">
            <span className="text-xs font-mono text-white/30 uppercase tracking-widest">Technologies & Tools</span>
        </div>
        <div className="border-y border-white/5 py-4 bg-black/20 backdrop-blur-sm">
           <LogoWall logos={frameworkLogos} speed={35} direction="left" />
           <LogoWall logos={frameworkLogos2} speed={30} direction="right" />
        </div>
      </motion.div>

    </section>
  )
}

