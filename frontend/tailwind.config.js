/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Màu sắc tùy chỉnh
      colors: {
        primary: {
          DEFAULT: '#9496FF', //tím
          extraDark: '#000399',
          dark: '#6062F9',  //tím đậm
          light: '#A9ABFF', 
        },
      },
      // Font chữ tùy chỉnh
      fontFamily: {
        allerta: ['Allerta Stencil', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
}

