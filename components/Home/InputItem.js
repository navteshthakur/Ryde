'use client';

import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';

function InputItem({ type }) {
  const [value, setValue] = useState(null);
  const [mounted, setMounted] = useState(false); // To ensure the component is only rendered client-side

  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const getLatAndLng = (place, type) => {
    // Ensure 'place' and 'place.value' are not null or undefined
    if (place && place.value && place.value.place_id) {
      const placeId = place.value.place_id;
      const service = new google.maps.places.PlacesService(document.createElement('div'));

      service.getDetails({ placeId }, (placeDetails, status) => {
        // Check if the request was successful and has the correct geometry data
        if (status === 'OK' && placeDetails.geometry && placeDetails.geometry.location) {
          const location = placeDetails.geometry.location;
          const lat = location.lat();
          const lng = location.lng();
          
          // Safely handle missing or undefined properties
          const name = placeDetails.formatted_phone_number || 'Unknown';
          const label = placeDetails.name || 'Unnamed Place';

          if (type === 'source') {
            setSource({ lat, lng, name, label });
          } else {
            setDestination({ lat, lng, name, label });
          }
        } else {
          console.error(`Failed to get details for place: ${status}`);
        }
      });
    } else {
      console.error('Invalid place data:', place);
    }
  };

  // Set mounted to true after the component is mounted in the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Return nothing during SSR to prevent hydration mismatch
  }

  return (
    <div className="bg-[#ffe5d9] p-3 rounded-lg mt-3 flex items-center gap-4">
      <Image
        src={type === 'source' ? '/source.png' : '/destination.png'}
        width={15}
        height={15}
        alt="pickup-location"
      />
      <GooglePlacesAutocomplete
        
        selectProps={{
          value,
          onChange: (place) => {
            if (place) {
              getLatAndLng(place, type);
              setValue(place);
            }
          },
          placeholder:type === 'source' ? 'Pickup Location' : 'Drop off Location',
          isClearable: true,
          className: 'w-full',
          components: {
            DropdownIndicator: false
          },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: '#00ffff00',
              border: 'none'
            })
          }
        }}
      />
    </div>
  );
}

export default InputItem;