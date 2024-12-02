import React from 'react';
import Image from 'next/image';
import { HiUser } from 'react-icons/hi2'; // Import the HiUser icon

function RideListItem({ ride, carDetails }) {
    return (
        <div className="flex items-center gap-5 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Display car image if available */}
            {carDetails.image && (
                <Image
                    src={carDetails.image}
                    alt={`Image of ${ride.carType}`}
                    width={80}
                    height={80}
                    className="rounded-md"
                />
            )}
            <div className="flex flex-col flex-1">
                <h2 className="font-semibold text-[18px] text-gray-800">{ride.carType}</h2>
                <div className="mt-2 flex flex-col gap-1">
                    <p className="font-medium text-[16px] text-gray-700"><strong>Source:</strong> {ride.Ridesource}</p>
                    <p className="font-medium text-[16px] text-gray-700"><strong>Destination:</strong> {ride.Ridedestination}</p>
                    <div className="flex gap-5 mt-2">
                        <p className="text-gray-600"><strong>Date:</strong> {new Date(ride.rideDate).toLocaleDateString()}</p>
                        <p className="text-gray-600"><strong>Time:</strong> {ride.rideTime}</p>
                    </div>
                </div>
                {/* Seat capacity */}
                {carDetails.seat && (
                    <div className="mt-2 flex items-center gap-2 text-gray-600">
                        <HiUser className="text-gray-600" />
                        <span>{carDetails.seat} seats</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RideListItem;
