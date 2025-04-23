import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    const { userId, priceId } = await req.json();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "")

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/cancel`,
      metadata: { userId },
    });
  
    return NextResponse.json({ url: session.url });
  }
  