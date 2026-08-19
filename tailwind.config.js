/** @type {import('tailwindcss').Config} */

// Colours are driven by CSS custom properties declared in src/index.css
// (`:root` for light, `.dark` for dark) so the whole palette can flip theme
// without duplicating a single utility class. Each variable holds a bare
// "R G B" triplet, which lets Tailwind keep its `/opacity` modifier working.
const withOpacity = (variable) => `rgb(var(${variable}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    // xs added on top of the defaults so layout steps through phones,
    // phablets, tablets, laptops, desktops and ultra-wide monitors.
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        paper: withOpacity('--c-paper'),
        surface: withOpacity('--c-surface'),
        ink: withOpacity('--c-ink'),
        mist: withOpacity('--c-ink'),
        muted: withOpacity('--c-muted'),
        line: withOpacity('--c-line'),
        teal: {
          DEFAULT: withOpacity('--c-teal'),
          strong: withOpacity('--c-teal-strong'),
          soft: withOpacity('--c-teal-soft'),
        },
        rose: {
          DEFAULT: withOpacity('--c-rose'),
        },
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        glass: 'var(--shadow-glass)',
        'glass-lg': 'var(--shadow-glass-lg)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(3%, -4%) scale(1.05)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-4%, 3%) scale(1.08)' },
        },
        sheen: {
          '0%': { transform: 'translateX(-120%) skewX(-15deg)' },
          '100%': { transform: 'translateX(220%) skewX(-15deg)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 14s ease-in-out infinite',
        floatSlow: 'floatSlow 18s ease-in-out infinite',
        sheen: 'sheen 2.8s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
};
