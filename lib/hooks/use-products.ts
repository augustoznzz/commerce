'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/lib/mock-data'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products')
      
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      
      const data = await response.json()
      setProducts(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Listen for product updates from admin
  useEffect(() => {
    const handleProductUpdate = () => {
      fetchProducts()
    }

    // Listen for custom product update events
    window.addEventListener('ct_products_updated', handleProductUpdate)

    return () => {
      window.removeEventListener('ct_products_updated', handleProductUpdate)
    }
  }, [])

  return { products, loading, error, refetch: fetchProducts }
}
