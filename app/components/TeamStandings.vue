<template>
	<div class="rounded-2xl shadow-xl border overflow-hidden mb-8" style="background-color: var(--color-bg-surface); border-color: var(--color-bg-muted);">
		<div class="px-6 py-6 border-b" style="background-color: var(--color-bg-surface); border-color: var(--color-bg-muted);">
			<h2 class="text-2xl font-bold flex items-center gap-3" style="color: var(--color-text);">
				<UIcon name="i-lucide-trophy" class="text-3xl" style="color: var(--color-primary);" />
				Team Standings
			</h2>
			<p class="mt-1" style="color: var(--color-text-muted);">Current league table</p>
		</div>

		<!-- Loading State -->
		<div v-if="isLoading" class="p-6">
			<div class="flex flex-col gap-4">
				<div
					v-for="n in 3"
					:key="n"
					class="flex items-center justify-between px-4 py-4 rounded-xl animate-pulse"
					style="background: linear-gradient(to right, var(--color-bg-muted), var(--color-bg-base-dark));"
				>
					<div class="flex items-center gap-4">
						<div class="w-8 h-8 rounded-full" style="background-color: var(--color-bg-muted);" />
						<div class="w-8 h-8 rounded-full" style="background-color: var(--color-bg-muted);" />
						<div class="w-32 h-4 rounded" style="background-color: var(--color-bg-muted);" />
					</div>
					<div class="flex items-center gap-6">
						<div class="w-8 h-4 rounded" style="background-color: var(--color-bg-muted);" />
						<div class="w-8 h-4 rounded" style="background-color: var(--color-bg-muted);" />
						<div class="w-8 h-4 rounded" style="background-color: var(--color-bg-muted);" />
						<div class="w-8 h-4 rounded" style="background-color: var(--color-bg-muted);" />
						<div class="w-12 h-8 rounded-full" style="background-color: var(--color-bg-muted);" />
					</div>
				</div>
			</div>
		</div>

		<!-- Error State -->
		<div v-else-if="error" class="px-6 py-12 text-center">
			<UIcon name="i-lucide-alert-circle" class="text-5xl mb-4 mx-auto" style="color: var(--color-danger);" />
			<h3 class="text-xl font-semibold mb-2" style="color: var(--color-danger);">Failed to load standings</h3>
			<p class="text-sm mb-6" style="color: var(--color-text-muted);">{{ error }}</p>
			<button
				class="px-6 py-3 rounded-lg font-semibold shadow-lg text-white transition-all duration-200 hover:opacity-90"
				style="background: linear-gradient(to right, var(--color-danger), #dc2626);"
				@click="refetch"
			>
				Try Again
			</button>
		</div>

		<!-- Empty State -->
		<div v-else-if="standings.length === 0" class="px-6 py-12 text-center">
			<UIcon name="i-lucide-table" class="text-5xl mb-4 mx-auto" style="color: var(--color-text-muted);" />
			<h3 class="text-xl font-semibold mb-2" style="color: var(--color-text);">No standings available</h3>
			<p class="text-sm" style="color: var(--color-text-muted);">Standings will appear after matches are completed</p>
		</div>

		<!-- Standings Table -->
		<div v-else class="p-6">
			<StandingsTable :standings="standings" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { UIcon } from "#components";
import StandingsTable from "./ui/StandingsTable.vue";
import { useTeamStandings } from "~/composables/standings";
import { onMounted } from "vue";

const { standings, isLoading, error, fetchStandings, refetch } = useTeamStandings();

onMounted(() => {
	fetchStandings();
});
</script>
