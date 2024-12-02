// Import necessary modules from React
'use client';
import { createContext, useState } from 'react';

// Create a new context for managing destination state
export const DestinationContext = createContext();

// Create a provider component for the DestinationContext
export const DestinationProvider = ({ children }) => {
  // Initialize state for the destination with a default value of null
  const [destination, setDestination] = useState(null);

  // Return the context provider with value containing the state and its updater function
  return (
    <DestinationContext.Provider value={{ destination, setDestination }}>
      {children} {/* Render children components that are wrapped in this provider */}
    </DestinationContext.Provider>
  );
};
