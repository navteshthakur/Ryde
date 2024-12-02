'use client';

import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/Home/CheckoutForm';

function Payment() {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramAmount = parseFloat(searchParams.get('amount')) || 0;
    setAmount(paramAmount);

    if (paramAmount > 0) {
      const fetchClientSecret = async () => {
        try {
          const res = await fetch('/api/create-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: paramAmount }),
          });
          const { clientSecret, error } = await res.json();

          if (error) {
            console.error('Error creating payment intent:', error);
            return;
          }

          setClientSecret(clientSecret);
        } catch (error) {
          console.error('Error fetching client secret:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchClientSecret();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading payment details...</p>;
  }

  if (amount <= 0) {
    return <p>Invalid amount.</p>;
  }

  if (!clientSecret) {
    return <p>Initializing payment...</p>;
  }

  const options = { clientSecret };

  return (
    <div
      style={{
        backgroundImage: 'url(/create.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        overflow: 'visible',
      }}
    >
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  );
}

export default Payment;
