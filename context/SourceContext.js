// Import necessary modules from React
'use client';
import { createContext, useState } from 'react';

// Create a new context for managing source state
export const SourceContext = createContext();

// Create a provider component for the SourceContext
export const SourceProvider = ({ children }) => {
  // Initialize state for the source with a default value of null
  const [source, setSource] = useState(null);

  // Return the context provider with value containing the state and its updater function
  return (
    <SourceContext.Provider value={{ source, setSource }}>
      {children} {/* Render children components that are wrapped in this provider */}
    </SourceContext.Provider>
  );
};
