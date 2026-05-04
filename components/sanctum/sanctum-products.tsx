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
  value, onChange, options, placeholder, className = '', isLight = false,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  className?: string
  isLight?: boolean
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

  const triggerCls = isLight
    ? 'w-full flex items-center justify-between border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-700 rounded-lg transition hover:border-stone-300 focus:outline-none focus:border-amber-500/60'
    : 'w-full flex items-center justify-between border border-white/[0.08] bg-[#0d0e12] px-3.5 py-2.5 text-sm text-white/80 rounded-lg transition hover:border-white/[0.14] focus:outline-none focus:border-amber-500/60'
  const dropdownCls = isLight
    ? 'absolute z-50 mt-1.5 w-full bg-white border border-stone-200 rounded-xl shadow-xl overflow-hidden'
    : 'absolute z-50 mt-1.5 w-full bg-[#1a1b22] border border-white/[0.1] rounded-xl shadow-2xl overflow-hidden'

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button type="button" onClick={() => setOpen((p) => !p)} className={triggerCls}>
        <span className={selected ? (isLight ? 'text-stone-700' : 'text-white/80') : (isLight ? 'text-stone-300' : 'text-white/25')}>
          {selected ? selected.label : (placeholder ?? 'Select…')}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''} ${isLight ? 'text-stone-400' : 'text-white/30'}`} />
      </button>

      {open && (
        <div className={dropdownCls}>
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                opt.value === value
                  ? isLight ? 'bg-amber-50 text-amber-700' : 'bg-amber-500/15 text-amber-300'
                  : isLight ? 'text-stone-600 hover:bg-stone-50' : 'text-white/70 hover:bg-white/[0.05] hover:text-white/90'
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
  checked, onChange, label, activeColor = 'bg-amber-500', isLight = false,
}: {
  checked: boolean; onChange: (v: boolean) => void; label: string; activeColor?: string; isLight?: boolean
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group select-none">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-9 h-5 rounded-full transition-all duration-200 relative shrink-0 ${checked ? activeColor : isLight ? 'bg-stone-200' : 'bg-white/[0.08]'}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${checked ? 'left-4' : 'left-0.5'}`} />
      </button>
      <span className={`text-sm transition ${isLight ? 'text-stone-600 group-hover:text-stone-800' : 'text-white/60 group-hover:text-white/80'}`}>{label}</span>
    </label>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function SanctumProducts({ isLight = false }: { isLight?: boolean }) {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin()

  // Light-mode tokens
  const card      = isLight ? 'bg-white border-stone-200'   : 'bg-[#13141a] border-white/[0.06]'
  const inputBase = isLight
    ? 'w-full border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:border-amber-500/60 rounded-lg transition'
    : inputCls
  const lbl       = isLight
    ? 'block text-[11px] uppercase tracking-[0.18em] text-stone-400 mb-2 font-medium'
    : labelCls
  const heading   = isLight ? 'text-stone-800'  : 'text-white/90'
  const muted     = isLight ? 'text-stone-400'  : 'text-white/40'
  const divider   = isLight ? 'divide-stone-100' : 'divide-white/[0.04]'
  const rowHov    = isLight ? 'hover:bg-stone-50' : 'hover:bg-white/[0.02]'
  const thCls     = isLight ? 'text-stone-400'  : 'text-white/25'
  const tdText    = isLight ? 'text-stone-700'  : 'text-white/80'
  const searchBg  = isLight
    ? 'w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-stone-200 rounded-xl text-stone-700 placeholder:text-stone-300 focus:outline-none focus:border-amber-500/50 transition'
    : 'w-full pl-10 pr-9 py-2.5 text-sm bg-[#13141a] border border-white/[0.06] rounded-xl text-white/70 placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 transition'
  const modalBg   = isLight ? 'bg-white border-stone-200' : 'bg-[#13141a] border-white/[0.08]'
  const modalBdr  = isLight ? 'border-stone-100' : 'border-white/[0.06]'
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
          <h1 className={`font-serif text-2xl md:text-3xl ${heading}`}>Products</h1>
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
          { label: 'Total',        value: products.length,                           color: isLight ? 'text-stone-700' : 'text-white/80' },
          { label: 'New',          value: products.filter((p) => p.isNew).length,    color: 'text-amber-500' },
          { label: 'On Sale',      value: products.filter((p) => p.isOnSale).length, color: 'text-rose-500' },
          { label: 'Out of Stock', value: outOfStockCount,                           color: outOfStockCount > 0 ? 'text-orange-500' : muted },
          { label: 'Hidden',       value: hiddenCount,                               color: hiddenCount > 0 ? 'text-slate-500' : muted },
        ].map(({ label, value, color }) => (
          <div key={label} className={`border rounded-xl px-4 py-3 text-center ${card}`}>
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className={`text-[11px] uppercase tracking-wider mt-0.5 ${muted}`}>{label}</p>
          </div>
        ))}
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${muted}`} />
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className={searchBg}
          />
          {query && (
            <button onClick={() => setQuery('')} className={`absolute right-3 top-1/2 -translate-y-1/2 transition ${muted} hover:opacity-80`}>
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <DarkSelect
          value={catFilter}
          onChange={setCatFilter}
          options={catOptions}
          className="sm:w-44"
          isLight={isLight}
        />
        <DarkSelect
          value={stockFilter}
          onChange={(v) => setStockFilter(v as 'all' | 'in' | 'out' | 'hidden')}
          options={stockOptions}
          className="sm:w-40"
          isLight={isLight}
        />
      </div>

      {/* Product table */}
      <div className={`border rounded-xl overflow-hidden ${card}`}>
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Package className={`w-10 h-10 mx-auto mb-3 ${muted}`} />
            <p className={`text-sm ${muted}`}>No products found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isLight ? 'border-stone-100' : 'border-white/[0.05]'}`}>
                  <th className={`text-left px-5 py-3.5 text-[11px] uppercase tracking-[0.18em] font-medium ${thCls}`}>Product</th>
                  <th className={`text-left px-5 py-3.5 text-[11px] uppercase tracking-[0.18em] font-medium hidden sm:table-cell ${thCls}`}>Category</th>
                  <th className={`text-left px-5 py-3.5 text-[11px] uppercase tracking-[0.18em] font-medium ${thCls}`}>Price</th>
                  <th className={`text-left px-5 py-3.5 text-[11px] uppercase tracking-[0.18em] font-medium hidden md:table-cell ${thCls}`}>Status</th>
                  <th className={`text-left px-5 py-3.5 text-[11px] uppercase tracking-[0.18em] font-medium hidden lg:table-cell ${thCls}`}>Stock</th>
                  <th className="px-5 py-3.5" />
                </tr>
              </thead>
              <tbody className={`divide-y ${divider}`}>
                {filtered.map((p) => {
                  const outOfStock = p.inStock === false
                  const isHidden   = !!p.hidden
                  const discount   = p.originalPrice && p.originalPrice > p.price
                    ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                    : 0
                  return (
                    <tr key={p.id} className={`${rowHov} transition group ${isHidden ? 'opacity-40' : outOfStock ? 'opacity-70' : ''}`}>
                      {/* Product */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`relative w-11 h-11 rounded-lg overflow-hidden shrink-0 ${isLight ? 'bg-stone-100' : 'bg-white/[0.05]'}`}>
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
                            <p className={`text-sm font-medium line-clamp-1 ${tdText}`}>{p.name}</p>
                            <p className={`text-[11px] capitalize sm:hidden ${muted}`}>{p.category}</p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className={`text-xs px-2.5 py-1 rounded-lg capitalize ${isLight ? 'bg-stone-100 text-stone-500' : 'bg-white/[0.05] text-white/50'}`}>
                          {p.category}
                        </span>
                      </td>

                      {/* Price + discount */}
                      <td className="px-5 py-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-sm font-bold ${tdText}`}>£{p.price}</span>
                            {p.originalPrice && p.originalPrice > p.price && (
                              <span className={`text-xs line-through ${muted}`}>£{p.originalPrice}</span>
                            )}
                          </div>
                          {discount > 0 && (
                            <span className="text-[10px] text-rose-500 font-semibold">−{discount}% off</span>
                          )}
                        </div>
                      </td>

                      {/* Status badges */}
                      <td className="px-5 py-4 hidden md:table-cell">
                        <div className="flex flex-wrap gap-1.5">
                          {p.isNew && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${isLight ? 'bg-amber-100 text-amber-700' : 'bg-amber-500/10 text-amber-400'}`}>New</span>
                          )}
                          {p.isOnSale && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${isLight ? 'bg-rose-100 text-rose-600' : 'bg-rose-500/10 text-rose-400'}`}>Sale</span>
                          )}
                          {!p.isNew && !p.isOnSale && (
                            <span className={`text-[10px] ${muted}`}>—</span>
                          )}
                        </div>
                      </td>

                      {/* Stock / visibility */}
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <div className="flex flex-col gap-1">
                          {isHidden ? (
                            <button
                              onClick={() => updateProduct(p.id, { hidden: false })}
                              title="Click to make visible"
                              className={`text-[10px] px-2.5 py-1 rounded-full font-medium border transition ${isLight ? 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200' : 'bg-slate-500/10 text-slate-400 border-slate-500/20 hover:bg-slate-500/20'}`}
                            >
                              👁 Hidden
                            </button>
                          ) : outOfStock ? (
                            <button
                              onClick={() => updateProduct(p.id, { inStock: true })}
                              title="Click to mark In Stock"
                              className={`text-[10px] px-2.5 py-1 rounded-full font-medium border transition ${isLight ? 'bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-200' : 'bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20'}`}
                            >
                              ✕ Out of Stock
                            </button>
                          ) : (
                            <button
                              onClick={() => updateProduct(p.id, { inStock: false })}
                              title="Click to mark Out of Stock"
                              className={`text-[10px] px-2.5 py-1 rounded-full font-medium border transition ${isLight ? 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15 hover:bg-emerald-500/20'}`}
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
                            className={`p-2 rounded-lg transition ${isLight ? 'text-stone-400 hover:text-amber-600 hover:bg-amber-50' : 'text-white/30 hover:text-amber-400 hover:bg-amber-500/10'}`}
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
                                className={`text-[11px] px-2 py-1 transition ${muted}`}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(p.id)}
                              className={`p-2 rounded-lg transition ${isLight ? 'text-stone-300 hover:text-red-500 hover:bg-red-50' : 'text-white/30 hover:text-red-400 hover:bg-red-500/10'}`}
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
        <div className={`px-5 py-3 border-t flex items-center justify-between ${isLight ? 'border-stone-100' : 'border-white/[0.04]'}`}>
          <p className={`text-[11px] ${muted}`}>
            {filtered.length} of {products.length} products
          </p>
          {(query || catFilter !== 'all' || stockFilter !== 'all') && (
            <button
              onClick={() => { setQuery(''); setCatFilter('all'); setStockFilter('all') }}
              className={`text-[11px] transition ${isLight ? 'text-stone-400 hover:text-amber-600' : 'text-white/30 hover:text-amber-400'}`}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto animate-scale-in ${modalBg}`}>

            {/* Modal header */}
            <div className={`flex items-center justify-between px-6 py-5 border-b ${modalBdr}`}>
              <div>
                <h2 className={`font-serif text-lg ${heading}`}>{editId ? 'Edit Product' : 'Add New Product'}</h2>
                <p className={`text-[11px] mt-0.5 ${muted}`}>{editId ? 'Update product details' : 'Add to your catalogue'}</p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className={`p-2 rounded-lg transition ${isLight ? 'text-stone-400 hover:text-stone-700 hover:bg-stone-100' : 'text-white/30 hover:text-white/70 hover:bg-white/[0.05]'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-4">

              <div>
                <label className={lbl}>Product Name *</label>
                <input className={inputBase} value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="e.g. Kundan Drop Earrings" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={lbl}>Price (£) *</label>
                  <input className={inputBase} type="number" min="0" step="0.01"
                    value={form.price} onChange={(e) => set('price', e.target.value)}
                    placeholder="45.00" />
                </div>
                <div>
                  <label className={lbl}>Original Price (£)</label>
                  <input className={inputBase} type="number" min="0" step="0.01"
                    value={form.originalPrice} onChange={(e) => set('originalPrice', e.target.value)}
                    placeholder="65.00" />
                </div>
              </div>

              <div>
                <label className={lbl}>Category</label>
                <DarkSelect
                  value={form.category}
                  onChange={(v) => set('category', v as AdminProduct['category'])}
                  options={CATEGORIES.map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))}
                  isLight={isLight}
                />
              </div>

              <div>
                <label className={lbl}>Description</label>
                <textarea
                  className={inputBase + ' resize-none'} rows={3}
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  placeholder="Describe the product…"
                />
              </div>

              <div>
                <label className={lbl}>Image</label>

                {/* Upload from device */}
                <div className={`mb-3 flex items-center gap-3 p-3 rounded-xl border-2 border-dashed transition ${
                  isLight ? 'border-stone-300 bg-stone-50 hover:border-amber-400' : 'border-white/[0.1] bg-white/[0.02] hover:border-amber-500/40'
                }`}>
                  <label className="flex items-center gap-2 cursor-pointer flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        const reader = new FileReader()
                        reader.onload = (ev) => {
                          const result = ev.target?.result as string
                          if (result) set('image', result)
                        }
                        reader.readAsDataURL(file)
                      }}
                    />
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isLight ? 'bg-amber-100' : 'bg-amber-500/10'}`}>
                      <svg className={`w-4 h-4 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className={`text-xs font-medium ${isLight ? 'text-stone-700' : 'text-white/70'}`}>Upload from device</p>
                      <p className={`text-[10px] ${isLight ? 'text-stone-400' : 'text-white/30'}`}>JPG, PNG, WEBP — any size</p>
                    </div>
                  </label>
                  {form.image.startsWith('data:') && (
                    <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${isLight ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-500/10 text-emerald-400'}`}>
                      ✓ Uploaded
                    </span>
                  )}
                </div>

                {/* Or pick from existing */}
                <p className={`text-[10px] uppercase tracking-wider mb-1.5 ${isLight ? 'text-stone-400' : 'text-white/25'}`}>Or pick existing</p>
                <DarkSelect
                  value={form.image.startsWith('data:') ? '' : form.image}
                  onChange={(v) => set('image', v)}
                  options={IMAGES.map((img) => ({ value: img, label: img.split('/').pop() ?? img }))}
                  placeholder="Choose from library…"
                  isLight={isLight}
                />

                {/* Preview */}
                <div className="mt-2.5 relative w-16 h-16 rounded-lg overflow-hidden bg-white/[0.05]">
                  <Image src={form.image} alt="preview" fill className="object-cover" sizes="64px" />
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4 pt-1">

                {/* ── Storefront Tags ── */}
                <div className={`border rounded-xl p-4 space-y-3 ${isLight ? 'border-stone-200 bg-stone-50' : 'border-white/[0.07] bg-white/[0.02]'}`}>
                  <div>
                    <p className={lbl} style={{ marginBottom: 2 }}>Storefront Tags</p>
                    <p className={`text-[10px] mb-3 ${isLight ? 'text-stone-400' : 'text-white/25'}`}>
                      Controls where this product appears on the homepage and shop pages.
                    </p>
                  </div>

                  {/* New Arrivals */}
                  <div className={`flex items-start gap-3 p-3 rounded-lg border transition ${
                    form.isNew
                      ? isLight ? 'bg-amber-50 border-amber-300' : 'bg-amber-500/10 border-amber-500/30'
                      : isLight ? 'bg-white border-stone-200' : 'bg-white/[0.02] border-white/[0.06]'
                  }`}>
                    <button
                      type="button"
                      onClick={() => set('isNew', !form.isNew)}
                      className={`w-9 h-5 rounded-full transition-all duration-200 relative shrink-0 mt-0.5 ${form.isNew ? 'bg-amber-500' : isLight ? 'bg-stone-200' : 'bg-white/[0.08]'}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${form.isNew ? 'left-4' : 'left-0.5'}`} />
                    </button>
                    <div>
                      <p className={`text-sm font-semibold ${isLight ? 'text-stone-800' : 'text-white/80'}`}>New Arrival</p>
                      <p className={`text-[11px] mt-0.5 ${isLight ? 'text-stone-500' : 'text-white/35'}`}>
                        Shows in the <span className="font-medium">New Arrivals</span> section on the homepage and gets a "New" badge on the product card.
                      </p>
                    </div>
                  </div>

                  {/* On Sale */}
                  <div className={`flex items-start gap-3 p-3 rounded-lg border transition ${
                    form.isOnSale
                      ? isLight ? 'bg-rose-50 border-rose-300' : 'bg-rose-500/10 border-rose-500/30'
                      : isLight ? 'bg-white border-stone-200' : 'bg-white/[0.02] border-white/[0.06]'
                  }`}>
                    <button
                      type="button"
                      onClick={() => { set('isOnSale', !form.isOnSale); if (!form.isOnSale) { set('inStock', true); set('hidden', false) } }}
                      className={`w-9 h-5 rounded-full transition-all duration-200 relative shrink-0 mt-0.5 ${form.isOnSale ? 'bg-rose-500' : isLight ? 'bg-stone-200' : 'bg-white/[0.08]'}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${form.isOnSale ? 'left-4' : 'left-0.5'}`} />
                    </button>
                    <div>
                      <p className={`text-sm font-semibold ${isLight ? 'text-stone-800' : 'text-white/80'}`}>On Sale</p>
                      <p className={`text-[11px] mt-0.5 ${isLight ? 'text-stone-500' : 'text-white/35'}`}>
                        Shows a "Sale" badge and appears in sale filters. Set an Original Price above to show the discount %.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Availability ── */}
                <div className={`border rounded-xl p-4 space-y-3 ${isLight ? 'border-stone-200 bg-stone-50' : 'border-white/[0.07] bg-white/[0.02]'}`}>
                  <div>
                    <p className={lbl} style={{ marginBottom: 2 }}>Availability</p>
                    <p className={`text-[10px] mb-3 ${isLight ? 'text-stone-400' : 'text-white/25'}`}>
                      Controls whether customers can see and buy this product.
                    </p>
                  </div>

                  {/* Live status pill */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    form.hidden
                      ? isLight ? 'bg-slate-100 text-slate-700 border border-slate-300' : 'bg-slate-500/15 text-slate-400 border border-slate-500/25'
                      : form.inStock
                        ? isLight ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                        : isLight ? 'bg-orange-100 text-orange-800 border border-orange-300' : 'bg-orange-500/15 text-orange-400 border border-orange-500/25'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${form.hidden ? 'bg-slate-500' : form.inStock ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                    {form.hidden
                      ? 'Hidden — only you can see this'
                      : form.inStock
                        ? 'Available — customers can buy this'
                        : 'Out of Stock — visible but cannot be bought'}
                  </div>

                  <Toggle
                    checked={!form.inStock}
                    onChange={(v) => { set('inStock', !v); if (v) set('isOnSale', false) }}
                    label="Out of Stock  (buyers can still see it — good for urgency)"
                    activeColor="bg-orange-500"
                    isLight={isLight}
                  />
                  <Toggle
                    checked={form.hidden}
                    onChange={(v) => { set('hidden', v); if (v) { set('isOnSale', false); set('inStock', false) } }}
                    label="Hide from buyers  (completely invisible on the store)"
                    activeColor="bg-slate-500"
                    isLight={isLight}
                  />
                </div>

                {form.originalPrice && Number(form.originalPrice) > Number(form.price) && Number(form.price) > 0 && (
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${isLight ? 'bg-rose-50 border border-rose-100' : 'bg-rose-500/[0.06] border border-rose-500/15'}`}>
                    <div className="text-center">
                      <p className={`text-[10px] uppercase tracking-wider mb-0.5 ${muted}`}>Was</p>
                      <p className={`text-sm font-semibold line-through ${muted}`}>£{Number(form.originalPrice).toFixed(2)}</p>
                    </div>
                    <div className="flex-1 text-center">
                      <p className="text-lg font-bold text-rose-500">
                        −{Math.round(((Number(form.originalPrice) - Number(form.price)) / Number(form.originalPrice)) * 100)}%
                      </p>
                      <p className={`text-[10px] ${muted}`}>discount</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-[10px] uppercase tracking-wider mb-0.5 ${muted}`}>Now</p>
                      <p className="text-sm font-bold text-emerald-500">£{Number(form.price).toFixed(2)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal footer */}
            <div className={`px-6 py-4 border-t flex gap-3 justify-end ${modalBdr}`}>
              <button
                onClick={() => setShowForm(false)}
                className={`px-4 py-2 text-sm transition ${muted}`}
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
