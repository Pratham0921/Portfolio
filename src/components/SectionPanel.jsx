import { motion, AnimatePresence } from 'framer-motion'
import { portfolioData } from '../data/portfolio'

/* ── Projects panel ── */
function ProjectsPanel() {
  const { projects } = portfolioData
  return (
    <div>
      <h2 className="panel-title">🌲 Projects Vault</h2>
      <p className="panel-sub">Tomes of completed quests and creations.</p>
      <div className="grid grid-cols-1 gap-4 mt-5">
        {projects.map(p => (
          <div key={p.id} className="card group">
            <div className="flex items-start gap-3">
              <span className="text-3xl">{p.emoji}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm leading-snug text-[#3d1f0a]" style={{ fontFamily: 'Cinzel, serif' }}>{p.name}</h3>
                <p className="text-[#5a3a1a] text-xs mt-1 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.tech.map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <a href={p.github} target="_blank" rel="noreferrer" className="btn-ghost">🐙 GitHub</a>
              <a href={p.live}   target="_blank" rel="noreferrer" className="btn-primary">🚀 Demo</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── About panel ── */
function AboutPanel() {
  const { about, name, title } = portfolioData
  return (
    <div>
      <h2 className="panel-title">🏰 The Legend of {name}</h2>
      <div className="flex items-center gap-4 mt-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shrink-0 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #7a5230, #c8a96e)' }}>
          ⚔️
        </div>
        <div>
          <p className="font-semibold text-sm text-[#3d1f0a]" style={{ fontFamily: 'Cinzel, serif' }}>{name}</p>
          <p className="text-[#7a5230] text-xs" style={{ fontFamily: 'Cinzel, serif' }}>{title}</p>
        </div>
      </div>
      <p className="text-[#5a3a1a] text-xs leading-relaxed mt-4">{about.bio}</p>
      <p className="text-[#5a3a1a] text-xs leading-relaxed mt-2">{about.bio2}</p>

      <div className="mt-5 border border-[#7a5230]/30 rounded-xl p-4" style={{ background: 'rgba(122,82,48,0.08)' }}>
        <p className="text-xs font-bold mb-3 text-[#7a5230]" style={{ fontFamily: 'Cinzel, serif' }}>⚔️ CHARACTER SHEET</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
          {about.stats.map(s => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-[#9a7040] text-xs w-20 shrink-0">{s.label}:</span>
              <span className="text-[#3d1f0a] text-xs font-semibold">{s.value}</span>
            </div>
          ))}
        </div>
        <hr className="border-[#7a5230]/20 mb-3" />
        <p className="text-xs font-bold mb-2 text-[#7a5230]" style={{ fontFamily: 'Cinzel, serif' }}>ATTRIBUTES</p>
        {about.attributes.map(a => (
          <div key={a.name} className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#5a3a1a]">{a.name}</span>
              <span className="text-[#7a5230] font-semibold">{a.value}</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(122,82,48,0.15)' }}>
              <div className="skill-fill" style={{ '--w': `${a.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Experience panel ── */
function ExperiencePanel() {
  const { experience } = portfolioData
  const typeColor = { 'EPIC QUEST': '#c0392b', 'MAIN QUEST': '#7a5230', 'SIDE QUEST': '#5a7a30' }

  return (
    <div>
      <h2 className="panel-title">🍺 Quest Log</h2>
      <p className="panel-sub">A chronicle of tavern tales and great adventures.</p>
      <div className="mt-5 relative">
        <div className="absolute left-[9px] top-0 bottom-0 w-px" style={{ background: 'rgba(122,82,48,0.3)' }} />
        {experience.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            className="relative pl-8 pb-7"
          >
            <div className="absolute left-0 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: typeColor[e.type] || '#7a5230', background: '#f4e4b8' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: typeColor[e.type] || '#7a5230' }} />
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full border"
              style={{ color: typeColor[e.type], borderColor: `${typeColor[e.type]}40`, background: `${typeColor[e.type]}15`, fontFamily: 'Cinzel, serif', fontSize: '0.6rem' }}>
              {e.type}
            </span>
            <p className="text-sm font-semibold mt-1 text-[#3d1f0a]" style={{ fontFamily: 'Cinzel, serif' }}>{e.role}</p>
            <p className="text-[#7a5230] text-xs">{e.company}</p>
            <p className="text-[#9a7040] text-xs">{e.period}</p>
            <p className="text-[#5a3a1a] text-xs leading-relaxed mt-2">{e.description}</p>
            <ul className="mt-2 flex flex-col gap-1">
              {e.achievements.map((a, j) => (
                <li key={j} className="text-xs text-[#7a5230]">{a}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Skills panel ── */
function SkillsPanel() {
  const { skills } = portfolioData
  return (
    <div>
      <h2 className="panel-title">⛰️ Skill Summit</h2>
      <p className="panel-sub">Hard-earned abilities etched into stone.</p>
      <div className="mt-5 space-y-4">
        {skills.map((cat, ci) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.1 }}
            className="card"
          >
            <p className="text-xs font-bold mb-3 text-[#7a5230]" style={{ fontFamily: 'Cinzel, serif' }}>
              {cat.icon} {cat.category.toUpperCase()}
            </p>
            {cat.items.map(sk => (
              <div key={sk.name} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#5a3a1a]">{sk.name}</span>
                  <span className="text-[#7a5230] font-semibold">{sk.level}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(122,82,48,0.15)' }}>
                  <div className="skill-fill" style={{ '--w': `${sk.level}%` }} />
                </div>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Contact panel ── */
function ContactPanel() {
  const { contact } = portfolioData
  return (
    <div>
      <h2 className="panel-title">⚓ Starfall Harbor</h2>
      <p className="panel-sub">Send a raven. I reply within a day.</p>

      <div className="grid grid-cols-2 gap-3 mt-5">
        {contact.socials.map(s => (
          <a key={s.name} href={s.url} target="_blank" rel="noreferrer"
            className="card flex items-center gap-3 no-underline group">
            <span className="text-2xl">{s.icon}</span>
            <span className="text-sm text-[#5a3a1a] group-hover:text-[#3d1f0a] transition-colors">{s.name}</span>
          </a>
        ))}
      </div>

      <div className="mt-4 card">
        <p className="text-xs text-[#9a7040] mb-1">📬 Direct scroll</p>
        <p className="text-[#7a5230] text-sm font-semibold">{contact.email}</p>
      </div>

      <form className="mt-5 space-y-3"
        onSubmit={e => { e.preventDefault(); alert('Message sent! (placeholder)') }}>
        <div>
          <label className="text-xs text-[#9a7040] block mb-1" style={{ fontFamily: 'Cinzel, serif' }}>Your Name</label>
          <input type="text" placeholder="Sir Adventurer"
            className="w-full rounded-lg px-3 py-2 text-sm outline-none transition"
            style={{ background: 'rgba(122,82,48,0.1)', border: '1px solid rgba(122,82,48,0.3)', color: '#3d1f0a' }}
          />
        </div>
        <div>
          <label className="text-xs text-[#9a7040] block mb-1" style={{ fontFamily: 'Cinzel, serif' }}>Your Email</label>
          <input type="email" placeholder="you@realm.com"
            className="w-full rounded-lg px-3 py-2 text-sm outline-none transition"
            style={{ background: 'rgba(122,82,48,0.1)', border: '1px solid rgba(122,82,48,0.3)', color: '#3d1f0a' }}
          />
        </div>
        <div>
          <label className="text-xs text-[#9a7040] block mb-1" style={{ fontFamily: 'Cinzel, serif' }}>Message</label>
          <textarea rows={3} placeholder="I bring tidings from afar…"
            className="w-full rounded-lg px-3 py-2 text-sm outline-none transition resize-none"
            style={{ background: 'rgba(122,82,48,0.1)', border: '1px solid rgba(122,82,48,0.3)', color: '#3d1f0a' }}
          />
        </div>
        <button type="submit" className="w-full btn-primary py-2.5">
          🚀 Send Message
        </button>
      </form>
    </div>
  )
}

const PANELS = {
  projects: ProjectsPanel,
  about: AboutPanel,
  experience: ExperiencePanel,
  skills: SkillsPanel,
  contact: ContactPanel,
}

export default function SectionPanel({ activeSection, onClose }) {
  const PanelContent = activeSection ? PANELS[activeSection] : null

  return (
    <AnimatePresence>
      {activeSection && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-30 bg-black/40"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Parchment panel */}
          <motion.aside
            key="panel"
            className="fixed top-0 right-0 bottom-0 z-40 w-full max-w-sm parchment-panel flex flex-col overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-4 shrink-0"
              style={{ borderBottom: '1px solid rgba(122,82,48,0.3)' }}>
              <span className="text-[#7a5230] text-xs uppercase tracking-widest" style={{ fontFamily: 'Cinzel, serif' }}>
                ✦ Portfolio ✦
              </span>
              <button onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center transition text-[#7a5230] hover:text-[#3d1f0a]"
                style={{ border: '1px solid rgba(122,82,48,0.4)', background: 'rgba(122,82,48,0.08)' }}>
                ✕
              </button>
            </div>

            {/* Scrollable content */}
            <div className="panel-scroll flex-1 px-5 pt-5">
              {PanelContent && <PanelContent />}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
