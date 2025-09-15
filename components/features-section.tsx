'use client'

import { motion } from 'framer-motion'
import { Truck, RefreshCw, Shield, Headphones } from 'lucide-react'
import { FeatureCard } from './feature-card'

const features = [
  {
    title: 'Fast Delivery',
    description: 'Free shipping on orders over $100. Express delivery available for urgent needs.',
    icon: Truck,
  },
  {
    title: 'Easy Returns',
    description: '30-day hassle-free returns. We make it easy to exchange or return items.',
    icon: RefreshCw,
  },
  {
    title: 'Secure Payment',
    description: 'Your payment information is protected with bank-level security encryption.',
    icon: Shield,
  },
  {
    title: '24/7 Support',
    description: 'Our dedicated support team is available around the clock to help you.',
    icon: Headphones,
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4">
            Why Choose CastleTech?
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            We're committed to providing an exceptional shopping experience with 
            premium products and outstanding customer service.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
