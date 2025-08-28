<template>
	<div class="rounded-2xl shadow-xl border overflow-hidden" style="background-color: var(--color-bg-surface); border-color: var(--color-bg-muted);">
		<div class="px-6 py-6 border-b" style="background-color: var(--color-bg-surface); border-color: var(--color-bg-muted);">
			<h2 class="text-2xl font-bold flex items-center gap-3" style="color: var(--color-text);">
				<UIcon name="i-lucide-calendar" class="text-3xl" style="color: var(--color-primary);" />
				Match Schedule
			</h2>
			<p class="mt-1" style="color: var(--color-text-muted);">Upcoming and completed matches</p>
		</div>

		<!-- Loading State -->
		<div v-if="isLoading" class="p-6">
			<div class="flex flex-col gap-3">
				<div
					v-for="n in 3"
					:key="n"
					class="grid grid-cols-12 items-center px-6 py-4 rounded-lg animate-pulse"
					style="background: linear-gradient(to right, var(--color-bg-muted), var(--color-bg-base-dark));"
				>
					<!-- Home Team Skeleton -->
					<div class="col-span-3">
						<div class="flex items-center gap-2">
							<div class="w-8 h-8 rounded-full" style="background-color: var(--color-bg-muted);" />
							<div class="h-4 rounded w-20" style="background-color: var(--color-bg-muted);" />
						</div>
					</div>

					<!-- vs separator skeleton -->
					<div class="col-span-1 text-center">
						<div class="h-4 rounded w-6 mx-auto" style="background-color: var(--color-bg-muted);" />
					</div>

					<!-- Away Team Skeleton -->
					<div class="col-span-3 flex justify-end">
						<div class="flex items-center gap-2">
							<div class="h-4 rounded w-20" style="background-color: var(--color-bg-muted);" />
							<div class="w-8 h-8 rounded-full" style="background-color: var(--color-bg-muted);" />
						</div>
					</div>

					<!-- Gap -->
					<div class="col-span-2" />

					<!-- Date Skeleton -->
					<div class="col-span-3 text-right">
						<div class="h-4 rounded w-24 ml-auto" style="background-color: var(--color-bg-muted);" />
					</div>
				</div>
			</div>
		</div>

		<!-- Error State -->
		<div v-else-if="error" class="px-6 py-12 text-center">
			<UIcon name="i-lucide-alert-circle" class="text-5xl mb-4 mx-auto" style="color: var(--color-danger);" />
			<h3 class="text-xl font-semibold mb-2" style="color: var(--color-danger);">Failed to load matches</h3>
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
		<div v-else-if="matches.length === 0" class="px-6 py-12 text-center">
			<UIcon name="i-lucide-calendar-x" class="text-5xl mb-4 mx-auto" style="color: var(--color-text-muted);" />
			<h3 class="text-xl font-semibold mb-2" style="color: var(--color-text);">No matches scheduled</h3>
			<p class="text-sm" style="color: var(--color-text-muted);">Check back later for upcoming matches</p>
		</div>

		<!-- Matches List -->
		<div v-else class="p-6">
			<div class="flex flex-col gap-3">
				<div
					v-for="match in matches"
					:key="match._id"
					class="grid grid-cols-12 items-center px-6 py-4 rounded-xl transition-all duration-200 hover:shadow-lg border"
					:style="getMatchStyling(match)"
				>
					<!-- Home Team -->
					<div class="col-span-3">
						<TeamNameAndLogo :team-name="match.homeTeam.name" />
					</div>

					<!-- Score or vs separator -->
					<div class="col-span-1 text-center font-semibold">
						<span v-if="match.result" class="inline-flex items-center justify-center px-3 py-1.5 rounded-lg font-bold" style="background-color: var(--color-score-bg); color: var(--color-score-text);">
							{{ match.result.homeScore }} - {{ match.result.awayScore }}
						</span>
						<span v-else class="text-base" style="color: var(--color-text-muted);">vs</span>
					</div>

					<!-- Away Team -->
					<div class="col-span-3 flex justify-end">
						<TeamNameAndLogo :team-name="match.awayTeam.name" :logo-first="false" />
					</div>

					<!-- Gap/Spacer -->
					<div class="col-span-2" />

					<!-- Date -->
					<div class="col-span-3 font-normal text-sm text-right" style="color: var(--color-text-muted);">
						{{ formatDate(match.date) }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { UIcon } from "#components";
import type { TMatch } from "~/types/match";
import TeamNameAndLogo from "./ui/TeamNameAndLogo.vue";
import { ref, onMounted } from "vue";
import { listMatch } from "~/composables/match";

const matches = ref<TMatch[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

const formatDate = (dateString: string) => {
	if (!dateString) return "TBD";
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

const getMatchStyling = (match: TMatch) => {
	if (match.result) {
		return {
			backgroundColor: 'var(--color-bg-surface)',
			borderColor: 'var(--color-bg-muted)',
		};
	}
	return {
		backgroundColor: 'var(--color-bg-surface)',
		borderColor: 'var(--color-bg-muted)',
	};
};

const fetchMatches = async () => {
	try {
		isLoading.value = true;
		error.value = null;
		matches.value = await listMatch();
	} catch (err) {
		console.error("Error fetching matches:", err);
		error.value = err instanceof Error ? err.message : "Failed to load matches";
	} finally {
		isLoading.value = false;
	}
};

const refetch = () => {
	fetchMatches();
};

onMounted(() => {
	fetchMatches();
});
</script>
