import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['var(--font-press-start)', 'cursive'],
      },
      colors: {
        indigo: {
          900: '#1e1b4b',
          950: '#1a1744',
        },
      },
    },
  },
  plugins: [],
};

export default config; 