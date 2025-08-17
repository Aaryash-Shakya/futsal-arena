export type TeamStanding = {
	id: number;
	name: string;
	wins: number;
	losses: number;
	draws: number;
	sequence: string[];
	logo: string;
};

export const teamStandings: TeamStanding[] = [
	{
		id: 1,
		name: "Team Alok",
		wins: 3,
		losses: 1,
		draws: 2,
		sequence: ["win", "draw", "win", "loss", "draw", "win"],
		logo: "/images/chelsea.png",
	},
	{
		id: 2,
		name: "Team Saroj",
		wins: 2,
		losses: 3,
		draws: 1,
		sequence: ["loss", "win", "loss", "draw", "win", "loss"],
		logo: "/images/arsenal.png",
	},
	{
		id: 3,
		name: "Team Samrat",
		wins: 4,
		losses: 0,
		draws: 2,
		sequence: ["draw", "win", "win", "draw", "win", "win"],
		logo: "/images/manchester.png",
	},
];
