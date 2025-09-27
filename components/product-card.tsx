'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { Star, Tag } from 'lucide-react'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [stock, setStock] = useState<string | null>(null)
  const [updatedProduct, setUpdatedProduct] = useState<Product>(product)

  // Function to update product data from localStorage
  const updateProductData = () => {
    try {
      const saved = localStorage.getItem('ct_products')
      if (saved) {
        const list = JSON.parse(saved) as Product[]
        const found = list.find(p => p.id === product.id || p.href === product.href)
        if (found) {
          setUpdatedProduct(found)
          const val = found.stockMode === 'infinite' ? '∞' : String(found.stockMode === 'keys' ? (found.stockKeys?.length || 0) : (found.stockCount ?? 0))
          setStock(val)
        } else {
          // If product not found in localStorage, use original product
          setUpdatedProduct(product)
          setStock(null)
        }
      } else {
        setUpdatedProduct(product)
        setStock(null)
      }
    } catch (_) {
      setUpdatedProduct(product)
      setStock(null)
    }
  }

  useEffect(() => {
    updateProductData()
  }, [product])

  // Listen for product updates from admin
  useEffect(() => {
    const handleProductUpdate = () => {
      updateProductData()
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'ct_products') {
        updateProductData()
      }
    }

    window.addEventListener('ct_products_updated', handleProductUpdate)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('ct_products_updated', handleProductUpdate)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [product])
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link
        href={updatedProduct.href}
        className="block"
        aria-label={`View ${updatedProduct.title} product details`}
      >
        <div className="relative overflow-hidden rounded-xl bg-border/20 card-hover">
          {/* Glow backdrop */}
          <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-accent/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
          {/* Gradient frame */}
          <div className="pointer-events-none absolute inset-0 rounded-xl p-[1px]">
            <div className="h-full w-full rounded-[11px] bg-gradient-to-br from-accent/40 via-white/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
          {/* Product Image */}
          <div className="relative aspect-square">
            <Image
              src={updatedProduct.image || '/images/key.png'}
              alt={updatedProduct.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Shine sweep */}
            <motion.span
              aria-hidden
              initial={{ x: '-120%' }}
              whileHover={{ x: '120%' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            
            {/* Badge */}
            {updatedProduct.badge && (
              <div className="absolute top-4 left-4">
                <span className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                  updatedProduct.badge === 'New' && "bg-accent text-background",
                  updatedProduct.badge === 'Best Seller' && "bg-green-500 text-white",
                  updatedProduct.badge === 'Sale' && "bg-red-500 text-white"
                )}>
                  {updatedProduct.badge}
                </span>
              </div>
            )}

            

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Product Info */}
          <div className="p-6">
            {/* Category */}
            {(updatedProduct.category || stock !== null) && (
              <div className="flex items-center gap-2 mb-2">
                {updatedProduct.category && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-xs text-muted">
                    <Tag className="h-3 w-3 text-muted" />
                    {updatedProduct.category}
                  </span>
                )}
                {stock !== null && (
                  <span className="inline-flex items-center rounded-full bg-border/20 px-2 py-0.5 text-xs text-muted">Stock {stock}</span>
                )}
              </div>
            )}
            
            <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-200 mb-2 line-clamp-2">
              {updatedProduct.title}
            </h3>
            
            {/* Description */}
            {updatedProduct.description && (
              <p className="text-sm text-muted mb-3 line-clamp-2">
                {updatedProduct.description}
              </p>
            )}
            
            {/* Rating */}
            {updatedProduct.rating && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(updatedProduct.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted">
                  {updatedProduct.rating} ({updatedProduct.reviews?.toLocaleString()} reviews)
                </span>
              </div>
            )}
            
            {/* Price */}
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-accent">
                {formatPrice(updatedProduct.price)}
              </p>
              {updatedProduct.originalPrice && (
                <p className="text-sm text-muted line-through">
                  {formatPrice(updatedProduct.originalPrice)}
                </p>
              )}
            </div>
            {/* Quick action */}
            <div className="mt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="inline-flex items-center justify-center rounded-lg border border-border bg-background/60 px-4 py-2 text-sm text-foreground shadow-sm backdrop-blur-md transition-colors hover:border-border-hover hover:bg-border/20">Quick view</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
