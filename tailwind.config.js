/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./user/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
        colors: {
          green: {
            '50':  '#f3f6f4',
            '100': '#dff0ea',
            '200': '#b7e5d0',
            '300': '#7ec9a3',
            '400': '#38a667',
            '500': '#298d4b',
            '600': '#237537',
            '700': '#1f5a2c',
            '800': '#173d23',
            '900': '#10261a',
          },
        },
      },
  },
    
  
  plugins: [],
};

