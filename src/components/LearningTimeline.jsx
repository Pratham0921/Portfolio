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
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' })

    itemRefs.current.forEach((ref) => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="journey" className="py-32 relative overflow-hidden bg-transparent">
      <div className="content-width flex flex-col lg:flex-row gap-16 relative">
        
        {/* Sticky Left Column: Cinematic Header */}
        <div className="lg:w-1/3 relative">
          <div className="sticky top-32">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                Architectural <br className="hidden lg:block" />
                Evolution
              </h2>
              <div className="w-20 h-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] mb-8" />
              <p className="text-text-secondary text-lg leading-relaxed max-w-sm">
                A chronolgy of technical growth. Transitioning from visual scripting fundamentals entirely into deep engine architecture and high-performance C++ systems.
              </p>
                
              <div className="mt-12 hidden lg:flex flex-col gap-4 text-sm font-mono text-white/30 border-l border-white/10 pl-4">
                <span>[ SCROLL TO EXPLORE ]</span>
                <span className="text-white/60">{'|'}</span>
                <span className="text-white/40">{'v'}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scrolling Right Column: Event Narrative */}
        <div className="lg:w-2/3 flex flex-col gap-20">
          {timelineData.map((entry, index) => {
            const isVisible = visibleItems.has(entry.id)
            const isCurrent = entry.isCurrent

            return (
              <motion.div 
                key={entry.id}
                ref={(el) => { itemRefs.current[index] = el }} 
                data-id={entry.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative p-8 md:p-10 rounded-2xl border transition-all duration-700
                  ${isCurrent 
                    ? 'bg-white/5 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
                    : 'bg-transparent border-white/5 hover:border-white/10 hover:bg-black/20'
                  }`}
              >
                {/* Event Header row */}
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 gap-4 border-b border-white/5 pb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{entry.title}</h3>
                  <div className="flex items-center gap-4 border border-white/10 rounded-full px-4 py-1.5 bg-black/40 w-fit">
                    {isCurrent && <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)] animate-pulse" />}
                    <time className="text-white/70 font-mono text-sm tracking-widest">{entry.date}</time>
                  </div>
                </div>

                {/* Sub-Bullets replacing generic list */}
                <div className="flex flex-col gap-6">
                  {entry.bullets.map((bullet, i) => (
                    <div key={i} className="flex gap-4 items-start group">
                      <div className="w-6 text-white/30 font-mono text-sm pt-0.5 group-hover:text-white transition-colors">{(i + 1).toString().padStart(2, '0')}</div>
                      <div className="flex-1 text-text-secondary leading-relaxed group-hover:text-white/90 transition-colors">
                        {bullet}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Resources / Links */}
                {entry.attachments && entry.attachments.length > 0 && (
                  <div className="mt-10 pt-6 border-t border-white/5 flex flex-wrap gap-4">
                    {entry.attachments.map((att, i) => (
                      <a 
                        key={i} 
                        href={att.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group flex items-center justify-between px-5 py-3 bg-black/50 border border-white/10 rounded-lg hover:border-white/40 hover:bg-white/5 transition-all text-sm font-mono flex-1 min-w-[200px]"
                      >
                        <span className="text-white/80 group-hover:text-white">{att.label}</span>
                        <span className="text-white/40 group-hover:text-white transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
