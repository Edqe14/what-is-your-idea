/* eslint-disable no-console */
import mongoose from 'mongoose';

export * as Models from './model';
export { default as AI } from './ai';

if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));
} else {
  console.error('[FATAL] Missing MongoDB connection URI!');
}

export default mongoose;