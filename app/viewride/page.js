'use client'; // Indicates this component is client-side rendered.

import { useState, useEffect } from 'react';

const ViewRidePage = () => {
    // State variables
    const [rides, setRides] = useState([]); // Stores the list of available rides.
    const [selectedRide, setSelectedRide] = useState(null); // Stores the ride currently being edited.
    const [formData, setFormData] = useState({
        Ridesource: '', // Starting location of the ride.
        Ridedestination: '', // Destination of the ride.
        rideDate: '', // Date of the ride.
        rideTime: '', // Time of the ride.
        carType: '', // Type of car used for the ride.
    });

    // Fetch all rides from the server
    const fetchRides = async () => {
        try {
            const response = await fetch('/api/ride'); // API endpoint to fetch rides.
            const data = await response.json(); // Parse the response.
            setRides(data); // Update the rides state.
        } catch (error) {
            console.error('Error fetching rides:', error); // Handle fetch errors.
        }
    };

    // Handle input changes for the edit form
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value, // Update the respective field in the form data.
        });
    };

    // Update a ride on the server
    const handleUpdateRide = async () => {
        if (!selectedRide) return; // Exit if no ride is selected.

        try {
            const response = await fetch(`/api/ride/${selectedRide._id}`, {
                method: 'PUT', // Update request.
                headers: {
                    'Content-Type': 'application/json', // Indicate JSON payload.
                },
                body: JSON.stringify(formData), // Send updated ride details.
            });

            if (!response.ok) {
                throw new Error('Failed to update ride'); // Handle update failure.
            }

            fetchRides(); // Refresh the rides list.
            setSelectedRide(null); // Reset the selected ride.
            setFormData({
                Ridesource: '',
                Ridedestination: '',
                rideDate: '',
                rideTime: '',
                carType: '',
            }); // Reset the form.
        } catch (error) {
            console.error('Error updating ride:', error); // Handle update errors.
        }
    };

    // Delete a ride from the server
    const handleDeleteRide = async (id) => {
        try {
            const response = await fetch(`/api/ride/${id}`, { method: 'DELETE' }); // Delete request.

            if (!response.ok) {
                throw new Error('Failed to delete ride'); // Handle deletion failure.
            }

            fetchRides(); // Refresh the rides list.
        } catch (error) {
            console.error('Error deleting ride:', error); // Handle deletion errors.
        }
    };

    // Populate the form with ride data for editing
    const handleEdit = (ride) => {
        setSelectedRide(ride); // Set the ride being edited.
        setFormData({
            Ridesource: ride.Ridesource,
            Ridedestination: ride.Ridedestination,
            rideDate: new Date(ride.rideDate).toISOString().split('T')[0], // Format date to YYYY-MM-DD.
            rideTime: ride.rideTime,
            carType: ride.carType,
        });
    };

    // Fetch rides when the component mounts
    useEffect(() => {
        fetchRides();
    }, []);

    return (
        <div className="p-8 bg-red-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">Edit or Delete Rides</h1>

            {/* Edit Form */}
            {selectedRide && (
                <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Update Ride Details</h2>
                    <form>
                        {/* Generate input fields dynamically */}
                        {['Ridesource', 'Ridedestination', 'rideDate', 'rideTime', 'carType'].map((field, index) => (
                            <div key={index} className="mb-4">
                                <label className="block text-sm font-medium mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                                <input
                                    type={field === 'rideDate' ? 'date' : field === 'rideTime' ? 'time' : 'text'} // Determine input type.
                                    name={field}
                                    value={formData[field]} // Bind form data.
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        ))}
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={handleUpdateRide}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                            >
                                Update Ride
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedRide(null)}
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Rides List */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Available Rides</h2>
                <ul className="space-y-4">
                    {/* Render each ride */}
                    {rides.map((ride) => (
                        <li
                            key={ride._id}
                            className="bg-white border border-gray-200 shadow-lg rounded-lg p-4 flex justify-between items-start relative transition transform hover:scale-105 hover:shadow-xl"
                        >
                            <div className="flex flex-col space-y-2 w-3/4">
                                {/* Display ride details */}
                                <p className="text-gray-800 font-semibold">
                                    <strong>Source:</strong> {ride.Ridesource}
                                </p>
                                <p className="text-gray-800 font-semibold">
                                    <strong>Destination:</strong> {ride.Ridedestination}
                                </p>
                                <p className="text-gray-800 font-semibold">
                                    <strong>Date:</strong> {new Date(ride.rideDate).toLocaleDateString()}
                                </p>
                                <p className="text-gray-800 font-semibold">
                                    <strong>Time:</strong> {ride.rideTime}
                                </p>
                                <p className="text-gray-800 font-semibold">
                                    <strong>Car Type:</strong> {ride.carType}
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-3 w-1/4">
                                {/* Action buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleEdit(ride)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteRide(ride._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <img
                                    src="/banneredit.jpg" // Placeholder image for visual enhancement.
                                    alt="Ride background"
                                    className="w-full h-20 object-cover rounded-lg mt-2"
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ViewRidePage; // Export the component for use in the application.
