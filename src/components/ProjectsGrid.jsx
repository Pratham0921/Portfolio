import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectModal from './ProjectModal'
import projectsData from '../data/projects.json'
import SpotlightCard from './SpotlightCard'

export default function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState(null)
  const projects = projectsData

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-transparent">
      <div className="content-width">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 section-header">Projects</h2>
          <p className="text-text-secondary text-lg">Technical showcases built with Unreal Engine 5</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
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

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start gap-4 mb-6">
                    <motion.span className="text-xs font-mono px-2 py-1 rounded bg-accent/10 text-accent" whileHover={{ scale: 1.08 }} transition={{ type: 'spring', stiffness: 300 }}>
                      GAME
                    </motion.span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                      <p className="text-sm text-text-secondary">UE {project.engine} | {project.duration} | {project.role}</p>
                    </div>
                  </div>

                  <div className="mb-6 flex-1">
                    <p className="text-xs font-mono text-accent mb-3 uppercase tracking-wider">Key Systems</p>
                    <ul className="space-y-2">
                      {project.systems?.map((system, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                          <span className="text-accent">+</span>
                          {system}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-surface text-sm font-medium font-mono">
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
