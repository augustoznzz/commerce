export interface Product {
  id: string
  title: string
  price: number
  image: string
  href: string
  badge?: string
  category?: string
  description?: string
  htmlDescription?: string
  originalPrice?: number
  rating?: number
  reviews?: number
  inventory?: 'in_stock' | 'low_stock' | 'out_of_stock'
  discountPercent?: number
  isNew?: boolean
  gallery?: string[]
  variants?: {
    colors?: string[]
    sizes?: string[]
    models?: string[]
  }
  specs?: Record<string, string>
  highlights?: string[]
  // Stock management
  stockMode?: 'infinite' | 'keys'
  stockCount?: number
  stockKeys?: string[]
  // Payments
  stripeProductId?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  avatar: string
}

export interface Feature {
  id: string
  title: string
  description: string
  icon: string
}

// Produtos padrão apenas como fallback para quando não há produtos criados ainda
export const PRODUCTS: Product[] = []

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Augusto Zuanazzi',
    role: 'Software Engineer',
    quote: 'The quality and design of these products exceeded my expectations. Fast shipping and excellent customer service.',
    avatar: 'https://media.discordapp.net/attachments/1402093523007836181/1421508934467846234/IMG_0562_Original.jpg?ex=68d94adc&is=68d7f95c&hm=ae68c1204756383bd4bfe6248ad666a22772b40106e08406d268c22f845c5b76&=&format=webp&width=706&height=967',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Designer',
    quote: 'Beautiful, minimalist design that fits perfectly with my lifestyle. Highly recommended for anyone who values quality.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Developer',
    quote: 'Outstanding build quality and attention to detail. These products are built to last and perform exceptionally well.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Entrepreneur',
    quote: 'The customer experience is second to none. From browsing to delivery, everything is seamless and professional.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
]

export const FEATURES: Feature[] = [
  {
    id: '1',
    title: 'Fast Delivery',
    description: 'Free shipping on orders over $100. Express delivery available for urgent needs.',
    icon: 'truck',
  },
  {
    id: '2',
    title: 'Easy Returns',
    description: '30-day hassle-free returns. We make it easy to exchange or return items.',
    icon: 'refresh-cw',
  },
  {
    id: '3',
    title: 'Secure Payment',
    description: 'Your payment information is protected with bank-level security encryption.',
    icon: 'shield',
  },
  {
    id: '4',
    title: '24/7 Support',
    description: 'Our dedicated support team is available around the clock to help you.',
    icon: 'headphones',
  },
]
