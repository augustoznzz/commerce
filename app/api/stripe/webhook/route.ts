import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Missing STRIPE_WEBHOOK_SECRET' }, { status: 500 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2023-10-16' })

  const rawBody = await req.text()
  const signature = req.headers.get('stripe-signature') as string | null

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature || '', secret)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook signature verification failed: ${err?.message}` }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        // TODO: fulfill the order here (e.g., mark as paid, deliver license)
        break
      }
      case 'charge.succeeded':
      case 'payment_intent.succeeded':
      default:
        break
    }
    return NextResponse.json({ received: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Webhook handler error' }, { status: 500 })
  }
}


