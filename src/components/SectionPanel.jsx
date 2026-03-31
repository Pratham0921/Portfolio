import { motion, AnimatePresence } from 'framer-motion'
import { portfolioData } from '../data/portfolio'

// ────────────────────────────────────────────
//  Projects panel
// ────────────────────────────────────────────
function ProjectsPanel() {
  const { projects } = portfolioData
  return (
    <div>
      <h2 className="panel-title">💎 Projects Vault</h2>
      <p className="panel-sub">Select a tome to view the full saga.</p>
      <div className="grid grid-cols-1 gap-4 mt-5">
        {projects.map(p => (
          <div key={p.id} className="card group">
            <div className="flex items-start gap-3">
              <span className="text-3xl">{p.emoji}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm leading-snug">{p.name}</h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.tech.map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <a href={p.github} target="_blank" rel="noreferrer" className="btn-ghost">🐙 GitHub</a>
              <a href={p.live}   target="_blank" rel="noreferrer" className="btn-primary">🚀 Live Demo</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────
//  About panel
// ────────────────────────────────────────────
function AboutPanel() {
  const { about, name, title } = portfolioData
  return (
    <div>
      <h2 className="panel-title">🏰 The Legend of {name}</h2>
      {/* Avatar + bio */}
      <div className="flex items-center gap-4 mt-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-cyan-500 flex items-center justify-center text-3xl shrink-0 shadow-lg shadow-amber-500/20">
          ⚔️
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{name}</p>
          <p className="text-amber-400 text-xs" style={{ fontFamily: 'Cinzel, serif' }}>{title}</p>
        </div>
      </div>
      <p className="text-slate-400 text-xs leading-relaxed mt-4">{about.bio}</p>
      <p className="text-slate-400 text-xs leading-relaxed mt-2">{about.bio2}</p>

      {/* RPG stat card */}
      <div className="mt-5 border border-amber-500/20 rounded-xl p-4 bg-amber-500/5">
        <p className="text-amber-400 text-xs font-bold mb-3" style={{ fontFamily: 'Cinzel, serif' }}>
          ⚔️ CHARACTER SHEET
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
          {about.stats.map(s => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-slate-500 text-xs w-20 shrink-0">{s.label}:</span>
              <span className="text-cyan-300 text-xs font-medium">{s.value}</span>
            </div>
          ))}
        </div>
        <hr className="border-white/5 mb-3" />
        <p className="text-amber-400 text-xs font-bold mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
          ATTRIBUTES
        </p>
        {about.attributes.map(a => (
          <div key={a.name} className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">{a.name}</span>
              <span className="text-amber-400">{a.value}</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="skill-fill"
                style={{ '--w': `${a.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────
//  Experience panel (quest log)
// ────────────────────────────────────────────
function ExperiencePanel() {
  const { experience } = portfolioData
  const typeColor = { 'EPIC QUEST': '#f59e0b', 'MAIN QUEST': '#06b6d4', 'SIDE QUEST': '#a78bfa' }

  return (
    <div>
      <h2 className="panel-title">🍺 Quest Log</h2>
      <p className="panel-sub">A chronicle of adventures past.</p>
      <div className="mt-5 relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[9px] top-0 bottom-0 w-px bg-white/10" />
        {experience.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            className="relative pl-8 pb-7"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: typeColor[e.type] || '#f59e0b', background: '#0d0a1e' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: typeColor[e.type] || '#f59e0b' }} />
            </div>
            {/* Quest type badge */}
            <span className="text-xs font-bold px-2 py-0.5 rounded-full border"
              style={{ color: typeColor[e.type], borderColor: `${typeColor[e.type]}40`, background: `${typeColor[e.type]}10`, fontFamily: 'Cinzel, serif', fontSize: '0.6rem' }}>
              {e.type}
            </span>
            <p className="text-white text-sm font-semibold mt-1">{e.role}</p>
            <p className="text-amber-400/80 text-xs">{e.company}</p>
            <p className="text-slate-500 text-xs">{e.period}</p>
            <p className="text-slate-400 text-xs leading-relaxed mt-2">{e.description}</p>
            <ul className="mt-2 flex flex-col gap-1">
              {e.achievements.map((a, j) => (
                <li key={j} className="text-cyan-400/80 text-xs">{a}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────
//  Skills panel
// ────────────────────────────────────────────
function SkillsPanel() {
  const { skills } = portfolioData
  return (
    <div>
      <h2 className="panel-title">⛰️ Skill Summit</h2>
      <p className="panel-sub">Hard-earned abilities from years of battle.</p>
      <div className="mt-5 space-y-5">
        {skills.map((cat, ci) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.1 }}
            className="card"
          >
            <p className="text-xs font-bold mb-3 text-amber-400" style={{ fontFamily: 'Cinzel, serif' }}>
              {cat.icon} {cat.category.toUpperCase()}
            </p>
            {cat.items.map(sk => (
              <div key={sk.name} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">{sk.name}</span>
                  <span className="text-cyan-400">{sk.level}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
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

// ────────────────────────────────────────────
//  Contact panel
// ────────────────────────────────────────────
function ContactPanel() {
  const { contact } = portfolioData
  return (
    <div>
      <h2 className="panel-title">⚓ Starfall Harbor</h2>
      <p className="panel-sub">Send a raven. I reply within a day.</p>

      {/* Social links */}
      <div className="grid grid-cols-2 gap-3 mt-5">
        {contact.socials.map(s => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className="card flex items-center gap-3 hover:border-indigo-500/40 transition-colors no-underline group"
          >
            <span className="text-2xl">{s.icon}</span>
            <span className="text-slate-300 text-sm group-hover:text-white transition-colors">{s.name}</span>
          </a>
        ))}
      </div>

      {/* Email */}
      <div className="mt-4 card">
        <p className="text-xs text-slate-500 mb-1">📬 Direct scroll</p>
        <p className="text-cyan-400 text-sm">{contact.email}</p>
      </div>

      {/* Contact form */}
      <form
        className="mt-5 space-y-3"
        onSubmit={e => { e.preventDefault(); alert('Message sent! (placeholder)') }}
      >
        <div>
          <label className="text-xs text-slate-500 block mb-1">Your Name</label>
          <input
            type="text" placeholder="Sir Adventurer"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-amber-500/50 transition"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1">Your Email</label>
          <input
            type="email" placeholder="you@realm.com"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-amber-500/50 transition"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500 block mb-1">Message</label>
          <textarea
            rows={3} placeholder="I bring tidings from afar…"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-amber-500/50 transition resize-none"
          />
        </div>
        <button type="submit" className="w-full btn-primary py-2.5">
          🚀 Send Message
        </button>
      </form>
    </div>
  )
}

// ────────────────────────────────────────────
//  Panel registry
// ────────────────────────────────────────────
const PANELS = { projects: ProjectsPanel, about: AboutPanel, experience: ExperiencePanel, skills: SkillsPanel, contact: ContactPanel }

/**
 * Slide-in content panel (Framer Motion).
 * Appears from the right when a landmark is clicked;
 * closes via the × button which also resets the camera.
 */
export default function SectionPanel({ activeSection, onClose }) {
  const PanelContent = activeSection ? PANELS[activeSection] : null

  return (
    <AnimatePresence>
      {activeSection && (
        <>
          {/* Backdrop (mobile) */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-30 bg-black/30 md:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            key="panel"
            className="fixed top-0 right-0 bottom-0 z-40 w-full max-w-sm glass flex flex-col overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0">
              <span className="text-amber-400 text-xs uppercase tracking-widest" style={{ fontFamily: 'Cinzel, serif' }}>
                Portfolio
              </span>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center justify-center text-slate-400 hover:text-white"
              >
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
