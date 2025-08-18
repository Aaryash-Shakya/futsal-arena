<template>
	<div class="card">
		<h2 class="card-header">Matches</h2>

		<!-- Loading State -->
		<div v-if="isLoading" class="flex flex-col gap-0">
			<div
				v-for="n in 3"
				:key="n"
				class="grid grid-cols-12 items-center px-6 py-4 rounded-lg animate-pulse"
				:class="n % 2 === 0 ? 'bg-bg-base-dark' : 'bg-bg-surface'"
			>
				<!-- Home Team Skeleton -->
				<div class="col-span-3">
					<div class="flex items-center gap-2">
						<div class="w-8 h-8 bg-gray-300 rounded-full" />
						<div class="h-4 bg-gray-300 rounded w-20" />
					</div>
				</div>

				<!-- vs separator skeleton -->
				<div class="col-span-1 text-center">
					<div class="h-4 bg-gray-300 rounded w-6 mx-auto" />
				</div>

				<!-- Away Team Skeleton -->
				<div class="col-span-3 flex justify-end">
					<div class="flex items-center gap-2">
						<div class="h-4 bg-gray-300 rounded w-20" />
						<div class="w-8 h-8 bg-gray-300 rounded-full" />
					</div>
				</div>

				<!-- Gap/Empty -->
				<div class="col-span-1" />

				<!-- Date Skeleton -->
				<div class="col-span-3 text-right">
					<div class="h-4 bg-gray-300 rounded w-24 ml-auto" />
				</div>

				<!-- Details Skeleton -->
				<div class="col-span-1 text-right">
					<div class="w-6 h-6 bg-gray-300 rounded ml-auto" />
				</div>
			</div>
		</div>

		<!-- Error State -->
		<div v-else-if="error" class="px-6 py-8 text-center">
			<UIcon name="i-lucide-alert-circle" class="text-4xl text-red-500 mb-2" />
			<p class="text-red-500 font-medium mb-2">Failed to load matches</p>
			<p class="text-muted text-sm mb-4">{{ error }}</p>
			<button
				class="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
				@click="refetch"
			>
				> Try Again
			</button>
		</div>

		<!-- Empty State -->
		<div v-else-if="matches.length === 0" class="px-6 py-8 text-center">
			<UIcon name="i-lucide-calendar-x" class="text-4xl text-gray-400 mb-2" />
			<p class="text-muted font-medium">No matches scheduled</p>
			<p class="text-muted text-sm">Check back later for upcoming matches</p>
		</div>

		<!-- Matches List -->
		<div v-else class="flex flex-col gap-0">
			<div
				v-for="(match, idx) in matches"
				:key="match._id"
				class="grid grid-cols-12 items-center px-6 py-4 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
				:class="idx % 2 === 0 ? 'bg-bg-base-dark' : 'bg-bg-surface'"
			>
				<!-- Home Team -->
				<div class="col-span-3">
					<TeamNameAndLogo :team-name="match.homeTeam.name" />
				</div>

				<!-- vs separator -->
				<div class="col-span-1 text-center font-semibold">vs</div>

				<!-- Away Team -->
				<div class="col-span-3 flex justify-end">
					<TeamNameAndLogo :team-name="match.awayTeam.name" :logo-first="false" />
				</div>

				<!-- Gap/Empty -->
				<div class="col-span-1" />

				<!-- Date -->
				<div class="col-span-3 font-normal text-muted text-sm text-right">
					{{ formatDate(match.date) }}
				</div>

				<!-- Details -->
				<div class="col-span-1 font-normal text-muted text-right">
					<UIcon name="i-lucide-info" class="text-2xl cursor-pointer hover:text-primary transition-colors" />
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
