'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, X, ArrowRight, Sparkles } from 'lucide-react'
import { useProducts } from '@/lib/use-products'

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

const SUGGESTIONS = ['Earrings', 'Bangles', 'Accessories', 'Jewelry', 'Sarees', 'Lehengas']

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery]     = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef              = useRef<HTMLInputElement>(null)
  const allProducts           = useProducts()

  useEffect(() => {
    if (open) {
      setTimeout(() => { inputRef.current?.focus(); setFocused(true) }, 80)
    } else {
      setQuery('')
      setFocused(false)
    }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const results = query.trim().length > 1
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.description?.toLowerCase().includes(query.toLowerCase()) ?? false)
      ).slice(0, 6)
    : []

  const handleSelect = useCallback(() => {
    onClose()
    setQuery('')
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Panel — slides down from top */}
      <div
        className="relative z-10 w-full max-w-xl mx-auto mt-12 md:mt-20 px-4"
        style={{ animation: 'searchSlideDown 0.3s cubic-bezier(0.22,1,0.36,1) forwards' }}
      >
        <div className="bg-white/95 dark:bg-[#13141a]/98 rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.18)] dark:shadow-[0_32px_80px_rgba(0,0,0,0.5)] border border-rose-100/80 dark:border-white/[0.08] overflow-hidden backdrop-blur-xl">

          {/* Input row */}
          <div className={`flex items-center gap-3 px-5 py-4 transition-all duration-300 ${
            focused ? 'border-b border-rose-200/60 dark:border-white/[0.08]' : 'border-b border-transparent'
          }`}>
            <Search className={`w-5 h-5 shrink-0 transition-colors duration-300 ${
              query ? 'text-rose-400 dark:text-amber-400' : 'text-rose-200 dark:text-white/25'
            }`} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jewellery, sarees, accessories…"
              className="flex-1 text-[15px] text-stone-800 dark:text-white/85 placeholder:text-stone-300 dark:placeholder:text-white/20 bg-transparent focus:outline-none font-medium"
            />
            <div className="flex items-center gap-2 shrink-0">
              {query && (
                <button
                  onClick={() => { setQuery(''); inputRef.current?.focus() }}
                  className="icon-btn p-1.5 rounded-full text-stone-300 dark:text-white/20 hover:text-rose-400 dark:hover:text-white/50 hover:bg-rose-50 dark:hover:bg-white/[0.05]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={onClose}
                className="px-2 py-1 rounded-md bg-stone-100 dark:bg-white/[0.06] text-stone-400 dark:text-white/30 text-[10px] font-semibold tracking-wider hover:bg-rose-50 dark:hover:bg-white/[0.1] hover:text-rose-500 dark:hover:text-white/60 transition-all duration-200 active:scale-95"
              >
                ESC
              </button>
            </div>
          </div>

          {/* Results */}
          {query.trim().length > 1 && (
            <div className="max-h-[55vh] overflow-y-auto overscroll-contain">
              {results.length === 0 ? (
                <div className="px-5 py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-white/[0.04] flex items-center justify-center mx-auto mb-4">
                    <Search className="w-5 h-5 text-rose-200 dark:text-white/20" />
                  </div>
                  <p className="text-stone-500 dark:text-white/40 text-sm font-medium">No results for &ldquo;{query}&rdquo;</p>
                  <p className="text-stone-300 dark:text-white/20 text-xs mt-1">Try earrings, bangles, or sarees</p>
                </div>
              ) : (
                <>
                  <div className="px-5 pt-3 pb-1 flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-rose-300 dark:text-white/25 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      {results.length} result{results.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="pb-2">
                    {results.map((product, i) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={handleSelect}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-rose-50/70 dark:hover:bg-white/[0.04] transition-all duration-150 group"
                        style={{ animationDelay: `${i * 40}ms` }}
                      >
                        {/* Thumbnail */}
                        <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-stone-100 dark:bg-white/[0.05] shrink-0 shadow-sm group-hover:shadow-md transition-shadow duration-200">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            sizes="44px"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-stone-800 dark:text-white/80 truncate group-hover:text-rose-600 dark:group-hover:text-amber-400 transition-colors duration-200">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-stone-400 dark:text-white/30 capitalize bg-stone-100 dark:bg-white/[0.05] px-1.5 py-0.5 rounded-full">
                              {product.category}
                            </span>
                            {product.isNew && (
                              <span className="text-[10px] text-rose-400 dark:text-amber-400 font-medium">New</span>
                            )}
                            {product.inStock === false && (
                              <span className="text-[10px] text-stone-300 dark:text-white/20">Out of stock</span>
                            )}
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold text-stone-800 dark:text-white/80">£{product.price}</p>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <p className="text-[11px] text-stone-300 dark:text-white/25 line-through">£{product.originalPrice}</p>
                          )}
                        </div>

                        <ArrowRight className="w-4 h-4 text-rose-200 dark:text-white/15 group-hover:text-rose-400 dark:group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Empty state — category chips */}
          {query.trim().length <= 1 && (
            <div className="px-5 py-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-rose-300 dark:text-white/25 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" /> Browse by category
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setQuery(cat); inputRef.current?.focus() }}
                    className="btn-press px-3.5 py-1.5 text-xs border border-rose-100 dark:border-white/[0.08] text-stone-600 dark:text-white/50 rounded-full hover:bg-rose-50 dark:hover:bg-white/[0.06] hover:border-rose-300 dark:hover:border-white/20 hover:text-rose-600 dark:hover:text-white/80 hover:shadow-sm transition-all duration-200"
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-stone-300 dark:text-white/15 mt-4 flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 bg-stone-100 dark:bg-white/[0.05] rounded text-[9px] font-mono">↑↓</kbd>
                navigate &nbsp;·&nbsp;
                <kbd className="px-1.5 py-0.5 bg-stone-100 dark:bg-white/[0.05] rounded text-[9px] font-mono">↵</kbd>
                select &nbsp;·&nbsp;
                <kbd className="px-1.5 py-0.5 bg-stone-100 dark:bg-white/[0.05] rounded text-[9px] font-mono">esc</kbd>
                close
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes searchSlideDown {
          from { opacity: 0; transform: translateY(-16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}
