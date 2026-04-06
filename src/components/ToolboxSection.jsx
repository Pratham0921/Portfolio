import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toolboxData from '../data/toolbox.json'

export default function ToolboxSection() {
  const [expandedAll, setExpandedAll] = useState(false)
  const [expandedItems, setExpandedItems] = useState(new Set())

  const toggleItem = (id) => {
    const next = new Set(expandedItems)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setExpandedItems(next)
  }

  const toggleExpandAll = () => {
    if (expandedAll || expandedItems.size === toolboxData.length) {
      setExpandedItems(new Set())
    } else {
      setExpandedItems(new Set(toolboxData.map(item => item.id)))
    }
    setExpandedAll(!expandedAll)
  }

  const getMastery = (mastery) => {
    switch (mastery) {
      case 'mastered': return { icon: 'OK', color: 'text-emerald-400', label: 'Mastered' }
      case 'learning': return { icon: 'UP', color: 'text-amber-400', label: 'Learning' }
      case 'not-started': return { icon: 'NEW', color: 'text-slate-500', label: 'Not Started' }
      case 'planned': return { icon: 'SOON', color: 'text-accent', label: 'Planned' }
      default: return { icon: '?', color: 'text-slate-500', label: 'Unknown' }
    }
  }

  return (
    <section id="toolbox" className="py-24 relative bg-background overflow-hidden">
      <div className="content-width">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 section-header">Core Toolbox</h2>
          <p className="text-text-secondary text-lg">Technologies and gameplay systems I can ship with confidence</p>
        </motion.div>

        <div className="flex justify-end mb-6">
          <button onClick={toggleExpandAll} className="text-sm text-accent hover:text-accent-light font-mono transition-colors">
            {expandedAll ? 'Collapse All' : 'Expand All'}
          </button>
        </div>

        <div className="space-y-4">
          {toolboxData.map((item, index) => {
            const mastery = getMastery(item.mastery)
            const isExpanded = expandedItems.has(item.id)

            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <div className="glass-card overflow-hidden">
                  <button onClick={() => toggleItem(item.id)} className="w-full flex items-center justify-between p-6 text-left hover:bg-surface/50 transition-all">
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-3xl font-mono text-accent">{item.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-white">{item.system}</h3>
                          <span className={`px-2 py-0.5 text-xs font-mono rounded ${mastery.color} bg-current/10`}>
                            {mastery.icon} {mastery.label}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary">{item.description}</p>
                      </div>
                    </div>
                    <motion.span animate={{ rotate: isExpanded ? 90 : 0 }} className="text-accent text-xl">{'>'}</motion.span>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="px-6 pb-6 pt-0 border-t border-surface pt-4">
                          <h4 className="text-sm font-mono text-accent mb-3 uppercase tracking-wider">What I Can Do</h4>
                          <ul className="space-y-2">
                            {item.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-3 text-text-secondary text-sm">
                                <span className="text-accent mt-0.5">+</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
