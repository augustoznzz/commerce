'use client'

import { useEffect, useMemo, useState } from 'react'
import { PRODUCTS as DEFAULT_PRODUCTS, type Product } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'

type User = { username: string }

const STORAGE_KEYS = {
  products: 'ct_products',
  auth: 'ct_admin_auth',
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [products, setProducts] = useState<Product[]>([])

  // Load from localStorage
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(STORAGE_KEYS.auth)
      if (savedAuth) setUser(JSON.parse(savedAuth))

      const savedProducts = localStorage.getItem(STORAGE_KEYS.products)
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts))
      } else {
        setProducts(DEFAULT_PRODUCTS)
      }
    } catch (_) {
      setProducts(DEFAULT_PRODUCTS)
    }
  }, [])

  useEffect(() => {
    try {
      if (products.length) {
        localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products))
      }
    } catch (_) {}
  }, [products])

  const saveProductsToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products))
      alert('Changes saved')
    } catch (_) {
      alert('Failed to save changes')
    }
  }

  const login = () => {
    if (username === 'guto' && password === 'admin') {
      const u = { username }
      setUser(u)
      try { localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify(u)) } catch (_) {}
    } else {
      alert('Invalid credentials')
    }
  }

  const logout = () => {
    setUser(null)
    try { localStorage.removeItem(STORAGE_KEYS.auth) } catch (_) {}
  }

  const addProduct = () => {
    const id = String(Date.now())
    setProducts([
      ...products,
      {
        id,
        title: 'New Product',
        price: 99.9,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop&crop=center',
        href: `/shop/new-${id}`,
        category: 'General',
        description: 'A newly added product with a placeholder description.',
        htmlDescription: '<p>Edit this rich description in the admin panel.</p>',
        rating: 4.5,
        reviews: 10,
      },
    ])
  }

  const updatePrice = (id: string, price: number) => {
    setProducts(products.map(p => (p.id === id ? { ...p, price } : p)))
  }

  const removeProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const updateStockMode = (id: string, mode: 'count' | 'keys') => {
    setProducts(products.map(p => (p.id === id ? { ...p, stockMode: mode } : p)))
  }

  const updateStockCount = (id: string, count: number) => {
    setProducts(products.map(p => (p.id === id ? { ...p, stockCount: Math.max(0, Math.floor(count)), stockMode: 'count' } : p)))
  }

  const addKeysFromText = (id: string, text: string) => {
    const keys = text
      .split(/\r?\n/)
      .map(k => k.trim())
      .filter(Boolean)
    setProducts(products.map(p => (p.id === id ? { ...p, stockMode: 'keys', stockKeys: [...(p.stockKeys || []), ...keys] } : p)))
  }

  const addKeysFromFiles = async (id: string, files: FileList | null) => {
    if (!files || files.length === 0) return
    const contents: string[] = []
    for (const file of Array.from(files)) {
      const text = await file.text()
      contents.push(text)
    }
    addKeysFromText(id, contents.join('\n'))
  }

  if (!user) {
    return (
      <div className="container pt-24 pb-24 max-w-lg">
        <h1 className="heading-md mb-6">Admin Login</h1>
        <div className="space-y-4 rounded-lg border border-border bg-border/10 p-6">
          <div>
            <label className="mb-1 block text-sm text-muted">Username</label>
            <input value={username} onChange={e=>setUsername(e.target.value)} className="w-full rounded-md bg-border/20 border border-border px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full rounded-md bg-border/20 border border-border px-3 py-2" />
          </div>
          <button onClick={login} className="btn-primary w-full">Login</button>
        </div>
      </div>
    )
  }

  return (
    <div className="container pt-24 pb-24">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="heading-md">Admin Panel</h1>
        <div className="flex items-center gap-3">
          <button onClick={saveProductsToStorage} className="btn-primary">Save changes</button>
          <button onClick={logout} className="btn-secondary">Logout</button>
        </div>
      </div>

      <div className="mb-6">
        <button onClick={addProduct} className="btn-primary">Add product</button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {products.map((p) => (
          <div key={p.id} className="rounded-lg border border-border bg-border/10 p-4">
            <div className="mb-2 text-sm text-muted">ID: {p.id}</div>
            <div className="mb-1 font-semibold">{p.title}</div>
            <div className="mb-3 text-sm text-muted">Current price: {formatPrice(p.price)}</div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="0.01"
                defaultValue={p.price}
                onBlur={(e) => updatePrice(p.id, Number(e.target.value))}
                className="w-40 rounded-md bg-border/20 border border-border px-3 py-2"
              />
              <button onClick={() => removeProduct(p.id)} className="text-sm text-red-400 hover:text-red-300">Remove</button>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-x-[72px]">
              <div>
                <div className="mb-1 text-sm text-muted">Stock mode</div>
                <select
                  value={p.stockMode || 'keys'}
                  onChange={(e) => updateStockMode(p.id, 'keys')}
                  className="w-56 rounded-md bg-border/20 border border-border px-3 py-2 text-sm select-dark"
                >
                  <option value="keys">Keys list</option>
                </select>
              </div>
              <div>
                <div className="mb-1 text-sm text-muted">Add keys (one per line)</div>
                <textarea
                  onBlur={(e)=>addKeysFromText(p.id, e.target.value)}
                  className="h-28 w-full rounded-md bg-border/20 border border-border px-3 py-2 text-sm"
                  placeholder="KEY-XXXX-YYYY\nKEY-AAAA-BBBB"
                />
                <div className="mt-2 text-xs text-muted">Or import files (each line becomes one key):</div>
                <input
                  type="file"
                  multiple
                  onChange={(e)=>addKeysFromFiles(p.id, e.target.files)}
                  className="mt-1 w-full text-sm"
                />
                <div className="mt-2 text-xs text-muted">Current keys: {(p.stockKeys?.length || 0).toLocaleString()}</div>
                <div className="mt-2">
                  <button onClick={saveProductsToStorage} className="btn-secondary">Save product</button>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-1 text-sm text-muted">Rich description (HTML allowed)</div>
              <textarea
                defaultValue={p.htmlDescription}
                onBlur={(e) => setProducts(products.map(x => x.id === p.id ? { ...x, htmlDescription: e.target.value } : x))}
                className="h-32 w-full rounded-md bg-border/20 border border-border px-3 py-2 text-sm"
                placeholder="<p>Supports basic HTML like p, ul/li, strong, em...</p>"
              />
              <div className="mt-2">
                <button onClick={saveProductsToStorage} className="btn-secondary">Save product</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


