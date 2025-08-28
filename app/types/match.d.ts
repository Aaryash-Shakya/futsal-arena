export type TMatchEvent = {
	_id: string;
	matchId: string;
	playerId: {
		_id: string;
		name: string;
	};
	teamId: string;
	eventType: 'goal' | 'save';
	createdAt: string;
};

export type TMatch = {
	_id: string;
	homeTeam: {
		_id: string;
		name: string;
	};
	awayTeam: {
		_id: string;
		name: string;
	};
	date: string;
	location: string;
	result?: {
		homeScore: number;
		awayScore: number;
		winner?: {
			_id: string;
			name: string;
		};
	};
	events?: TMatchEvent[];
};
