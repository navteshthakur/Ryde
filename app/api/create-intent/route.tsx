// pages/api/create-intent.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-11-20.acacia',
    typescript: true,
});

export async function POST(request) {
    try {
        // Parse the incoming request body
        const { amount } = await request.json();

        // Validate the amount
        if (!amount || isNaN(amount) || amount <= 0) {
            console.error("Invalid or missing amount:", amount);
            return NextResponse.json({ error: 'Invalid or missing amount' }, { status: 400 });
        }

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(Number(amount) * 100), // Convert to cents
            currency: 'CAD',
        });

        console.log("Created payment intent with client secret:", paymentIntent.client_secret);

        // Return the client secret
        return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 });
    } catch (error) {
        console.error('Stripe Payment Intent Error:', error.message);

        return NextResponse.json(
            { error: error.message || 'Failed to create payment intent' },
            { status: 400 }
        );
    }
}

