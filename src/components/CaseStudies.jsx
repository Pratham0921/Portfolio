import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import caseStudiesData from '../data/case-studies.json'

export default function CaseStudies() {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <section id="case-studies" className="py-24 relative bg-surface/30 overflow-hidden">
      <div className="content-width">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 section-header">Problem to Solution</h2>
          <p className="text-text-secondary text-lg">Real challenges solved with production-minded implementation</p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {caseStudiesData.map((study, index) => {
            const isExpanded = expandedId === study.id

            return (
              <motion.div key={study.id} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card overflow-hidden">
                <button onClick={() => setExpandedId(isExpanded ? null : study.id)} className="w-full flex items-center justify-between p-6 text-left hover:bg-surface/50 transition-all">
                  <div className="flex items-start gap-4 flex-1">
                    <motion.span animate={{ rotate: isExpanded ? 90 : 0 }} className="text-accent text-xl mt-1 flex-shrink-0">{'>'}</motion.span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{study.title}</h3>
                      <p className="text-sm text-accent font-mono mb-2">{study.subtitle}</p>
                      <p className="text-sm text-text-secondary">{study.context}</p>
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                      <div className="px-6 pb-6">
                        <div className="mb-6">
                          <h4 className="text-sm font-mono text-red-400 mb-2 uppercase tracking-wider">Problem</h4>
                          <ul className="space-y-2">
                            {study.problem.map((p, i) => (
                              <li key={i} className="flex items-start gap-3 text-text-secondary text-sm"><span className="text-red-400 mt-0.5">-</span><span>{p}</span></li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-sm font-mono text-emerald-400 mb-2 uppercase tracking-wider">Solution</h4>
                          <ul className="space-y-2">
                            {study.solution.map((s, i) => (
                              <li key={i} className="flex items-start gap-3 text-text-secondary text-sm"><span className="text-emerald-400 mt-0.5">+</span><span>{s}</span></li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-sm font-mono text-accent mb-2 uppercase tracking-wider">Impact</h4>
                          <ul className="space-y-2">
                            {study.impact.map((imp, i) => (
                              <li key={i} className="flex items-start gap-3 text-accent text-sm font-mono"><span className="text-accent mt-0.5">OK</span><span>{imp}</span></li>
                            ))}
                          </ul>
                        </div>

                        {study.video && (
                          <a href={study.video} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-light font-mono">
                            {'>'} Watch 15s comparison
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
