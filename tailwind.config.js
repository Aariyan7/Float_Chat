/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        vercel: {
          black: '#000000',
          white: '#ffffff',
          gray: {
            50:  '#fafafa',
            100: '#f4f4f5',
            200: '#e4e4e7',
            300: '#d4d4d8',
            400: '#a1a1aa',
            500: '#71717a',
            600: '#52525b',
            700: '#3f3f46',
            800: '#27272a',
            900: '#18181b',
            950: '#09090b',
          },
          blue: '#0070f3',
          cyan: '#50e3c2',
          violet: '#7928ca',
          pink:  '#ff0080',
        },
      },
      animation: {
        'fade-up':     'fadeUp 0.6s ease forwards',
        'fade-in':     'fadeIn 0.5s ease forwards',
        'glow-pulse':  'glowPulse 4s ease-in-out infinite',
        'float':       'float 6s ease-in-out infinite',
        'shimmer':     'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':      { opacity: '0.7', transform: 'scale(1.08)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer-text':    'linear-gradient(90deg, transparent 0%, currentColor 40%, white 60%, transparent 100%)',
      },
      boxShadow: {
        'vercel-sm': '0 0 0 1px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05)',
        'vercel-md': '0 0 0 1px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.08)',
        'vercel-lg': '0 0 0 1px rgba(0,0,0,0.08), 0 8px 30px rgba(0,0,0,0.12)',
        'vercel-dark-sm': '0 0 0 1px rgba(255,255,255,0.06), 0 2px 4px rgba(0,0,0,0.3)',
        'vercel-dark-md': '0 0 0 1px rgba(255,255,255,0.06), 0 4px 12px rgba(0,0,0,0.4)',
        'vercel-dark-lg': '0 0 0 1px rgba(255,255,255,0.06), 0 8px 30px rgba(0,0,0,0.5)',
        'glow-blue':  '0 0 40px rgba(0,112,243,0.25)',
        'glow-violet':'0 0 40px rgba(121,40,202,0.25)',
      },
    },
  },
  plugins: [],
}
