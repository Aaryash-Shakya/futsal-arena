<template>
	<div class="standings-table flex flex-col gap-4">
		<!-- Table Container for Horizontal Scroll -->
		<div class="overflow-x-auto">
			<div class="min-w-max">
				<!-- Header -->
				<div
					class="flex text-sm font-medium px-4 py-2 border-b-2"
					style="color: var(--color-text-muted); border-color: var(--color-primary-muted)"
				>
					<div class="w-12 flex-shrink-0">#</div>
					<div class="flex-1 min-w-32">Team</div>
					<div class="flex gap-4 ml-6">
						<div class="w-10 text-center cursor-help" title="Games Played">GP</div>
						<div class="w-10 text-center cursor-help" title="Wins">W</div>
						<div class="w-10 text-center cursor-help" title="Draws">D</div>
						<div class="w-10 text-center cursor-help" title="Losses">L</div>
						<div class="w-10 text-center cursor-help" title="Goal Difference">GD</div>
						<div class="w-14 text-center cursor-help" title="Points">Pts</div>
					</div>
				</div>

				<!-- Team Rows -->
				<div
					v-for="(team, index) in standings"
					:key="team._id"
					class="flex items-center px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md border mb-3"
					:style="getPositionStyling(index)"
				>
					<!-- Position -->
					<div class="w-12 flex-shrink-0">
						<div
							class="w-6 h-6 rounded-full flex items-center justify-center font-medium text-white text-xs"
							:style="getPositionBadgeStyle(index)"
						>
							{{ index + 1 }}
						</div>
					</div>

					<!-- Team -->
					<div class="flex-1 min-w-32">
						<TeamNameAndLogo :team-name="team.name" logo-position="left" />
					</div>

					<!-- Stats Group -->
					<div class="flex gap-4 ml-6 items-center">
						<!-- Played -->
						<div
							class="w-10 text-center text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center justify-center"
						>
							{{ team.gamesPlayed }}
						</div>

						<!-- Won -->
						<div
							class="w-10 text-center text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center justify-center"
						>
							{{ team.wins }}
						</div>

						<!-- Drawn -->
						<div
							class="w-10 text-center text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center justify-center"
						>
							{{ team.draws }}
						</div>

						<!-- Lost -->
						<div
							class="w-10 text-center text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center justify-center"
						>
							{{ team.losses }}
						</div>

						<!-- Goal Difference -->
						<div
							class="w-10 text-center text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center justify-center"
						>
							{{ team.goalDifference >= 0 ? "+" : "" }}{{ team.goalDifference }}
						</div>

						<!-- Points -->
						<div class="w-14 text-center flex items-center justify-center">
							<div
								class="inline-flex items-center justify-center px-2 py-1 rounded-md font-medium text-sm bg-purple-50 text-purple-600 border border-purple-100 dark:bg-purple-900/10 dark:text-purple-400 dark:border-purple-800/30"
							>
								{{ team.points }}
							</div>
						</div>
					</div>
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
		// Top 2 - Qualified for finals (very subtle green)
		return {
			backgroundColor: "rgba(34, 197, 94, 0.03)",
			borderColor: "rgba(34, 197, 94, 0.1)",
			borderWidth: "1px",
		};
	}
	return {
		backgroundColor: "var(--color-bg-surface)",
		borderColor: "var(--color-bg-muted)",
		borderWidth: "1px",
	};
};

const getPositionBadgeStyle = (index: number) => {
	if (index === 0) {
		return { backgroundColor: "var(--color-position-gold)" };
	} else if (index === 1) {
		return { backgroundColor: "var(--color-position-silver)" };
	} else if (index === 2) {
		return { backgroundColor: "var(--color-position-bronze)" };
	}
	return { backgroundColor: "var(--color-position-regular)" };
};
</script>
