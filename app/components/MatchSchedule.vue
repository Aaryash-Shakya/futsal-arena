<template>
	<div
		class="rounded-xl shadow-md border overflow-hidden backdrop-blur-sm"
		style="background-color: var(--color-bg-surface); border-color: var(--color-bg-muted)"
	>
		<div
			class="px-6 py-6 border-b"
			style="background-color: var(--color-bg-surface); border-color: var(--color-bg-muted)"
		>
			<h2 class="text-xl font-bold flex items-center gap-2" style="color: var(--color-text)">
				<UIcon name="i-lucide-calendar" class="text-2xl" style="color: var(--color-primary)" />
				Match Schedule
			</h2>
			<p class="mt-1 text-sm" style="color: var(--color-text-muted)">Upcoming and completed matches</p>
		</div>

		<!-- Loading State -->
		<div v-if="isLoading" class="p-6">
			<div class="overflow-x-auto">
				<div class="min-w-max">
					<div class="flex flex-col gap-2">
						<div
							v-for="n in 3"
							:key="n"
							class="grid grid-cols-12 items-center px-4 py-2 rounded-lg animate-pulse mb-1 min-w-[450px]"
							style="
								background: linear-gradient(to right, var(--color-bg-muted), var(--color-bg-base-dark));
							"
						>
							<!-- Home Team Skeleton -->
							<div class="col-span-3">
								<div class="flex items-center gap-2">
									<div class="w-6 h-6 rounded-full" style="background-color: var(--color-bg-muted)" />
									<div class="h-4 rounded w-20" style="background-color: var(--color-bg-muted)" />
								</div>
							</div>

							<!-- vs separator skeleton -->
							<div class="col-span-2 flex justify-center">
								<div class="h-4 rounded w-6" style="background-color: var(--color-bg-muted)" />
							</div>

							<!-- Away Team Skeleton -->
							<div class="col-span-3 flex justify-end">
								<div class="flex items-center gap-2">
									<div class="h-4 rounded w-20" style="background-color: var(--color-bg-muted)" />
									<div class="w-6 h-6 rounded-full" style="background-color: var(--color-bg-muted)" />
								</div>
							</div>

							<!-- Spacer -->
							<div class="col-span-2" />

							<!-- Date + Info Skeleton -->
							<div class="col-span-2 flex items-center justify-end gap-3">
								<div class="h-4 rounded w-24" style="background-color: var(--color-bg-muted)" />
								<div class="w-6 h-6 rounded" style="background-color: var(--color-bg-muted)" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Error State -->
		<div v-else-if="error" class="px-6 py-8 text-center">
			<UIcon name="i-lucide-alert-circle" class="text-4xl mb-3 mx-auto" style="color: var(--color-danger)" />
			<h3 class="text-lg font-semibold mb-2" style="color: var(--color-danger)">Failed to load matches</h3>
			<p class="text-sm mb-4" style="color: var(--color-text-muted)">{{ error }}</p>
			<button
				class="px-4 py-2 rounded-lg font-medium shadow-md text-white transition-all duration-200 hover:opacity-90"
				style="background: linear-gradient(to right, var(--color-danger), #dc2626)"
				@click="refetch"
			>
				Try Again
			</button>
		</div>

		<!-- Empty State -->
		<div v-else-if="matches.length === 0" class="px-4 py-8 text-center">
			<UIcon name="i-lucide-calendar-x" class="text-4xl mb-3 mx-auto" style="color: var(--color-text-muted)" />
			<h3 class="text-lg font-semibold mb-2" style="color: var(--color-text)">No matches scheduled</h3>
			<p class="text-sm" style="color: var(--color-text-muted)">Check back later for upcoming matches</p>
		</div>

		<!-- Matches List -->
		<div v-else class="p-6">
			<div class="overflow-x-auto">
				<div class="min-w-max">
					<div class="flex flex-col gap-2">
						<div
							v-for="match in matches"
							:key="match._id"
							class="grid grid-cols-10 items-center px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md border mb-1 min-w-[450px]"
							:style="getMatchStyling(match)"
						>
							<!-- Home Team (Left) -->
							<div class="col-span-3">
								<TeamNameAndLogo :team-name="match.homeTeam.name" />
							</div>

							<!-- Score or vs separator (Center) -->
							<div class="col-span-1 flex justify-center">
								<span
									v-if="match.result"
									class="inline-flex items-center justify-center px-2 py-1 rounded-md font-medium text-sm bg-purple-50 text-purple-600 border border-purple-100 dark:bg-purple-900/10 dark:text-purple-400 dark:border-purple-800/30"
								>
									{{ match.result.homeScore }} - {{ match.result.awayScore }}
								</span>
								<span v-else class="text-sm font-medium text-gray-500 dark:text-gray-500">vs</span>
							</div>

							<!-- Away Team (Right) -->
							<div class="col-span-3 flex justify-end">
								<TeamNameAndLogo :team-name="match.awayTeam.name" :logo-first="false" />
							</div>

							<!-- Spacer -->
							<div class="col-span-1" />

							<!-- Date + Info -->
							<div class="col-span-2 flex items-center justify-end gap-3">
								<!-- Date -->
								<div class="text-sm text-gray-700 dark:text-gray-300">
									{{ formatDate(match.date) }}
								</div>

								<!-- Info Icon -->
								<button
									class="p-1.5 rounded-md transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
									title="View match details"
									@click="navigateToMatch(match._id)"
								>
									<UIcon
										name="i-lucide-info"
										class="text-lg text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
									/>
								</button>
							</div>
						</div>
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
			backgroundColor: "var(--color-bg-surface)",
			borderColor: "var(--color-bg-muted)",
		};
	}
	return {
		backgroundColor: "var(--color-bg-surface)",
		borderColor: "var(--color-bg-muted)",
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

const navigateToMatch = (matchId: string) => {
	navigateTo(`/matches/${matchId}`);
};

onMounted(() => {
	fetchMatches();
});
</script>
