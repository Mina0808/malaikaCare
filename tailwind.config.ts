import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/helpers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1836px) { ... }
    },
    container: {
      center: true, // Centrer le container
      padding: '2rem', // Ajouter un padding global autour du container
      screens: {
        sm: '100%', 
        md: '800', 
        lg: '1300px', 
        xl: '1500px',//'1280px', 
        '2xl': '1800x',//'1536px', 
      },
      
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        gunmetal: {
          light: "#2F3942",
          DEFAULT: "#222a30",
          dark: "#232230"
        },
        viridian: {
          light: "#0DA17E",
          DEFAULT: "#0b8a6d",
          dark: "#0A7F64",
          "extra-light": "#E7FDF8"
        },
        umber: {
          light: "#775C4E",
          DEFAULT: "#685044",
          dark: "#614B40"
        },
        mikado: {
          light: "#FFC925",
          DEFAULT: "#FFC514",
          dark: "#FFBF01",
          "extra-light": "#FFF2CD"
        },
        blue: {
          light: "#0D85BD",
          DEFAULT: "#1E6484",
          dark: "#084663"
        }
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
export default config
