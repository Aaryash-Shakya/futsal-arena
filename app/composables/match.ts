import type { TMatch } from "~/types/match";

export const listMatch = async (): Promise<TMatch[]> => {
	try {
		return await $fetch("/api/matches", { method: "GET" });
	} catch (error) {
		console.error("Error fetching matches:", error);
		throw new Error("Failed to fetch matches. Please try again later.");
	}
};

export const useMatches = () => {
	const matches = ref<TMatch[]>([]);
	const isLoading = ref(false);
	const error = ref<string | null>(null);

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

	const refetch = () => fetchMatches();

	return {
		matches: readonly(matches),
		isLoading: readonly(isLoading),
		error: readonly(error),
		fetchMatches,
		refetch,
	};
};
