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
