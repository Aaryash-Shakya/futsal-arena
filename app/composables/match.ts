import type { TMatch } from "~/types/match";

export const listMatch = async (): Promise<TMatch[]> => {
	try {
		return await $fetch("/api/matches", { method: "GET" });
	} catch (error) {
		console.error("Error fetching matches:", error);
		throw new Error("Failed to fetch matches. Please try again later.");
	}
};
