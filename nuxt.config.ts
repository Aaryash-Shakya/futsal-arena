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
	ssr: true,
	nitro: {
		preset: "vercel",
		prerender: {
			routes: ["/"], // add all static routes here, dynamic routes need to be listed explicitly
		},
		routeRules: {
			"/api/**": { cache: { maxAge: 300 } }, // cache API responses for 5 minutes
		},
	},
	modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxt/fonts", "@nuxt/image", "@nuxt/ui"],
});
