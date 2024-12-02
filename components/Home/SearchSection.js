// Import necessary modules and components
import React, { useContext, useEffect, useState } from 'react';
import InputItem from './InputItem'; // Component for input fields
import { SourceContext } from '@/context/SourceContext'; // Context for source location
import { DestinationContext } from '@/context/DestinationContext'; // Context for destination location
import RideListOptions from './RideListOptions'; // Component to display ride options

function SearchSection() {
    // Access source and destination state from context
    const { source, setSource } = useContext(SourceContext);
    const { destination, setDestination } = useContext(DestinationContext);

    // State to store calculated distance
    const [distance, setDistance] = useState();

    // Function to calculate the distance between source and destination
    const calculateDistance = () => {
        if (!source || !destination) {
            console.error("Source or destination is missing");
            return;
        }

        // Helper function to validate if a point has valid latitude and longitude
        const isValidLatLng = (point) =>
            point && typeof point.lat === "number" && typeof point.lng === "number";

        // Check if source and destination coordinates are valid
        if (!isValidLatLng(source) || !isValidLatLng(destination)) {
            console.error("Invalid source or destination coordinates", { source, destination });
            return;
        }

        // Create LatLng objects for source and destination
        const sourceLatLng = new google.maps.LatLng(source.lat, source.lng);
        const destinationLatLng = new google.maps.LatLng(destination.lat, destination.lng);

        // Compute the distance between source and destination
        const dist = google.maps.geometry.spherical.computeDistanceBetween(
            sourceLatLng,
            destinationLatLng
        );

        // Convert the distance from meters to miles and update the state
        setDistance(dist * 0.000621371); // Conversion factor for meters to miles
    };

    // Log source and destination to the console when they change
    useEffect(() => {
        if (source) {
            console.log("Source:", source);
        }
        if (destination) {
            console.log("Destination:", destination);
        }
    }, [source, destination]);

    return (
        <div>
            {/* Wrapper for the search section with styling */}
            <div className='p-2 md:p-6 border-[2px] border-[#800000] rounded-xl'>
                {/* Title for the search section */}
                <p className='text-[20px] font-bold'>Get a Ride</p>

                {/* Input fields for source and destination */}
                <InputItem type='source' />
                <InputItem type='destination' />

                {/* Button to trigger distance calculation */}
                <button
                    className='p-3 bg-black w-full mt-5 text-white rounded-lg'
                    onClick={calculateDistance}
                >
                    Search
                </button>
            </div>

            {/* Render RideListOptions component if distance is calculated */}
            {distance ? <RideListOptions distance={distance} /> : null}
        </div>
    );
}

export default SearchSection; // Export the component for use in other files
