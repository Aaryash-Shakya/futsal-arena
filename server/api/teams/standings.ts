import { connectToDatabase } from '../../utils/database';
import { Team, Match } from '../../models';

export default defineEventHandler(async (event) => {
  try {
    await connectToDatabase();

    if (event.method === 'GET') {
      // Get all teams
      const teams = await Team.find().select('name');
      
      // Get all completed matches (matches with results)
      const matches = await Match.find({ result: { $exists: true } })
        .populate('homeTeam', 'name')
        .populate('awayTeam', 'name');

      // Calculate standings for each team
      const standings = [];

      for (const team of teams) {
        let wins = 0;
        let draws = 0;
        let losses = 0;
        let goalsFor = 0;
        let goalsAgainst = 0;

        // Calculate match results
        for (const match of matches) {
          if (!match.result) continue;

          const isHomeTeam = match.homeTeam._id.toString() === team._id.toString();
          const isAwayTeam = match.awayTeam._id.toString() === team._id.toString();

          if (isHomeTeam) {
            goalsFor += match.result.homeScore;
            goalsAgainst += match.result.awayScore;

            if (match.result.homeScore > match.result.awayScore) {
              wins++;
            } else if (match.result.homeScore === match.result.awayScore) {
              draws++;
            } else {
              losses++;
            }
          } else if (isAwayTeam) {
            goalsFor += match.result.awayScore;
            goalsAgainst += match.result.homeScore;

            if (match.result.awayScore > match.result.homeScore) {
              wins++;
            } else if (match.result.awayScore === match.result.homeScore) {
              draws++;
            } else {
              losses++;
            }
          }
        }

        const points = wins * 3 + draws;
        const gamesPlayed = wins + draws + losses;

        standings.push({
          _id: team._id,
          name: team.name,
          gamesPlayed,
          wins,
          draws,
          losses,
          goalsFor,
          goalsAgainst,
          goalDifference: goalsFor - goalsAgainst,
          points,
        });
      }

      // Sort by points (descending), then by goal difference (descending), then by goals for (descending)
      standings.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        return b.goalsFor - a.goalsFor;
      });

      return standings;
    }

    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed',
    });
  } catch (error) {
    console.error('Standings API error:', error);
    
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
});
