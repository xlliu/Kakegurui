const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html" , "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'rock': "url('/public/rock.png')",
        'paper': "url('/public/paper.png')",
        'sc': "url('/public/sc.svg')",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}

