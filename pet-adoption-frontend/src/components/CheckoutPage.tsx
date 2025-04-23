"use client"

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { lazy, Suspense, useEffect, useState } from 'react';
import CheckoutFormSkeleton from '@/src/components/skeletons/CheckoutFormSkeleton';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutForm = lazy(() => import('@/src/components/CheckoutForm'));

export default function CheckoutPage({ className, formClassName, petId }: { className: string, formClassName: string, petId: string }) {
  const [clientSecret, setClientSecret] = useState<string | undefined>(undefined);
  const amount = 4.99;

  useEffect(() => {
    const getClientSecret = async () => {
      const res = await fetch('/api/create-intent', { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ petId, amount })
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };

    if (petId) getClientSecret();
  }, [petId]);

  const options: StripeElementsOptions = { clientSecret };

  return (
    clientSecret ? (
      <Suspense fallback={<CheckoutFormSkeleton />}>
        <div className={className}>
          <Elements 
            stripe={stripePromise}
            options={options}
          >
            <CheckoutForm amount={amount} clientSecret={clientSecret} className={formClassName} />
          </Elements>
        </div>
      </Suspense>
    ) : null
  );
}
