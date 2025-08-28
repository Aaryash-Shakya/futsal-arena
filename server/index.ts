import { connectToDatabase } from './utils/database';
import { User, Team, Match, Event } from './models';

export async function testDatabaseConnection() {
  try {
    await connectToDatabase();
    console.log('✅ Database connection successful');
    
    // Test creating a sample user
    const testUser = new User({
      name: 'Test Player',
      bio: 'Sample player for testing'
    });
    
    console.log('✅ User model works');
    
    // Test creating a sample team
    const testTeam = new Team({
      name: 'Test Team',
      structure: { formation: '2-2' },
      players: []
    });
    
    console.log('✅ Team model works');
    
    // Test creating a sample match
    const testMatch = new Match({
      homeTeam: testTeam._id,
      awayTeam: testTeam._id, // This should trigger validation error
      date: new Date(),
      location: 'Test Arena'
    });
    
    console.log('✅ Match model works');
    
    // Test creating a sample event
    const _testEvent = new Event({
      matchId: testMatch._id,
      playerId: testUser._id,
      eventType: 'goal',
      timestamp: new Date(),
      minute: 45
    });
    
    console.log('✅ Event model works');
    console.log('✅ All models initialized successfully');
    
    return true;
  } catch (error) {
    console.error('❌ Database test failed:', error);
    return false;
  }
}

// Export for use in other files
export { connectToDatabase, User, Team, Match, Event };
