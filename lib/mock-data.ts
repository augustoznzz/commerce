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
  // Development Tools
  {
    id: '1',
    title: 'Visual Studio Code Pro',
    price: 29.99,
    originalPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=500&h=500&fit=crop&crop=center',
    href: '/shop/vscode-pro',
    badge: 'Sale',
    category: 'Development Tools',
    description: 'Professional code editor with advanced features',
    htmlDescription: '<p>VS Code Pro delivers a premium editing experience with AI-assisted coding, integrated debugging, and extensible tooling.</p><ul><li>Integrated Git</li><li>Remote dev</li><li>Extensions marketplace</li></ul>',
    rating: 4.8,
    reviews: 1250,
    inventory: 'in_stock',
    discountPercent: 40,
    isNew: false,
    gallery: [
      'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&h=1200&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=1200&fit=crop&crop=center',
    ],
    variants: { colors: ['Dark', 'Light'], sizes: ['Single', 'Team'] },
    specs: { Platform: 'Windows / macOS / Linux', License: 'Per user', Updates: '1 year' },
    highlights: ['AI-assisted coding', 'Fast and lightweight', 'Rich ecosystem'],
  },
  {
    id: '2',
    title: 'JetBrains IntelliJ IDEA',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=500&fit=crop&crop=center',
    href: '/shop/intellij',
    badge: 'Best Seller',
    category: 'Development Tools',
    description: 'Powerful IDE for Java and other languages',
    htmlDescription: '<p>IntelliJ IDEA maximizes developer productivity with smart code completion and deep framework support.</p>',
    rating: 4.9,
    reviews: 2100,
    inventory: 'low_stock',
    isNew: false,
    gallery: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=1200&fit=crop&crop=center',
    ],
    variants: { models: ['Model 1', 'Model 2', 'Model 3'] },
    specs: { Platform: 'Windows / macOS / Linux', License: 'Per user', Support: 'Email' },
    highlights: ['Smart completion', 'Refactorings', 'Debugger'],
  },
  {
    id: '3',
    title: 'Adobe Creative Suite',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=500&fit=crop&crop=center',
    href: '/shop/adobe-suite',
    category: 'Design Software',
    description: 'Complete creative toolkit for professionals',
    htmlDescription: '<p>All the creative tools you need for design, video, and more.</p>',
    rating: 4.7,
    reviews: 3200,
    inventory: 'in_stock',
    isNew: false,
    gallery: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=1200&fit=crop&crop=center',
    ],
    variants: { sizes: ['Individual', 'Team'] },
    specs: { Apps: '20+', Storage: '100GB cloud', Support: '24/7' },
    highlights: ['Industry standard', 'Cross-app workflows', 'Cloud libraries'],
  },
  {
    id: '4',
    title: 'Figma Professional',
    price: 144.99,
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=500&fit=crop&crop=center',
    href: '/shop/figma-pro',
    category: 'Design Software',
    description: 'Collaborative interface design tool',
    rating: 4.8,
    reviews: 1800,
  },
  // Productivity Software
  {
    id: '5',
    title: 'Microsoft Office 365',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=500&h=500&fit=crop&crop=center',
    href: '/shop/office365',
    badge: 'Popular',
    category: 'Productivity',
    description: 'Complete office suite with cloud storage',
    rating: 4.6,
    reviews: 4500,
  },
  {
    id: '6',
    title: 'Notion Pro',
    price: 48.99,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop&crop=center',
    href: '/shop/notion-pro',
    category: 'Productivity',
    description: 'All-in-one workspace for notes and projects',
    rating: 4.7,
    reviews: 1200,
  },
  // Security & Utilities
  {
    id: '7',
    title: 'Norton 360 Deluxe',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=500&fit=crop&crop=center',
    href: '/shop/norton360',
    category: 'Security',
    description: 'Comprehensive antivirus and security suite',
    rating: 4.5,
    reviews: 2800,
  },
  {
    id: '8',
    title: 'CleanMyMac X',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop&crop=center',
    href: '/shop/cleanmymac',
    category: 'Utilities',
    description: 'Mac optimization and cleanup tool',
    rating: 4.6,
    reviews: 950,
  },
  // Gaming Software
  {
    id: '9',
    title: 'Steam Deck Compatible',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&h=500&fit=crop&crop=center',
    href: '/shop/steam-deck',
    badge: 'New',
    category: 'Gaming',
    description: 'Gaming platform and store',
    rating: 4.8,
    reviews: 5600,
  },
  {
    id: '10',
    title: 'Unity Pro',
    price: 1850.00,
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=500&fit=crop&crop=center',
    href: '/shop/unity-pro',
    category: 'Game Development',
    description: 'Professional game development engine',
    rating: 4.7,
    reviews: 1800,
  },
  // Database & Analytics
  {
    id: '11',
    title: 'Tableau Desktop',
    price: 70.00,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop&crop=center',
    href: '/shop/tableau',
    category: 'Analytics',
    description: 'Data visualization and analytics platform',
    rating: 4.6,
    reviews: 1400,
  },
  {
    id: '12',
    title: 'PostgreSQL Enterprise',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&h=500&fit=crop&crop=center',
    href: '/shop/postgresql',
    category: 'Database',
    description: 'Advanced open-source database system',
    rating: 4.8,
    reviews: 2200,
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
