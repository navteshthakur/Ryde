// Import the function to establish a database connection
import { connectToDatabase } from '@/utils/dbConnect';

// Import the Ride model
import Ride from '../../../models/Ride';

// GET method to retrieve a ride by its ID
export async function GET(req, { params }) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Extract the ride ID from the request parameters
    const { id } = params;

    // Find the ride by its ID
    const ride = await Ride.findById(id);

    // If the ride is not found, return a 404 response
    if (!ride) {
      return new Response(
        JSON.stringify({ error: 'Ride not found' }),
        { status: 404 }
      );
    }

    // If the ride is found, return it in a 200 response
    return new Response(JSON.stringify(ride), { status: 200 });
  } catch (error) {
    // Log any errors and return a 500 response
    console.error('Error fetching ride:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch ride' }),
      { status: 500 }
    );
  }
}

// PUT method to update a ride by its ID
export async function PUT(req, { params }) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Extract the ride ID from the request parameters
    const { id } = params;

    // Parse the request body to get the updates
    const updates = await req.json();

    // Find the ride by its ID and apply the updates
    const updatedRide = await Ride.findByIdAndUpdate(id, updates, { new: true });

    // If the ride is not found or update fails, return a 404 response
    if (!updatedRide) {
      return new Response(
        JSON.stringify({ error: 'Ride not found or update failed' }),
        { status: 404 }
      );
    }

    // If the update is successful, return the updated ride in a 200 response
    return new Response(JSON.stringify(updatedRide), { status: 200 });
  } catch (error) {
    // Log any errors and return a 500 response
    console.error('Error updating ride:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update ride' }),
      { status: 500 }
    );
  }
}

// DELETE method to delete a ride by its ID
export async function DELETE(req, { params }) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Extract the ride ID from the request parameters
    const { id } = params;

    // Find the ride by its ID and delete it
    const deletedRide = await Ride.findByIdAndDelete(id);

    // If the ride is not found or deletion fails, return a 404 response
    if (!deletedRide) {
      return new Response(
        JSON.stringify({ error: 'Ride not found or delete failed' }),
        { status: 404 }
      );
    }

    // If the deletion is successful, return a success message in a 200 response
    return new Response(JSON.stringify({ message: 'Ride deleted successfully' }), { status: 200 });
  } catch (error) {
    // Log any errors and return a 500 response
    console.error('Error deleting ride:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete ride' }),
      { status: 500 }
    );
  }
}
