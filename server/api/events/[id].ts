import { connectToDatabase } from '../../utils/database';
import { Event } from '../../models';

export default defineEventHandler(async (event) => {
  try {
    await connectToDatabase();
    
    const eventId = getRouterParam(event, 'id');

    if (!eventId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Event ID is required',
      });
    }

    if (event.method === 'GET') {
      // Get single event with populated details
      const matchEvent = await Event.findById(eventId)
        .populate('matchId', 'homeTeam awayTeam date location')
        .populate('playerId', 'name');
      
      if (!matchEvent) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Event not found',
        });
      }

      return matchEvent;
    }

    if (event.method === 'PUT') {
      // Update event
      const body = await readBody(event);
      
      const updateData: Record<string, unknown> = {};
      
      if (body.matchId) updateData.matchId = body.matchId;
      if (body.playerId) updateData.playerId = body.playerId;
      if (body.eventType) updateData.eventType = body.eventType;
      if (body.timestamp) updateData.timestamp = new Date(body.timestamp);
      if (body.minute !== undefined) updateData.minute = body.minute;

      const matchEvent = await Event.findByIdAndUpdate(
        eventId,
        updateData,
        { new: true, runValidators: true }
      ).populate([
        { path: 'matchId', select: 'homeTeam awayTeam date location' },
        { path: 'playerId', select: 'name' }
      ]);

      if (!matchEvent) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Event not found',
        });
      }

      return matchEvent;
    }

    if (event.method === 'DELETE') {
      // Delete event
      const matchEvent = await Event.findByIdAndDelete(eventId);

      if (!matchEvent) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Event not found',
        });
      }

      return { message: 'Event deleted successfully' };
    }

    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed',
    });
  } catch (error) {
    console.error('Event API error:', error);
    
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
});
