'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Pencil, Trash2, X, Check, Search, ChevronDown, Package } from 'lucide-react'
import { useAdmin, type AdminProduct } from '@/lib/admin-context'

const CATEGORIES = ['earrings', 'bangles', 'accessories', 'jewelry', 'saree', 'lehenga'] as const

const IMAGES = [
  '/images/jewelry-earrings-1.jpg',
  '/images/jewelry-bangles-1.jpg',
  '/images/jewelry-necklace-1.jpg',
  '/images/accessory-scarf-1.jpg',
  '/images/accessory-bindi-1.jpg',
  '/images/jewelry-bracelet-1.jpg',
]

type FormState = {
  name: string; price: string; originalPrice: string
  category: AdminProduct['category']; description: string
  image: string; isNew: boolean; isOnSale: boolean; inStock: boolean; hidden: boolean
}

const EMPTY: FormState = {
  name: '', price: '', originalPrice: '', category: 'earrings',
  description: '', image: IMAGES[0], isNew: false, isOnSale: false, inStock: true, hidden: false,
}

const inputCls = "w-full border border-white/[0.08] bg-[#0d0e12] px-3.5 py-2.5 text-sm text-white/80 placeholder:text-white/25 focus:outline-none focus:border-amber-500/60 rounded-lg transition"
const labelCls = "block text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2 font-medium"

