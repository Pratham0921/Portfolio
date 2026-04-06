import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import caseStudiesData from '../data/case-studies.json'

export default function CaseStudies() {
  const [activeStudyId, setActiveStudyId] = useState(caseStudiesData[0]?.id)
  const activeStudy = caseStudiesData.find(s => s.id === activeStudyId)

  return (
    <section id="case-studies" className="py-32 relative overflow-hidden bg-transparent">
      <div className="content-width">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 pb-2 tracking-tight">System Architecture</h2>
          <div className="w-20 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] mb-4" />
          <p className="text-text-secondary text-lg mt-2">Deep dive into complex technical roadblocks and structural solutions.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[600px]">
          
          {/* Left Column: Selection List */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="w-full lg:w-1/3 flex flex-col gap-2"
          >
            {caseStudiesData.map((study) => {
              const isActive = study.id === activeStudyId
              return (
                <button
                  key={study.id}
                  onClick={() => setActiveStudyId(study.id)}
                  className={`text-left p-5 rounded-lg border transition-all duration-300 relative overflow-hidden flex flex-col gap-1
                    ${isActive 
                      ? 'bg-white/10 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]' 
                      : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10 text-text-muted'
                    }`}
                >
                  {isActive && <motion.div layoutId="case-study-active" className="absolute left-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />}
                  <span className={`font-mono text-xs font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-white' : 'text-text-muted'}`}>{study.subtitle}</span>
                  <span className={`text-lg font-bold transition-colors ${isActive ? 'text-white' : 'text-text-secondary'}`}>{study.title}</span>
                </button>
              )
            })}
          </motion.div>

          {/* Right Column: Terminal Display */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="w-full lg:w-2/3 bg-black/50 border border-white/10 rounded-xl shadow-[0_10px_50px_rgba(0,0,0,0.5)] backdrop-blur-md overflow-hidden flex flex-col relative"
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-6 py-4 bg-surface-light/50 border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
              <span className="ml-4 font-mono text-xs text-text-muted">analysis_view // {activeStudy?.id}.log</span>
            </div>

            <AnimatePresence mode="wait">
              {activeStudy && (
                <motion.div 
                  key={activeStudy.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar flex flex-col gap-8"
                >
                  {/* Context Header */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{activeStudy.title}</h3>
                    <p className="text-text-secondary leading-relaxed border-l-2 border-white/20 pl-4">{activeStudy.context}</p>
                  </div>

                  {/* Split Display Data */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* The Problem */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono text-white/50 uppercase tracking-widest font-bold flex items-center gap-2 border-b border-white/10 pb-2">
                        <span className="text-white">{'[ 01 ]'}</span> Critical Issues
                      </h4>
                      <ul className="space-y-3">
                        {activeStudy.problem.map((p, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                            <span className="text-white/40 font-mono flex-shrink-0">{'>'}</span>
                            <span className="leading-relaxed">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* The Solution */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono text-white/50 uppercase tracking-widest font-bold flex items-center gap-2 border-b border-white/10 pb-2">
                        <span className="text-white">{'[ 02 ]'}</span> Implementation
                      </h4>
                      <ul className="space-y-3">
                        {activeStudy.solution.map((s, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                            <span className="text-white font-mono flex-shrink-0">{'*'}</span>
                            <span className="leading-relaxed">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Impact & Results Footer */}
                  <div className="mt-auto pt-6 border-t border-white/10">
                    <h4 className="text-xs font-mono text-white/50 uppercase tracking-widest font-bold mb-4">{'[ 03 ]'} Measurable Impact</h4>
                    <div className="flex flex-wrap gap-4">
                      {activeStudy.impact.map((imp, i) => (
                        <div key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded font-mono text-sm text-white/80">
                          {imp}
                        </div>
                      ))}
                    </div>
                  </div>

                  {activeStudy.video && (
                    <div className="mt-4">
                      <a href={activeStudy.video} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-mono text-sm font-bold rounded shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all">
                        {'>'} Run Video Demo
                      </a>
                    </div>
                  )}
                  
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
