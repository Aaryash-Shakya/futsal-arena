<template>
	<div class="w-full backdrop-blur-md shadow-sm border-b transition-all duration-300" style="background-color: var(--color-bg-surface); border-color: var(--color-bg-muted);">
		<nav class="container flex items-center justify-between h-16 px-6 py-4 mx-auto">
			<!-- Logo -->
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-full flex items-center justify-center" style="background: linear-gradient(to right, var(--color-primary), var(--color-secondary));">
					<UIcon name="i-lucide-trophy" class="text-white text-xl" />
				</div>
				<div class="flex flex-col">
					<div class="font-bold text-xl" style="background: linear-gradient(to right, var(--color-primary), var(--color-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
						Arbyte FC
					</div>
					<div class="text-xs -mt-1" style="color: var(--color-text-muted);">
						Goal handim???
					</div>
				</div>
			</div>

			<!-- Dark Mode Toggle -->
			<button
				class="w-10 h-10 rounded-lg transition-all duration-200 border hover:scale-105 flex items-center justify-center"
				style="border-color: var(--color-bg-muted); background-color: var(--color-bg-base);"
				@click="toggleDark"
			>
				<UIcon :name="isDark ? 'lucide:sun-dim' : 'lucide:moon'" class="text-lg" style="color: var(--color-primary);" />
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
