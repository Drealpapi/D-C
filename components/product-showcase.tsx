'use client'

import ProductCard from './product-card'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: 'clothing' | 'accessories' | 'jewelry'
  isNew?: boolean
}

interface ProductShowcaseProps {
  title: string
  subtitle?: string
  products: Product[]
  showViewAll?: boolean
}

export default function ProductShowcase({
  title,
  subtitle,
  products,
  showViewAll = true,
}: ProductShowcaseProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className="flex justify-center">
            <button className="border border-foreground text-foreground px-8 py-3 hover:bg-foreground hover:text-background transition text-sm tracking-wider uppercase">
              View All
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
