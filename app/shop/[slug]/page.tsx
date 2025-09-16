'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { PRODUCTS, type Product } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'
import { Star, ChevronLeft, Check, X } from 'lucide-react'

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const slug = Array.isArray(params?.slug) ? params?.slug[0] : params?.slug

  const initialProduct: Product | undefined = useMemo(
    () => PRODUCTS.find((p) => p.href.split('/').pop() === slug),
    [slug]
  )
  const [product, setProduct] = useState<Product | undefined>(initialProduct)

  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)

  // A11y: keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsZoomOpen(false)
      if (e.key === 'ArrowRight')
        setActiveImage((i) => Math.min((product?.gallery?.length || 1) - 1, i + 1))
      if (e.key === 'ArrowLeft') setActiveImage((i) => Math.max(0, i - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [product])

  // Load admin-edited product from localStorage so stock/description stay in sync
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ct_products')
      if (saved) {
        const list: Product[] = JSON.parse(saved)
        const p = list.find((x) => x.href.split('/').pop() === slug)
        if (p) setProduct(p)
      }
    } catch (_) {}
  }, [slug])

  useEffect(() => {
    // Initialize default model selection
    if (product?.variants?.models && product.variants.models.length > 0) {
      setSelectedModel(product.variants.models[0])
    } else {
      setSelectedModel(null)
    }
  }, [product])

  if (!product) {
    return (
      <div className="container pt-24 pb-24">
        <button onClick={() => router.back()} className="mb-6 inline-flex items-center text-sm text-muted hover:text-foreground">
          <ChevronLeft className="mr-1 h-4 w-4" /> Back
        </button>
        <h1 className="heading-md mb-2">Product not found</h1>
        <p className="text-body">We couldn't find the product you're looking for.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container section-padding">
        <button onClick={() => router.back()} className="mb-6 inline-flex items-center text-sm text-muted hover:text-foreground">
          <ChevronLeft className="mr-1 h-4 w-4" /> Back
        </button>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Gallery with badges */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-xl bg-border/20">
              <Image
                src={product.gallery?.[activeImage] || product.image || '/images/key.png'}
                alt={product.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.isNew && (
                <span className="absolute left-3 top-3 rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-background">New</span>
              )}
              {product.discountPercent && (
                <span className="absolute left-3 top-8 rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">-{product.discountPercent}%</span>
              )}
              <button
                aria-label="Open zoom"
                className="absolute right-3 bottom-3 rounded-md bg-background/70 px-3 py-1 text-sm backdrop-blur hover:bg-background"
                onClick={() => setIsZoomOpen(true)}
              >
                Zoom
              </button>
            </div>
            {product.gallery && product.gallery.length > 1 && (
              <div role="list" aria-label="Thumbnails" className="mt-3 grid grid-cols-5 gap-2">
                {product.gallery.map((src, i) => (
                  <button
                    key={i}
                    role="listitem"
                    aria-label={`Image ${i + 1}`}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-square overflow-hidden rounded border ${i === activeImage ? 'border-accent' : 'border-border'}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="thumbnail" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right column */}
          <div>
            <h1 className="heading-md mb-3">{product.title}</h1>
            <div className="mb-4 flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={i < Math.floor(product.rating || 0) ? 'h-4 w-4 text-yellow-400 fill-current' : 'h-4 w-4 text-gray-300'} />
              ))}
              {product.reviews ? (
                <span className="text-sm text-muted">{product.reviews.toLocaleString()} reviews</span>
              ) : null}
            </div>

            <div className="mb-6 flex items-end gap-3">
              <span className="text-3xl font-bold text-accent">{formatPrice(product.price)}</span>
              {product.originalPrice ? (
                <span className="text-muted line-through">{formatPrice(product.originalPrice)}</span>
              ) : null}
            </div>

            <p className="text-body mb-6">
              {product.description ||
                'A premium, high-performance software license designed to accelerate your workflow. Enjoy lifetime updates, priority support, and seamless integration with your favorite tools. Ideal for professionals seeking reliability, speed, and modern UX.'}
            </p>

            {/* Inventory */}
            <div className="mb-4 text-sm">
              {(() => {
                const isInfinite = product.stockMode === 'infinite'
                const count = isInfinite
                  ? '∞'
                  : (product.stockMode === 'keys' ? (product.stockKeys?.length ?? 0) : (product.stockCount ?? 0))
                const status: 'out' | 'low' | 'in' = isInfinite
                  ? 'in'
                  : (Number(count) === 0 ? 'out' : Number(count) <= 5 ? 'low' : 'in')
                return (
                  <>
                    {status === 'in' && <span className="text-green-400">In stock</span>}
                    {status === 'low' && <span className="text-yellow-400">Low stock</span>}
                    {status === 'out' && <span className="text-red-400">Out of stock</span>}
                    <span className="ml-2 inline-flex items-center rounded-full bg-border/20 px-2.5 py-0.5 text-[14px] text-muted">Stock {count}</span>
                  </>
                )
              })()}
            </div>

            {/* Variants */}
            {product.variants?.models && (
              <div className="mb-6">
                <div className="mb-2 text-sm text-muted">Model</div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.models.map((m) => {
                    const isActive = selectedModel === m
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setSelectedModel(m)}
                        aria-pressed={isActive}
                        className={`rounded-md px-3 py-1 text-sm transition-colors border ${
                          isActive ? 'border-accent text-accent' : 'border-border hover:border-accent'
                        }`}
                      >
                        {m}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="mb-6 flex items-center gap-3">
              <label className="text-sm text-muted">Qty</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-20 rounded-md bg-border/20 border border-border px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                className="btn-primary"
                onClick={() => {
                  try {
                    const slugVal = (slug || '').toString()
                    const raw = localStorage.getItem('ct_cart')
                    const list: { slug: string; quantity: number }[] = raw ? JSON.parse(raw) : []
                    const idx = list.findIndex((x) => x.slug === slugVal)
                    if (idx >= 0) {
                      list[idx].quantity = Math.max(1, (list[idx].quantity || 1) + quantity)
                    } else {
                      list.push({ slug: slugVal, quantity: Math.max(1, quantity) })
                    }
                    localStorage.setItem('ct_cart', JSON.stringify(list))
                    router.push('/cart')
                  } catch (_) {
                    router.push('/cart')
                  }
                }}
              >
                Add to cart
              </button>
              <form action="/checkout" method="POST">
                <input type="hidden" name="slug" value={slug || ''} />
                <input type="hidden" name="quantity" value={quantity} />
                <button type="submit" className="btn-secondary">Buy now</button>
              </form>
            </div>

            <p className="mb-8 text-sm text-muted">Free shipping over R$ 200. 30-day returns. Taxes included.</p>

            {/* Rich HTML description */}
            {product.htmlDescription && (
              <div className="prose prose-invert mb-8 max-w-none" dangerouslySetInnerHTML={{ __html: product.htmlDescription }} />
            )}

            {/* Specs */}
            {product.specs && (
              <div className="mb-8 overflow-hidden rounded-md border border-border">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([k, v]) => (
                      <tr key={k} className="border-b border-border/60">
                        <td className="w-1/3 bg-border/10 px-4 py-2 text-muted">{k}</td>
                        <td className="px-4 py-2">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Accordion */}
            <div className="mb-8">
              <details className="mb-2 rounded-md border border-border p-4">
                <summary className="cursor-pointer">Care</summary>
                <div className="mt-2 text-sm text-muted">Keep your license key safe. Do not share publicly.</div>
              </details>
              <details className="mb-2 rounded-md border border-border p-4">
                <summary className="cursor-pointer">Materials</summary>
                <div className="mt-2 text-sm text-muted">Digital delivery only.</div>
              </details>
              <details className="rounded-md border border-border p-4">
                <summary className="cursor-pointer">Fit</summary>
                <div className="mt-2 text-sm text-muted">Works on Windows, macOS and Linux.</div>
              </details>
            </div>

            {/* Highlights */}
            {product.highlights && (
              <ul className="mb-8 space-y-2 text-sm">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Reviews preview */}
            {product.reviews ? (
              <div className="rounded-md border border-border p-4 text-sm">
                <div className="mb-2 font-semibold">Customer Reviews</div>
                <div className="text-muted">Rated {product.rating} by {product.reviews.toLocaleString()} customers.</div>
                <a href="#reviews" className="mt-2 inline-block text-[#22D3EE]">Read all reviews</a>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Zoom modal */}
      {isZoomOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-6" ref={dialogRef}>
          <div className="relative w-full max-w-5xl">
            <button aria-label="Close" className="absolute right-3 top-3 rounded-md bg-black/60 p-2 text-white" onClick={() => setIsZoomOpen(false)}>
              <X className="h-4 w-4" />
            </button>
            <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.gallery?.[activeImage] || product.image || '/images/key.png'} alt={product.title} className="h-full w-full object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


