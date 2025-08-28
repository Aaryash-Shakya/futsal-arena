export type TTeam = {
	_id: string;
	name: string;
	structure: {
		formation: string;
	};
	players: [
		{
			_id: string;
			name: string;
		}
	];
	captain: string;
};

export type TTeamStanding = {
	_id: string;
	name: string;
	gamesPlayed: number;
	wins: number;
	draws: number;
	losses: number;
	goalsFor: number;
	goalsAgainst: number;
	goalDifference: number;
	points: number;
};
