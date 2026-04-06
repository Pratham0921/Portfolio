import { motion } from 'framer-motion'
import personalInfo from '../data/personal-info.json'

export default function BioSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      <div className="content-width flex flex-col md:flex-row gap-12 items-center">
        {/* Profile Image Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/3 relative flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Cool glowing background behind the image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent to-purple-600 rounded-full blur-[40px] opacity-30 animate-pulse" />
            
            {/* The actual image mask */}
            <div className="absolute inset-0 rounded-2xl border border-white/20 overflow-hidden bg-surface shadow-2xl skew-y-3 transform transition-transform hover:skew-y-0 duration-500">
               {/* Replace this placeholder with your actual image later! */}
               <img 
                 src="https://picsum.photos/seed/prathambio/600/600" 
                 alt={personalInfo.name} 
                 className="w-full h-full object-cover sepia-[.2] hover:sepia-0 transition-all duration-500" 
               />
            </div>
            
            <div className="absolute bottom-[-20px] right-[-20px] bg-surface-light border border-white/10 p-3 rounded-lg shadow-xl backdrop-blur-md">
                <span className="text-2xl">🎮</span>
            </div>
          </div>
        </motion.div>

        {/* Bio Text Column */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-2/3 space-y-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 pb-2">About Me</h2>
            <div className="w-16 h-1 bg-accent rounded-full" />
          </div>

          <div className="space-y-4 text-text-secondary text-lg font-light leading-relaxed">
            <p>
              Hi, I'm <strong className="text-white font-semibold">{personalInfo.name}</strong>, a <span className="text-accent">{personalInfo.title}</span> specializing in Core Systems, AI, and Multiplayer frameworks. Let me turn complex architectural problems into scalable, high-performance gameplay mechanics.
            </p>
            <p>
              My passion lies in squeezing every frame out of the engine. From orchestrating massive nav-meshes and behavior trees to predicting network rollbacks smoothly—if it runs slow, I fix it. 
            </p>
            <p>
              Currently operating out of {personalInfo.timezone} timezone (Available {personalInfo.availability}). I am actively looking for positions and {personalInfo.workAuthorization}.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 mt-6 border-t border-surface">
            {personalInfo.socials.map((social) => (
              <a 
                 key={social.name}
                 href={social.url} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 px-4 py-2 bg-surface/50 border border-white/5 rounded-lg hover:border-accent hover:text-white transition-colors text-text-secondary"
              >
                <span>{social.icon}</span>
                <span className="font-mono text-sm">{social.name}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
