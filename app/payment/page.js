'use client'
// pages/payment.js
import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';
import CheckoutForm from '@/components/Home/CheckoutForm';

function Payment() {
  const searchParams = useSearchParams();
  const amount = parseFloat(searchParams.get('amount')) || 0;
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the client secret from the backend when the component mounts
    const fetchClientSecret = async () => {
      try {
        const res = await fetch('/api/create-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount }),
        });
        const { clientSecret, error } = await res.json();

        if (error) {
          console.error("Error creating payment intent:", error);
          return;
        }

        setClientSecret(clientSecret);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching client secret:", error);
        setLoading(false);
      }
    };

    if (amount > 0) {
      fetchClientSecret();
    }
  }, [amount]);

  // If we're still loading, show a loading message or spinner
  if (loading) {
    return <p>Loading payment details...</p>;
  }

  if (amount <= 0) {
    return <p>Invalid amount.</p>;
  }

  const options = {
    clientSecret,
  };

  return (
    <div style={{
      backgroundImage: 'url(/create.jpg)', 
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh', 
      overflow: 'visible',
    }}>
    <Elements stripe={stripePromise} options={options} >
      <CheckoutForm amount={amount} />
    </Elements>
    </div>
  );
}

export default Payment;
