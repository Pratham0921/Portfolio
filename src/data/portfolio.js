// ─────────────────────────────────────────────
//  Portfolio content — edit freely!
// ─────────────────────────────────────────────

export const portfolioData = {
  name: 'Pratham',
  title: 'Game Developer & 3D Experience Creator',
  tagline: 'Crafting Interactive Worlds, One Polygon at a Time',

  projects: [
    {
      id: 1, emoji: '🏰',
      name: 'Echoes of the Forgotten',
      description: 'A dark-fantasy action-RPG in Unreal Engine 5. Procedural dungeons, AI companion system, real-time Lumen lighting, and Niagara VFX throughout.',
      tech: ['Unreal Engine 5', 'C++', 'Blueprints', 'Niagara VFX'],
      github: 'https://github.com', live: '#',
    },
    {
      id: 2, emoji: '🤖',
      name: 'NeoGrid Runner',
      description: 'Cyberpunk endless runner with procedurally-generated city blocks, custom HLSL shaders for neon bloom, and 60fps on mobile via instanced rendering.',
      tech: ['Unity', 'C#', 'HLSL Shaders', 'DOTween'],
      github: 'https://github.com', live: '#',
    },
    {
      id: 3, emoji: '🗡️',
      name: 'Pixel Dungeon Crawler',
      description: 'Retro roguelite with 200+ unique items, permadeath, procedural loot, and hand-crafted pixel art. Reached #4 on Itch.io front page.',
      tech: ['Godot 4', 'GDScript', 'Aseprite', 'Tiled'],
      github: 'https://github.com', live: '#',
    },
    {
      id: 4, emoji: '✨',
      name: 'ShaderLab VFX Kit',
      description: '40+ production-ready GLSL/HLSL shaders and VFX systems — water, fire, magic portals, and dissolve effects for game developers.',
      tech: ['GLSL', 'Three.js', 'WebGL', 'React'],
      github: 'https://github.com', live: '#',
    },
  ],

  about: {
    bio: "I'm Pratham — a game developer and interactive-experience creator with 4+ years shipping games across Unreal Engine, Unity, and the web. My obsession is crafting worlds that feel alive: breathing environments, tactile feedback, and systems that surprise players.",
    bio2: "When I'm not chasing photon bounces in Lumen, you'll find me writing WebGL shaders at 2 AM or jamming with the indie collective I co-founded.",
    stats: [
      { label: 'CLASS',     value: 'Game Developer' },
      { label: 'LEVEL',     value: '27' },
      { label: 'GUILD',     value: 'Indie Collective' },
      { label: 'SPECIALTY', value: 'Unreal Engine 5' },
    ],
    attributes: [
      { name: 'Coding Mastery',   value: 88 },
      { name: '3D Art & Shaders', value: 82 },
      { name: 'Game Design',      value: 78 },
      { name: 'UI / UX Sorcery',  value: 73 },
      { name: 'Bug Slaying',      value: 95 },
    ],
  },

  experience: [
    {
      id: 1,
      company: 'Realms Dev Studio',
      role: 'Lead Game Developer',
      period: 'Jan 2024 – Present',
      type: 'EPIC QUEST',
      description: 'Architected the core gameplay loop of a 30-player co-op dungeon crawler. Cut render time 40% via custom LOD pipeline. Shipped two major expansions.',
      achievements: ['⚔️ Built multiplayer sync system', '🛡️ 40% perf improvement', '📜 2 DLC expansions shipped'],
    },
    {
      id: 2,
      company: 'WebGL Games Inc.',
      role: 'Frontend Games Engineer',
      period: 'Jun 2022 – Dec 2023',
      type: 'MAIN QUEST',
      description: 'Developed browser-based 3D mini-games reaching 500K monthly players. Custom Three.js pipeline with instanced rendering for a 10× perf gain.',
      achievements: ['🌐 500K MAU reached', '⚡ 10× render speed', '🎮 8 games shipped'],
    },
    {
      id: 3,
      company: 'Game Dev Bootcamp',
      role: 'Student / Junior Developer',
      period: 'Jan 2022 – Jun 2022',
      type: 'SIDE QUEST',
      description: '6-month intensive program — Unity, C#, game design, and team collaboration. Shipped 3 polished game-jam projects. Finished top of cohort.',
      achievements: ['🏆 1st at internal game jam', '🎓 Certified Unity Developer', '👾 3 games shipped'],
    },
  ],

  skills: [
    {
      category: 'Game Engines', icon: '🎮',
      items: [
        { name: 'Unreal Engine 5', level: 90 },
        { name: 'Unity',           level: 82 },
        { name: 'Godot 4',         level: 70 },
      ],
    },
    {
      category: 'Programming', icon: '💻',
      items: [
        { name: 'C++',              level: 85 },
        { name: 'C# / Blueprints',  level: 88 },
        { name: 'JavaScript / TS',  level: 80 },
        { name: 'GLSL / HLSL',      level: 75 },
      ],
    },
    {
      category: '3D & Rendering', icon: '🎨',
      items: [
        { name: 'Three.js / WebGL', level: 88 },
        { name: 'Blender',          level: 71 },
        { name: 'Niagara VFX',      level: 78 },
      ],
    },
    {
      category: 'Tools & Web', icon: '🛠️',
      items: [
        { name: 'React / R3F',   level: 85 },
        { name: 'Git / GitHub',  level: 90 },
        { name: 'Docker / CI',   level: 67 },
      ],
    },
  ],

  contact: {
    email: 'pratham@example.com',
    socials: [
      { name: 'GitHub',   url: 'https://github.com',   icon: '🐙' },
      { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
      { name: 'itch.io',  url: 'https://itch.io',      icon: '🎮' },
      { name: 'Twitter',  url: 'https://twitter.com',  icon: '🐦' },
    ],
  },
}

// ─── Landmark definitions (2D Map Zones → portfolio sections) ───
export const MAP_ZONES = [
  {
    id: 'projects',
    label: 'The Gloomwood',
    subtitle: 'Projects',
    icon: '💎',
    x: 30, // % from left
    y: 35, // % from top
    color: '#06b6d4',
  },
  {
    id: 'about',
    label: 'The Frostpeaks',
    subtitle: 'About Me',
    icon: '🏰',
    x: 70,
    y: 25,
    color: '#94a3b8',
  },
  {
    id: 'experience',
    label: 'Tavern Village',
    subtitle: 'Experience',
    icon: '🍺',
    x: 75,
    y: 50,
    color: '#f59e0b',
  },
  {
    id: 'skills',
    label: 'Serpent\'s Swamp',
    subtitle: 'Skills',
    icon: '⛰️',
    x: 25,
    y: 75,
    color: '#e2e8f0',
  },
  {
    id: 'contact',
    label: 'Starfall Harbor',
    subtitle: 'Contact',
    icon: '⚓',
    x: 75,
    y: 80,
    color: '#818cf8',
  },
]
