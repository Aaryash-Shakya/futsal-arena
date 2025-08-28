<script setup lang="ts">
import Navbar from "./layouts/Navbar.vue";
</script>

<template>
	<UApp>
		<div class="min-h-screen" style="background: linear-gradient(135deg, var(--color-bg-base) 0%, var(--color-bg-surface) 50%, var(--color-bg-base) 100%);">
			<Navbar />
			<NuxtPage />
		</div>
	</UApp>
</template>
