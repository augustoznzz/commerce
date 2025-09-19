import type { Metadata } from 'next'
import { Mail, Phone, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact - CastleTech Commerce',
  description: 'Get in touch with CastleTech. We\'re here to help with any questions or support you need.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container section-padding">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="heading-lg mb-6">Contact Us</h1>
          <p className="text-body max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch with our team for any questions, 
            support, or just to say hello!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <h2 className="heading-md">Send us a message</h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 rounded-lg bg-border/20 border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-3 rounded-lg bg-border/20 border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg bg-border/20 border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg bg-border/20 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Customer Support</option>
                  <option value="returns">Returns & Exchanges</option>
                  <option value="wholesale">Wholesale Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-border/20 border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="heading-md">Get in touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <p className="text-muted">hello@castletech.com</p>
                  <p className="text-muted">support@castletech.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                  <p className="text-muted">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted">Mon-Fri 9AM-6PM EST</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Address</h3>
                  <p className="text-muted">
                    123 Premium Street<br />
                    Design District<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

            </div>

            {/* FAQ Section */}
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Quick Answers</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-foreground">How fast is shipping?</p>
                  <p className="text-muted">Free shipping on orders over $100. Express delivery available.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">What's your return policy?</p>
                  <p className="text-muted">30-day hassle-free returns for all items.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Do you offer international shipping?</p>
                  <p className="text-muted">Yes, we ship worldwide with tracking included.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
