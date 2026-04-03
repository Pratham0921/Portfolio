import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import caseStudiesData from '../data/case-studies.json'

export default function CaseStudies() {
  const [expandedId, setExpandedId] = useState(null)

  const toggleCase = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="case-studies" className="py-24 relative bg-surface/30 overflow-hidden">
      <div className="content-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 section-header">
            Problem → Solution
          </h2>
          <p className="text-text-secondary text-lg">
            Real challenges I've solved in production
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {caseStudiesData.map((study, index) => {
            const isExpanded = expandedId === study.id

            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="glass-card overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => toggleCase(study.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-surface/50 transition-all"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <motion.span
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      className="text-accent text-xl mt-1 flex-shrink-0"
                    >
                      ▶
                    </motion.span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {study.title}
                      </h3>
                      <p className="text-sm text-accent font-mono mb-2">
                        {study.subtitle}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {study.context}
                      </p>
                    </div>
                  </div>
                  {study.severity && (
                    <span className={`px-3 py-1 text-xs font-mono rounded-full border ${
                      study.severity === 'High' || study.severity === 'Critical'
                        ? 'text-red-400 border-red-500/30 bg-red-500/10'
                        : 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                    }`}>
                      {study.severity}
                    </span>
                  )}
                </button>

                {/* Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        {/* Problem */}
                        <div className="mb-6">
                          <h4 className="text-sm font-mono text-red-400 mb-2 uppercase tracking-wider">
                            Problem
                          </h4>
                          <ul className="space-y-2">
                            {study.problem.map((p, i) => (
                              <li key={i} className="flex items-start gap-3 text-text-secondary text-sm">
                                <span className="text-red-400 mt-0.5">•</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Solution */}
                        <div className="mb-6">
                          <h4 className="text-sm font-mono text-emerald-400 mb-2 uppercase tracking-wider">
                            Solution
                          </h4>
                          <ul className="space-y-2">
                            {study.solution.map((s, i) => (
                              <li key={i} className="flex items-start gap-3 text-text-secondary text-sm">
                                <span className="text-emerald-400 mt-0.5">•</span>
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Code involved */}
                        {study.code && (
                          <div className="mb-6 p-4 bg-black/50 rounded border border-surface">
                            <h4 className="text-xs font-mono text-accent mb-2 uppercase tracking-wider">
                              Code Involved
                            </h4>
                            <code className="text-sm font-mono text-white block break-all">
                              {study.code}
                            </code>
                          </div>
                        )}

                        {/* Impact */}
                        <div className="mb-6">
                          <h4 className="text-sm font-mono text-accent mb-2 uppercase tracking-wider">
                            Impact
                          </h4>
                          <ul className="space-y-2">
                            {study.impact.map((imp, i) => (
                              <li key={i} className="flex items-start gap-3 text-accent text-sm font-mono">
                                <span className="text-accent mt-0.5">✓</span>
                                <span>{imp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Video comparison */}
                        {study.video && (
                          <div className="mt-4">
                            <a
                              href={study.video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-light font-mono"
                            >
                              <span>▶</span> Watch 15s comparison video
                            </a>
                          </div>
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
