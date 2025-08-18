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
};
