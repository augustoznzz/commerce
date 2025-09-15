'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ProductCard } from './product-card'
import { PRODUCTS } from '@/lib/mock-data'
import { ArrowRight } from 'lucide-react'

export function ProductGrid() {
  const featuredProducts = PRODUCTS.slice(0, 6)

  return (
    <section className="section-padding bg-gradient-to-b from-background to-border/10">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4">
            Featured Products
          </h2>
          <p className="text-body max-w-2xl mx-auto mb-8">
            Discover our carefully curated collection of premium products, 
            each designed with exceptional quality and attention to detail.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center text-accent hover:text-accent/80 font-medium transition-colors duration-200"
          >
            View all products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>

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

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link
            href="/shop"
            className="btn-primary inline-flex items-center"
          >
            Explore All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
