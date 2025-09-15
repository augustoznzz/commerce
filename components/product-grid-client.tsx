'use client'

import { motion } from 'framer-motion'
import { ProductCard } from './product-card'
import { PRODUCTS } from '@/lib/mock-data'

export function ProductGridClient() {
  const featuredProducts = PRODUCTS.slice(0, 6)

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
