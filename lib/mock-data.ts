export interface Product {
  id: string
  title: string
  price: number
  image: string
  href: string
  badge?: string
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

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&crop=center',
    href: '/shop/headphones',
    badge: 'Best Seller',
  },
  {
    id: '2',
    title: 'Smart Watch Pro',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&crop=center',
    href: '/shop/smartwatch',
    badge: 'New',
  },
  {
    id: '3',
    title: 'Wireless Charging Pad',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500&h=500&fit=crop&crop=center',
    href: '/shop/charger',
  },
  {
    id: '4',
    title: 'Bluetooth Speaker',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&crop=center',
    href: '/shop/speaker',
  },
  {
    id: '5',
    title: 'USB-C Hub',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&h=500&fit=crop&crop=center',
    href: '/shop/hub',
  },
  {
    id: '6',
    title: 'Mechanical Keyboard',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop&crop=center',
    href: '/shop/keyboard',
    badge: 'Sale',
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Tech Enthusiast',
    quote: 'The quality and design of these products exceeded my expectations. Fast shipping and excellent customer service.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
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
