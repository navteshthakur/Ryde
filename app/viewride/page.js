'use client';
import { useState, useEffect } from 'react';

const ViewRidePage = () => {
    const [rides, setRides] = useState([]);
    const [selectedRide, setSelectedRide] = useState(null);
    const [formData, setFormData] = useState({
        Ridesource: '',
        Ridedestination: '',
        rideDate: '',
        rideTime: '',
        carType: '',
    });

    // Fetch all rides
    const fetchRides = async () => {
        try {
            const response = await fetch('/api/ride');
            const data = await response.json();
            setRides(data);
        } catch (error) {
            console.error('Error fetching rides:', error);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Update a ride
    const handleUpdateRide = async () => {
        if (!selectedRide) return;

        try {
            const response = await fetch(`/api/ride/${selectedRide._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update ride');
            }

            fetchRides();
            setSelectedRide(null);
            setFormData({
                Ridesource: '',
                Ridedestination: '',
                rideDate: '',
                rideTime: '',
                carType: '',
            });
        } catch (error) {
            console.error('Error updating ride:', error);
        }
    };

    // Delete a ride
    const handleDeleteRide = async (id) => {
        try {
            const response = await fetch(`/api/ride/${id}`, { method: 'DELETE' });

            if (!response.ok) {
                throw new Error('Failed to delete ride');
            }

            fetchRides();
        } catch (error) {
            console.error('Error deleting ride:', error);
        }
    };

    // Populate form for editing
    const handleEdit = (ride) => {
        setSelectedRide(ride);
        setFormData({
            Ridesource: ride.Ridesource,
            Ridedestination: ride.Ridedestination,
            rideDate: new Date(ride.rideDate).toISOString().split('T')[0], // Format to YYYY-MM-DD
            rideTime: ride.rideTime,
            carType: ride.carType,
        });
    };

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
                        {['Ridesource', 'Ridedestination', 'rideDate', 'rideTime', 'carType'].map((field, index) => (
                            <div key={index} className="mb-4">
                                <label className="block text-sm font-medium mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                                <input
                                    type={field === 'rideDate' ? 'date' : field === 'rideTime' ? 'time' : 'text'}
                                    name={field}
                                    value={formData[field]}
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
                    {rides.map((ride) => (
                        <li key={ride._id} className="bg-white border border-gray-200 shadow-lg rounded-lg p-4 flex justify-between items-start relative transition transform hover:scale-105 hover:shadow-xl">
                            <div className="flex flex-col space-y-2 w-3/4">
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
                                    src="/banneredit.jpg"
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

export default ViewRidePage;
