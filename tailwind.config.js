/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class", // Enable class-based dark mode
	content: ["./app/**/*.{vue,js,ts}"],
	theme: {
		extend: {
			colors: {
				primary: {
					light: "#ff0000",
					dark: "#00ff00",
				},
				background: {
					light: "#f9fafb",
					dark: "#1f2937",
				},
			},
		},
	},
	plugins: [],
};
