/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 生物学主题配色 - 避免AI味儿的蓝紫渐变
        cell: {
          membrane: '#2D5F5D',    // 细胞膜深青色
          cytoplasm: '#E8F4F3',   // 细胞质浅青色
          nucleus: '#1A3A38',     // 细胞核深色
          organelle: '#4A9B94',   // 细胞器中青色
          vesicle: '#7BC4BD',     // 囊泡亮青色
        },
        bio: {
          primary: '#2D5F5D',
          secondary: '#4A9B94',
          accent: '#F4A261',      // 暖橙色点缀
          background: '#F8FAFA',
          text: '#1A3A38',
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'membrane-wave': 'membrane-wave 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'membrane-wave': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
