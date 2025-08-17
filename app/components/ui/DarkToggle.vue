<script setup lang="ts">
import { ref, onMounted } from "vue";

const isDark = ref(false);

// On mount, read saved preference or system preference
onMounted(() => {
	const saved = localStorage.getItem("theme");
	if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
		isDark.value = true;
		document.documentElement.classList.add("dark");
	}
});

function toggleTheme() {
	isDark.value = !isDark.value;
	if (isDark.value) {
		document.documentElement.classList.add("dark");
		localStorage.setItem("theme", "dark");
	} else {
		document.documentElement.classList.remove("dark");
		localStorage.setItem("theme", "light");
	}
}
</script>

<template>
	<button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition" @click="toggleTheme">
		{{ isDark ? "Light Mode" : "Dark Mode" }}
	</button>
</template>
