import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectModal from './ProjectModal'
import projectsData from '../data/projects.json'
import SpotlightCard from './SpotlightCard'

export default function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState(null)
  const projects = projectsData

  const getBentoClass = (index) => {
    switch (index % 6) {
      case 0: return "col-span-1 md:col-span-2 lg:col-span-2 row-span-2" // Massive Hero
      case 1: return "col-span-1 md:col-span-1 lg:col-span-1 row-span-1" // Standard
      case 2: return "col-span-1 md:col-span-1 lg:col-span-1 row-span-1" // Standard
      case 3: return "col-span-1 md:col-span-2 lg:col-span-2 row-span-1" // Wide horizontal
      case 4: return "col-span-1 md:col-span-1 lg:col-span-1 row-span-2" // Tall vertical
      case 5: return "col-span-1 md:col-span-1 lg:col-span-1 row-span-1" // Standard
      default: return "col-span-1 row-span-1"
    }
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-transparent">
      <div className="content-width">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 section-header">Projects</h2>
          <p className="text-text-secondary text-lg">Technical showcases built with Unreal Engine 5</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[320px]">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: index * 0.1 }}
              className={getBentoClass(index)}
            >
              <SpotlightCard className="h-full flex flex-col p-0 group border-surface/50 overflow-hidden bg-surface/30">
                <div className="relative aspect-video bg-black border-b border-surface">
                  {project.thumbnail ? (
                    <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  ) : (
                    <img src={`https://picsum.photos/seed/${project.id}/800/600`} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 sepia-[.3] hue-rotate-[-30deg]" loading="lazy" />
                  )}

                  {project.hoverVideo && (
                    <video className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300" src={project.hoverVideo} muted loop playsInline />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col pointer-events-none">
                  <div className="flex items-start gap-4 mb-6">
                    <motion.span className="text-xs font-mono px-2 py-1 rounded bg-accent/10 text-accent" whileHover={{ scale: 1.08 }} transition={{ type: 'spring', stiffness: 300 }}>
                      GAME
                    </motion.span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                      <p className="text-sm text-text-secondary">UE {project.engine} | {project.duration} | {project.role}</p>
                    </div>
                  </div>

                  <div className="hidden lg:block mb-4 flex-1">
                    <p className="text-xs font-mono text-accent mb-2 uppercase tracking-wider">Systems</p>
                    <div className="flex flex-wrap gap-2">
                      {project.systems?.slice(0, 3).map((system, i) => (
                        <span key={i} className="text-xs bg-black/50 border border-white/10 px-2 py-1 rounded text-text-secondary blur-none">
                          {system}
                        </span>
                      ))}
                      {project.systems?.length > 3 && (
                         <span className="text-xs bg-black/50 border border-white/10 px-2 py-1 rounded text-text-secondary blur-none">+{project.systems.length - 3}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-white/10 text-sm font-medium font-mono pointer-events-auto backdrop-blur-sm bg-black/40 p-2 rounded-lg w-max">
                    <button onClick={() => setSelectedProject(project)} className="flex items-center gap-2 text-accent hover:text-accent-light transition-colors">
                      <span>{'>'}</span> Demo
                    </button>
                    <button onClick={() => setSelectedProject(project)} className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors">
                      <span>{'</>'}</span> Code
                    </button>
                    <button onClick={() => setSelectedProject(project)} className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors">
                      <span>#</span> Metrics
                    </button>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  )
}
