import { connectToDatabase } from '../../utils/database';
import { Team } from '../../models';

export default defineEventHandler(async (event) => {
  try {
    await connectToDatabase();

    if (event.method === 'GET') {
      // Get all teams with populated players
      const teams = await Team.find()
        .populate('players', 'name bio')
        .sort({ createdAt: -1 });
      return teams;
    }

    if (event.method === 'POST') {
      // Create new team
      const body = await readBody(event);
      
      if (!body.name) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Team name is required',
        });
      }

      const team = new Team({
        name: body.name,
        structure: body.structure || {},
        players: body.players || [],
      });

      const savedTeam = await team.save();
      await savedTeam.populate('players', 'name bio');
      
      return savedTeam;
    }

    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed',
    });
  } catch (error) {
    console.error('Teams API error:', error);
    
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
});
