<template>
	<div class="card">
		<h2 class="card-header">Matches</h2>
		<div class="flex flex-col gap-0">
			<div
				v-for="(match, idx) in matchSchedules"
				:key="idx"
				class="grid grid-cols-12 items-center px-6 py-4 rounded-lg"
				:class="idx % 2 === 0 ? 'bg-bg-base-dark' : 'bg-bg-surface'"
			>
				<!-- Home Team -->
				<div class="col-span-3">
					<TeamNameAndLogo :team-name="match.homeTeam" />
				</div>

				<!-- vs separator -->
				<div class="col-span-1 text-center font-semibold">vs</div>

				<!-- Away Team -->
				<div class="col-span-3 flex justify-end">
					<TeamNameAndLogo :team-name="match.awayTeam" :logo-first="false" />
				</div>

				<!-- Gap/Empty -->
				<div class="col-span-1"></div>

				<!-- Date -->
				<div class="col-span-3 font-normal text-muted text-sm text-right">
					{{ match.date }}
				</div>

				<!-- Details -->
				<div class="col-span-1 font-normal text-muted text-right">
					<UIcon name="i-lucide-info" class="text-2xl" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { UIcon } from "#components";
import { matchSchedules } from "../data/matchSchedules";
import TeamNameAndLogo from "./ui/TeamNameAndLogo.vue";
</script>
