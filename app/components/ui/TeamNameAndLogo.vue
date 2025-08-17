<script setup lang="ts">
import type { TeamName } from "~/data/teamStandings";

// Define props and assert type
const props = withDefaults(defineProps<{ teamName: TeamName; logoFirst?: boolean }>(), { logoFirst: true });

// Map of logos
const teamLogoMap: Record<TeamName, string> = {
	"Team Alok": "/images/chelsea.png",
	"Team Saroj": "/images/arsenal.png",
	"Team Samrat": "/images/manchester.png",
};

// Pick the logo safely
const teamLogo: string = teamLogoMap[props.teamName];
</script>

<template>
	<div class="flex items-center gap-2 text-para-medium text-text">
		<div v-if="!props.logoFirst" class="text-center text-base font-medium">
			{{ props.teamName }}
		</div>
		<div class="w-12 h-12 overflow-hidden rounded">
			<NuxtImg :src="teamLogo" :alt="props.teamName" class="w-full h-full object-cover" quality="100" />
		</div>

		<div v-if="props.logoFirst" class="text-center text-base font-medium">
			{{ props.teamName }}
		</div>
	</div>
</template>
