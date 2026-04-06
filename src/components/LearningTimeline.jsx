import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import timelineData from '../data/timeline.json'

export default function LearningTimeline() {
  const [visibleItems, setVisibleItems] = useState(new Set())
  const itemRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.id
          setVisibleItems(prev => new Set(prev).add(id))
        }
      })
    }, { threshold: 0.2, rootMargin: '-50px' })

    itemRefs.current.forEach((ref) => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="journey" className="py-24 relative bg-background overflow-hidden">
      <div className="content-width">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 section-header">Learning Journey</h2>
          <p className="text-text-secondary text-lg">From Blueprint fundamentals to production-grade C++ systems work</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent" />

          <div className="space-y-12">
            {timelineData.map((entry, index) => {
              const isVisible = visibleItems.has(entry.id)
              const isCurrent = entry.isCurrent

              return (
                <motion.div key={entry.id} ref={(el) => { itemRefs.current[index] = el }} data-id={entry.id} initial={{ opacity: 0, x: -50 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }} className="relative pl-20 md:pl-28">
                  <div className="absolute left-4 md:left-8 top-2">
                    <motion.div initial={{ scale: 0 }} animate={isVisible ? { scale: 1 } : {}} transition={{ delay: 0.2, type: 'spring', stiffness: 300 }} className={`w-4 h-4 rounded-full border-4 border-background ${isCurrent ? 'bg-gradient-to-r from-accent to-accent-light shadow-glow-accent' : 'bg-surface'}`}>
                      {isCurrent && (
                        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 rounded-full bg-accent" style={{ transform: 'scale(0.5)', opacity: 0.3 }} />
                      )}
                    </motion.div>
                  </div>

                  <div className="glass-card p-6">
                    <time className="text-accent font-mono text-sm mb-2 block">{entry.date}</time>
                    <h3 className="text-xl font-bold text-white mb-4">{entry.title}</h3>

                    <ul className="space-y-3 mb-6">
                      {entry.bullets.map((bullet, i) => (
                        <motion.li key={i} initial={{ opacity: 0, x: -20 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.25 + i * 0.1 }} className="flex items-start gap-3 text-text-secondary text-sm">
                          <span className="text-accent mt-0.5">-</span>
                          <span>{bullet}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {entry.attachments && entry.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-3 pt-4 border-t border-surface">
                        {entry.attachments.map((att, i) => (
                          <a key={i} href={att.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-accent hover:text-accent-light font-mono transition-colors">
                            <span>Link</span>
                            <span>{att.label}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
