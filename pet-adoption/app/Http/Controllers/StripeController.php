<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Stripe\HttpClient\GuzzleClient;
use Stripe\PaymentIntent;
use Stripe\Stripe;
use Stripe\ApiRequestor;

class StripeController extends Controller
{
    public function createPaymentIntent(Request $request): JsonResponse
    {
        $request->validate([
            'amount' => 'required|integer|min:1',
        ]);
        
        Stripe::setApiKey(config('stripe.secret'));

        $intent = PaymentIntent::create([
            'amount' => $request->amount,
            'currency' => 'usd',
        ]);

        return response()->json([
            'clientSecret' => $intent->client_secret,
        ]);
    }
    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');
        $event = null;

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload, $sig_header, config('stripe.webhook_secret')
            );
        } catch (\Exception $e) {
            return response(['message' => 'Webhook signature verification failed'], 400);
        }

        // Handle different event types
        switch ($event->type) {
            case 'invoice.payment_succeeded':
                // Handle payment success
                break;
            case 'invoice.payment_failed':
                // Handle payment failure
                break;
            case 'customer.subscription.created':
                // Handle new subscription
                break;
            case 'customer.subscription.deleted':
                // Handle subscription cancellation
                break;
            // Add other events as needed
        }

        return response(['message' => 'Event handled']);
    }
}


