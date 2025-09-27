'use client'

import { useState, useEffect } from 'react'
import { getCartItems, addToCart, clearCart, getCartItemCount } from '@/lib/cart-utils'
import Link from 'next/link'

/**
 * Test page to demonstrate cart isolation between users
 * This page shows the current session ID and cart contents
 */
export default function TestCartPage() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [cartCount, setCartCount] = useState(0)
  const [sessionId, setSessionId] = useState('')

  useEffect(() => {
    // Get current session info
    const currentSessionId = sessionStorage.getItem('ct_session_id') || 'No session ID'
    setSessionId(currentSessionId)
    
    // Load cart items
    const items = getCartItems()
    setCartItems(items)
    setCartCount(getCartItemCount())
  }, [])

  const handleAddTestItem = () => {
    addToCart('test-item', 1)
    // Refresh cart display
    setCartItems(getCartItems())
    setCartCount(getCartItemCount())
  }

  const handleClearCart = () => {
    clearCart()
    setCartItems([])
    setCartCount(0)
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container section-padding">
        <h1 className="heading-lg mb-6">Cart Isolation Test</h1>
        
        <div className="max-w-2xl space-y-6">
          <div className="rounded-lg border border-border bg-border/10 p-4">
            <h2 className="text-lg font-semibold mb-2">Session Information</h2>
            <p className="text-sm text-muted">
              <strong>Session ID:</strong> {sessionId}
            </p>
            <p className="text-sm text-muted mt-2">
              This unique session ID ensures your cart is isolated from other users.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-border/10 p-4">
            <h2 className="text-lg font-semibold mb-2">Current Cart Status</h2>
            <p className="text-sm text-muted mb-2">
              <strong>Total Items:</strong> {cartCount}
            </p>
            <p className="text-sm text-muted mb-4">
              <strong>Cart Items:</strong> {cartItems.length}
            </p>
            
            {cartItems.length > 0 ? (
              <div className="space-y-2">
                {cartItems.map((item, index) => (
                  <div key={index} className="text-sm">
                    • {item.slug} (Qty: {item.quantity})
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted">No items in cart</p>
            )}
          </div>

          <div className="rounded-lg border border-border bg-border/10 p-4">
            <h2 className="text-lg font-semibold mb-4">Test Actions</h2>
            <div className="flex gap-4">
              <button 
                onClick={handleAddTestItem}
                className="btn-primary"
              >
                Add Test Item
              </button>
              <button 
                onClick={handleClearCart}
                className="btn-secondary"
              >
                Clear Cart
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-border/10 p-4">
            <h2 className="text-lg font-semibold mb-2">How to Test Isolation</h2>
            <div className="text-sm text-muted space-y-2">
              <p>1. <strong>Open in Incognito/Private Mode:</strong> Open this page in a new incognito window to simulate a different user</p>
              <p>2. <strong>Different Browser:</strong> Open in a different browser (Chrome vs Firefox)</p>
              <p>3. <strong>Close Tab:</strong> Close this tab and reopen - cart should be empty (session-based storage)</p>
              <p>4. <strong>Multiple Tabs:</strong> Open multiple tabs of this page - they should share the same cart</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href="/shop" className="btn-secondary">
              Go to Shop
            </Link>
            <Link href="/cart" className="btn-primary">
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
