import { connectToDatabase } from '../../utils/database';
import { Event } from '../../models';

export default defineEventHandler(async (event) => {
  try {
    await connectToDatabase();

    if (event.method === 'GET') {
      // Get all events with populated match and player details
      const query = getQuery(event);
      const filter: Record<string, unknown> = {};

      // Filter by match if matchId is provided
      if (query.matchId) {
        filter.matchId = query.matchId;
      }

      // Filter by player if playerId is provided
      if (query.playerId) {
        filter.playerId = query.playerId;
      }

      const events = await Event.find(filter)
        .populate('matchId', 'homeTeam awayTeam date location')
        .populate('playerId', 'name')
        .sort({ timestamp: -1 });
      
      return events;
    }

    if (event.method === 'POST') {
      // Create new event
      const body = await readBody(event);
      
      if (!body.matchId || !body.playerId || !body.eventType || !body.timestamp || body.minute === undefined) {
        throw createError({
          statusCode: 400,
          statusMessage: 'matchId, playerId, eventType, timestamp, and minute are required',
        });
      }

      const newEvent = new Event({
        matchId: body.matchId,
        playerId: body.playerId,
        eventType: body.eventType,
        timestamp: new Date(body.timestamp),
        minute: body.minute,
      });

      const savedEvent = await newEvent.save();
      await savedEvent.populate([
        { path: 'matchId', select: 'homeTeam awayTeam date location' },
        { path: 'playerId', select: 'name' }
      ]);
      
      return savedEvent;
    }

    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed',
    });
  } catch (error) {
    console.error('Events API error:', error);
    
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
});
