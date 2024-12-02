'use client'; // Enables client-side rendering for this component

import React from 'react'; // Import React for creating components
import CreateRide from '@/components/Home/CreateRide'; // Import the CreateRide component

// Page component definition
function Page() {
  return (
    <div
      style={{
        // Set the background image for the page
        backgroundImage: 'url(/create.jpg)', // Path to the background image
        backgroundSize: 'cover', // Scale the image to cover the entire container
        backgroundRepeat: 'no-repeat', // Prevent the image from repeating
        minHeight: '100vh', // Ensure the page takes up at least the full viewport height
        overflow: 'visible', // Allow content to overflow if necessary
      }}
    >
      {/* Render the CreateRide component */}
      <CreateRide />
    </div>
  );
}

export default Page; // Export the Page component as the default export
