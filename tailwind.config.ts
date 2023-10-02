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
				'light-background': '#dfe8ec',
				'box-one-light': '#dfe8ec',
				'box-two-light': '#fcfdfd',
				'box-three-light': '#e7ecef',
				'box-four-light': '#d1dbe0',
				'brand-light': '#00aaff',
				'text-primary-light': '#002233',
				'text-secondary-light': '#365463',

				// 'dark-background': '#171a1c',
				// 'box-one-dark': '#171a1c',
				// 'box-two-dark': '#22282a',
				// 'box-three-dark': '#303436',
				// 'box-four-dark': '#3d4143',
				// 'brand-dark': '#2b6380',
				// 'text-primary-dark': '#d3dbde',
				// 'text-secondary-dark': '#a1a7aa',
			},
		},
	},
	plugins: [],
};
export default config;
