import Image from 'next/image'
import Link from 'next/link'

interface Collection {
  id: string
  name: string
  image: string
  href: string
  description?: string
}

interface FeaturedCollectionsProps {
  collections: Collection[]
  title?: string
}

export default function FeaturedCollections({ collections, title = 'Curated Collections' }: FeaturedCollectionsProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Explore our handpicked selection of jewelry and fashion pieces, curated for timeless elegance
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {collections.map((collection) => (
            <Link key={collection.id} href={collection.href}>
              <div className="group cursor-pointer">
                {/* Image */}
                <div className="relative h-64 md:h-72 overflow-hidden mb-4">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-serif font-bold text-foreground group-hover:text-primary transition">
                    {collection.name}
                  </h3>
                  {collection.description && (
                    <p className="text-sm text-muted-foreground">
                      {collection.description}
                    </p>
                  )}
                  <p className="text-xs tracking-widest uppercase text-primary font-semibold group-hover:gap-2 inline-flex gap-1 transition">
                    Explore <span>→</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
