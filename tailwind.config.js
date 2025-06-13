/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			'charcoal': {
  				50: '#f8f9fa',
  				100: '#e9ecef',
  				200: '#dee2e6',
  				300: '#ced4da',
  				400: '#adb5bd',
  				500: '#6c757d',
  				600: '#495057',
  				700: '#343a40',
  				800: '#212529',
  				900: '#1a1d20',
  			},
  			'warm-white': {
  				50: '#fefefe',
  				100: '#fdfdfc',
  				200: '#faf9f7',
  				300: '#f7f5f3',
  				400: '#f4f1ee',
  				500: '#f1ede9',
  			},
  			'luxury-gold': {
  				50: '#fefdf8',
  				100: '#fefbf0',
  				200: '#fcf4d9',
  				300: '#f9edc2',
  				400: '#f3df94',
  				500: '#d4af37',
  				600: '#b8941f',
  				700: '#9c7a1a',
  				800: '#806015',
  				900: '#664c11',
  			},
  			'stone': {
  				50: '#fafaf9',
  				100: '#f4f4f3',
  				200: '#e5e5e4',
  				300: '#d6d6d4',
  				400: '#a8a8a6',
  				500: '#7a7a78',
  				600: '#6e6e6c',
  				700: '#5c5c5a',
  				800: '#4a4a48',
  				900: '#3d3d3b',
  			},
  			'warm-brown': {
  				'900': '#3D2914',
  				'800': '#4A3319',
  				'700': '#5D3F23',
  				'600': '#6B4423',
  				'500': '#8B5A2B'
  			},
  			'cream': '#F7F3E9',
  			'accent-gold': '#D4AF37',
  			gold: {
  				'50': '#FEFCE8',
  				'100': '#FEF3C7',
  				'200': '#FDE68A',
  				'300': '#FCD34D',
  				'400': '#F59E0B',
  				'500': '#D4AF37',
  				'600': '#B79A6B',
  				'700': '#92400E',
  				'800': '#78350F',
  				'900': '#451A03'
  			},
  			navy: {
  				'50': '#F8FAFC',
  				'100': '#F1F5F9',
  				'200': '#E2E8F0',
  				'300': '#CBD5E1',
  				'400': '#94A3B8',
  				'500': '#64748B',
  				'600': '#475569',
  				'700': '#334155',
  				'800': '#1E293B',
  				'900': '#0F172A'
  			},
  			background: 'hsl(var(--background))',
  			text: {
  				primary: '#1F1F1F',
  				secondary: '#64748B',
  				muted: '#94A3B8'
  			},
  			accent: {
  				metallic: '#B79A6B',
  				hover: '#9E7C0C',
  				light: '#F7E9C3',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			'display': ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
  			'body': ['Inter', 'system-ui', 'sans-serif'],
  			serif: [
  				'Playfair Display',
  				'Georgia',
  				'serif'
  			],
  			sans: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			'hero': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
  			'display': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
  			'headline': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
  			'subheading': ['clamp(1.25rem, 3vw, 1.75rem)', { lineHeight: '1.3' }],
  			'body-large': ['clamp(1.125rem, 2.5vw, 1.375rem)', { lineHeight: '1.6' }],
  			'hero-sm': [
  				'3rem',
  				{
  					lineHeight: '1.1',
  					letterSpacing: '-0.02em'
  				}
  			]
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'100': '25rem',
  			'128': '32rem'
  		},
  		letterSpacing: {
  			luxury: '0.025em',
  			wide: '0.05em',
  			wider: '0.1em',
  			widest: '0.15em'
  		},
  		animation: {
  			'fade-in-up': 'fadeInUp 0.8s ease-out',
  			'fade-in': 'fadeIn 0.6s ease-out',
  			'slide-in': 'slideIn 1s ease-out',
  			'slide-up': 'slideUp 0.5s ease-out',
  			'scale-in': 'scaleIn 0.3s ease-out'
  		},
  		keyframes: {
  			fadeInUp: {
  				'0%': { opacity: '0', transform: 'translateY(30px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' },
  			},
  			fadeIn: {
  				'0%': { opacity: '0' },
  				'100%': { opacity: '1' },
  			},
  			slideIn: {
  				'0%': { opacity: '0', transform: 'translateX(-20px)' },
  				'100%': { opacity: '1', transform: 'translateX(0)' },
  			},
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		boxShadow: {
  			luxury: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  			'luxury-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  			gold: '0 10px 30px -5px rgba(212, 175, 55, 0.3)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} 