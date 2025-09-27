import type { Metadata } from 'next'
import Image from 'next/image'
import { Users, Award, Heart, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About - CastleTech Commerce',
  description: 'Learn about CastleTech\'s mission to provide premium products with exceptional quality and design.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container section-padding">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="heading-lg mb-6">About CastleTech</h1>
          <p className="text-body max-w-3xl mx-auto">
            We're passionate about bringing you premium products that enhance your daily life. 
            Our commitment to quality, design, and customer satisfaction drives everything we do.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h2 className="heading-md">Our Mission</h2>
            <p className="text-body">
              At CastleTech, we believe that exceptional products should be accessible to everyone. 
              We carefully curate our collection, working with trusted manufacturers to bring you 
              items that combine superior quality with thoughtful design.
            </p>
            <p className="text-body">
              From the initial concept to the final delivery, we ensure every step of your journey 
              with us exceeds expectations. Our team is dedicated to providing not just products, 
              but experiences that enrich your lifestyle.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl flex items-center justify-center overflow-hidden">
              <Image
                src="https://media.discordapp.net/attachments/1402093523007836181/1421510505473900664/IMG_0681.jpg?ex=68d94c52&is=68d7fad2&hm=b1573bfdd6dde7e5e4e0d7ee1d5ded319ec90b447cc5d7eef19cbd59d6fbb32d&=&format=webp&width=706&height=967"
                alt="CastleTech Mission"
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="heading-md text-center mb-16">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="heading-sm">Quality First</h3>
              <p className="text-muted">
                We never compromise on quality. Every product in our collection meets our 
                rigorous standards for durability, functionality, and design.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="heading-sm">Customer Focus</h3>
              <p className="text-muted">
                Your satisfaction is our priority. We're here to help you find the perfect 
                products and provide support whenever you need it.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="heading-sm">Community</h3>
              <p className="text-muted">
                We're building a community of people who appreciate quality and design. 
                Join us in celebrating the things that make life better.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-accent/5 to-accent/10 rounded-2xl p-12 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">10K+</div>
              <div className="text-muted">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">500+</div>
              <div className="text-muted">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">99%</div>
              <div className="text-muted">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <div className="text-muted">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
