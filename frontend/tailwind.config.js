/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#F4F4F0',
          banner: '#ECECE7',
          card: '#FFFFFF',
          dark: '#18181B',
        },
        railway: {
          navy: '#0F2942',
          blue: '#1E3A8A',
          dark: '#0B192C',
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
