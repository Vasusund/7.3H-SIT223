import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../styles.css';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    alert('Payment simulated! Integrate real backend later.');
    // Normally, call your backend API to create a payment intent here
  };

  return (
    <div className="payment-page">
      <form className="payment-card" onSubmit={handleSubmit}>
        <h2>Premium Payment</h2>
        <p className="payment-description">Complete your payment to activate Premium features</p>
        <CardElement options={{
          style: {
            base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } },
            invalid: { color: '#c23d3d' }
          }
        }} />
        <button type="submit" className="btn-premium-pay">Pay $9.99</button>
      </form>
    </div>
  );
}

export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
