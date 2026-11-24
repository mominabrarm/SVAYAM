/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        surface: {
          DEFAULT: '#FFFFFF',
          50: '#FAFAFA',
          100: '#FFFFFF',
          200: '#FAFAFA',
          300: '#F5F5F5',
          subtle: '#F0F0F0',
        },
        ink: {
          DEFAULT: '#0A0A0A',
          primary: '#0A0A0A',
          secondary: '#262626',
          muted: '#525252',
          light: '#737373',
        },
        pop: {
          white: '#FFFFFF',
          blue: '#55A8F8',
          lilac: '#E8C6FF',
          mint: '#4DE59B',
          yellow: '#FCE354',
          black: '#0A0A0A',
        },
        svayam: {
          violet: {
            DEFAULT: '#0A0A0A',
            light: '#55A8F8',
            dark: '#000000',
            glow: 'rgba(85, 168, 248, 0.2)',
          },
          emerald: {
            DEFAULT: '#4DE59B',
            light: '#4DE59B',
            dark: '#0A0A0A',
            glow: 'rgba(77, 229, 155, 0.2)',
          },
          amber: {
            DEFAULT: '#FCE354',
            light: '#FCE354',
            dark: '#0A0A0A',
          },
          rose: {
            DEFAULT: '#FF6B6B',
            light: '#FFA8A8',
            dark: '#0A0A0A',
          }
        }
      },
      fontFamily: {
        display: [
          '"Barlow Condensed"',
          '-apple-system',
          'sans-serif',
        ],
        sans: [
          '"Plus Jakarta Sans"',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'hard-xs': '2px 2px 0px #0A0A0A',
        'hard': '4px 4px 0px #0A0A0A',
        'hard-lg': '6px 6px 0px #0A0A0A',
        'hard-xl': '8px 8px 0px #0A0A0A',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bar-1': 'barBounce 0.8s ease-in-out infinite',
        'bar-2': 'barBounce 1.1s ease-in-out infinite 0.2s',
        'bar-3': 'barBounce 0.9s ease-in-out infinite 0.4s',
        'bar-4': 'barBounce 1.2s ease-in-out infinite 0.1s',
        'bar-5': 'barBounce 0.7s ease-in-out infinite 0.3s',
      },
      keyframes: {
        barBounce: {
          '0%, 100%': { transform: 'scaleY(0.2)' },
          '50%': { transform: 'scaleY(1.0)' },
        }
      }
    },
  },
  plugins: [],
}
