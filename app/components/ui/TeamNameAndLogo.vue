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
	"Storm FC": "/images/storm.png",
	"Gladiators FC": "/images/gladiators.png",
	"Titan FC": "/images/titan.png",
};

// Remove "Arbyte " prefix from team name if it exists
const displayName = props.teamName.replace(/^Arbyte\s+/, "");

// Pick the logo safely using displayName
const teamLogo: string = teamLogoMap[displayName] || "/images/titan.png";
</script>

<template>
	<!-- Top Layout (logo on top, name below) -->
	<div v-if="props.logoPosition === 'top'" class="flex flex-col items-center gap-2 text-para-medium text-text">
		<div class="w-12 h-12 overflow-hidden rounded">
			<img :src="teamLogo" :alt="displayName" class="w-full h-full object-cover">
		</div>
		<div class="text-center text-base font-medium">
			{{ displayName }}
		</div>
	</div>

	<!-- Left Layout (logo on left, name on right) -->
	<div v-else-if="props.logoPosition === 'left'" class="flex items-center gap-2 text-para-medium text-text">
		<div class="w-12 h-12 overflow-hidden rounded">
			<img :src="teamLogo" :alt="displayName" class="w-full h-full object-cover">
		</div>
		<div class="text-center text-base font-medium">
			{{ displayName }}
		</div>
	</div>

	<!-- Right Layout (name on left, logo on right) -->
	<div v-else-if="props.logoPosition === 'right'" class="flex items-center gap-2 text-para-medium text-text">
		<div class="text-center text-base font-medium">
			{{ displayName }}
		</div>
		<div class="w-12 h-12 overflow-hidden rounded">
			<img :src="teamLogo" :alt="displayName" class="w-full h-full object-cover">
		</div>
	</div>
</template>
