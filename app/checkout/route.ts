import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { PRODUCTS, type Product } from '@/lib/mock-data'

export async function POST(req: NextRequest) {
  try {
    // Ensure Node runtime for Stripe SDK on Netlify
    ;(globalThis as any).EDGE_RUNTIME = undefined
    const forwardedProto = req.headers.get('x-forwarded-proto') || 'https'
    const forwardedHost = req.headers.get('x-forwarded-host') || req.headers.get('host') || ''
    const origin = (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim().length > 0)
      ? process.env.NEXT_PUBLIC_SITE_URL
      : `${forwardedProto}://${forwardedHost}`
    const formData = await req.formData()
    const itemsJson = formData.get('items') as string | null
    const slug = String(formData.get('slug') || '')
    const quantity = Math.max(1, Number(formData.get('quantity') || 1))

    // Server route cannot read browser localStorage; use default products.
    const list: Product[] = PRODUCTS

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2023-10-16' })

    // If cart items are provided, build multi-item checkout
    if (itemsJson) {
      let cart: { slug: string; quantity: number }[] = []
      try { cart = JSON.parse(itemsJson) } catch {}
      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

      for (const ci of cart) {
        const p = list.find(x => x.href.split('/').pop() === ci.slug)
        if (!p) continue
        const stripeProductId = p.stripeProductId || (p.title.toLowerCase().includes('key') ? 'prod_T43A6IQ832zeQD' : undefined)
        if (stripeProductId) {
          const productObj = await stripe.products.retrieve(stripeProductId)
          const defaultPrice = productObj.default_price
          if (!defaultPrice) continue
          const priceId = typeof defaultPrice === 'string' ? defaultPrice : defaultPrice.id
          line_items.push({ price: priceId, quantity: Math.max(1, Number(ci.quantity || 1)) })
        } else {
          line_items.push({
            price_data: {
              currency: 'brl',
              product_data: { name: p.title },
              unit_amount: Math.round(p.price * 100),
            },
            quantity: Math.max(1, Number(ci.quantity || 1)),
          })
        }
      }

      if (line_items.length === 0) {
        return NextResponse.json({ error: 'No valid items in cart' }, { status: 400 })
      }

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items,
        success_url: `${origin}/checkout/success`,
        cancel_url: `${origin}/checkout/cancel`,
      })
      return NextResponse.redirect(session.url!, { status: 303 })
    }

    // Fallback: single item checkout via slug/quantity
    const product = list.find(p => p.href.split('/').pop() === slug)
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    const stripeProductId = product.stripeProductId || (product.title.toLowerCase().includes('key') ? 'prod_T43A6IQ832zeQD' : undefined)

    if (!stripeProductId) {
      // Create a Price on the fly using unit_amount
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'brl',
              product_data: { name: product.title },
              unit_amount: Math.round(product.price * 100),
            },
            quantity,
          },
        ],
        success_url: `${origin}/checkout/success`,
        cancel_url: `${origin}/checkout/cancel`,
      })
      return NextResponse.redirect(session.url!, { status: 303 })
    }

    // Use default price for mapped Stripe product
    const productObj = await stripe.products.retrieve(stripeProductId)
    const defaultPrice = productObj.default_price
    if (!defaultPrice) {
      return NextResponse.json({ error: 'Stripe product missing default price' }, { status: 400 })
    }
    const priceId = typeof defaultPrice === 'string' ? defaultPrice : defaultPrice.id

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity }],
      success_url: `${origin}/checkout/success`,
      cancel_url: `${origin}/checkout/cancel`,
    })

    return NextResponse.redirect(session.url!, { status: 303 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Checkout failed' }, { status: 500 })
  }
}


