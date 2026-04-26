import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          50: "#f5f2fc",
          100: "#ede8f8",
          200: "#d9cdef",
          300: "#bca9de",
          400: "#8b6cc7",
          500: "#5535a0",
          600: "#3d2278",
          700: "#2c1759",
          800: "#1d103c",
          900: "#140a2e"
        },
        royal: {
          500: "#5535a0",
          700: "#3d2278"
        },
        gold: {
          100: "#fdf3d8",
          200: "#f0da95",
          300: "#e8c97a",
          400: "#c9a84c",
          500: "#b8922e"
        },
        ink: {
          900: "#1a1028"
        },
        mist: "#f7f5fb"
      },
      boxShadow: {
        glow: "0 20px 60px rgba(20, 10, 46, 0.16)",
        soft: "0 10px 30px rgba(20, 10, 46, 0.1)",
        gold: "0 18px 40px rgba(201, 168, 76, 0.28)"
      },
      fontFamily: {
        display: [
          "Iowan Old Style",
          "Baskerville",
          "Palatino Linotype",
          "Book Antiqua",
          "Georgia",
          "serif"
        ],
        sans: ["Avenir Next", "Segoe UI", "Helvetica Neue", "sans-serif"]
      },
      backgroundImage: {
        "care-radial": "radial-gradient(circle at top, rgba(201, 168, 76, 0.16), transparent 30%), radial-gradient(circle at bottom right, rgba(85, 53, 160, 0.22), transparent 34%)",
        "care-grid": "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)"
      },
      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0px)"
          },
          "50%": {
            transform: "translateY(-10px)"
          }
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-400px 0"
          },
          "100%": {
            backgroundPosition: "400px 0"
          }
        },
        pulseGlow: {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)"
          },
          "50%": {
            opacity: ".72",
            transform: "scale(1.12)"
          }
        }
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        shimmer: "shimmer 1.8s linear infinite",
        "pulse-glow": "pulseGlow 1.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
