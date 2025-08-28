import { connectToDatabase } from '../../utils/database';
import { User } from '../../models';

export default defineEventHandler(async (event) => {
  try {
    await connectToDatabase();

    if (event.method === 'GET') {
      // Get all users
      const users = await User.find().sort({ createdAt: -1 });
      return users;
    }

    if (event.method === 'POST') {
      // Create new user
      const body = await readBody(event);
      
      if (!body.name) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Name is required',
        });
      }

      const user = new User({
        name: body.name,
        bio: body.bio,
      });

      const savedUser = await user.save();
      return savedUser;
    }

    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed',
    });
  } catch (error) {
    console.error('Users API error:', error);
    
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
});
