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

  // Helper function to save products and notify other components
  const saveProductsAndNotify = (updatedProducts: Product[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(updatedProducts))
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('ct_products_updated'))
    } catch (_) {}
  }

  useEffect(() => {
    if (products.length) {
      saveProductsAndNotify(products)
    }
  }, [products])

  const saveProductsToStorage = () => {
    try {
      saveProductsAndNotify(products)
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
        image: '/images/key.png',
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

  const updateStockMode = (id: string, mode: 'infinite' | 'keys') => {
    setProducts(products.map(p => (p.id === id ? { ...p, stockMode: mode } : p)))
  }

  const updateStockCount = (id: string, count: number) => {
    setProducts(products.map(p => (p.id === id ? { ...p, stockCount: Math.max(0, Math.floor(count)) } : p)))
  }

  const setKeysFromText = (id: string, text: string) => {
    const keys = text
      .split(/\r?\n/)
      .map(k => k.trim())
      .filter(Boolean)
    setProducts(products.map(p => (p.id === id ? { ...p, stockMode: 'keys', stockKeys: keys } : p)))
  }

  const addKeysFromFiles = async (id: string, files: FileList | null) => {
    if (!files || files.length === 0) return
    const contents: string[] = []
    for (const file of Array.from(files)) {
      const text = await file.text()
      contents.push(text)
    }
    const newKeys = contents
      .join('\n')
      .split(/\r?\n/)
      .map(k => k.trim())
      .filter(Boolean)
    setProducts(products.map(p => (p.id === id ? { ...p, stockMode: 'keys', stockKeys: [...(p.stockKeys || []), ...newKeys] } : p)))
  }

  const updateImageUrl = (id: string, url: string) => {
    setProducts(products.map(p => (p.id === id ? { ...p, image: url || '/images/key.png' } : p)))
  }

  const updateImageFromFile = (id: string, fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return
    const file = fileList[0]
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = String(reader.result || '')
      // Update state and persist immediately so the product and cards reflect the change
      setProducts(prev => {
        const next = prev.map(p => (p.id === id ? { ...p, image: dataUrl } : p))
        try { localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(next)) } catch (_) {}
        return next
      })
    }
    reader.readAsDataURL(file)
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
            <div className="mb-2">
              <div className="mb-1 text-sm text-muted">Product name</div>
              <input
                type="text"
                value={p.title}
                onChange={(e)=>setProducts(products.map(x => x.id === p.id ? { ...x, title: e.target.value } : x))}
                className="w-full rounded-md bg-border/20 border border-border px-3 py-2 text-sm font-semibold"
              />
            </div>
            <div className="mb-3 text-sm text-muted">Current price: {formatPrice(p.price)}</div>
            {/* Stripe mapping */}
            <div className="mb-4">
              <div className="mb-1 text-sm text-muted">Stripe product ID</div>
              <input
                type="text"
                value={p.stripeProductId || ''}
                onChange={(e)=>setProducts(products.map(x => x.id === p.id ? { ...x, stripeProductId: e.target.value } : x))}
                placeholder="prod_..."
                className="w-full rounded-md bg-border/20 border border-border px-3 py-2 text-sm"
              />
              <div className="mt-1 text-xs text-muted">Example for 'Key': prod_T43A6IQ832zeQD</div>
            </div>
            {/* Image controls */}
            <div className="mb-4 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-md border border-border bg-border/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image || '/images/key.png'} alt="preview" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="mb-1 text-sm text-muted">Image URL</div>
                <input
                  type="text"
                  value={p.image}
                  onChange={(e)=>updateImageUrl(p.id, e.target.value)}
                  placeholder="https://... or data:image/..."
                  className="w-full rounded-md bg-border/20 border border-border px-3 py-2 text-sm"
                />
                <div className="mt-2 flex items-center gap-3 text-xs text-muted">
                  <span>Or upload from device:</span>
                  <div>
                    <input id={`upload-${p.id}`} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e)=>updateImageFromFile(p.id, e.target.files)} />
                    <label htmlFor={`upload-${p.id}`} className="inline-flex cursor-pointer items-center rounded-md border border-border px-3 py-1 text-foreground hover:border-border-hover hover:bg-border/20">
                      Choose image
                    </label>
                  </div>
                  <button onClick={()=>updateImageUrl(p.id, '/images/key.png')} className="rounded-md border border-border px-2 py-1 text-foreground hover:border-border-hover hover:bg-border/20">Reset</button>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="mb-1 text-sm text-muted">Category tag</div>
              <input
                type="text"
                defaultValue={p.category}
                onBlur={(e)=>setProducts(products.map(x => x.id === p.id ? { ...x, category: e.target.value } : x))}
                className="w-full rounded-md bg-border/20 border border-border px-3 py-2 text-sm"
                placeholder="e.g., Design Software"
              />
            </div>
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
                  onChange={(e) => updateStockMode(p.id, (e.target.value as 'keys' | 'infinite'))}
                  className="w-56 rounded-md bg-border/20 border border-border px-3 py-2 text-sm select-dark"
                >
                  <option value="keys">Keys list</option>
                  <option value="infinite">Infinite</option>
                </select>
                <div className="mt-2 text-xs text-muted">
                  Current stock: {p.stockMode === 'infinite' ? '∞' : ((p.stockMode === 'keys' ? (p.stockKeys?.length ?? 0) : (p.stockCount ?? 0)) || 0).toLocaleString()}
                </div>
              </div>
              { (p.stockMode || 'keys') !== 'infinite' ? (
                <div>
                  <div className="mb-1 text-sm text-muted">Add keys (one per line)</div>
                  <textarea
                    onBlur={(e)=>setKeysFromText(p.id, e.target.value)}
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
                  <div className="mt-2 text-xs text-muted">Current keys: {(p.stockKeys?.length ?? 0).toLocaleString()}</div>
                  <div className="mt-2">
                    <button onClick={saveProductsToStorage} className="btn-secondary">Save product</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-1 text-sm text-muted">Infinite mode: add supplemental keys (optional)</div>
                  <textarea
                    onBlur={(e)=>setKeysFromText(p.id, e.target.value)}
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
                  <div className="mt-2 text-xs text-muted">Stored keys (optional): {(p.stockKeys?.length ?? 0).toLocaleString()}</div>
                  <div className="mt-2">
                    <button onClick={saveProductsToStorage} className="btn-secondary">Save product</button>
                  </div>
                </div>
              )}
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


