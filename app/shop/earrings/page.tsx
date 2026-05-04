'use client'

import DivineHeader from '@/components/divine-header'
import DivineFooter from '@/components/divine-footer'
import ShopLayout from '@/components/shop-layout'
import { useProducts } from '@/lib/use-products'

export default function EarringsPage() {
  const products = useProducts('earrings')
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DivineHeader />
      <main className="flex-1">
        <ShopLayout
          title="Earrings"
          description="Jhumkas, chandbalis, studs and danglers — handcrafted for every occasion."
          products={products}
          categoryFilters={['All', 'Jhumkas', 'Chandbali', 'Studs', 'Danglers']}
        />
      </main>
      <DivineFooter />
    </div>
  )
}
