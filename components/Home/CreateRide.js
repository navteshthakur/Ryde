import React, { useState, useRef } from 'react';
import { Autocomplete, LoadScript } from '@react-google-maps/api';
import { CarListData } from '@/utils/CarListData';  // Adjust the path if necessary

const CreateRide = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [rideDate, setRideDate] = useState('');
  const [rideTime, setRideTime] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);

  const sourceRef = useRef(null);
  const destinationRef = useRef(null);

  // Handle place selection for source and destination
  const handlePlaceSelect = (type) => {
    if (type === 'source' && sourceRef.current) {
      const place = sourceRef.current.getPlace();
      setSource(place.formatted_address || '');
    } else if (type === 'destination' && destinationRef.current) {
      const place = destinationRef.current.getPlace();
      setDestination(place.formatted_address || '');
    }
  };

  // Handle the ride creation (POST request)
  const handleCreateRide = async () => {
    if (!source || !destination || !rideDate || !rideTime || !selectedCar) {
      alert('Please fill out all fields!');
      return;
    }

    const rideDetails = {
      Ridesource: source,
      Ridedestination: destination,
      rideDate,
      rideTime,
      carType: selectedCar.name,
    };

    try {
      const response = await fetch('/api/ride', {  // Ensure the API route is correct
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rideDetails),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      console.log('Ride created successfully:', data);
      alert('Ride created successfully!');
    } catch (error) {
      console.error('Error creating ride:', error.message);
      alert(`Failed to create ride. Error: ${error.message}`);
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} libraries={['places']}>
      <div className="max-w-2xl mx-auto p-6 bg-white/90 shadow rounded-lg m-2">
        <h1 className="text-2xl font-bold mb-4">Create a Ride</h1>

        {/* Source Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Source</label>
          <Autocomplete
            onLoad={(ref) => (sourceRef.current = ref)}
            onPlaceChanged={() => handlePlaceSelect('source')}
          >
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              placeholder="Enter pickup location"
            />
          </Autocomplete>
        </div>

        {/* Destination Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Destination</label>
          <Autocomplete
            onLoad={(ref) => (destinationRef.current = ref)}
            onPlaceChanged={() => handlePlaceSelect('destination')}
          >
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              placeholder="Enter drop-off location"
            />
          </Autocomplete>
        </div>

        {/* Ride Date Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Ride Date</label>
          <input
            type="date"
            className="w-full border rounded-lg p-2"
            value={rideDate}
            onChange={(e) => setRideDate(e.target.value)}
          />
        </div>

        {/* Ride Time Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Ride Time</label>
          <input
            type="time"
            className="w-full border rounded-lg p-2"
            value={rideTime}
            onChange={(e) => setRideTime(e.target.value)}
          />
        </div>

        {/* Car Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Car Type</label>
          <div className="grid grid-cols-2 gap-4">
            {CarListData.map((car) => (
              <div
                key={car.id}
                onClick={() => setSelectedCar(car)}
                className={`p-4 border rounded-lg cursor-pointer bg-white/80 ${
                  selectedCar?.id === car.id ? '  bg-[#800000]/40' : ' border-white/70'
                }`}
              >
                <img src={car.image} alt={car.name} className="w-12 h-12 mb-2" />
                <h3 className="font-semibold">{car.name}</h3>
                <p className="text-sm">{car.desc}</p>
                <p className="text-sm text-gray-500">Seats: {car.seat}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleCreateRide}
          className="w-full bg-black hover:bg-[#800000] text-white font-bold py-2 px-4 rounded"
        >
          Create Ride
        </button>
      </div>
    </LoadScript>
  );
};

export default CreateRide;
