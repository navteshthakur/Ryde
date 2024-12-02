import React, { useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';

function CheckoutForm({ amount }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!stripe || !elements) {
            console.error("Stripe.js has not loaded yet.");
            return;
        }

        setLoading(true);
        setErrorMessage(""); // Reset error message

        try {
            // Request client secret from backend
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
                setErrorMessage("Error creating payment intent");
                setLoading(false);
                return;
            }

            if (!clientSecret) {
                console.error("No client secret returned from the server.");
                setErrorMessage("No client secret returned from the server.");
                setLoading(false);
                return;
            }

            // Confirm the payment with the payment method attached to the PaymentElement
            const { error: confirmError } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: "http://localhost:3000", 
                },
            });

            if (confirmError) {
                console.error("Payment confirmation error:", confirmError);
                setErrorMessage(confirmError.message || "Payment confirmation error");
            } else {
                console.log("Payment successful!");
                window.alert('Payment Successful')
            }

        } catch (err) {
            console.error("Error handling payment:", err.message);
            setErrorMessage("Error handling payment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full mt-6">
            <h2 className="m-5 font-6 font-bold">Amount to Pay: ${amount}</h2>
            <form className="max-w-md p-5 rounded-lg bg-[#facd83]" onSubmit={handleSubmit}>
                <PaymentElement />
                <button
                    type="submit"
                    className="w-full mt-2 bg-black text-white rounded-lg p-2"
                    disabled={loading || !stripe || !elements}
                >
                    {loading ? "Processing..." : "Pay"}
                </button>
            </form>
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
    );
}

export default CheckoutForm;
