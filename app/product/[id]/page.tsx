'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import DivineHeader from '@/components/divine-header'
import DivineFooter from '@/components/divine-footer'
import ProductDetail from '@/components/product-detail'
import { useProduct, useProducts } from '@/lib/use-products'

interface Props {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: Props) {
  const { id }    = use(params)
  const product   = useProduct(id)
  const allProducts = useProducts()

  if (!product) notFound()

  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DivineHeader />
      <main className="flex-1">
        <ProductDetail product={product} related={related} />
      </main>
      <DivineFooter />
    </div>
  )
}
