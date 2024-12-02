// Import required modules and components
import { CarListData } from '@/utils/CarListData'; // Car list data utility
import React, { useState } from 'react'; // React and useState for state management
import CarListItem from './CarListItem'; // Component for rendering individual car items
import { useRouter } from 'next/navigation'; // Next.js router for navigation

function CarListOptions({ distance }) {
    // State for tracking the active car index and selected car
    const [activeIndex, setActiveIndex] = useState();
    const [selectedCar, setSelectedCar] = useState([]);
    const router = useRouter(); // Initialize the router

    return (
        <div className="mt-5 p-5 overflow-auto h-[250px]">
            {/* Section title */}
            <h2 className="text-[22px] font-bold">Recommended</h2>

            {/* Map through CarListData and render each item */}
            {CarListData.map((item, index) => (
                // Outer wrapper for each car item with dynamic styling for active state
                <div 
                    key={item.id} // Unique key for each car item
                    className={`cursor-pointer p-1 px-4 rounded-md border-[#800000] ${
                        activeIndex === index ? 'border-[2px]' : '' // Highlight active item
                    }`} 
                    onClick={() => {
                        setActiveIndex(index); // Update active index
                        setSelectedCar(item); // Update selected car
                    }}
                >
                    <CarListItem car={item} distance={distance} /> {/* Render car item */}
                </div>
            ))}

            {/* Render payment section if a car is selected */}
            {selectedCar?.name ? (
                <div className="flex justify-between fixed bottom-2 bg-white p-3 shadow-xl 
                w-full md:w-[30%] border--[1px] items-center rounded-lg">
                    <h2>Make Payment to</h2>
                    {/* Button for booking the selected car */}
                    <button 
                        className="p-3 bg-black text-white rounded-lg text-center"
                        onClick={() => 
                            router.push('/payment?amount=' + (selectedCar.amount * distance).toFixed(2)) // Navigate to payment page with amount
                        }
                    >
                        Book {selectedCar.name} {/* Display selected car name */}
                    </button>
                </div>
            ) : null}
        </div>
    );
}

export default CarListOptions; // Export the component
