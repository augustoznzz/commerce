'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, Home, ShoppingCart, Info, Mail } from 'lucide-react'
import { NAVIGATION_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { getCartItemCount } from '@/lib/cart-utils'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const computeCount = () => {
      setCartCount(getCartItemCount())
    }

    computeCount()

    const onCustom = () => computeCount()

    window.addEventListener('ct_cart_updated', onCustom as EventListener)
    return () => {
      window.removeEventListener('ct_cart_updated', onCustom as EventListener)
    }
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

            {/* Desktop Navigation (no submenus) */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className={cn(
                        'inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-[#22D3EE]',
                        pathname === '/' && 'text-[#22D3EE]'
                      )}
                    >
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/shop"
                      className={cn(
                        'inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-[#22D3EE]',
                        pathname?.startsWith('/shop') && 'text-[#22D3EE]'
                      )}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Shop
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/about"
                      className={cn(
                        'inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-[#22D3EE]',
                        pathname === '/about' && 'text-[#22D3EE]'
                      )}
                    >
                      <Info className="mr-2 h-4 w-4" />
                      About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/contact"
                      className={cn(
                        'inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-[#22D3EE]',
                        pathname === '/contact' && 'text-[#22D3EE]'
                      )}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center space-x-2 text-sm font-medium text-muted hover:text-foreground transition-colors duration-200"
                aria-label={`Shopping cart${cartCount > 0 ? ` (${cartCount} items)` : ''}`}
              >
                <div className="relative">
                  <ShoppingBag className="h-4 w-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[10px] leading-none flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Cart</span>
              </Link>

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
                            ? 'text-[#22D3EE]' 
                            : 'text-muted hover:text-foreground'
                        )}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                  
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
