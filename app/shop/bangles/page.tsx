'use client'

import DivineHeader from '@/components/divine-header'
import DivineFooter from '@/components/divine-footer'
import ShopLayout from '@/components/shop-layout'
import { useProducts } from '@/lib/use-products'

export default function BanglesPage() {
  const products = useProducts('bangles')
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DivineHeader />
      <main className="flex-1">
        <ShopLayout
          title="Bangles"
          description="Polki, Kundan, Meenakari and glass bangles — beautifully crafted sets for every wrist."
          products={products}
          categoryFilters={['All', 'Polki', 'Kundan', 'Meenakari', 'Glass', 'Kada']}
        />
      </main>
      <DivineFooter />
    </div>
  )
}
