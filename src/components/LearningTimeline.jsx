import { motion } from 'framer-motion'
import timelineData from '../data/timeline.json'

export default function LearningTimeline() {
  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-transparent">
      <div className="content-width">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Timeline</h2>
          <div className="w-20 h-1 bg-white mx-auto shadow-[0_0_10px_rgba(255,255,255,0.8)] mb-6" />
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A month-by-month breakdown of engine systems progression.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 md:-translate-x-1/2" />

          {/* Timeline Events */}
          <div className="space-y-16 md:space-y-24">
            {timelineData.map((entry, index) => {
              const isEven = index % 2 === 0
              
              // Formatting the date nicely if it's month-year
              const [month, year] = entry.date.split(' ') || [entry.date, '']

              return (
                <motion.div 
                  key={entry.id} 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} gap-8 md:gap-0`}
                >
                  
                  {/* Center Node (Month Marker) */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 mt-1 md:mt-0 z-10 hidden sm:flex flex-col items-center">
                     <div className="w-20 h-20 rounded-full bg-black border-[4px] border-surface flex flex-col items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)] text-center p-2">
                        <span className="text-[10px] font-mono text-white/50 uppercase leading-none">{month}</span>
                        <span className="text-sm font-bold text-white font-mono mt-1 leading-none">{year}</span>
                     </div>
                  </div>

                  {/* Empty space for alternative side */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Card */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 rel-wrap">
                    <div className={`
                      bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-[0_5px_20px_rgba(0,0,0,0.3)]
                      ${isEven ? 'md:ml-16' : 'md:mr-16'}
                      relative
                    `}>
                      {/* Mobile Date Header */}
                      <div className="sm:hidden mb-4 border-b border-white/10 pb-3">
                         <span className="text-accent font-mono text-xs uppercase tracking-widest">{entry.date}</span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-6 leading-tight">{entry.title}</h3>
                      
                      <div className="space-y-4">
                        {entry.bullets.map((bullet, i) => (
                          <div key={i} className="flex gap-3 items-start">
                            <span className="text-white/20 font-mono text-sm mt-0.5">{`0${i + 1}`}</span>
                            <span className="text-text-secondary text-sm leading-relaxed">{bullet}</span>
                          </div>
                        ))}
                      </div>

                      {entry.attachments && entry.attachments.length > 0 && (
                         <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-3">
                            {entry.attachments.map((att, i) => (
                               <a 
                                  key={i} 
                                  href={att.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="px-4 py-2 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 rounded text-xs font-mono transition-colors"
                               >
                                  {att.label}
                               </a>
                            ))}
                         </div>
                      )}

                    </div>
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
