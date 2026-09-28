/** Theme colours come from CSS variables in src/index.css; color-mix lets opacity modifiers (bg-primary/20) work. */
const token = (name) => `color-mix(in srgb, var(${name}) calc(<alpha-value> * 100%), transparent)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: token('--color-primary'),
        secondary: token('--color-secondary'),
        accent: token('--color-accent'),
        surface: token('--dev-bg'),
        panel: token('--dev-panel'),
        line: token('--dev-border'),
        ink: token('--dev-text'),
        muted: token('--dev-muted'),
        heading: token('--dev-heading'),
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
