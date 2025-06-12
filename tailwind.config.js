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
  			hero: [
  				'4rem',
  				{
  					lineHeight: '1',
  					letterSpacing: '-0.02em'
  				}
  			],
  			'hero-sm': [
  				'3rem',
  				{
  					lineHeight: '1.1',
  					letterSpacing: '-0.02em'
  				}
  			]
  		},
  		letterSpacing: {
  			luxury: '0.025em',
  			wide: '0.05em',
  			wider: '0.1em',
  			widest: '0.15em'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-in-out',
  			'slide-up': 'slideUp 0.5s ease-out',
  			'scale-in': 'scaleIn 0.3s ease-out'
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