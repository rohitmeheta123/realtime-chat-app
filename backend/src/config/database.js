import mongoose from 'mongoose';

/**
 * Connect to MongoDB database using process.env.MONGODB_URI
 */
export const connectDB = async () => {
  try {
    const connString = process.env.MONGODB_URI || 'mongodb://localhost:27017/realtime_chat';
    const conn = await mongoose.connect(connString);
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database] MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};
