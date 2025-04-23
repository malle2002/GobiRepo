import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature'];
    if(!sig) throw new Error("stripe error");
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error('Error verifying webhook signature:', err);
      return res.status(400).send(`Webhook Error: ${err?.message}`);
    }
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        // Handle successful payment
        break;
      case 'invoice.payment_succeeded':
        // Handle successful subscription payment
        break;
      // Add more cases for other event types you want to handle
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
export const config = {
  api: {
    bodyParser: false,
  },
};