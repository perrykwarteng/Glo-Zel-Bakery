/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			display: [
  				'Playfair Display"',
  				'serif'
  			],
  			sans: [
  				'Raleway',
  				'sans-serif'
  			]
  		},
  		colors: {
  			prim: '#f59e0b',
  			sec: '#b71c1c',
  			black: '#000000',
  			white: '#ffffff',
  			blueBlack: '#021729',
  			wheat: {
  				'50': '#fdf9f0',
  				'100': '#f9f0d9',
  				'200': '#f5e7c2',
  				'300': '#f0dba6',
  				'400': '#ecd28e',
  				'500': '#e8c977',
  				'600': '#daa520',
  				'700': '#b78618',
  				'800': '#956a13',
  				'900': '#744f0f'
  			},
  			brown: {
  				'50': '#f6f2ee',
  				'100': '#e8dbd0',
  				'200': '#d6c0a8',
  				'300': '#c3a680',
  				'400': '#b18c58',
  				'500': '#a07747',
  				'600': '#8b6239',
  				'700': '#8b4513',
  				'800': '#5e2e0d',
  				'900': '#421f09'
  			},
  			success: {
  				'500': '#10b981',
  				'600': '#059669'
  			},
  			warning: {
  				'500': '#f59e0b',
  				'600': '#d97706'
  			},
  			error: {
  				'500': '#ef4444',
  				'600': '#dc2626'
  			},
  			background: 'hsl(var(--background))',
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
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
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
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			rise: {
  				'0%': {
  					transform: 'translateY(8px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			}
  		},
  		animation: {
  			fadeIn: 'fadeIn 0.5s ease-out',
  			rise: 'rise 0.7s ease-out'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
