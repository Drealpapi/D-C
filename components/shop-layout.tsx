'use client'

import { useState, useMemo } from 'react'
import type { Product } from '@/lib/product-data'
import ProductCard from '@/components/product-card'
import { SlidersHorizontal } from 'lucide-react'

interface ShopLayoutProps {
  title: string
  description: string
  products: Product[]
  categoryFilters: string[]
}

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under £30', min: 0, max: 30 },
  { label: '£30 – £60', min: 30, max: 60 },
  { label: '£60 – £100', min: 60, max: 100 },
  { label: 'Over £100', min: 100, max: Infinity },
]

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
]

export default function ShopLayout({ title, description, products, categoryFilters }: ShopLayoutProps) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [priceRange, setPriceRange] = useState(0)
  const [sort, setSort] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    const range = PRICE_RANGES[priceRange]
    let result = products.filter((p) => p.price >= range.min && p.price <= range.max)
    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price)
    else if (sort === 'newest') result = [...result].sort((a) => (a.isNew ? -1 : 1))
    return result
  }, [products, priceRange, sort])

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
      {/* Page Header */}
      <div className="mb-8 md:mb-10">
        <h1 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 mb-2">{title}</h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm md:text-base max-w-xl">{description}</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col gap-4 mb-8 pb-6 border-b border-rose-100/80 dark:border-stone-800">
        {/* Top row: category pills + sort */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 text-xs tracking-wider uppercase border transition duration-200 ${
                  activeFilter === f
                    ? 'bg-rose-400 dark:bg-amber-500 text-white dark:text-stone-900 border-rose-400 dark:border-amber-500'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-rose-100 dark:border-stone-700 hover:border-rose-300 dark:hover:border-stone-500 hover:text-rose-600 dark:hover:text-stone-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Sort + Filter Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 hover:text-rose-600 dark:hover:text-stone-200 transition sm:hidden"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {showFilters ? 'Hide' : 'Price'}
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-xs text-stone-700 dark:text-stone-300 border border-rose-100 dark:border-stone-700 px-3 py-2 bg-white dark:bg-stone-800 focus:outline-none focus:border-rose-300 dark:focus:border-amber-600 rounded-sm"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Price Filter */}
      <div className={`mb-8 ${showFilters ? 'block' : 'hidden sm:block'}`}>
        <p className="text-xs uppercase tracking-widest text-rose-300 dark:text-stone-500 mb-3">Price Range</p>
        <div className="flex flex-wrap gap-2">
          {PRICE_RANGES.map((r, i) => (
            <button
              key={r.label}
              onClick={() => setPriceRange(i)}
              className={`px-4 py-1.5 text-xs border transition duration-200 ${
                priceRange === i
                  ? 'bg-rose-400 dark:bg-amber-500 text-white dark:text-stone-900 border-rose-400 dark:border-amber-500'
                  : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-rose-100 dark:border-stone-700 hover:border-rose-300 dark:hover:border-stone-500 hover:text-rose-600 dark:hover:text-stone-200'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-rose-300 dark:text-stone-500 mb-6">{filtered.length} products</p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-stone-400 dark:text-stone-500">
          <p className="text-lg font-serif mb-2">No products found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}
    </div>
  )
}
