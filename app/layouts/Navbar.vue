<template>
	<nav class="flex items-center justify-between h-16 px-6 py-4 bg-bg-base-dark shadow">
		<!-- Logo Placeholder -->
		<div class="flex items-center gap-2">
			<div class="w-16 h-8 rounded flex items-center justify-center font-bold text-lg text-gray-700">LOGO</div>
		</div>
		<!-- Dark Mode Toggle -->
		<button class="text-2xl focus:outline-none cursor-pointer grid items-center" @click="toggleDark">
			<UIcon :name="isDark ? 'lucide:sun-dim' : 'lucide:moon'" />
		</button>
	</nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { UIcon } from "#components";

const isDark = ref(false);

function toggleDark() {
	isDark.value = !isDark.value;
	document.documentElement.classList.toggle("dark", isDark.value);
}
</script>
