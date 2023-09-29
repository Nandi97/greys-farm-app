import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				primary: {
					50: '#f3f7ee',
					100: '#e5edda',
					200: '#cdddb9',
					300: '#adc78f',
					400: '#8fb06b',
					500: '#72954d',
					600: '#5b7b3d',
					700: '#445b30',
					800: '#394a2a',
					900: '#314027',
					950: '#182211',
				},
				secondary: {
					50: '#f7f6ef',
					100: '#eae9d7',
					200: '#d7d4b1',
					300: '#bfb885',
					400: '#aa9e5f',
					500: '#9d8f55',
					600: '#877547',
					700: '#6d5a3b',
					800: '#5d4d36',
					900: '#514232',
					950: '#2e241a',
				},
			},
		},
	},
	plugins: [],
};
export default config;
