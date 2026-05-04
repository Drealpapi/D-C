'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterOption {
  label: string
  value: string
  count?: number
}

interface FilterGroup {
  title: string
  options: FilterOption[]
  expanded?: boolean
}

interface FilterSidebarProps {
  filters: FilterGroup[]
  onFilterChange?: (groupTitle: string, value: string) => void
  onPriceChange?: (min: number, max: number) => void
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  onPriceChange,
}: FilterSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(filters.map(f => f.title))
  )
  const [selectedFilters, setSelectedFilters] = useState<Map<string, Set<string>>>(
    new Map()
  )
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })

  const toggleGroup = (title: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(title)) {
      newExpanded.delete(title)
    } else {
      newExpanded.add(title)
    }
    setExpandedGroups(newExpanded)
  }

  const handleFilterChange = (groupTitle: string, value: string) => {
    const newSelected = new Map(selectedFilters)
    if (!newSelected.has(groupTitle)) {
      newSelected.set(groupTitle, new Set())
    }
    const groupSet = newSelected.get(groupTitle)!
    if (groupSet.has(value)) {
      groupSet.delete(value)
    } else {
      groupSet.add(value)
    }
    setSelectedFilters(newSelected)
    onFilterChange?.(groupTitle, value)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const newRange = {
      ...priceRange,
      [type]: parseInt(e.target.value),
    }
    setPriceRange(newRange)
    onPriceChange?.(newRange.min, newRange.max)
  }

  return (
    <div className="w-full md:w-64 space-y-6">
      {/* Price Filter */}
      <div className="space-y-4 pb-6 border-b border-border">
        <h3 className="font-serif text-lg font-bold">Price Range</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold block mb-2">Min: £{priceRange.min}</label>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={priceRange.min}
              onChange={(e) => handlePriceChange(e, 'min')}
              className="w-full accent-primary"
            />
          </div>
          <div>
            <label className="text-sm font-semibold block mb-2">Max: £{priceRange.max}</label>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={priceRange.max}
              onChange={(e) => handlePriceChange(e, 'max')}
              className="w-full accent-primary"
            />
          </div>
        </div>
      </div>

      {/* Filter Groups */}
      {filters.map((group) => (
        <div key={group.title} className="space-y-3 pb-6 border-b border-border last:border-0">
          <button
            onClick={() => toggleGroup(group.title)}
            className="flex items-center justify-between w-full py-2 font-serif font-bold text-foreground hover:text-primary transition-colors"
          >
            {group.title}
            <ChevronDown
              size={18}
              className={cn(
                'transition-transform duration-300',
                expandedGroups.has(group.title) ? 'rotate-180' : ''
              )}
            />
          </button>

          {expandedGroups.has(group.title) && (
            <div className="space-y-2 pl-2">
              {group.options.map((option) => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedFilters.get(group.title)?.has(option.value) || false}
                    onChange={() => handleFilterChange(group.title, option.value)}
                    className="w-4 h-4 accent-primary rounded"
                  />
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                    {option.label}
                  </span>
                  {option.count !== undefined && (
                    <span className="text-xs text-muted-foreground ml-auto">
                      ({option.count})
                    </span>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
