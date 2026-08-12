/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ref: {
          primary: '#0F172A',     // Slate 900
          secondary: '#64748B',   // Slate 500
          tertiary: '#231500',    // Dark bronze accent
          neutral: '#F7F8FA',     // Canvas background
          surface: '#FFFFFF',     // Card surface
          subtle: '#F1F5F9',      // Input & hover background
          border: '#E2E8F0',      // Border color
          muted: '#94A3B8',       // Light gray text/placeholder
          darkSurface: '#1E293B', // Inverted button background
        },
        industrial: {
          charcoal: '#0F172A',
          dark: '#0F172A',
          orange: '#231500',
          bg: '#F7F8FA',
          surface: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B',
        },
        trinetra: {
          navy: '#0F172A',
          darkNavy: '#0F172A',
          slate: '#334155',
          teal: '#0F172A',
          emerald: '#10B981',
          orange: '#231500',
          yellow: '#F59E0B',
          red: '#EF4444',
          canvas: '#F7F8FA',
          card: '#FFFFFF',
          border: '#E2E8F0',
        },
        canvas: {
          DEFAULT: '#F7F8FA',
          banner: '#F1F5F9',
          card: '#FFFFFF',
          dark: '#0F172A',
        },
        borderCustom: '#E2E8F0',
        status: {
          live: '#10B981',
          liveBg: '#ECFDF5',
          critical: '#EF4444',
          criticalBg: '#FEF2F2',
          warning: '#F59E0B',
          warningBg: '#FEF3C7',
          offline: '#64748B',
          offlineBg: '#F1F5F9',
        }
      },
      fontFamily: {
        heading: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'none': '0px',
        'sm': '6px',
        'DEFAULT': '10px',
        'md': '10px',
        'lg': '12px',
        'xl': '14px',
        '2xl': '18px',
        '3xl': '24px',
        'full': '9999px',
      }
    },
  },
  plugins: [],
}

