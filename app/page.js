"use client"; // Indicates this is a client-side rendered component

import SearchSection from "@/components/Home/SearchSection"; // Component for searching locations
import GoogleMapSection from "@/components/Home/GoogleMapSection"; // Component for rendering Google Maps

import { DestinationContext } from "@/context/DestinationContext"; // Context for destination state
import { SourceContext } from "@/context/SourceContext"; // Context for source state
import { LoadScript } from "@react-google-maps/api"; // Google Maps API library
import { useState } from "react"; // State management hook

export default function Home() {
  // States for source and destination coordinates
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  return (
    // Providing source state to child components
    <SourceContext.Provider value={{ source, setSource }}>
      {/* Providing destination state to child components */}
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <LoadScript
          libraries={['places']} // Load the Places library for search functionality
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} // Securely load the API key from environment variables
        >
          <div>
            {/* Main Grid Container */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Search Section */}
              <div className="col-span-1 md:col-span-1">
                <SearchSection /> {/* Handles source and destination inputs */}
              </div>

              {/* Google Map Section */}
              <div className="col-span-1 md:col-span-2">
                <GoogleMapSection /> {/* Displays the map with markers */}
              </div>
            </div>
          </div>
        </LoadScript>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
