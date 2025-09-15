'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

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
            <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-200 mb-2">
              {product.title}
            </h3>
            <p className="text-xl font-bold text-accent">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
