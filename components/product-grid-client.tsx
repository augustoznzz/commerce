'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ProductCard } from './product-card'
import { PRODUCTS, type Product } from '@/lib/mock-data'

export function ProductGridClient() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS)

  // Load admin-modified products from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ct_products')
      if (saved) {
        const savedProducts = JSON.parse(saved)
        setProducts(savedProducts)
      }
    } catch (_) {
      // Fallback to default products if localStorage fails
      setProducts(PRODUCTS)
    }
  }, [])

  // Listen for product updates from admin
  useEffect(() => {
    const handleProductUpdate = () => {
      try {
        const saved = localStorage.getItem('ct_products')
        if (saved) {
          const savedProducts = JSON.parse(saved)
          setProducts(savedProducts)
        }
      } catch (_) {
        setProducts(PRODUCTS)
      }
    }

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'ct_products') {
        handleProductUpdate()
      }
    }

    // Listen for custom product update events
    window.addEventListener('ct_products_updated', handleProductUpdate)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('ct_products_updated', handleProductUpdate)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

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
