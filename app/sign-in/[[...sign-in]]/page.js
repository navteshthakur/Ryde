// Import the SignIn component from Clerk for authentication
import { SignIn } from '@clerk/nextjs';

// Import the Image component from Next.js for optimized images
import Image from 'next/image';

// Export the Page component
export default function Page() {
  return (
    <>
      {/* Parent container to manage layout */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Background image for the page */}
        <Image 
          src="/backgroundsignin.jpg" // Path to the background image
          width={1920} // Image width (used for optimization)
          height={1080} // Image height (used for optimization)
          className="object-cover w-full h-full" // Style to ensure image covers the entire viewport
          alt="background image" // Accessibility text for screen readers
        />
        {/* Position the SignIn component */}
        <div className="absolute top-10 right-10 z-10">
          <SignIn /> {/* Clerk SignIn component for authentication */}
        </div>
      </div>
    </>
  );
}
