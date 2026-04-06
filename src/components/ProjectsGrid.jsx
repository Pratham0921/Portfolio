import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectModal from './ProjectModal'
import projectsData from '../data/projects.json'

export default function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-transparent">
      <div className="content-width">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 section-header">Projects</h2>
          <div className="w-20 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] mb-4" />
          <p className="text-text-secondary text-lg">Technical showcases built with Unreal Engine 5</p>
        </motion.div>

        {/* 2-Column Grid for optimal space/density ratio (No messy collage, but not overly massive) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
          {projectsData.map((project, index) => {
            return (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
                className="flex flex-col group h-full"
              >
                {/* Generous Image Container (Cinematic Aspect Ratio) */}
                <div className="w-full aspect-[16/9] relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] mb-8">
                  {project.thumbnail ? (
                    <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  ) : (
                    <img src={`https://picsum.photos/seed/${project.id}/1600/900`} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60" loading="lazy" />
                  )}

                  {project.hoverVideo && (
                    <video className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" src={project.hoverVideo} muted loop playsInline />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-5 left-6 right-6 flex justify-between items-end">
                    <span className="text-white/60 font-mono text-xs tracking-[0.2em] uppercase block">
                      Project // 0{index + 1}
                    </span>
                    <button onClick={() => setSelectedProject(project)} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white bg-black/40 backdrop-blur hover:bg-white hover:text-black transition-all">
                      {'>'}
                    </button>
                  </div>
                </div>

                {/* Text Content Area (Bottom) */}
                <div className="flex flex-col flex-1">
                  <div className="mb-6 flex justify-between items-start gap-4">
                    <h3 className="text-3xl font-bold text-white tracking-tight leading-tight">{project.title}</h3>
                    <div className="flex flex-col items-end gap-1 font-mono text-[10px] text-text-secondary whitespace-nowrap">
                      <span className="bg-white/10 text-white px-2 py-1 rounded">UE {project.engine}</span>
                      <span>{project.role}</span>
                    </div>
                  </div>

                  <div className="mb-8 flex-1">
                    <p className="text-accent font-mono text-xs uppercase tracking-widest mb-3">Core Architecture</p>
                    <ul className="space-y-2">
                      {project.systems?.slice(0, 3).map((system, i) => (
                        <li key={i} className="flex items-start gap-3 text-text-secondary text-sm">
                          <span className="text-white/30 font-mono mt-0.5">{'>'}</span>
                          <span className="leading-relaxed truncate">{system}</span>
                        </li>
                      ))}
                      {project.systems?.length > 3 && (
                         <li className="flex items-start gap-3 text-white/40 text-sm italic">
                           <span className="text-transparent font-mono mt-0.5">{'>'}</span>
                           <span className="leading-relaxed">+{project.systems.length - 3} more systems...</span>
                         </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex items-center gap-6 pt-5 border-t border-white/10 mt-auto">
                    <button onClick={() => setSelectedProject(project)} className="text-white text-sm font-mono hover:text-accent transition-colors flex items-center gap-2 group/btn font-bold">
                      <span className="border border-white/20 px-2 py-1 rounded group-hover/btn:border-accent">VIEW</span> Case Study
                    </button>
                    {project.code && (
                      <a href={project.code} target="_blank" rel="noopener noreferrer" className="text-text-muted text-sm font-mono hover:text-white transition-colors ml-auto">
                        [ GitHub ]
                      </a>
                    )}
                  </div>
                </div>

              </motion.div>
            )
          })}
        </div>

      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  )
}
