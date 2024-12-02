// models/Ride.js

import mongoose from 'mongoose';

// Define the Ride schema
const rideSchema = new mongoose.Schema({
  Ridesource: { type: String, required: true },
  Ridedestination: { type: String, required: true },
  rideDate: { type: Date, required: true },
  rideTime: { type: String, required: true },
  carType: { type: String, required: true },
}, { timestamps: true });

// Create the Ride model
const Ride = mongoose.models.Ride || mongoose.model('Ride', rideSchema);

export default Ride;
