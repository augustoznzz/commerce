'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { Star, Users, Tag } from 'lucide-react'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link
        href={product.href}
        className="block"
        aria-label={`View ${product.title} product details`}
      >
        <div className="relative overflow-hidden rounded-xl bg-border/20 card-hover">
          {/* Product Image */}
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            
            {/* Badge */}
            {product.badge && (
              <div className="absolute top-4 left-4">
                <span className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                  product.badge === 'New' && "bg-accent text-background",
                  product.badge === 'Best Seller' && "bg-green-500 text-white",
                  product.badge === 'Sale' && "bg-red-500 text-white"
                )}>
                  {product.badge}
                </span>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Product Info */}
          <div className="p-6">
            {/* Category */}
            {product.category && (
              <div className="flex items-center gap-1 mb-2">
                <Tag className="h-3 w-3 text-muted" />
                <span className="text-xs text-muted">{product.category}</span>
              </div>
            )}
            
            <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-200 mb-2 line-clamp-2">
              {product.title}
            </h3>
            
            {/* Description */}
            {product.description && (
              <p className="text-sm text-muted mb-3 line-clamp-2">
                {product.description}
              </p>
            )}
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating!) ? "text-yellow-400 fill-current" : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted">
                  {product.rating} ({product.reviews?.toLocaleString()} reviews)
                </span>
              </div>
            )}
            
            {/* Price */}
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-accent">
                {formatPrice(product.price)}
              </p>
              {product.originalPrice && (
                <p className="text-sm text-muted line-through">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
