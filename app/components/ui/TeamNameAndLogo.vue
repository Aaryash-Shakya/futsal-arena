<script setup lang="ts">
// Define props and assert type
const props = withDefaults(defineProps<{ teamName: string; logoFirst?: boolean }>(), { logoFirst: true });

// Map of logos
const teamLogoMap: Record<string, string> = {
	"Arbyte Storm FC": "/images/storm.png",
	"Arbyte Gladiators FC": "/images/gladiators.png",
	"Arbyte Titan FC": "/images/titan.png",
};

// Pick the logo safely
const teamLogo: string = teamLogoMap[props.teamName] || "/images/titan.png";
</script>

<template>
	<div class="flex items-center gap-2 text-para-medium text-text">
		<div v-if="!props.logoFirst" class="text-center text-base font-medium">
			{{ props.teamName }}
		</div>
		<div class="w-12 h-12 overflow-hidden rounded">
			<img :src="teamLogo" :alt="props.teamName" class="w-full h-full object-cover">
		</div>

		<div v-if="props.logoFirst" class="text-center text-base font-medium">
			{{ props.teamName }}
		</div>
	</div>
</template>
