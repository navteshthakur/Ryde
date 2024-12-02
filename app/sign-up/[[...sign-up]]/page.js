// Import the SignUp component from Clerk for user registration
import { SignUp } from '@clerk/nextjs';

// Import the Image component from Next.js for optimized image handling
import Image from 'next/image';

// Define and export the Page component
export default function Page() {
  return (
    <>
      {/* Parent container for the layout */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Background image */}
        <Image 
          src="/backgroundsignin.jpg" // Path to the background image
          width={1920} // Logical width for the image (used by Next.js optimization)
          height={1080} // Logical height for the image (used by Next.js optimization)
          className="object-cover w-full h-full" // Styling to ensure the image covers the entire screen
          alt="background image" // Accessibility text for screen readers
        />
        {/* Positioning the SignUp component */}
        <div className="absolute top-10 right-10 z-10 mb-5">
          <SignUp /> {/* Clerk SignUp component for user registration */}
        </div>
      </div>
    </>
  );
}
