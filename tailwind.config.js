/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        // UE5-style dark palette
        background: '#0a0a0a',
        surface: '#111111',
        'surface-light': '#1a1a1a',
        'text-primary': '#e0e0e0',
        'text-secondary': '#a0a0a0',
        'text-muted': '#666666',
        accent: {
          DEFAULT: '#00d4ff',
          light: '#00e5ff',
          dark: '#00b8cc',
          glow: 'rgba(0, 212, 255, 0.3)'
        }
      },
      boxShadow: {
        'accent': '0 0 20px rgba(0, 212, 255, 0.3)',
        'accent-lg': '0 0 30px rgba(0, 212, 255, 0.5)'
      },
      borderColor: {
        'surface': '#2a2a2a',
        'accent': '#00d4ff'
      }
    },
  },
  plugins: [],
}
