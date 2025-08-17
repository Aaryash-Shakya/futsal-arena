<template>
	<div class="card">
		<h2 class="card-header">Team Standings</h2>

		<StandingsTable :standings="teamStandings" />
		<Placeholder class="h-8" />
	</div>
</template>

<script setup lang="ts">
import StandingsTable from "./ui/StandingsTable.vue";
import { teamStandings } from "../data/teamStandings";
</script>
