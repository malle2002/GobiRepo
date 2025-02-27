import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        typewriter: 'typewriter 2s steps(11) forwards',
        caret: 'typewriter 2s steps(11) forwards, blink 1s steps(11) infinite 2s',
      },
      keyframes: {
        typewriter: {
          to: {
            left: '100%',
          },
        },
        blink: {
          '0%': {
            opacity: '0',
          },
          '0.1%': {
            opacity: '1',
          },
          '50%': {
            opacity: '1',
          },
          '50.1%': {
            opacity: '0',
          },
          '100%': {
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        'cupcake-pink': {
          primary: '#ffcce5',
          secondary: '#fbcfe8',
          accent: '#f472b6',
          neutral: '#f9a8d4',
          'base-100': '#fff1f2',
          'base-content': '#4a041c',
        },
      },
      {
        'cupcake-blue': {
          primary: '#89cff1',
          secondary: '#bfdbfe',
          accent: '#60a5fa',
          neutral: '#93c5fd',
          'base-100': '#eff6ff',
          'base-content': '#041c4a',
        },
      },
    ],
  },
} satisfies Config;
