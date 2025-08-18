<template>
	<div class="w-full bg-bg-base shadow dark:bg-bg-base-dark transition-colors">
		<nav class="container flex items-center justify-between h-16 px-6 py-4">
			<!-- Logo Placeholder -->
			<div class="flex items-center gap-2">
				<div
					class="w-16 h-8 rounded flex items-center justify-center font-bold text-lg text-text transition-colors"
				>
					LOGO
				</div>
			</div>

			<!-- Dark Mode Toggle -->
			<button
				class="text-2xl focus:outline-none cursor-pointer grid items-center p-2 rounded hover:bg-muted/5 transition-colors"
				@click="toggleDark"
			>
				<UIcon :name="isDark ? 'lucide:sun-dim' : 'lucide:moon'" />
			</button>
		</nav>
	</div>
</template>

<script setup lang="ts">
import { UIcon } from "#components";
import { ref, onMounted } from "vue";

const isDark = ref(false);

onMounted(() => {
	// Detect system preference and saved theme only on client
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const savedTheme = localStorage.getItem("theme");
	isDark.value = savedTheme === "dark" ? true : savedTheme === "light" ? false : prefersDark;

	// Apply initial theme
	document.documentElement.classList.toggle("dark", isDark.value);

	// Listen to system theme changes
	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
		if (!localStorage.getItem("theme")) {
			isDark.value = e.matches;
			document.documentElement.classList.toggle("dark", isDark.value);
		}
	});
});

// Toggle function
function toggleDark() {
	isDark.value = !isDark.value;
	document.documentElement.classList.toggle("dark", isDark.value);
	localStorage.setItem("theme", isDark.value ? "dark" : "light");
}
</script>
