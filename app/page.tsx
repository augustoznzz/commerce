import { Hero } from '@/components/hero'
import { ProductGrid } from '@/components/product-grid'
import { FeaturesSection } from '@/components/features-section'
import { TestimonialCarousel } from '@/components/testimonial-carousel'
import { NewsletterForm } from '@/components/newsletter-form'

export default function HomePage() {
  return (
    <div id="main-content">
      <Hero />
      <ProductGrid />
      <FeaturesSection />
      <TestimonialCarousel />
      <NewsletterForm />
    </div>
  )
}
