<template>
	<div class="min-h-screen bg-gray-900 text-white">
		<div class="container mx-auto px-4 md:px-6 py-4 md:py-6">
			<!-- Loading State -->
			<div v-if="isLoading" class="flex justify-center items-center h-64">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
			</div>

			<!-- Error State -->
			<div v-else-if="error" class="text-center py-8 md:py-12">
				<UIcon name="i-lucide-alert-circle" class="text-5xl mb-4 mx-auto text-red-500" />
				<h3 class="text-xl font-semibold mb-2 text-red-500">Failed to load match</h3>
				<p class="text-sm mb-6 text-gray-400">{{ error }}</p>
				<button
					class="px-6 py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-700 transition-colors"
					@click="fetchMatch"
				>
					Try Again
				</button>
			</div>

			<!-- Match Details -->
			<div v-else-if="match" class="max-w-4xl mx-auto">
				<!-- Back Button -->
				<button
					class="mb-4 md:mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
					@click="$router.back()"
				>
					<UIcon name="i-lucide-arrow-left" class="text-lg" />
					Back to Schedule
				</button>

				<!-- Match Header -->
				<div class="bg-gray-800 rounded-lg p-4 md:p-6 mb-4 md:mb-6 border border-gray-700">
					<div class="flex items-center justify-center mb-4 md:mb-6">
						<h1 class="text-3xl font-bold text-center">Match Details</h1>
					</div>

					<!-- Teams and Score -->
					<div class="flex items-center justify-center gap-6 md:gap-12">
						<!-- Home Team -->
						<div class="text-center">
							<div class="flex items-center gap-4 mb-3">
								<TeamNameAndLogo :team-name="match.homeTeam.name" logo-position="top" />
							</div>
							<div
								class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-600/20 text-green-400 text-sm font-medium"
							>
								<UIcon name="i-lucide-home" class="text-sm" />
								Home
							</div>
						</div>

						<!-- Score -->
						<div class="text-center">
							<div v-if="match.result" class="text-3xl md:text-5xl font-bold text-purple-400 mb-2">
								{{ match.result.homeScore }} - {{ match.result.awayScore }}
							</div>
							<div v-else class="text-3xl font-medium text-gray-400 mb-2">vs</div>
							<div class="text-sm text-gray-500 font-medium">
								{{ match.result ? "Final Score" : "Upcoming" }}
							</div>
						</div>

						<!-- Away Team -->
						<div class="text-center">
							<div class="flex items-center gap-4 mb-3">
								<TeamNameAndLogo :team-name="match.awayTeam.name" logo-position="top" />
							</div>
							<div
								class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-sm font-medium"
							>
								<UIcon name="i-lucide-plane" class="text-sm" />
								Away
							</div>
						</div>
					</div>
				</div>

				<!-- Match Information -->
				<div class="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700">
					<h2 class="text-xl font-semibold mb-4 text-purple-400">Match Information</h2>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
						<!-- Date & Time -->
						<div class="bg-gray-900 rounded-lg p-3 md:p-4">
							<div class="flex items-center gap-3 mb-2">
								<UIcon name="i-lucide-calendar" class="text-purple-400" />
								<h3 class="font-medium">Date & Time</h3>
							</div>
							<p class="text-gray-300">{{ formatDetailedDate(match.date) }}</p>
						</div>

						<!-- Venue -->
						<div class="bg-gray-900 rounded-lg p-3 md:p-4">
							<div class="flex items-center gap-3 mb-2">
								<UIcon name="i-lucide-map-pin" class="text-purple-400" />
								<h3 class="font-medium">Venue</h3>
							</div>
							<p class="text-gray-300">{{ match.location || "TBD" }}</p>
						</div>

						<!-- Status -->
						<div class="bg-gray-900 rounded-lg p-3 md:p-4">
							<div class="flex items-center gap-3 mb-2">
								<UIcon name="i-lucide-flag" class="text-purple-400" />
								<h3 class="font-medium">Status</h3>
							</div>
							<p class="text-gray-300">{{ getMatchStatus(match) }}</p>
						</div>

						<!-- Match Type -->
						<div class="bg-gray-900 rounded-lg p-3 md:p-4">
							<div class="flex items-center gap-3 mb-2">
								<UIcon name="i-lucide-trophy" class="text-purple-400" />
								<h3 class="font-medium">Competition</h3>
							</div>
							<p class="text-gray-300">League Match</p>
						</div>
					</div>

					<!-- Match Summary Section (if match has result) -->
					<div v-if="match.result" class="mt-6 md:mt-8">
						<h3 class="text-xl font-semibold mb-4 md:mb-6 text-purple-400">Match Summary</h3>

						<!-- Goals Section -->
						<div v-if="goals && goals.length > 0" class="bg-gray-900 rounded-lg p-4 md:p-6">
							<div class="flex items-center gap-3 mb-4">
								<UIcon name="i-lucide-target" class="text-purple-400 text-xl" />
								<h4 class="text-lg font-semibold">Goals</h4>
							</div>

							<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
								<!-- Home Team Goals -->
								<div>
									<h5 class="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
										<div class="w-3 h-3 rounded-full bg-green-500" />
										{{ match.homeTeam.name }}
									</h5>
									<div v-if="homeTeamGoals.length > 0" class="space-y-2">
										<div
											v-for="goal in homeTeamGoals"
											:key="goal._id"
											class="flex items-center justify-between p-2 md:p-3 bg-gray-800 rounded-lg"
										>
											<div class="flex items-center gap-3">
												<UIcon name="i-lucide-circle-dot" class="text-green-400" />
												<span class="font-medium">{{ goal.playerId.name }}</span>
											</div>
											<div class="text-sm text-gray-400">
												{{ getGoalCount(goal.playerId._id, match.homeTeam._id) }} goal{{
													getGoalCount(goal.playerId._id, match.homeTeam._id) > 1 ? "s" : ""
												}}
											</div>
										</div>
									</div>
									<div v-else class="text-sm text-gray-500 italic">No goals scored</div>
								</div>

								<!-- Away Team Goals -->
								<div>
									<h5 class="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
										<div class="w-3 h-3 rounded-full bg-blue-500" />
										{{ match.awayTeam.name }}
									</h5>
									<div v-if="awayTeamGoals.length > 0" class="space-y-2">
										<div
											v-for="goal in awayTeamGoals"
											:key="goal._id"
											class="flex items-center justify-between p-2 md:p-3 bg-gray-800 rounded-lg"
										>
											<div class="flex items-center gap-3">
												<UIcon name="i-lucide-circle-dot" class="text-blue-400" />
												<span class="font-medium">{{ goal.playerId.name }}</span>
											</div>
											<div class="text-sm text-gray-400">
												{{ getGoalCount(goal.playerId._id, match.awayTeam._id) }} goal{{
													getGoalCount(goal.playerId._id, match.awayTeam._id) > 1 ? "s" : ""
												}}
											</div>
										</div>
									</div>
									<div v-else class="text-sm text-gray-500 italic">No goals scored</div>
								</div>
							</div>
						</div>

						<!-- No Goals Message -->
						<div v-else-if="goals && goals.length === 0" class="bg-gray-900 rounded-lg p-4 md:p-6">
							<div class="text-center text-gray-400">
								<UIcon name="i-lucide-target" class="text-3xl mb-2" />
								<p>No goals recorded for this match</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { TMatch, TMatchEvent } from "~/types/match";
