import mongoose, { type Document, Schema } from 'mongoose';
import type { IMatch } from './Match';
import type { IUser } from './User';

export type EventType = 'goal' | 'save';

export interface IEvent extends Document {
  _id: mongoose.Types.ObjectId;
  matchId: mongoose.Types.ObjectId | IMatch;
  playerId: mongoose.Types.ObjectId | IUser;
  teamId: mongoose.Types.ObjectId;
  eventType: EventType;
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
  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  eventType: {
    type: String,
    required: true,
    enum: ['goal', 'save'],
  },
}, {
  timestamps: { createdAt: true, updatedAt: false }, // Only track creation time
});

// Index for efficient queries
eventSchema.index({ matchId: 1 });
eventSchema.index({ playerId: 1 });
eventSchema.index({ teamId: 1 });

export const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);
