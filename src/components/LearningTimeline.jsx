import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import timelineData from '../data/timeline.json'

export default function LearningTimeline() {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef([])

  useEffect(() => {
    // Detect which timeline element occupies the middle of the screen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveIndex(Number(entry.target.dataset.index))
        }
      })
    }, { threshold: 0.3, rootMargin: '-20% 0px -40% 0px' })

    itemRefs.current.forEach((ref) => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  const activeEntry = timelineData[activeIndex] || timelineData[0]

  return (
    <section id="journey" className="py-32 relative overflow-hidden bg-transparent">
      <div className="content-width">
        {/* Top Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            Architectural Evolution
          </h2>
          <div className="w-20 h-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] mb-8" />
          <p className="text-text-secondary text-lg leading-relaxed max-w-sm">
            Scroll to trace the timeline of systems engineering mastery.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 relative">
          
          {/* Dynamic Sticky Left Canvas */}
          <div className="hidden lg:block w-1/2 relative h-full">
            <div className="sticky top-1/4 h-[50vh] flex flex-col justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeEntry.id}
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  {/* Massive background number */}
                  <div className="text-[250px] xl:text-[300px] font-black font-mono text-white/[0.03] leading-none tracking-tighter absolute -left-10 -top-20 pointer-events-none select-none">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Dynamic Focus Content */}
                  <div className="relative z-10 border-l px-8 border-white/20 ml-4 py-4 backdrop-blur-[2px]">
                    <div className="absolute left-[-2px] tracking-tight top-0 w-[3px] h-10 bg-white shadow-[0_0_15px_rgba(255,255,255,1)]" />
                    <span className="font-mono text-accent tracking-widest text-sm mb-4 block font-bold">{activeEntry.date}</span>
                    <h3 className="text-4xl xl:text-5xl font-bold tracking-tight text-white drop-shadow-xl">{activeEntry.title}</h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Scrolling Right Column: Event Narrative */}
          <div className="w-full lg:w-1/2 flex flex-col gap-32 py-10 lg:py-[20vh]">
            {timelineData.map((entry, index) => {
              const isActive = activeIndex === index

              return (
                <div 
                  key={entry.id}
                  ref={(el) => { itemRefs.current[index] = el }} 
                  data-index={index}
                  className={`transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-30 hover:opacity-70'}`}
                >
                  {/* Mobile-only header mapping since sticky canvas is hidden on mobile */}
                  <div className="lg:hidden mb-6 border-l-2 border-white pl-4 py-1">
                     <span className="font-mono text-accent text-xs tracking-widest mb-1 block">{entry.date}</span>
                     <h3 className="text-2xl font-bold text-white">{entry.title}</h3>
                  </div>

                  {/* Sub-Bullets replacing generic list */}
                  <div className="flex flex-col gap-8 bg-black/40 p-8 rounded-2xl border border-white/5 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    {entry.bullets.map((bullet, i) => (
                      <div key={i} className="flex gap-4 items-start group">
                        <div className="w-8 h-8 flex-shrink-0 border border-white/10 bg-white/5 rounded-full flex items-center justify-center font-mono text-xs text-white/50 group-hover:text-white group-hover:bg-white/10 transition-colors shadow-sm">
                          {i + 1}
                        </div>
                        <div className="flex-1 text-text-secondary leading-relaxed pt-1 group-hover:text-white transition-colors">
                          {bullet}
                        </div>
                      </div>
                    ))}

                    {/* Resources / Links */}
                    {entry.attachments && entry.attachments.length > 0 && (
                      <div className="pt-8 border-t border-white/10 flex flex-wrap gap-4 mt-2">
                        {entry.attachments.map((att, i) => (
                          <a 
                            key={i} 
                            href={att.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-2 group text-sm font-mono"
                          >
                            <span className="w-6 h-6 flex items-center justify-center bg-white/5 border border-white/20 rounded text-text-muted group-hover:bg-white group-hover:text-black transition-all">↗</span>
                            <span className="text-white/60 group-hover:text-white transition-colors">{att.label}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
