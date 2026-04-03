import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const tabs = [
  { id: 'video', label: 'GAMEPLAY VIDEO' },
  { id: 'code', label: 'CODE SAMPLES' },
  { id: 'architecture', label: 'ARCHITECTURE' },
  { id: 'metrics', label: 'METRICS & PROFILING' },
]

export default function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('video')
  const [expandedCode, setExpandedCode] = useState(null)
  const modalRef = useRef(null)

  // Highlight code when tab changes
  useEffect(() => {
    if (activeTab === 'code') {
      // Dynamically import Prism to ensure proper loading order
      import('prismjs').then((Prism) => {
        // Load language components
        import('prismjs/components/prism-cpp')
        import('prismjs/components/prism-python')
        import('prismjs/components/prism-c')
        import('prismjs/components/prism-hlsl')
        import('prismjs/components/prism-glsl').then(() => {
          // Small delay to ensure DOM is ready
          setTimeout(() => {
            Prism.highlightAll()
          }, 50)
        })
      })
    }
  }, [activeTab, expandedCode])

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const toggleCodeAccordion = (index) => {
    setExpandedCode(expandedCode === index ? null : index)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-7xl h-[90vh] bg-surface border border-accent/30 rounded-lg overflow-hidden shadow-glow-accent"
          onClick={(e) => e.stopPropagation()}
          ref={modalRef}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-surface">
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            <div className="flex items-center gap-4">
              {/* Tab navigation */}
              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-sm font-mono transition-all border ${
                      activeTab === tab.id
                        ? 'bg-accent text-black border-accent'
                        : 'text-text-secondary border-surface hover:border-accent hover:text-accent'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              {/* Close button */}
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 rounded transition-all"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="h-[calc(90vh-88px)] overflow-y-auto p-6">
            {/* Tab: Video */}
            {activeTab === 'video' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col"
              >
                <div className="flex-1 bg-black rounded-lg overflow-hidden">
                  <iframe
                    className="w-full h-full border-0"
                    src={project.demoVideo || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
                    title="Gameplay Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="mt-4 text-sm text-text-secondary text-center">
                  Closed captions available
                </p>
              </motion.div>
            )}

            {/* Tab: Code */}
            {activeTab === 'code' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {project.codeSamples?.length > 0 ? (
                  project.codeSamples.map((sample, index) => (
                    <div key={index} className="glass-card overflow-hidden">
                      {/* Accordion header */}
                      <button
                        onClick={() => toggleCodeAccordion(index)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-surface/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-accent font-mono text-lg">
                            {expandedCode === index ? '▼' : '▶'}
                          </span>
                          <div>
                            <h4 className="text-white font-semibold font-mono">
                              {sample.fileName}
                            </h4>
                            <p className="text-xs text-text-secondary">
                              {sample.language} • {sample.lines} lines
                            </p>
                          </div>
                        </div>
                        {sample.blueprintEquivalent && (
                          <button
                            onClick={(e) => { e.stopPropagation(); /* toggle blueprint */ }}
                            className="text-xs text-accent hover:underline font-mono"
                          >
                            ⇅ Show Blueprint
                          </button>
                        )}
                      </button>

                      {/* Accordion content */}
                      {expandedCode === index && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4">
                            <pre className="!bg-black/50 !border !border-accent/20 !p-4 !m-0">
                              <code className={`language-${sample.language}`}>
                                {sample.code}
                              </code>
                            </pre>
                            {sample.explanation && (
                              <p className="mt-4 text-sm text-text-secondary leading-relaxed">
                                <span className="text-accent font-mono">Why this approach:</span>{' '}
                                {sample.explanation}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 text-text-secondary">
                    No code samples available for this project.
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab: Architecture */}
            {activeTab === 'architecture' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {project.diagrams?.length > 0 ? (
                  project.diagrams.map((diagram, index) => (
                    <div key={index} className="glass-card p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white">{diagram.title}</h4>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 text-xs text-accent border border-accent/30 rounded hover:bg-accent/10 transition-colors font-mono">
                            ↓ SVG
                          </button>
                          <button className="px-3 py-1 text-xs text-text-secondary border border-surface rounded hover:border-accent/30 hover:text-accent transition-colors font-mono">
                            ↓ PNG
                          </button>
                        </div>
                      </div>
                      <div className="bg-black/50 p-4 rounded border border-surface flex items-center justify-center">
                        <img
                          src={diagram.url}
                          alt={diagram.title}
                          className="max-w-full h-auto"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 text-text-secondary">
                    Architecture diagrams coming soon.
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab: Metrics */}
            {activeTab === 'metrics' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {project.metrics ? (
                  <>
                    {/* Before/After comparison */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="glass-card p-6 space-y-4">
                        <h4 className="text-lg font-semibold text-red-400 font-mono">BEFORE</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-text-secondary">FPS</span>
                            <span className="text-2xl font-bold text-red-400">{project.metrics.fpsBefore}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-text-secondary">Draw Calls</span>
                            <span className="text-xl font-semibold text-red-400">{project.metrics.drawCallsBefore?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-text-secondary">Memory</span>
                            <span className="text-xl font-semibold text-red-400">{project.metrics.memoryBeforeMB} MB</span>
                          </div>
                        </div>
                        {project.metrics.beforeScreenshot && (
                          <img
                            src={project.metrics.beforeScreenshot}
                            alt="Before optimization"
                            className="w-full mt-4 border border-surface rounded"
                          />
                        )}
                      </div>

                      <div className="glass-card p-6 space-y-4 border-accent/30">
                        <h4 className="text-lg font-semibold text-emerald-400 font-mono">AFTER</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-text-secondary">FPS</span>
                            <span className="text-2xl font-bold text-emerald-400">{project.metrics.fpsAfter}</span>
                            <span className="text-sm text-emerald-500 font-mono">
                              +{Math.round((project.metrics.fpsAfter - project.metrics.fpsBefore) / project.metrics.fpsBefore * 100)}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-text-secondary">Draw Calls</span>
                            <span className="text-xl font-semibold text-emerald-400">{project.metrics.drawCallsAfter?.toLocaleString()}</span>
                            <span className="text-sm text-emerald-500 font-mono">
                              -{Math.round((project.metrics.drawCallsBefore - project.metrics.drawCallsAfter) / project.metrics.drawCallsBefore * 100)}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-text-secondary">Memory</span>
                            <span className="text-xl font-semibold text-emerald-400">{project.metrics.memoryAfterMB} MB</span>
                            <span className="text-sm text-emerald-500 font-mono">
                              -{Math.round((project.metrics.memoryBeforeMB - project.metrics.memoryAfterMB) / project.metrics.memoryBeforeMB * 100)}%
                            </span>
                          </div>
                        </div>
                        {project.metrics.afterScreenshot && (
                          <img
                            src={project.metrics.afterScreenshot}
                            alt="After optimization"
                            className="w-full mt-4 border border-accent/30 rounded"
                          />
                        )}
                      </div>
                    </div>

                    {/* Changes made */}
                    {project.optimizations && (
                      <div className="glass-card p-6">
                        <h4 className="text-lg font-semibold text-white mb-4">Optimizations Applied</h4>
                        <ul className="space-y-2">
                          {project.optimizations.map((opt, i) => (
                            <li key={i} className="flex items-start gap-3 text-text-secondary">
                              <span className="text-accent mt-0.5">→</span>
                              <span>{opt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-20 text-text-secondary">
                    No metrics data available for this project.
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
