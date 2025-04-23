"use client"

import { useStripe, useElements, CardElement, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function CheckoutForm({ className, clientSecret, amount }: { className: string, clientSecret: string, amount: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState('');
  const [ loading, setLoading ] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();

    if (submitError) {
        setErrorMessage(submitError?.message || 'Check your card credentials');
        setLoading(false);
        return;
    }
      
    const result = await stripe.confirmPayment({
        elements,
        clientSecret, 
        confirmParams: {
            return_url: `http://localhost:3000/payment-success?amount=${amount}`
        }
    });

    if (result.error) {
        setErrorMessage(result.error?.message || 'Payment failed');
    } else {
        setErrorMessage('Payment succeeded!');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
        <div className='flex flex-col gap-5'>
            <h5>Select your <span className='font-extrabold text-xl'>Payment Method</span></h5>
            <PaymentElement/>
        </div>

        <button type="submit" disabled={!stripe || loading} className='btn btn-outline my-5 px-10 w-full'>{ !loading ? `Pay $${amount}` : "Processing..."}</button>

        { errorMessage && <div><h6>{errorMessage}</h6></div> }
    </form>
  );
}
