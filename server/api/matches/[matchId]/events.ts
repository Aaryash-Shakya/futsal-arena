import { connectToDatabase } from '../../../utils/database';
import { Event, Team, User, Match } from '../../../models'; // All models needed for population

export default defineEventHandler(async (event) => {
  try {
    await connectToDatabase();
    
    // Ensure models are registered (for serverless environments)
    void Team;
    void User;
    void Match;
    
    const matchId = getRouterParam(event, 'matchId');

    if (!matchId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Match ID is required',
      });
    }

    if (event.method === 'GET') {
      // Get all events for a specific match
      const events = await Event.find({ matchId })
        .populate('playerId', 'name')
        .sort({ minute: 1, timestamp: 1 }); // Sort by minute and timestamp
      
      return events;
    }

    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed',
    });
  } catch (error) {
    console.error('Match events API error:', error);
    
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
});
