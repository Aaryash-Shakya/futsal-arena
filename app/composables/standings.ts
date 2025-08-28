import type { TTeamStanding } from "~/types/team";

export const fetchTeamStandings = async (): Promise<TTeamStanding[]> => {
	try {
		return await $fetch("/api/teams/standings", { method: "GET" });
	} catch (error) {
		console.error("Error fetching team standings:", error);
		throw new Error("Failed to fetch team standings. Please try again later.");
	}
};

export const useTeamStandings = () => {
	const standings = ref<TTeamStanding[]>([]);
	const isLoading = ref(false);
	const error = ref<string | null>(null);

	const fetchStandings = async () => {
		try {
			isLoading.value = true;
			error.value = null;
			standings.value = await fetchTeamStandings();
		} catch (err) {
			console.error("Error fetching standings:", err);
			error.value = err instanceof Error ? err.message : "Failed to load standings";
		} finally {
			isLoading.value = false;
		}
	};

	const refetch = () => fetchStandings();

	return {
		standings,
		isLoading,
		error,
		fetchStandings,
		refetch,
	};
};
