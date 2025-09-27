'use client'

import { motion } from 'framer-motion'
import { ProductCard } from './product-card'
import { useProducts } from '@/lib/hooks/use-products'
import { ClientOnly } from './client-only'

function ProductGridContent() {
  const { products, loading } = useProducts()

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-square bg-border/20 rounded-xl mb-4"></div>
            <div className="h-4 bg-border/20 rounded mb-2"></div>
            <div className="h-3 bg-border/20 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  const featuredProducts = products.slice(0, 6)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {featuredProducts.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
        />
      ))}
    </motion.div>
  )
}

export function ProductGridClient() {
  return (
    <ClientOnly 
      fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-square bg-border/20 rounded-xl mb-4"></div>
              <div className="h-4 bg-border/20 rounded mb-2"></div>
              <div className="h-3 bg-border/20 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      }
    >
      <ProductGridContent />
    </ClientOnly>
  )
}
