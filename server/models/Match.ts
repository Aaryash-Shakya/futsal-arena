import mongoose, { type Document, Schema } from 'mongoose';
import type { ITeam } from './Team';

export interface IMatchResult {
  homeScore: number;
  awayScore: number;
  winner?: mongoose.Types.ObjectId | ITeam;
}

export interface IMatch extends Document {
  _id: mongoose.Types.ObjectId;
  homeTeam: mongoose.Types.ObjectId | ITeam;
  awayTeam: mongoose.Types.ObjectId | ITeam;
  date: Date;
  location: string;
  result?: IMatchResult;
  createdAt: Date;
  updatedAt: Date;
}

const matchResultSchema = new Schema<IMatchResult>({
  homeScore: {
    type: Number,
    required: true,
    min: 0,
  },
  awayScore: {
    type: Number,
    required: true,
    min: 0,
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
}, { _id: false });

const matchSchema = new Schema<IMatch>({
  homeTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  awayTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  result: {
    type: matchResultSchema,
  },
}, {
  timestamps: true,
});

// Validation to ensure home and away teams are different
matchSchema.pre('save', function(next) {
  if (this.homeTeam.toString() === this.awayTeam.toString()) {
    const error = new Error('Home team and away team cannot be the same');
    return next(error);
  }
  next();
});

export const Match = mongoose.models.Match || mongoose.model<IMatch>('Match', matchSchema);
