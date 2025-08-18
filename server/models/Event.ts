import mongoose, { type Document, Schema } from 'mongoose';
import type { IMatch } from './Match';
import type { IUser } from './User';

export type EventType = 'foul' | 'goal' | 'save' | 'assist' | 'substitution' | 'yellow-card' | 'red-card' | 'corner' | 'throw-in' | 'free-kick' | 'penalty';

export interface IEvent extends Document {
  _id: mongoose.Types.ObjectId;
  matchId: mongoose.Types.ObjectId | IMatch;
  playerId: mongoose.Types.ObjectId | IUser;
  eventType: EventType;
  timestamp: Date; // when event happened in match
  minute: number; // e.g. 45 for 45th minute
  createdAt: Date;
}

const eventSchema = new Schema<IEvent>({
  matchId: {
    type: Schema.Types.ObjectId,
    ref: 'Match',
    required: true,
  },
  playerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventType: {
    type: String,
    required: true,
    enum: ['foul', 'goal', 'save', 'assist', 'substitution', 'yellow-card', 'red-card', 'corner', 'throw-in', 'free-kick', 'penalty'],
  },
  timestamp: {
    type: Date,
    required: true,
  },
  minute: {
    type: Number,
    required: true,
    min: 0,
    max: 120, // Including extra time
  },
}, {
  timestamps: { createdAt: true, updatedAt: false }, // Only track creation time
});

// Index for efficient queries
eventSchema.index({ matchId: 1, minute: 1 });
eventSchema.index({ playerId: 1 });

export const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);
