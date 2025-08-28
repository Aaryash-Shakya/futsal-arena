import { connectToDatabase } from '../../utils/database';
import { Team } from '../../models';

export default defineEventHandler(async (event) => {
  try {
    await connectToDatabase();
    
    const teamId = getRouterParam(event, 'id');

    if (!teamId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Team ID is required',
      });
    }

    if (event.method === 'GET') {
      // Get single team with populated players
      const team = await Team.findById(teamId)
        .populate('players', 'name bio');
      
      if (!team) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Team not found',
        });
      }

      return team;
    }

    if (event.method === 'PUT') {
      // Update team
      const body = await readBody(event);
      
      const team = await Team.findByIdAndUpdate(
        teamId,
        { 
          name: body.name,
          structure: body.structure,
          players: body.players,
        },
        { new: true, runValidators: true }
      ).populate('players', 'name bio');

      if (!team) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Team not found',
        });
      }

      return team;
    }

    if (event.method === 'DELETE') {
      // Delete team
      const team = await Team.findByIdAndDelete(teamId);

      if (!team) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Team not found',
        });
      }

      return { message: 'Team deleted successfully' };
    }

    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed',
    });
  } catch (error) {
    console.error('Team API error:', error);
    
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
});
