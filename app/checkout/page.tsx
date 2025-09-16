'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS, type Product } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const search = useSearchParams()
  const slugFromUrl = search.get('slug') || ''
  const qtyFromUrl = Number(search.get('quantity') || 1)

  const [products, setProducts] = useState<Product[]>(PRODUCTS)
  const [quantity, setQuantity] = useState(Math.max(1, qtyFromUrl))

  useEffect(() => {
    // Load any admin-edited products from localStorage to keep pricing/images in sync
    try {
      const saved = localStorage.getItem('ct_products')
      if (saved) setProducts(JSON.parse(saved))
    } catch (_) {}
  }, [])

  const product = useMemo(() => {
    return products.find(p => p.href.split('/').pop() === slugFromUrl)
  }, [products, slugFromUrl])

  const unitPrice = product?.price || 0
  const total = unitPrice * quantity

  return (
    <div className="min-h-screen pt-20">
      <div className="container section-padding">
        <button onClick={() => router.back()} className="mb-6 inline-flex items-center text-sm text-muted hover:text-foreground">
          <ChevronLeft className="mr-1 h-4 w-4" /> Back
        </button>

        <h1 className="heading-lg mb-6">Checkout</h1>

        {!product ? (
          <div className="rounded-lg border border-border bg-border/10 p-6">
            <p className="text-body">Product not found. Go back to the <Link href="/shop" className="text-[#22D3EE]">shop</Link>.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-lg border border-border bg-border/10 p-4">
                <div className="mb-4 text-sm text-muted">Order items</div>
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-md border border-border bg-border/20">
                    <Image src={product.image || '/images/key.png'} alt={product.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{product.title}</div>
                    <div className="text-sm text-muted">Unit price: {formatPrice(unitPrice)}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <label className="text-sm text-muted">Qty</label>
                      <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e)=>setQuantity(Math.max(1, Number(e.target.value)))}
                        className="w-24 rounded-md bg-border/20 border border-border px-3 py-2"
                      />
                    </div>
                  </div>
                  <div className="text-right font-semibold">{formatPrice(total)}</div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-border/10 p-4">
                <div className="mb-2 text-sm text-muted">Billing</div>
                <p className="text-sm text-muted">Payments are processed securely with Stripe.</p>
              </div>
            </div>

            <div>
              <div className="rounded-lg border border-border bg-border/10 p-4">
                <div className="mb-4 text-sm text-muted">Summary</div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="mb-4 flex items-center justify-between text-sm text-muted">
                  <span>Taxes</span>
                  <span>Included</span>
                </div>

                <div className="mb-4 h-px bg-border" />
                <div className="mb-6 flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <form action="/checkout" method="POST" className="space-y-2">
                  <input type="hidden" name="slug" value={slugFromUrl} />
                  <input type="hidden" name="quantity" value={quantity} />
                  <button type="submit" className="btn-primary w-full">Pay with Stripe</button>
                </form>
                <div className="mt-3 text-center text-xs text-muted">
                  You will be redirected to Stripe to complete your purchase.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


