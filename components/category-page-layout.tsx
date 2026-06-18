'use client'

import { useState } from 'react'
import { X, LayoutGrid, List, SlidersHorizontal } from 'lucide-react'
import FilterSidebar from './filter-sidebar'
import AnimatedProductCard from './animated-product-card'
import CategoryBanner from './category-banner'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  isNew?: boolean
  isOnSale?: boolean
  href: string
}

interface FilterGroup {
  title: string
  options: Array<{ label: string; value: string; count?: number }>
}

interface CategoryPageLayoutProps {
  categoryName: string
  categoryDescription: string
  bannerImage: string
  products: Product[]
  filters: FilterGroup[]
}

export default function CategoryPageLayout({
  categoryName,
  categoryDescription,
  bannerImage,
  products,
  filters,
}: CategoryPageLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filteredProducts, setFilteredProducts] = useState(products)

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':  return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'newest':     return a.isNew ? -1 : 1
      default:           return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Category Banner */}
      <div className="px-4 md:px-6 pt-4 md:pt-8">
        <CategoryBanner
          title={categoryName}
          subtitle={categoryDescription}
          backgroundImage={bannerImage}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">

        {/* Mobile filter drawer overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile filter drawer */}
        <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#fdf0f2]/95 dark:bg-[#0d0f1a]/95 backdrop-blur-xl shadow-xl transform transition-transform duration-300 md:hidden overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between px-4 py-4 border-b border-rose-100/60 dark:border-border">
            <h2 className="font-semibold text-rose-950 dark:text-foreground">Filters</h2>
            <button onClick={() => setSidebarOpen(false)} className="p-1 text-rose-400 hover:text-rose-600 dark:text-muted-foreground dark:hover:text-foreground transition" aria-label="Close filters">
              <X size={20} />
            </button>
          </div>
          <div className="p-4">
            <FilterSidebar filters={filters} />
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex gap-8">
          {/* Sidebar — desktop only */}
          <aside className="hidden md:block w-56 lg:w-64 shrink-0">
            <FilterSidebar filters={filters} />
          </aside>

          {/* Products area */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Toolbar */}
            <div className="flex items-center justify-between py-3 border-b border-rose-100/60 dark:border-border gap-3">
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden flex items-center gap-2 px-3 py-2 border border-rose-100 dark:border-border rounded-xl text-sm font-medium text-rose-700 dark:text-foreground hover:border-rose-300 dark:hover:border-primary bg-rose-50/60 dark:bg-transparent backdrop-blur-sm transition"
                >
                  <SlidersHorizontal size={16} />
                  Filters
                </button>
                <p className="text-sm text-rose-400/80 dark:text-muted-foreground">
                  <span className="font-semibold text-rose-900 dark:text-foreground">{sortedProducts.length}</span> products
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center gap-1 border border-rose-100 dark:border-border rounded-xl p-1 bg-rose-50/60 dark:bg-transparent backdrop-blur-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition ${viewMode === 'grid' ? 'bg-rose-400 dark:bg-primary text-white dark:text-primary-foreground' : 'text-rose-400 dark:text-muted-foreground hover:text-rose-700 dark:hover:text-foreground'}`}
                    title="Grid view"
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition ${viewMode === 'list' ? 'bg-rose-400 dark:bg-primary text-white dark:text-primary-foreground' : 'text-rose-400 dark:text-muted-foreground hover:text-rose-700 dark:hover:text-foreground'}`}
                    title="List view"
                  >
                    <List size={16} />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2 md:px-3 py-2 border border-rose-100 dark:border-border rounded-xl text-xs md:text-sm font-medium text-rose-700 dark:text-foreground bg-rose-50/60 dark:bg-background hover:border-rose-300 dark:hover:border-primary transition-colors backdrop-blur-sm focus:outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low–High</option>
                  <option value="price-high">Price: High–Low</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {sortedProducts.map((product) => (
                <AnimatedProductCard key={product.id} {...product} />
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No products found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
