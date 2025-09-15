'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, User, Home, ShoppingCart, Info, Mail } from 'lucide-react'
import { NAVIGATION_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/95',
          isScrolled && 'shadow-sm'
        )}
      >
        <div className="container">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 font-bold text-xl hover:text-accent transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              <span>CastleTech</span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-border/20 text-muted hover:text-foreground">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none select-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mb-2 text-lg font-medium">CastleTech</div>
                            <p className="text-muted text-sm leading-tight">
                            The best licenses for all software.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <NavigationMenuLink asChild>
                        <Link href="/" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-border/20 focus:bg-border/20">
                          <div className="text-sm font-medium leading-none">Overview</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted">
                            Discover our premium product collection
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/#features" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-border/20 focus:bg-border/20">
                          <div className="text-sm font-medium leading-none">Features</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted">
                            Fast delivery, easy returns, secure payment
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/#testimonials" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-border/20 focus:bg-border/20">
                          <div className="text-sm font-medium leading-none">Testimonials</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted">
                            What our customers say about us
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-border/20 text-muted hover:text-foreground">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Shop
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <NavigationMenuLink asChild>
                        <Link href="/shop" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-border/20 focus:bg-border/20">
                          <div className="text-sm font-medium leading-none">All Products</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted">
                            Browse our complete collection of premium products
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/shop?filter=new" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-border/20 focus:bg-border/20">
                          <div className="text-sm font-medium leading-none">New Arrivals</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted">
                            Latest products added to our collection
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/shop?filter=bestsellers" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-border/20 focus:bg-border/20">
                          <div className="text-sm font-medium leading-none">Best Sellers</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted">
                            Our most popular and highly-rated products
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/shop?filter=sale" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-border/20 focus:bg-border/20">
                          <div className="text-sm font-medium leading-none">Sale</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted">
                            Special offers and discounted items
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/about" className="bg-transparent hover:bg-border/20 text-muted hover:text-foreground">
                      <Info className="mr-2 h-4 w-4" />
                      About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/contact" className="bg-transparent hover:bg-border/20 text-muted hover:text-foreground">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Sign In */}
              <Link
                href="/auth/signin"
                className="hidden sm:flex items-center space-x-2 text-sm font-medium text-muted hover:text-foreground transition-colors duration-200"
              >
                <User className="h-4 w-4" />
                <span>Sign in</span>
              </Link>

              {/* Cart */}
              <button
                className="flex items-center space-x-2 text-sm font-medium text-muted hover:text-foreground transition-colors duration-200"
                aria-label="Shopping cart (0 items)"
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden sm:inline">Cart (0)</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-muted hover:text-foreground transition-colors duration-200"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur"
            >
              <div className="container py-4">
                <nav className="flex flex-col space-y-4">
                  {NAVIGATION_ITEMS.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={cn(
                          'text-base font-medium transition-colors duration-200',
                          isActive 
                            ? 'text-accent' 
                            : 'text-muted hover:text-foreground'
                        )}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                  
                  {/* Mobile Sign In */}
                  <Link
                    href="/auth/signin"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-2 text-base font-medium text-muted hover:text-foreground transition-colors duration-200 pt-4 border-t border-border/40"
                  >
                    <User className="h-4 w-4" />
                    <span>Sign in</span>
                  </Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
