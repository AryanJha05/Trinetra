/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#102A43',
          900: '#0A192F',
          950: '#020C1B',
        },
        canvas: {
          DEFAULT: '#F4F4F0',
          banner: '#ECECE7',
          card: '#FFFFFF',
          dark: '#18181B',
        },
        railway: {
          navy: '#0A192F',
          blue: '#1E3A8A',
          dark: '#020C1B',
          mint: '#64FFDA',
        },
        borderCustom: '#E4E4DF',
        pill: {
          active: '#E8E8E2',
          hover: '#F0F0EA',
        }
      },
      fontFamily: {
        heading: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
