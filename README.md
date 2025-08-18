# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


# Futsal Arena API Documentation

This document describes the REST API endpoints for the Futsal Arena project built with Nuxt 3 and MongoDB.

## Prerequisites

1. MongoDB installed and running locally or a MongoDB Atlas connection string
2. Node.js and Yarn installed
3. Environment variables configured

## Setup

1. Install dependencies:
```bash
yarn install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the MongoDB URI in your `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/futsal-arena
```

4. Start the development server:
```bash
yarn dev
```

## API Endpoints

### Users

#### Get All Users
- **GET** `/api/users`
- **Response**: Array of user objects

#### Create User
- **POST** `/api/users`
- **Body**:
```json
{
  "name": "John Doe",
  "bio": "Professional futsal player"
}
```

#### Get User by ID
- **GET** `/api/users/{id}`
- **Response**: User object

#### Update User
- **PUT** `/api/users/{id}`
- **Body**: Partial user object

#### Delete User
- **DELETE** `/api/users/{id}`

### Teams

#### Get All Teams
- **GET** `/api/teams`
- **Response**: Array of team objects with populated players

#### Create Team
- **POST** `/api/teams`
- **Body**:
```json
{
  "name": "Arsenal FC",
  "structure": {
    "formation": "2-2",
    "captain": "user_id"
  },
  "players": ["user_id_1", "user_id_2"]
}
```

#### Get Team by ID
- **GET** `/api/teams/{id}`
- **Response**: Team object with populated players

#### Update Team
- **PUT** `/api/teams/{id}`
- **Body**: Partial team object

#### Delete Team
- **DELETE** `/api/teams/{id}`

### Matches

#### Get All Matches
- **GET** `/api/matches`
- **Response**: Array of match objects with populated teams

#### Create Match
- **POST** `/api/matches`
- **Body**:
```json
{
  "homeTeam": "team_id_1",
  "awayTeam": "team_id_2",
  "date": "2024-12-25T18:00:00Z",
  "location": "Futsal Arena A",
  "result": {
    "homeScore": 3,
    "awayScore": 2,
    "winner": "team_id_1"
  }
}
```

#### Get Match by ID
- **GET** `/api/matches/{id}`
- **Response**: Match object with populated teams

#### Update Match
- **PUT** `/api/matches/{id}`
- **Body**: Partial match object

#### Delete Match
- **DELETE** `/api/matches/{id}`

#### Get Match Events
- **GET** `/api/matches/{matchId}/events`
- **Response**: Array of events for the specific match

### Events

#### Get All Events
- **GET** `/api/events`
- **Query Parameters**:
  - `matchId`: Filter events by match
  - `playerId`: Filter events by player
- **Response**: Array of event objects

#### Create Event
- **POST** `/api/events`
- **Body**:
```json
{
  "matchId": "match_id",
  "playerId": "player_id",
  "eventType": "goal",
  "timestamp": "2024-12-25T18:30:00Z",
  "minute": 30
}
```

#### Get Event by ID
- **GET** `/api/events/{id}`
- **Response**: Event object

#### Update Event
- **PUT** `/api/events/{id}`
- **Body**: Partial event object

#### Delete Event
- **DELETE** `/api/events/{id}`

## Data Models

### User
```typescript
{
  _id: ObjectId,
  name: string,
  bio?: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Team
```typescript
{
  _id: ObjectId,
  name: string,
  structure: object, // lineup, roles, etc.
  players: ObjectId[] (User),
  createdAt: Date,
  updatedAt: Date
}
```

### Match
```typescript
{
  _id: ObjectId,
  homeTeam: ObjectId (Team),
  awayTeam: ObjectId (Team),
  date: Date,
  location: string,
  result?: {
    homeScore: number,
    awayScore: number,
    winner?: ObjectId (Team)
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Event
```typescript
{
  _id: ObjectId,
  matchId: ObjectId (Match),
  playerId: ObjectId (User),
  eventType: "foul" | "goal" | "save" | "assist" | "substitution" | "yellow-card" | "red-card" | "corner" | "throw-in" | "free-kick" | "penalty",
  timestamp: Date,
  minute: number,
  createdAt: Date
}
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 400: Bad Request (validation errors)
- 404: Not Found
- 405: Method Not Allowed
- 500: Internal Server Error

Error responses include a `statusMessage` field with details about the error.

## Database Relations

- **Team.players** references **User._id**
- **Match.homeTeam** and **Match.awayTeam** reference **Team._id**
- **Match.result.winner** references **Team._id**
- **Event.matchId** references **Match._id**
- **Event.playerId** references **User._id**

## Development Notes

- The API uses Mongoose for MongoDB integration
- All timestamps are automatically managed using Mongoose's `timestamps` option
- Input validation is performed at the schema level
- Population is used to include related data in responses
- The project structure is extensible for adding more features like player statistics, league standings, etc.
