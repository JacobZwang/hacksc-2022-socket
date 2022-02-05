const plugin = require('tailwindcss/plugin');

module.exports = {
	// add this section
	purge: ['./src/**/*.html', './src/**/*.svelte'],
	darkMode: 'media', // or 'media' or 'class'
	variants: {
		extend: {}
	},
	plugins: [
		require('@tailwindcss/typography'),
	]
};