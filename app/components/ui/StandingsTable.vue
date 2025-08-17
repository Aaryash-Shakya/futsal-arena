<template>
	<div class="standings-table flex flex-col gap-2">
		<div class="flex justify-between text-muted text-para-regular p-2">
			<div class="w-10"></div>
			<div class="w-1/2">Team</div>
			<div class="w-1/3 text-center flex flex-row items-center justify-around text-text">
				<span class="w-1/6">W</span>
				<span class="w-1/6">D</span>
				<span class="w-1/6">L</span>
				<span class="w-1/2">Pts</span>
			</div>
			<div class="w-1/6 text-center">Wins</div>
		</div>
		<div
			v-for="(team, index) in standings"
			:key="team.id"
			class="flex items-center justify-between text-para-medium text-text px-2 py-4 rounded-xl"
			:class="index <= 1 ? 'bg-primary-muted' : 'bg-secondary-muted'"
		>
			<div class="w-10 text-center">{{ index + 1 }}</div>
			<div class="w-1/2">
				<TeamNameAndLogo :team-name="team.name" />
			</div>
			<div class="w-1/3 text-center flex flex-row items-center justify-around">
				<span class="w-1/6">{{ team.wins }}</span>
				<span class="w-1/6">{{ team.draws }}</span>
				<span class="w-1/6">{{ team.losses }}</span>
				<span class="w-1/2">{{ team.wins * 2 + team.draws }}</span>
			</div>
			<div class="w-1/6 text-center">{{ team.wins }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { TeamStanding } from "~/data/teamStandings";
import TeamNameAndLogo from "./TeamNameAndLogo.vue";

defineProps<{ standings: Array<TeamStanding> }>();
</script>
