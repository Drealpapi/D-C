'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FilterOption {
  name: string
  value: string
  count: number
}

interface CategoryFilterProps {
  categories: FilterOption[]
  priceRange?: { min: number; max: number }
  onFilterChange?: (filters: any) => void
}

export default function CategoryFilter({
  categories,
  priceRange,
  onFilterChange,
}: CategoryFilterProps) {
  const [expandedFilters, setExpandedFilters] = useState<string[]>(['Category'])
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})

  const toggleFilter = (filterName: string) => {
    setExpandedFilters((prev) =>
      prev.includes(filterName)
        ? prev.filter((f) => f !== filterName)
        : [...prev, filterName]
    )
  }

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev }
      if (!updated[filterType]) updated[filterType] = []

      if (updated[filterType].includes(value)) {
        updated[filterType] = updated[filterType].filter((v) => v !== value)
      } else {
        updated[filterType].push(value)
      }

      onFilterChange?.(updated)
      return updated
    })
  }

  return (
    <aside className="w-full md:w-64">
      {/* Category Filter */}
      <div className="mb-8">
        <button
          onClick={() => toggleFilter('Category')}
          className="flex items-center justify-between w-full pb-4 border-b border-border"
        >
          <h3 className="text-sm font-bold uppercase tracking-wider">Category</h3>
          <ChevronDown
            className={`w-4 h-4 transition ${
              expandedFilters.includes('Category') ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedFilters.includes('Category') && (
          <div className="pt-4 space-y-3">
            {categories.map((cat) => (
              <label key={cat.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters['Category']?.includes(cat.value) || false}
                  onChange={() => handleFilterChange('Category', cat.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-foreground">{cat.name}</span>
                <span className="text-xs text-muted-foreground">({cat.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      {priceRange && (
        <div className="mb-8">
          <button
            onClick={() => toggleFilter('Price')}
            className="flex items-center justify-between w-full pb-4 border-b border-border"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider">Price</h3>
            <ChevronDown
              className={`w-4 h-4 transition ${
                expandedFilters.includes('Price') ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedFilters.includes('Price') && (
            <div className="pt-4 space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Minimum Price (£)</label>
                <input type="number" placeholder={priceRange.min.toString()} className="w-full px-3 py-2 border border-border text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Maximum Price (£)</label>
                <input type="number" placeholder={priceRange.max.toString()} className="w-full px-3 py-2 border border-border text-sm" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sort Options */}
      <div className="border-t border-border pt-8">
        <button className="text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition">
          Clear Filters
        </button>
      </div>
    </aside>
  )
}
