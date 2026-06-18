import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'gbp', metadata } = await req.json()

    if (!amount || amount < 50) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount:   Math.round(amount), // amount in pence
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        store:    'Divine Couture',
        ...metadata,
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('[Stripe] create-payment-intent error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
