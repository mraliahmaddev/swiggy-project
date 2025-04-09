import { defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  theme: {
    screens: {
      'sm': '640px', // Default Tailwind breakpoints
      'md': '769px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',

      
    },
  },
  content: [
    // ... (your content paths)
  ],
  plugins: [react() , tailwindcss()]
})

// module.exports = {
//   theme: {
//     screens: {
//       'sm': '640px', // Default Tailwind breakpoints
//       'md': '768px',
//       'lg': '1024px',
//       'xl': '1280px',
//       '2xl': '1536px',

      
//     },
//   },
//   content: [
//     // ... (your content paths)
//   ],
//   plugins: [],
// }


// Mobile Phones: Up to 480px 
// Tablets: 481px to 768px 
// Laptops: 769px to 1024px 
// Desktops: 1025px and up 