// ── Custom dark-mode select ──────────────────────────────────────────────────
function DarkSelect({
  value, onChange, options, placeholder, className = '',
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = options.find((o) => o.value === value)

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between border border-white/[0.08] bg-[#0d0e12] px-3.5 py-2.5 text-sm text-white/80 rounded-lg transition hover:border-white/[0.14] focus:outline-none focus:border-amber-500/60"
      >
        <span className={selected ? 'text-white/80' : 'text-white/25'}>
          {selected ? selected.label : (placeholder ?? 'Select…')}
        </span>
        <ChevronDown className={`w-4 h-4 text-white/30 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full bg-[#1a1b22] border border-white/[0.1] rounded-xl shadow-2xl overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                opt.value === value
                  ? 'bg-amber-500/15 text-amber-300'
                  : 'text-white/70 hover:bg-white/[0.05] hover:text-white/90'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Toggle switch ────────────────────────────────────────────────────────────
function Toggle({
  checked, onChange, label, activeColor = 'bg-amber-500',
}: {
  checked: boolean; onChange: (v: boolean) => void; label: string; activeColor?: string
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group select-none">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-9 h-5 rounded-full transition-all duration-200 relative shrink-0 ${checked ? activeColor : 'bg-white/[0.08]'}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${checked ? 'left-4' : 'left-0.5'}`} />
      </button>
      <span className="text-sm text-white/60 group-hover:text-white/80 transition">{label}</span>
    </label>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function SanctumProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin()
  const [showForm, setShowForm]           = useState(false)
  const [editId, setEditId]               = useState<string | null>(null)
  const [form, setForm]                   = useState<FormState>(EMPTY)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [query, setQuery]                 = useState('')
  const [catFilter, setCatFilter]         = useState('all')
  const [stockFilter, setStockFilter]     = useState<'all' | 'in' | 'out' | 'hidden'>('all')

  const catOptions = [
    { value: 'all', label: 'All Categories' },
    ...CATEGORIES.map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) })),
  ]

  const stockOptions = [
    { value: 'all',    label: 'All Stock' },
    { value: 'in',     label: 'In Stock' },
    { value: 'out',    label: 'Out of Stock' },
    { value: 'hidden', label: 'Hidden' },
  ]

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return products.filter((p) => {
      const matchQ   = !q || p.name.toLowerCase().includes(q) || p.category.includes(q)
      const matchCat = catFilter === 'all' || p.category === catFilter
      const matchStk = stockFilter === 'all'
        || (stockFilter === 'in'     && p.inStock !== false && !p.hidden)
        || (stockFilter === 'out'    && p.inStock === false)
        || (stockFilter === 'hidden' && p.hidden === true)
      return matchQ && matchCat && matchStk
    })
  }, [products, query, catFilter, stockFilter])

  function openAdd() { setForm(EMPTY); setEditId(null); setShowForm(true) }

  function openEdit(p: AdminProduct) {
    setForm({
      name: p.name, price: String(p.price),
      originalPrice: String(p.originalPrice ?? ''),
      category: p.category, description: p.description ?? '',
      image: p.image, isNew: !!p.isNew, isOnSale: !!p.isOnSale,
      inStock: p.inStock !== false,
      hidden: !!p.hidden,
    })
    setEditId(p.id)
    setShowForm(true)
  }

  function handleSave() {
    if (!form.name.trim() || !form.price) return
    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      category: form.category,
      description: form.description,
      image: form.image,
      isNew: form.isNew,
      isOnSale: form.isOnSale,
      inStock: form.inStock,
      hidden: form.hidden,
    }
    if (editId) updateProduct(editId, payload)
    else addProduct(payload)
    setShowForm(false)
  }

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  const outOfStockCount = products.filter((p) => p.inStock === false).length
  const hiddenCount     = products.filter((p) => p.hidden).length

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-amber-500/70 mb-1">Catalogue</p>
          <h1 className="font-serif text-2xl md:text-3xl text-white/90">Products</h1>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 text-stone-900 text-xs font-bold tracking-wider uppercase rounded-lg hover:bg-amber-400 transition shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Total',        value: products.length,                           color: 'text-white/80' },
          { label: 'New',          value: products.filter((p) => p.isNew).length,    color: 'text-amber-400' },
          { label: 'On Sale',      value: products.filter((p) => p.isOnSale).length, color: 'text-rose-400' },
          { label: 'Out of Stock', value: outOfStockCount,                           color: outOfStockCount > 0 ? 'text-orange-400' : 'text-white/30' },
          { label: 'Hidden',       value: hiddenCount,                               color: hiddenCount > 0 ? 'text-slate-400' : 'text-white/30' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-[#13141a] border border-white/[0.06] rounded-xl px-4 py-3 text-center">
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="text-[11px] text-white/30 uppercase tracking-wider mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full pl-10 pr-9 py-2.5 text-sm bg-[#13141a] border border-white/[0.06] rounded-xl text-white/70 placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 transition"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <DarkSelect
          value={catFilter}
          onChange={setCatFilter}
          options={catOptions}
          className="sm:w-44"
        />
        <DarkSelect
          value={stockFilter}
          onChange={(v) => setStockFilter(v as 'all' | 'in' | 'out' | 'hidden')}
          options={stockOptions}
          className="sm:w-40"
        />
      </div>

      {/* Product table */}
      <div className="bg-[#13141a] border border-white/[0.06] rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Package className="w-10 h-10 text-white/10 mx-auto mb-3" />
            <p className="text-sm text-white/30">No products found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-[0.18em] text-white/25 font-medium">Product</th>
                  <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-[0.18em] text-white/25 font-medium hidden sm:table-cell">Category</th>
                  <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-[0.18em] text-white/25 font-medium">Price</th>
                  <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-[0.18em] text-white/25 font-medium hidden md:table-cell">Status</th>
                  <th className="text-left px-5 py-3.5 text-[11px] uppercase tracking-[0.18em] text-white/25 font-medium hidden lg:table-cell">Stock</th>
                  <th className="px-5 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((p) => {
                  const outOfStock = p.inStock === false
                  const isHidden   = !!p.hidden
                  const discount   = p.originalPrice && p.originalPrice > p.price
                    ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                    : 0
                  return (
                    <tr key={p.id} className={`hover:bg-white/[0.02] transition group ${isHidden ? 'opacity-40' : outOfStock ? 'opacity-70' : ''}`}>
                      {/* Product */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-white/[0.05] shrink-0">
                            <Image src={p.image} alt={p.name} fill className="object-cover" sizes="44px" />
                            {outOfStock && !isHidden && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-[8px] font-bold text-white/80 uppercase tracking-wide leading-tight text-center px-0.5">Out of Stock</span>
                              </div>
                            )}
                            {isHidden && (
                              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                <span className="text-[8px] font-bold text-white/60 uppercase tracking-wide">Hidden</span>
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white/80 line-clamp-1">{p.name}</p>
                            <p className="text-[11px] text-white/30 capitalize sm:hidden">{p.category}</p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className="text-xs px-2.5 py-1 bg-white/[0.05] text-white/50 rounded-lg capitalize">
                          {p.category}
                        </span>
                      </td>

                      {/* Price + discount */}
                      <td className="px-5 py-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-white/80">£{p.price}</span>
                            {p.originalPrice && p.originalPrice > p.price && (
                              <span className="text-xs text-white/25 line-through">£{p.originalPrice}</span>
                            )}
                          </div>
                          {discount > 0 && (
                            <span className="text-[10px] text-rose-400 font-semibold">−{discount}% off</span>
                          )}
                        </div>
                      </td>

                      {/* Status badges */}
                      <td className="px-5 py-4 hidden md:table-cell">
                        <div className="flex flex-wrap gap-1.5">
                          {p.isNew && (
                            <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded-full font-medium">New</span>
                          )}
                          {p.isOnSale && (
                            <span className="text-[10px] px-2 py-0.5 bg-rose-500/10 text-rose-400 rounded-full font-medium">Sale</span>
                          )}
                          {!p.isNew && !p.isOnSale && (
                            <span className="text-[10px] text-white/20">—</span>
                          )}
                        </div>
                      </td>

                      {/* Stock / visibility — clickable quick toggle */}
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <div className="flex flex-col gap-1">
                          {isHidden ? (
                            <button
                              onClick={() => updateProduct(p.id, { hidden: false })}
                              title="Click to make visible"
                              className="text-[10px] px-2.5 py-1 rounded-full font-medium border bg-slate-500/10 text-slate-400 border-slate-500/20 hover:bg-slate-500/20 transition"
                            >
                              👁 Hidden
                            </button>
                          ) : outOfStock ? (
                            <button
                              onClick={() => updateProduct(p.id, { inStock: true })}
                              title="Click to mark In Stock"
                              className="text-[10px] px-2.5 py-1 rounded-full font-medium border bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20 transition"
                            >
                              ✕ Out of Stock
                            </button>
                          ) : (
                            <button
                              onClick={() => updateProduct(p.id, { inStock: false })}
                              title="Click to mark Out of Stock"
                              className="text-[10px] px-2.5 py-1 rounded-full font-medium border bg-emerald-500/10 text-emerald-400 border-emerald-500/15 hover:bg-emerald-500/20 transition"
                            >
                              ✓ In Stock
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 justify-end opacity-0 group-hover:opacity-100 transition">
                          <button
                            onClick={() => openEdit(p)}
                            className="p-2 text-white/30 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition"
                            aria-label="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          {deleteConfirm === p.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => { deleteProduct(p.id); setDeleteConfirm(null) }}
                                className="text-[11px] px-2.5 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="text-[11px] px-2 py-1 text-white/30 hover:text-white/60 transition"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(p.id)}
                              className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                              aria-label="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/[0.04] flex items-center justify-between">
          <p className="text-[11px] text-white/25">
            {filtered.length} of {products.length} products
          </p>
          {(query || catFilter !== 'all' || stockFilter !== 'all') && (
            <button
              onClick={() => { setQuery(''); setCatFilter('all'); setStockFilter('all') }}
              className="text-[11px] text-white/30 hover:text-amber-400 transition"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#13141a] border border-white/[0.08] rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto animate-scale-in">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
              <div>
                <h2 className="font-serif text-lg text-white/90">{editId ? 'Edit Product' : 'Add New Product'}</h2>
                <p className="text-[11px] text-white/30 mt-0.5">{editId ? 'Update product details' : 'Add to your catalogue'}</p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 text-white/30 hover:text-white/70 hover:bg-white/[0.05] rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-4">

              <div>
                <label className={labelCls}>Product Name *</label>
                <input className={inputCls} value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="e.g. Kundan Drop Earrings" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Price (£) *</label>
                  <input className={inputCls} type="number" min="0" step="0.01"
                    value={form.price} onChange={(e) => set('price', e.target.value)}
                    placeholder="45.00" />
                </div>
                <div>
                  <label className={labelCls}>Original Price (£)</label>
                  <input className={inputCls} type="number" min="0" step="0.01"
                    value={form.originalPrice} onChange={(e) => set('originalPrice', e.target.value)}
                    placeholder="65.00" />
                </div>
              </div>

              <div>
                <label className={labelCls}>Category</label>
                <DarkSelect
                  value={form.category}
                  onChange={(v) => set('category', v as AdminProduct['category'])}
                  options={CATEGORIES.map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))}
                />
              </div>

              <div>
                <label className={labelCls}>Description</label>
                <textarea
                  className={inputCls + ' resize-none'} rows={3}
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  placeholder="Describe the product…"
                />
              </div>

              <div>
                <label className={labelCls}>Image</label>
                <DarkSelect
                  value={form.image}
                  onChange={(v) => set('image', v)}
                  options={IMAGES.map((img) => ({ value: img, label: img.split('/').pop() ?? img }))}
                />
                <div className="mt-2.5 relative w-16 h-16 rounded-lg overflow-hidden bg-white/[0.05]">
                  <Image src={form.image} alt="preview" fill className="object-cover" sizes="64px" />
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4 pt-1">

                {/* Mark as New */}
                <Toggle checked={form.isNew} onChange={(v) => set('isNew', v)} label="Mark as New" />

                {/* Availability — the main control */}
                <div className="border border-white/[0.07] rounded-xl p-4 space-y-3 bg-white/[0.02]">
                  <p className={labelCls} style={{ marginBottom: 0 }}>Availability</p>

                  {/* Live status pill */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    form.hidden
                      ? 'bg-slate-500/15 text-slate-400 border border-slate-500/25'
                      : form.inStock
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                        : 'bg-orange-500/15 text-orange-400 border border-orange-500/25'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${form.hidden ? 'bg-slate-400' : form.inStock ? 'bg-emerald-400' : 'bg-orange-400'}`} />
                    {form.hidden
                      ? 'Hidden — only you can see this'
                      : form.inStock
                        ? 'Available — customers can buy this'
                        : 'Out of Stock — visible but cannot be bought'}
                  </div>

                  {/* On Sale */}
                  <Toggle
                    checked={form.isOnSale}
                    onChange={(v) => {
                      set('isOnSale', v)
                      if (v) { set('inStock', true); set('hidden', false) }
                    }}
                    label="On Sale"
                    activeColor="bg-rose-500"
                  />

                  {/* Out of Stock — still visible to buyers, creates urgency */}
                  <Toggle
                    checked={!form.inStock}
                    onChange={(v) => {
                      set('inStock', !v)
                      if (v) set('isOnSale', false)
                    }}
                    label="Out of Stock  (buyers can still see it — good for urgency)"
                    activeColor="bg-orange-500"
                  />

                  {/* Hide from buyers — completely invisible */}
                  <Toggle
                    checked={form.hidden}
                    onChange={(v) => {
                      set('hidden', v)
                      if (v) { set('isOnSale', false); set('inStock', false) }
                    }}
                    label="Hide from buyers  (completely invisible on the store)"
                    activeColor="bg-slate-500"
                  />
                </div>

                {/* Pricing info — discount preview */}
                {form.originalPrice && Number(form.originalPrice) > Number(form.price) && Number(form.price) > 0 && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-rose-500/[0.06] border border-rose-500/15 rounded-xl">
                    <div className="text-center">
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Was</p>
                      <p className="text-sm font-semibold text-white/50 line-through">£{Number(form.originalPrice).toFixed(2)}</p>
                    </div>
                    <div className="flex-1 text-center">
                      <p className="text-lg font-bold text-rose-400">
                        −{Math.round(((Number(form.originalPrice) - Number(form.price)) / Number(form.originalPrice)) * 100)}%
                      </p>
                      <p className="text-[10px] text-white/30">discount</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Now</p>
                      <p className="text-sm font-bold text-emerald-400">£{Number(form.price).toFixed(2)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t border-white/[0.06] flex gap-3 justify-end">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm text-white/40 hover:text-white/70 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!form.name.trim() || !form.price}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-stone-900 text-xs font-bold tracking-wider uppercase rounded-lg hover:bg-amber-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Check className="w-4 h-4" />
                {editId ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
