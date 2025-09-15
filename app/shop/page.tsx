import type { Metadata } from 'next'
import { ShoppingBag, Filter, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Shop - CastleTech Commerce',
  description: 'Browse our complete collection of premium products. Quality and design you can trust.',
}

export default function ShopPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container section-padding">
        <div className="text-center mb-16">
          <h1 className="heading-lg mb-4">Shop</h1>
          <p className="text-body max-w-2xl mx-auto">
            Discover our carefully curated collection of premium products, 
            each designed with exceptional quality and attention to detail.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-border/20 border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-border/20 border border-border text-foreground hover:bg-border/40 transition-colors duration-200">
            <Filter className="h-5 w-5" />
            Filters
          </button>
        </div>

        {/* Placeholder Content */}
        <div className="text-center py-20">
          <ShoppingBag className="h-24 w-24 text-muted mx-auto mb-8" />
          <h2 className="heading-md mb-4">Shop Coming Soon</h2>
          <p className="text-body max-w-md mx-auto">
            We're putting the finishing touches on our shop experience. 
            Check back soon for our complete product catalog!
          </p>
        </div>
      </div>
    </div>
  )
}
