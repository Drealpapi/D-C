'use client'

import DivineHeader from '@/components/divine-header'
import DivineFooter from '@/components/divine-footer'
import ShopLayout from '@/components/shop-layout'
import { useProducts } from '@/lib/use-products'

export default function AccessoriesPage() {
  const products = useProducts('accessories')
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DivineHeader />
      <main className="flex-1">
        <ShopLayout
          title="Accessories"
          description="Dupattas, maang tikkas, potli bags and more — the finishing touches that complete your look."
          products={products}
          categoryFilters={['All', 'Dupatta', 'Tikka', 'Bags', 'Hair Accessories']}
        />
      </main>
      <DivineFooter />
    </div>
  )
}
