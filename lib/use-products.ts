'use client'

import { useAdmin } from './admin-context'
import type { Product } from './product-data'

/**
 * Returns live products from the admin context.
 * Hidden products are automatically excluded from the storefront.
 * Use this on all buyer-facing pages instead of importing from product-data.ts
 */
export function useProducts(category?: Product['category']) {
  const { products } = useAdmin()

  // Never show hidden products to buyers
  const visible = products.filter((p) => !p.hidden)

  if (!category) return visible
  return visible.filter((p) => p.category === category)
}

export function useProduct(id: string) {
  const { products } = useAdmin()
  return products.find((p) => p.id === id && !p.hidden) ?? null
}
