import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#08080A',
          900: '#0D0D11',
          850: '#131319',
          800: '#1A1A22',
          700: '#26262F',
          600: '#3A3A46',
          400: '#8A8A99',
          300: '#B4B4C0',
          100: '#EDEDF2',
        },
        volt: '#CCFF00',
        magenta: '#FF2D7E',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '46rem',
      },
    },
  },
  plugins: [],
}

export default config
