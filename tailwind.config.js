/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0B1120',
          light: '#F8FAFC',
        },
        cards: {
          DEFAULT: '#111827',
          light: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#38BDF8',
          light: '#0284C7',
        },
        secondary: {
          DEFAULT: '#8B5CF6',
          light: '#7C3AED',
        },
        text: {
          DEFAULT: '#F8FAFC',
          light: '#0F172A',
        },
        muted: {
          DEFAULT: '#94A3B8',
          light: '#64748B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
