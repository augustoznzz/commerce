import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { HeroAnimations } from './hero-animations'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="heading-xl text-balance">
                Premium Products for
                <span className="text-accent"> Modern Life</span>
              </h1>
              <p className="text-body max-w-lg">
                Discover exceptional quality and design with our curated collection of 
                premium products. Built to last, designed to inspire.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="btn-primary inline-flex items-center justify-center group"
                prefetch={true}
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="btn-secondary inline-flex items-center justify-center"
                prefetch={true}
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">10K+</div>
                <div className="text-sm text-muted">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">500+</div>
                <div className="text-sm text-muted">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted">Support</div>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              <Image
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&crop=center"
                alt="Premium wireless headphones with sleek design"
                fill
                className="object-cover rounded-2xl shadow-2xl"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              
              {/* Floating elements - now client-side */}
              <HeroAnimations />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - now client-side */}
      <HeroAnimations type="scroll" />
    </section>
  )
}
