// utils/dbConnect.js

// Import the Mongoose library for working with MongoDB
import mongoose from 'mongoose';

// Retrieve the MongoDB URI from environment variables or fall back to a default local URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp'; // Use your MongoDB URI

/**
 * Function to connect to the MongoDB database
 * Ensures the connection is established only if it isn't already active
 */
export const connectToDatabase = async () => {
  // Check if a connection is already established (readyState >= 1 means connected or connecting)
  if (mongoose.connection.readyState >= 1) return;

  try {
    // Attempt to connect to the database with recommended connection options
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB'); // Log success message
  } catch (error) {
    // Log and rethrow the error if connection fails
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to database');
  }
};
