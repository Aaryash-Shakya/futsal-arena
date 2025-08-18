import { connectToDatabase } from "../../utils/database";
import { Match } from "../../models";

export default defineEventHandler(async event => {
	try {
		await connectToDatabase();

		if (event.method === "GET") {
			// Get all matches with populated team details
			const matches = await Match.find()
				.populate("homeTeam", "name")
				.populate("awayTeam", "name")
				.populate("result.winner", "name")
				.sort({ date: 1 });

			const sortedMatches = matches.sort((a, b) => {
				if (!a.date && !b.date) return 0; // both null, equal
				if (!a.date) return 1; // a is null → put after b
				if (!b.date) return -1; // b is null → put after a
				return a.date - b.date; // both exist → ascending
			});
			return sortedMatches;
		}

		if (event.method === "POST") {
			// Create new match
			const body = await readBody(event);

			if (!body.homeTeam || !body.awayTeam || !body.date || !body.location) {
				throw createError({
					statusCode: 400,
					statusMessage: "homeTeam, awayTeam, date, and location are required",
				});
			}

			if (body.homeTeam === body.awayTeam) {
				throw createError({
					statusCode: 400,
					statusMessage: "Home team and away team cannot be the same",
				});
			}

			const match = new Match({
				homeTeam: body.homeTeam,
				awayTeam: body.awayTeam,
				date: new Date(body.date),
				location: body.location,
				result: body.result,
			});

			const savedMatch = await match.save();
			await savedMatch.populate([
				{ path: "homeTeam", select: "name" },
				{ path: "awayTeam", select: "name" },
				{ path: "result.winner", select: "name" },
			]);

			return savedMatch;
		}

		throw createError({
			statusCode: 405,
			statusMessage: "Method not allowed",
		});
	} catch (error) {
		console.error("Matches API error:", error);

		if (error && typeof error === "object" && "statusCode" in error) {
			throw error;
		}

		throw createError({
			statusCode: 500,
			statusMessage: "Internal server error",
		});
	}
});
