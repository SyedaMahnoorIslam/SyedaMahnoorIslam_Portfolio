/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: '#030712',
        surface: '#0d1117',
        'surface-2': '#161b22',
        border: '#21262d',
        'border-light': '#30363d',
        accent: {
          DEFAULT: '#a855f7',
          light: '#c084fc',
          dark: '#7c3aed',
          glow: '#a855f740',
        },
        cyan: {
          accent: '#06b6d4',
          glow: '#06b6d440',
        },
        pink: {
          accent: '#ec4899',
          glow: '#ec489940',
        },
        text: {
          primary: '#f0f6fc',
          secondary: '#8b949e',
          muted: '#484f58',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(168,85,247,0.3), transparent)',
        'card-gradient': 'linear-gradient(135deg, rgba(13,17,23,0.8) 0%, rgba(22,27,34,0.8) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'glow-purple': '0 0 40px rgba(168,85,247,0.3)',
        'glow-cyan': '0 0 40px rgba(6,182,212,0.3)',
        'glow-pink': '0 0 40px rgba(236,72,153,0.3)',
        'card': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'card-hover': '0 16px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
}
