import mongoose, { type Document, Schema } from 'mongoose';
import type { IUser } from './User';

export interface ITeam extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  structure: Record<string, unknown>; // lineup, roles, etc.
  players: mongoose.Types.ObjectId[] | IUser[];
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  structure: {
    type: Schema.Types.Mixed,
    default: {},
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

export const Team = mongoose.models.Team || mongoose.model<ITeam>('Team', teamSchema);
