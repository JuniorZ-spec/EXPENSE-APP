import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/types';

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const User = mongoose.model<IUser>('User', UserSchema);