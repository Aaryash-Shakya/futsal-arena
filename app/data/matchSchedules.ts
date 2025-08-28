import type { TeamName } from "./teamStandings";

export interface MatchSchedule {
	date: string;
	homeTeam: TeamName;
	awayTeam: TeamName;
	result?: {
		home: number;
		away: number;
	};
	note?: string;
}

export const matchSchedules: MatchSchedule[] = [
	{
		date: "19 Aug, 2025",
		homeTeam: "Team Alok",
		awayTeam: "Team Samrat",
		note: "Opening Game",
	},
	{
		date: "22 Aug, 2025",
		homeTeam: "Team Saroj",
		awayTeam: "Team Samrat",
	},
	{
		date: "TBD",
		homeTeam: "Team Samrat",
		awayTeam: "Team Alok",
	},
	{
		date: "TBD",
		homeTeam: "Team Samrat",
		awayTeam: "Team Saroj",
	},
	{
		date: "TBD",
		homeTeam: "Team Alok",
		awayTeam: "Team Saroj",
	},
	{
		date: "TBD",
		homeTeam: "Team Saroj",
		awayTeam: "Team Alok",
	},
];
