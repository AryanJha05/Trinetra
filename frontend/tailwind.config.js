/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          charcoal: '#111827',
          dark: '#0F172A',
          orange: '#C85A17',
          bg: '#F4F5F6',
          surface: '#FFFFFF',
          border: '#E5E7EB',
          muted: '#64748B',
        },
        trinetra: {
          navy: '#111827',
          darkNavy: '#0F172A',
          slate: '#334155',
          teal: '#0F766E',
          emerald: '#16A34A',
          orange: '#C85A17',
          yellow: '#D97706',
          red: '#DC2626',
          canvas: '#F4F5F6',
          card: '#FFFFFF',
          border: '#E5E7EB',
        },
        canvas: {
          DEFAULT: '#F4F5F6',
          banner: '#F1F5F9',
          card: '#FFFFFF',
          dark: '#111827',
        },
        borderCustom: '#E5E7EB',
      },
      fontFamily: {
        heading: ['Inter', 'Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '8px',
        'lg': '10px',
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
        'full': '9999px',
      }
    },
  },
  plugins: [],
}

