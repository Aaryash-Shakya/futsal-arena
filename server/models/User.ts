import mongoose, { type Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
