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
        'ton': "url('/public/ton.svg')",
<<<<<<< HEAD
        'kkg': "url('/public/kkg.png')",
        'kkg2': "url('/public/kkg2.jpg')"
=======
        'kkg': "url('/public/kkg-tiny.png')",
>>>>>>> 85cb6bdbea8f9ace67296f83b2d761dee0521de4
      },
      fontFamily: {
        'skranji': ['Skranji', 'cursive'],
        'zqh': ['ZCOOL QingKe HuangYou', 'sans-serif']
      }
    },
    // fontSize: {
    //   'xs': '.75rem',
    //   'sm': '.875rem',
    //   'base': '16px', // 默认值为 16px
    //   'lg': '1.125rem',
    //   'xl': '1.25rem',
    //   '2xl': '1.5rem',
    //   '3xl': '1.875rem',
    //   '4xl': '2.25rem',
    //   '5xl': '3rem',
    //   '6xl': '4rem',
    // },
  },
  darkMode: "class",
  plugins: [nextui()]
}

