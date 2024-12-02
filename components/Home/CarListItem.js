import React from 'react'; // React for component creation
import Image from 'next/image'; // Optimized image handling in Next.js
import { HiUser } from 'react-icons/hi2'; // User icon for seat information

// Component to display a single car item
function CarListItem({ car, distance }) {
    return (
        <div>
            {/* Wrapper for car item */}
            <div className="flex items-center justify-between mt-5">
                {/* Car Image and Details */}
                <div className="flex items-center gap-5">
                    <Image 
                        src={car.image} // Car image URL
                        alt={car.name} // Accessible alternative text
                        width={100} // Width in pixels
                        height={100} // Height in pixels
                    />
                    <div>
                        {/* Car name and seats */}
                        <h2 className="font-semibold text-[18px] flex gap-3 items-center">
                            {car.name}
                            {/* Number of seats */}
                            <span className="flex gap-2 items-center font-normal text-[14px]">
                                <HiUser />
                                {car.seat}
                            </span>
                        </h2>
                        {/* Car description */}
                        <p>{car.desc}</p>
                    </div>
                </div>
                {/* Calculated amount based on distance */}
                <h2 className="text-[18px] font-semibold">
                    ${ (car.amount * distance).toFixed(2) }
                </h2>
            </div>
        </div>
    );
}

export default CarListItem; // Export for reuse
