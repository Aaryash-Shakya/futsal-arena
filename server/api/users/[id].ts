import { connectToDatabase } from '../../utils/database';
import { User } from '../../models';

export default defineEventHandler(async (event) => {
  try {
    await connectToDatabase();
    
    const userId = getRouterParam(event, 'id');

    if (!userId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User ID is required',
      });
    }

    if (event.method === 'GET') {
      // Get single user
      const user = await User.findById(userId);
      
      if (!user) {
        throw createError({
          statusCode: 404,
          statusMessage: 'User not found',
        });
      }

      return user;
    }

    if (event.method === 'PUT') {
      // Update user
      const body = await readBody(event);
      
      const user = await User.findByIdAndUpdate(
        userId,
        { 
          name: body.name,
          bio: body.bio,
        },
        { new: true, runValidators: true }
      );

      if (!user) {
        throw createError({
          statusCode: 404,
          statusMessage: 'User not found',
        });
      }

      return user;
    }

    if (event.method === 'DELETE') {
      // Delete user
      const user = await User.findByIdAndDelete(userId);

      if (!user) {
        throw createError({
          statusCode: 404,
          statusMessage: 'User not found',
        });
      }

      return { message: 'User deleted successfully' };
    }

    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed',
    });
  } catch (error) {
    console.error('User API error:', error);
    
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
});
