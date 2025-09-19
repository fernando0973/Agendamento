/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,vue}",
    "./components/**/*.{js,ts,vue}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      // Paleta de cores minimalista para agendamento
      colors: {
        // Cores primárias - tons de azul suave
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',  // Cor principal
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49'
        },
        
        // Cores neutras - escala de cinzas moderna
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a'
        },
        
        // Cores de estado - feedback visual
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d'
        },
        
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309'
        },
        
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c'
        },
        
        // Cores específicas para agendamento
        schedule: {
          available: '#22c55e',
          busy: '#f59e0b',
          blocked: '#ef4444',
          pending: '#6366f1'
        }
      },
      
      // Tipografia otimizada para leitura
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      
      // Escala de espaçamento personalizada
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      
      // Bordas arredondadas
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem'
      },
      
      // Sombras suaves para cards e modais
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.05)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 60px -10px rgba(0, 0, 0, 0.1)'
      },
      
      // Animações suaves
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        }
      },
      
      // Breakpoints personalizados
      screens: {
        'xs': '475px',
        '3xl': '1600px'
      }
    },
  },
  plugins: [],
}

