<script setup lang="ts">
import MatchSchedule from "~/components/MatchSchedule.vue";
import TeamStandings from "~/components/TeamStandings.vue";

// Easter egg
console.log("J bhaye ni jitne ta Team Titan ho")
</script>

<template>
	<div class="container py-8">
		<TeamStandings />
		<MatchSchedule />
	</div>
</template>
