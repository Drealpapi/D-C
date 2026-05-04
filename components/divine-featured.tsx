import DivineProductCard from './divine-product-card'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: 'saree' | 'lehenga' | 'jewelry' | 'accessories'
  isNew?: boolean
  isOnSale?: boolean
  href: string
}

interface DivineFeaturedProps {
  title: string
  subtitle?: string
  products: Product[]
  viewAllHref?: string
}

export default function DivineFeatured({
  title,
  subtitle,
  products,
  viewAllHref = '/shop',
}: DivineFeaturedProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-widest text-primary mb-3">
            {subtitle || 'Collection'}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {products.map((product) => (
            <DivineProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <a
            href={viewAllHref}
            className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold uppercase tracking-wider text-sm transition duration-300"
          >
            View All
          </a>
        </div>
      </div>
    </section>
  )
}