import TeamNameAndLogo from "~/components/ui/TeamNameAndLogo.vue";
import { ref, onMounted, computed } from "vue";

const route = useRoute();
const matchId = route.params.id as string;

const match = ref<TMatch | null>(null);
const goals = ref<TMatchEvent[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Computed properties for goals
const homeTeamGoals = computed(() => {
	if (!match.value || !goals.value) return [];
	return goals.value
		.filter(goal => goal.teamId === match.value!.homeTeam._id && goal.eventType === "goal")
		.reduce((acc: TMatchEvent[], goal) => {
			const existingPlayer = acc.find(g => g.playerId._id === goal.playerId._id);
			if (!existingPlayer) {
				acc.push(goal);
			}
			return acc;
		}, [])
		.sort((a, b) => {
			const aGoalCount = getGoalCount(a.playerId._id, match.value!.homeTeam._id);
			const bGoalCount = getGoalCount(b.playerId._id, match.value!.homeTeam._id);
			return bGoalCount - aGoalCount; // Sort by highest score first
		});
});

const awayTeamGoals = computed(() => {
	if (!match.value || !goals.value) return [];
	return goals.value
		.filter(goal => goal.teamId === match.value!.awayTeam._id && goal.eventType === "goal")
		.reduce((acc: TMatchEvent[], goal) => {
			const existingPlayer = acc.find(g => g.playerId._id === goal.playerId._id);
			if (!existingPlayer) {
				acc.push(goal);
			}
			return acc;
		}, [])
		.sort((a, b) => {
			const aGoalCount = getGoalCount(a.playerId._id, match.value!.awayTeam._id);
			const bGoalCount = getGoalCount(b.playerId._id, match.value!.awayTeam._id);
			return bGoalCount - aGoalCount; // Sort by highest score first
		});
});

const formatDetailedDate = (dateString: string) => {
	if (!dateString) return "TBD";
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

const getMatchStatus = (match: TMatch) => {
	if (match.result) return "Completed";
	const now = new Date();
	const matchDate = new Date(match.date);
	return matchDate > now ? "Upcoming" : "In Progress";
};

const getGoalCount = (playerId: string, teamId: string) => {
	if (!goals.value) return 0;
	return goals.value.filter(
		goal => goal.playerId._id === playerId && goal.teamId === teamId && goal.eventType === "goal"
	).length;
};

const fetchMatch = async () => {
	try {
		isLoading.value = true;
		error.value = null;

		// Fetch match details from API
		const matchResponse = await fetch(`/api/matches/${matchId}`);
		if (!matchResponse.ok) {
			throw new Error("Failed to fetch match details");
		}

		match.value = await matchResponse.json();

		// Fetch match events/goals if match is completed
		if (match.value?.result) {
			try {
				const eventsResponse = await fetch(`/api/matches/${matchId}/events`);
				if (eventsResponse.ok) {
					goals.value = await eventsResponse.json();
				}
			} catch (eventsError) {
				console.warn("Could not fetch match events:", eventsError);
				// Don't throw error here, just continue without events
			}
		}
	} catch (err) {
		console.error("Error fetching match:", err);
		error.value = err instanceof Error ? err.message : "Failed to load match details";
	} finally {
		isLoading.value = false;
	}
};

onMounted(() => {
	fetchMatch();
});
</script>
