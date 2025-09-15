import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductGridClient } from './product-grid-client'

export function ProductGrid() {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-border/10">
      <div className="container">
        <div className="text-center mb-16">
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
            prefetch={true}
          >
            View all products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <ProductGridClient />

        {/* Call to action */}
        <div className="text-center mt-16">
          <Link
            href="/shop"
            className="btn-primary inline-flex items-center"
            prefetch={true}
          >
            Explore All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
