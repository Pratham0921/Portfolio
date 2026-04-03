import { MAP_ZONES } from '../data/portfolio'

/**
 * Fixed top navigation bar — parchment fantasy styling.
 */
export default function Navbar({ onNavClick, activeSection, isNight, onToggleNight, onResetCamera }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 h-14 flex items-center justify-between px-6 md:px-10"
      style={{
        background: 'linear-gradient(180deg, rgba(60,25,5,0.97) 0%, rgba(40,15,2,0.95) 100%)',
        borderBottom: '2px solid #7a5230',
        boxShadow: '0 2px 20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(200,169,110,0.2)',
      }}
    >
      {/* Logo */}
      <button
        onClick={onResetCamera}
        className="flex items-center gap-2 group cursor-pointer"
        title="Back to overview"
      >
        <span className="text-xl">⚔️</span>
        <div className="flex flex-col">
          <span className="text-[#f4e4b8] text-sm font-bold tracking-widest group-hover:text-[#c8a96e] transition-colors"
            style={{ fontFamily: 'Cinzel, serif', lineHeight: 1.1 }}>
            PRATHAM
          </span>
          <span className="text-[#7a5230] text-[0.6rem] tracking-widest hidden sm:block"
            style={{ fontFamily: 'Cinzel, serif' }}>
            GAME DEVELOPER
          </span>
        </div>
      </button>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-6">
        {MAP_ZONES.map(lm => (
          <button
            key={lm.id}
            onClick={() => onNavClick(lm.id)}
            className={`nav-link ${activeSection === lm.id ? 'active' : ''}`}
          >
            {lm.icon} {lm.subtitle.toUpperCase()}
          </button>
        ))}
      </nav>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Night toggle */}
        <button
          onClick={onToggleNight}
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition"
          style={{ border: '1px solid #7a5230', background: 'rgba(122,82,48,0.15)' }}
          title={isNight ? 'Switch to day' : 'Switch to night'}
        >
          {isNight ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}
