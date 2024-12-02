'use client'; // Indicates that this component is rendered on the client side.

import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js'; // Provides a wrapper for Stripe Elements.
import { loadStripe } from '@stripe/stripe-js'; // Loads the Stripe instance for use with Stripe.js.
import CheckoutForm from '@/components/Home/CheckoutForm'; // Custom component to handle the payment form.

function Payment() {
  // Load Stripe instance using the public key from environment variables.
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

  // State variables to manage payment details.
  const [clientSecret, setClientSecret] = useState(null); // Stores the client secret for the payment intent.
  const [loading, setLoading] = useState(true); // Tracks the loading state while fetching payment details.
  const [amount, setAmount] = useState(0); // Tracks the payment amount.

  // Fetch client secret and amount when the component mounts.
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search); // Parse query string parameters.
    const paramAmount = parseFloat(searchParams.get('amount')) || 0; // Extract 'amount' parameter or default to 0.
    setAmount(paramAmount); // Update state with the extracted amount.

    if (paramAmount > 0) {
      // Fetch client secret if a valid amount is provided.
      const fetchClientSecret = async () => {
        try {
          const res = await fetch('/api/create-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Ensure JSON format in the request.
            },
            body: JSON.stringify({ amount: paramAmount }), // Send the payment amount to the backend.
          });

          // Parse the response.
          const { clientSecret, error } = await res.json();

          if (error) {
            console.error('Error creating payment intent:', error); // Log errors if any.
            return;
          }

          setClientSecret(clientSecret); // Store the client secret for further payment processing.
        } catch (error) {
          console.error('Error fetching client secret:', error); // Log errors if the fetch fails.
        } finally {
          setLoading(false); // Mark loading as complete.
        }
      };

      fetchClientSecret(); // Call the function to fetch the client secret.
    } else {
      setLoading(false); // Mark loading as complete if no valid amount is provided.
    }
  }, []);

  // Display a loading message while fetching data.
  if (loading) {
    return <p>Loading payment details...</p>;
  }

  // Handle invalid payment amounts.
  if (amount <= 0) {
    return <p>Invalid amount.</p>;
  }

  // Show initialization message if the client secret is not yet available.
  if (!clientSecret) {
    return <p>Initializing payment...</p>;
  }

  // Stripe Elements options including the client secret.
  const options = { clientSecret };

  // Render the payment UI.
  return (
    <div
      style={{
        backgroundImage: 'url(/create.jpg)', // Background image for styling.
        backgroundSize: 'cover', // Cover the entire container.
        backgroundRepeat: 'no-repeat', // Prevent repetition of the background image.
        minHeight: '100vh', // Ensure the container takes up full viewport height.
        overflow: 'visible', // Allow content overflow if needed.
      }}
    >
      {/* Wrap the CheckoutForm component with Stripe Elements */}
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm amount={amount} /> {/* Pass the payment amount to the form */}
      </Elements>
    </div>
  );
}

export default Payment; // Export the Payment component for use in the application.
