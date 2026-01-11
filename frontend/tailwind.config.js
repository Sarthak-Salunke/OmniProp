/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // CONTRACT-COMPLIANT: Strict spacing scale ONLY
      // Approved values: 4, 8, 12, 16, 24, 32 (px)
      // CONTRACT-COMPLIANT: Mapping desired scale to standard Tailwind keys
      // 1=4px, 2=8px, 3=12px, 4=16px, 6=24px, 8=32px
      // Also keeping 16 (64px), 24 (96px), 32 (128px) for layout (h-, w-)
      spacing: {
        '0': '0',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '24': '96px',
        '32': '128px',
      },
      colors: {
        // Unified Teal/Emerald Theme - Matches CSS variables
        primary: {
          DEFAULT: '#0f766e', // Teal 700 - Primary brand
          light: '#14b8a6',   // Teal 500 - Lighter primary
          dark: '#134e4a',    // Teal 800 - Darker primary
        },
        secondary: {
          DEFAULT: '#0d9488', // Teal 600 - Secondary
          light: '#5eead4',   // Teal 300 - Light secondary
          dark: '#0f766e',    // Teal 700 - Dark secondary
        },
        accent: {
          DEFAULT: '#10b981', // Emerald 500 - Success/Accent
          light: '#34d399',   // Emerald 400 - Light accent
          dark: '#059669',    // Emerald 600 - Dark accent
        },
        'estate-background': '#fdfae9',  // Warmer Cream/Eggshell for premium feel
        'estate-text': '#0f172a',        // Slate 900
        'estate-muted': '#64748b',       // Slate 500
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        '5xl': ['48px', { lineHeight: '1' }],
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '40px',
      },
      boxShadow: {
        'premium': '0 20px 50px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px 0 rgba(15, 118, 110, 0.1)',
      }
    },
  },
  plugins: [],
}