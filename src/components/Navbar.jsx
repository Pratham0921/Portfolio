import { LANDMARKS } from '../data/portfolio'

const NAV_ICONS = {
  projects: '💎', about: '🏰', experience: '🍺', skills: '⛰️', contact: '⚓',
}

/**
 * Fixed top navigation bar.
 * Clicking a section link triggers the GSAP camera fly-to in the 3D world.
 */
export default function Navbar({ onNavClick, activeSection, isNight, onToggleNight, onResetCamera }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 glass flex items-center justify-between px-6 md:px-10">
      {/* Logo / Name */}
      <button
        onClick={onResetCamera}
        className="flex items-center gap-2 group cursor-pointer"
        title="Back to overview"
      >
        <span className="text-amber-400 text-xl">⚔️</span>
        <span
          className="text-white font-cinzel text-sm font-bold tracking-widest group-hover:text-amber-400 transition-colors"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          PRATHAM
        </span>
        <span className="text-slate-500 text-xs ml-1 hidden sm:block" style={{ fontFamily: 'Cinzel, serif' }}>
          / GAME DEV
        </span>
      </button>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-7">
        {LANDMARKS.map(lm => (
          <button
            key={lm.id}
            onClick={() => onNavClick(lm.id)}
            className={`nav-link ${activeSection === lm.id ? 'text-amber-400' : ''}`}
          >
            {NAV_ICONS[lm.id]} {lm.subtitle.toUpperCase()}
          </button>
        ))}
      </nav>

      {/* Day / Night toggle */}
      <button
        onClick={onToggleNight}
        className="ml-4 w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center justify-center text-lg"
        title={isNight ? 'Switch to day' : 'Switch to night'}
      >
        {isNight ? '☀️' : '🌙'}
      </button>
    </header>
  )
}
