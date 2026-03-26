/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'display': ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          900: '#111827',
        },
        slate: {
          50: '#f8fafc',
          900: '#0f172a',
        },
        emerald: {
          500: '#10b981',
        },
        gold: {
          400: '#f59e0b',
          500: '#d97706',
        },
        purple: {
          500: '#8b5cf6',
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'inner': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
