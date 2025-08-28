import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	css: ["~/assets/css/main.css"],
	app: {
		head: {
			htmlAttrs: {
				class: "dark",
			},
			title: "Arbyte FC",
			meta: [{ name: "description", content: "Arbyte FC - Professional Futsal Arena Management" }],
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
	nitro: {
		preset: "vercel",
	},
	modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxt/fonts", "@nuxt/image", "@nuxt/ui"],
});
