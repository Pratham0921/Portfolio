/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      colors: {
        // Monochromatic neutral palette
        background: '#0a0a0a',
        surface: '#141414',
        'surface-light': '#1e1e1e',
        'surface-dark': '#0f0f0f',
        'text-primary': '#fafafa',
        'text-secondary': '#a1a1aa',
        'text-muted': '#52525b',
        accent: {
          DEFAULT: '#ffffff',
          subtle: 'rgba(255, 255, 255, 0.1)',
          glow: 'rgba(255, 255, 255, 0.03)'
        },
        // Minimal gray scale
        gray: {
          50: '#fafafa',
          100: '#e5e5e5',
          200: '#d4d4d4',
          300: '#a3a3a3',
          400: '#737373',
          500: '#52525b',
          600: '#404040',
          700: '#262626',
          800: '#171717',
          900: '#0a0a0a',
        }
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(0, 0, 0, 0.3)',
        glow: '0 0 15px rgba(255, 255, 255, 0.03)',
      },
      borderColor: {
        surface: '#262626',
        subtle: 'rgba(255, 255, 255, 0.06)',
      }
    },
  },
  plugins: [],
}
