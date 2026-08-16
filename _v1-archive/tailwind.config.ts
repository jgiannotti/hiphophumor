import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Anton = heavy condensed display (headlines, wordmark, badges).
        display: ['var(--font-display)', 'Impact', 'system-ui', 'sans-serif'],
        // Inter = clean body.
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          // streetwear dual-neon system
          volt: '#CCFF00',   // primary — acid/volt green
          magenta: '#FF2D7E', // secondary — hot magenta
          ink: '#0A0A0B',    // near-black base
          paper: '#F5F5F2',  // off-white
          // legacy alias so any stray reference still resolves to volt
          gold: '#CCFF00',
        },
      },
      boxShadow: {
        volt: '0 0 0 1px rgba(204,255,0,0.5), 0 0 28px -4px rgba(204,255,0,0.55)',
        magenta: '0 0 0 1px rgba(255,45,126,0.5), 0 0 28px -4px rgba(255,45,126,0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out both',
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
