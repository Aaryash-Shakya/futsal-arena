<template>
	<div class="standings-table flex flex-col gap-3">
		<!-- Header -->
		<div class="grid grid-cols-12 text-sm font-semibold px-4 py-3 border-b-2" style="color: var(--color-text-muted); border-color: var(--color-primary-muted);">
			<div class="col-span-1 text-center">#</div>
			<div class="col-span-4">Team</div>
			<div class="col-span-1 text-center">P</div>
			<div class="col-span-1 text-center">W</div>
			<div class="col-span-1 text-center">D</div>
			<div class="col-span-1 text-center">L</div>
			<div class="col-span-1 text-center">GD</div>
			<div class="col-span-2 text-center font-bold">Pts</div>
		</div>

		<!-- Qualification Legend -->
		<div class="flex items-center gap-4 px-4 py-2 text-sm rounded-lg" style="background-color: var(--color-qualified-light); border: 1px solid var(--color-qualified-border);">
			<div class="flex items-center gap-2">
				<div class="w-3 h-3 rounded-full" style="background-color: var(--color-qualified);" />
				<span style="color: var(--color-text-muted);">Top 2 teams qualify for finals</span>
			</div>
		</div>

		<!-- Team Rows -->
		<div
			v-for="(team, index) in standings"
			:key="team._id"
			class="grid grid-cols-12 items-center px-4 py-4 rounded-xl transition-all duration-200 hover:shadow-lg border"
			:style="getPositionStyling(index)"
		>
			<!-- Position -->
			<div class="col-span-1 text-center">
				<div 
					class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white relative"
					:style="getPositionBadgeStyle(index)"
				>
					{{ index + 1 }}
					<!-- Qualification indicator for top 2 -->
					<div 
						v-if="index < 2" 
						class="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
						style="background-color: var(--color-qualified);"
					/>
				</div>
			</div>

			<!-- Team -->
			<div class="col-span-4">
				<TeamNameAndLogo :team-name="team.name" />
			</div>

			<!-- Played -->
			<div class="col-span-1 text-center text-sm font-medium" style="color: var(--color-text);">{{ team.gamesPlayed }}</div>

			<!-- Won -->
			<div class="col-span-1 text-center text-sm font-medium" style="color: var(--color-stat-text);">{{ team.wins }}</div>

			<!-- Drawn -->
			<div class="col-span-1 text-center text-sm font-medium" style="color: var(--color-stat-text);">{{ team.draws }}</div>

			<!-- Lost -->
			<div class="col-span-1 text-center text-sm font-medium" style="color: var(--color-stat-text);">{{ team.losses }}</div>

			<!-- Goal Difference -->
			<div class="col-span-1 text-center text-sm font-bold" style="color: var(--color-stat-text);">
				{{ team.goalDifference >= 0 ? '+' : '' }}{{ team.goalDifference }}
			</div>

			<!-- Points -->
			<div class="col-span-2 text-center">
				<div 
					class="inline-flex items-center justify-center px-3 py-1.5 rounded-lg font-bold text-sm border"
					style="
						background-color: var(--color-points-bg);
						color: var(--color-points-text);
						border-color: var(--color-points-text);
					"
				>
					{{ team.points }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { TTeamStanding } from "~/types/team";
import TeamNameAndLogo from "./TeamNameAndLogo.vue";

defineProps<{ standings: Array<TTeamStanding> }>();

const getPositionStyling = (index: number) => {
	if (index < 2) {
		// Top 2 - Qualified for finals
		return {
			backgroundColor: 'var(--color-qualified-light)',
			borderColor: 'var(--color-qualified-border)',
			borderWidth: '2px'
		};
	}
	return {
		backgroundColor: 'var(--color-bg-surface)',
		borderColor: 'var(--color-bg-muted)',
		borderWidth: '1px'
	};
};

const getPositionBadgeStyle = (index: number) => {
	if (index === 0) {
		return { backgroundColor: 'var(--color-position-gold)' };
	} else if (index === 1) {
		return { backgroundColor: 'var(--color-position-silver)' };
	} else if (index === 2) {
		return { backgroundColor: 'var(--color-position-bronze)' };
	}
	return { backgroundColor: 'var(--color-position-regular)' };
};
</script>
