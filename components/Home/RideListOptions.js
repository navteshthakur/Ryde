import React, { useState, useEffect } from 'react';
import RideListItem from './RideListItem';
import { useRouter } from 'next/navigation';
import { CarListData } from '@/utils/CarListData'; // Import CarListData

function RideListOptions({ distance }) {
    const [rides, setRides] = useState([]);
    const [selectedRide, setSelectedRide] = useState(null);
    const router = useRouter();

    // Fetch rides when the component mounts
    useEffect(() => {
        fetchRides();
    }, []);

    const fetchRides = async () => {
        try {
            const response = await fetch('/api/ride');
            const data = await response.json();
            setRides(data);
        } catch (error) {
            console.error('Error fetching rides:', error);
        }
    };

    // Find the car details from CarListData based on the carType in the ride
    const getCarDetails = (carType) => {
        return CarListData.find((car) => car.name === carType) || {};
    };

    // Calculate total amount for the selected ride
    const calculateAmount = (ride) => {
        const carDetails = getCarDetails(ride.carType);
        if (!carDetails.amount) return 0; // Fallback if car details are not found
        return (carDetails.amount * distance).toFixed(2);
    };

    return (
        <div className="mt-5 p-5 overflow-auto h-[500px]">
            <h2 className="text-[22px] font-bold">Available Rides</h2>
            {rides.map((ride) => {
                const carDetails = getCarDetails(ride.carType);
                return (
                    <div
                        key={ride._id}
                        className={`cursor-pointer p-1 px-4 rounded-md border-[#800000] ${
                            selectedRide?._id === ride._id ? 'border-[2px]' : ''
                        }`}
                        onClick={() => setSelectedRide(ride)}
                    >
                        <RideListItem ride={ride} carDetails={carDetails} />
                    </div>
                );
            })}
            {selectedRide ? (
                <div className="flex justify-between fixed bottom-2 bg-white p-3 shadow-xl w-full md:w-[30%] border-[1px] items-center rounded-lg">
                    <h2>Make Payment to</h2>
                    <div className="flex items-center gap-2">
                        <p className="text-lg font-bold">Total Amount: ${calculateAmount(selectedRide)}</p>
                        <button
                            className="p-3 bg-black text-white rounded-lg text-center"
                            onClick={() =>
                                router.push('/payment?amount=' + calculateAmount(selectedRide))
                            }
                        >
                            Book {selectedRide.carType}
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default RideListOptions;
