<script setup lang="ts">
// Define props and assert type
const props = withDefaults(
	defineProps<{ 
		teamName: string; 
		logoPosition?: "top" | "left" | "right"; 
	}>(), 
	{ 
		logoPosition: "left" 
	}
);

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
	<!-- Top Layout (logo on top, name below) -->
	<div v-if="props.logoPosition === 'top'" class="flex flex-col items-center gap-2 text-para-medium text-text">
		<div class="w-12 h-12 overflow-hidden rounded">
			<img :src="teamLogo" :alt="props.teamName" class="w-full h-full object-cover">
		</div>
		<div class="text-center text-base font-medium">
			{{ props.teamName }}
		</div>
	</div>

	<!-- Left Layout (logo on left, name on right) -->
	<div v-else-if="props.logoPosition === 'left'" class="flex items-center gap-2 text-para-medium text-text">
		<div class="w-12 h-12 overflow-hidden rounded">
			<img :src="teamLogo" :alt="props.teamName" class="w-full h-full object-cover">
		</div>
		<div class="text-center text-base font-medium">
			{{ props.teamName }}
		</div>
	</div>

	<!-- Right Layout (name on left, logo on right) -->
	<div v-else-if="props.logoPosition === 'right'" class="flex items-center gap-2 text-para-medium text-text">
		<div class="text-center text-base font-medium">
			{{ props.teamName }}
		</div>
		<div class="w-12 h-12 overflow-hidden rounded">
			<img :src="teamLogo" :alt="props.teamName" class="w-full h-full object-cover">
		</div>
	</div>
</template>
