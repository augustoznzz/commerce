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

  // Helper function to generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim()
  }

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

  // Helper function to save products to both localStorage and API
  const saveProductsAndNotify = async (updatedProducts: Product[]) => {
    try {
      // Save to localStorage for immediate local updates
      localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(updatedProducts))
      
      // Save to API for global sync
      try {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProducts),
        })
        
        if (!response.ok) {
          console.error('Failed to sync products to server')
        }
      } catch (error) {
        console.error('Error syncing products:', error)
      }
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('ct_products_updated'))
    } catch (_) {}
  }

  useEffect(() => {
    if (products.length) {
      saveProductsAndNotify(products)
    }
  }, [products])

  const saveProductsToStorage = async () => {
    try {
      await saveProductsAndNotify(products)
      alert('Changes saved and synced globally!')
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

  // Gallery image management functions
  const updateGalleryImage = (id: string, index: number, url: string) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const gallery = p.gallery || []
        const newGallery = [...gallery]
        newGallery[index] = url
        return { ...p, gallery: newGallery }
      }
      return p
    }))
  }

  const updateGalleryImageFromFile = (id: string, index: number, fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return
    const file = fileList[0]
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = String(reader.result || '')
      setProducts(prev => {
        const next = prev.map(p => {
          if (p.id === id) {
            const gallery = p.gallery || []
            const newGallery = [...gallery]
            newGallery[index] = dataUrl
            return { ...p, gallery: newGallery }
          }
          return p
        })
        try { localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(next)) } catch (_) {}
        return next
      })
    }
    reader.readAsDataURL(file)
  }

  const removeGalleryImage = (id: string, index: number) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const gallery = p.gallery || []
        const newGallery = gallery.filter((_, i) => i !== index)
        return { ...p, gallery: newGallery }
      }
      return p
    }))
  }

  const addGallerySlot = (id: string) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const gallery = p.gallery || []
        if (gallery.length < 4) {
          const newGallery = [...gallery, '']
          return { ...p, gallery: newGallery }
        }
        return p
      }
      return p
    }))
  }

  const clearAllGalleryImages = (id: string) => {
    if (confirm('Are you sure you want to clear all gallery images for this product?')) {
      setProducts(products.map(p => {
        if (p.id === id) {
          return { ...p, gallery: [] }
        }
        return p
      }))
    }
  }

  if (!user) {
    return (
      <div className="container pt-24 pb-24 max-w-lg">
        <h1 className="heading-md mb-6">Login</h1>
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
                onChange={(e) => {
                  const newTitle = e.target.value
                  const newSlug = generateSlug(newTitle)
                  setProducts(products.map(x => x.id === p.id ? { 
                    ...x, 
                    title: newTitle,
                    href: `/shop/${newSlug}`
                  } : x))
                }}
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
            {/* Image Gallery Controls */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-muted">
                  Product Images ({(() => {
                    const totalImages = (p.image ? 1 : 0) + (p.gallery?.length || 0)
                    return `${totalImages}/5`
                  })()})
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => addGallerySlot(p.id)}
                    disabled={(p.gallery?.length || 0) >= 4}
                    className="rounded border border-border px-2 py-1 text-xs hover:border-border-hover hover:bg-border/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    + Add Image
                  </button>
                  <button 
                    onClick={() => clearAllGalleryImages(p.id)}
                    className="rounded border border-red-500/50 px-2 py-1 text-xs text-red-400 hover:border-red-500 hover:bg-red-500/10"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {/* Main Image */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <div className="text-xs text-muted">Main Image</div>
                    {p.image && p.image !== '/images/key.png' && (
                      <span className="h-2 w-2 rounded-full bg-green-500" title="Image set"></span>
                    )}
                  </div>
                  <div className="relative h-20 w-20 overflow-hidden rounded-md border border-border bg-border/20">
                    <img src={p.image || '/images/key.png'} alt="main preview" className="h-full w-full object-cover" />
                    {p.image && p.image !== '/images/key.png' && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <span className="text-xs text-green-400 font-semibold">✓</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    value={p.image || ''}
                    onChange={(e)=>updateImageUrl(p.id, e.target.value)}
                    placeholder="Main image URL"
                    className="w-full rounded-md bg-border/20 border border-border px-2 py-1 text-xs"
                  />
                  <div className="flex gap-1">
                    <input id={`upload-main-${p.id}`} type="file" accept="image/*" className="hidden" onChange={(e)=>updateImageFromFile(p.id, e.target.files)} />
                    <label htmlFor={`upload-main-${p.id}`} className="cursor-pointer rounded border border-border px-2 py-1 text-xs hover:border-border-hover hover:bg-border/20">
                      Upload
                    </label>
                    <button onClick={()=>updateImageUrl(p.id, '/images/key.png')} className="rounded border border-border px-2 py-1 text-xs hover:border-border-hover hover:bg-border/20">
                      Reset
                    </button>
                  </div>
                </div>

                {/* Gallery Images */}
                {[1, 2, 3, 4].map((index) => {
                  const galleryImages = p.gallery || []
                  const imageUrl = galleryImages[index - 1] || ''
                  const hasImage = imageUrl && imageUrl !== '/images/key.png'
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-1">
                        <div className="text-xs text-muted">Gallery {index}</div>
                        {hasImage && (
                          <span className="h-2 w-2 rounded-full bg-green-500" title="Image set"></span>
                        )}
                      </div>
                      <div className="relative h-20 w-20 overflow-hidden rounded-md border border-border bg-border/20">
                        <img src={imageUrl || '/images/key.png'} alt={`gallery ${index}`} className="h-full w-full object-cover" />
                        {hasImage && (
                          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                            <span className="text-xs text-green-400 font-semibold">✓</span>
                          </div>
                        )}
                        {!hasImage && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs text-muted">Empty</span>
                          </div>
                        )}
                      </div>
                      <input
                        type="text"
                        value={imageUrl}
                        onChange={(e)=>updateGalleryImage(p.id, index - 1, e.target.value)}
                        placeholder={`Gallery ${index} URL`}
                        className="w-full rounded-md bg-border/20 border border-border px-2 py-1 text-xs"
                      />
                      <div className="flex gap-1">
                        <input id={`upload-gallery-${index}-${p.id}`} type="file" accept="image/*" className="hidden" onChange={(e)=>updateGalleryImageFromFile(p.id, index - 1, e.target.files)} />
                        <label htmlFor={`upload-gallery-${index}-${p.id}`} className="cursor-pointer rounded border border-border px-2 py-1 text-xs hover:border-border-hover hover:bg-border/20">
                          Upload
                        </label>
                        <button onClick={()=>removeGalleryImage(p.id, index - 1)} className="rounded border border-red-500/50 px-2 py-1 text-xs text-red-400 hover:border-red-500 hover:bg-red-500/10">
                          Remove
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* Image Management Tips */}
              <div className="mt-3 p-3 bg-border/10 rounded-md">
                <div className="text-xs text-muted space-y-1">
                  <div><strong>Tips:</strong></div>
                  <div>• Main image appears first in product gallery</div>
                  <div>• Gallery images show as thumbnails below main image</div>
                  <div>• Maximum 5 images total (1 main + 4 gallery)</div>
                  <div>• Use high-quality images for best results</div>
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


