// Import the function to establish a database connection
import { connectToDatabase } from '@/utils/dbConnect';

// Import the Ride model
import Ride from '../../models/Ride';

// GET method to retrieve all rides for a specific user
export async function GET(req) {
    try {
        // Connect to the database
        await connectToDatabase();

        // Parse the URL to extract query parameters
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId'); // Extract user ID from the query string

        // Query the database for rides created by the specified user
        const rides = await Ride.find({ creatorId: userId });

        // Return the retrieved rides in a 200 response
        return new Response(JSON.stringify(rides), {
            status: 200,
        });
    } catch (error) {
        // Log any errors and return a 500 response
        console.error('Error fetching rides:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch rides' }),
            { status: 500 }
        );
    }
}

// POST method to create a new ride
export async function POST(req) {
    try {
        // Connect to the database
        await connectToDatabase();

        // Parse the request body to extract ride details
        const { Ridesource, Ridedestination, rideDate, rideTime, carType } = await req.json();

        // Validate that all required fields are provided
        if (!Ridesource || !Ridedestination || !rideDate || !rideTime || !carType) {
            return new Response(
                JSON.stringify({ error: 'All fields are required' }),
                { status: 400 } // Bad Request
            );
        }

        // Create a new ride instance with the provided details
        const newRide = new Ride({
            Ridesource,
            Ridedestination,
            rideDate,
            rideTime,
            carType,
        });

        // Save the new ride to the database
        const savedRide = await newRide.save();

        // Return the saved ride in a 201 response
        return new Response(JSON.stringify(savedRide), { status: 201 });
    } catch (error) {
        // Log any errors and return a 500 response
        console.error('Error creating ride:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to create ride' }),
            { status: 500 }
        );
    }
}
