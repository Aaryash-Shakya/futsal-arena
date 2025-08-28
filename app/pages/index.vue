<script setup lang="ts">
import MatchSchedule from "~/components/MatchSchedule.vue";
import TeamStandings from "~/components/TeamStandings.vue";
</script>

<template>
	<div class="container mx-auto px-6 py-4">
		<TeamStandings />
		<MatchSchedule />
	</div>
</template>
