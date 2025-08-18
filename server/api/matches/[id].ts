import { connectToDatabase } from '../../utils/database';
import { Match } from '../../models';

export default defineEventHandler(async (event) => {
  try {
    await connectToDatabase();
    
    const matchId = getRouterParam(event, 'id');

    if (!matchId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Match ID is required',
      });
    }

    if (event.method === 'GET') {
      // Get single match with populated team details
      const match = await Match.findById(matchId)
        .populate('homeTeam', 'name players')
        .populate('awayTeam', 'name players')
        .populate('result.winner', 'name');
      
      if (!match) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Match not found',
        });
      }

      return match;
    }

    if (event.method === 'PUT') {
      // Update match
      const body = await readBody(event);
      
      // Validate that home and away teams are different if both are provided
      if (body.homeTeam && body.awayTeam && body.homeTeam === body.awayTeam) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Home team and away team cannot be the same',
        });
      }

      const updateData: Record<string, unknown> = {};
      
      if (body.homeTeam) updateData.homeTeam = body.homeTeam;
      if (body.awayTeam) updateData.awayTeam = body.awayTeam;
      if (body.date) updateData.date = new Date(body.date);
      if (body.location) updateData.location = body.location;
      if (body.result) updateData.result = body.result;

      const match = await Match.findByIdAndUpdate(
        matchId,
        updateData,
        { new: true, runValidators: true }
      ).populate([
        { path: 'homeTeam', select: 'name' },
        { path: 'awayTeam', select: 'name' },
        { path: 'result.winner', select: 'name' }
      ]);

      if (!match) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Match not found',
        });
      }

      return match;
    }

    if (event.method === 'DELETE') {
      // Delete match
      const match = await Match.findByIdAndDelete(matchId);

      if (!match) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Match not found',
        });
      }

      return { message: 'Match deleted successfully' };
    }

    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed',
    });
  } catch (error) {
    console.error('Match API error:', error);
    
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
});
