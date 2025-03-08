import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			bg: {
  				primary: '#F7F8FA',
  				secondary: '#FEFFFF'
  			},
  			text: {
  				black: '#000000',
  				blackgrey: '#383838',
  				darkblue: '#020f29'
  			},
  			accent: {
  				yellow: '#FBE30B',
  				desructive: '#F7231C'
  			},
  			blue: {
  				france: '#318CE7',
  				capri: '#0CAFFF',
  				light: '#ADD8E6'
  			},
  			white: {
  				DEFAULT: '#FFFFFF'
  			}
  		},
  		fontFamily: {
  			montserrat: 'var(--font-montserrat)',
			opensans :'var(--font-sans)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
