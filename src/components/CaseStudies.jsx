import { motion } from 'framer-motion'
import caseStudiesData from '../data/case-studies.json'

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-32 relative overflow-hidden bg-transparent">
      <div className="content-width">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 pb-2 tracking-tight">System Architecture</h2>
          <div className="w-20 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] mb-4" />
          <p className="text-text-secondary text-lg mt-2 font-mono text-sm tracking-widest uppercase">Hover to analyze implementation data</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-[2000px]">
          {caseStudiesData.map((study, index) => (
            <motion.div 
              key={study.id}
              initial={{ opacity: 0, z: -100, rotateX: 10 }}
              whileInView={{ opacity: 1, z: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
              className="relative w-full h-[500px] group cursor-default"
              style={{ perspective: "2000px" }}
            >
              <div 
                className="w-full h-full transition-all duration-700 relative preserve-3d group-hover:[transform:rotateY(180deg)]" 
                style={{ transformStyle: "preserve-3d" }}
              >
                
                {/* FRONT FACE (Minimal Identity) */}
                <div 
                  className="absolute inset-0 w-full h-full bg-black/40 border border-white/5 backdrop-blur-sm rounded-xl p-8 flex flex-col justify-between overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] backface-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="absolute top-0 right-0 p-6 text-white/5 font-mono text-9xl font-bold font-black pointer-events-none -mt-4 -mr-4">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-mono mb-6 backdrop-blur">
                      <span>DAT</span>
                    </div>
                    <span className="text-accent font-mono text-xs uppercase tracking-widest mb-2 block">{study.subtitle}</span>
                    <h3 className="text-2xl font-bold text-white leading-tight">{study.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-text-muted font-mono text-sm group-hover:text-white transition-colors">
                    <span className="animate-pulse">_</span>
                    <span>Hold to Inspect</span>
                  </div>
                </div>

                {/* BACK FACE (Data Analysis) */}
                <div 
                  className="absolute inset-0 w-full h-full bg-white/5 border border-white/20 backdrop-blur-md rounded-xl p-6 flex flex-col overflow-y-auto custom-scrollbar shadow-[0_0_50px_rgba(255,255,255,0.05)] backface-hidden [transform:rotateY(180deg)]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                    <h4 className="font-mono text-xs text-white/50 uppercase tracking-widest">Analysis</h4>
                    <span className="bg-white text-black px-2 py-0.5 rounded text-xs font-bold font-mono">SYS_OK</span>
                  </div>

                  <div className="space-y-6 flex-1">
                    {/* Problem */}
                    <div>
                      <h5 className="text-xs font-mono text-white/40 mb-2">// Critical Flaws</h5>
                      <ul className="space-y-1">
                        {study.problem.map((p, i) => (
                          <li key={i} className="text-sm text-text-secondary flex gap-2">
                            <span className="text-red-400">×</span> <span className="line-clamp-2">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Solution */}
                    <div>
                      <h5 className="text-xs font-mono text-white/40 mb-2">// Implemented Logic</h5>
                      <ul className="space-y-1">
                        {study.solution.map((s, i) => (
                          <li key={i} className="text-sm text-white/90 flex gap-2">
                            <span className="text-accent">+</span> <span className="line-clamp-3">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Impact */}
                    <div>
                      <h5 className="text-xs font-mono text-white/40 mb-2">// Performance Delta</h5>
                      <div className="flex flex-wrap gap-2">
                        {study.impact.map((imp, i) => (
                          <div key={i} className="px-2 py-1 bg-black/50 border border-white/10 rounded font-mono text-xs text-white truncate max-w-full">
                            {imp}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {study.video && (
                    <a href={study.video} target="_blank" rel="noopener noreferrer" className="mt-6 pt-4 border-t border-white/10 text-center font-mono text-sm text-white hover:text-accent transition-colors block font-bold">
                      [ EXECUTE_VIDEO ]
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
