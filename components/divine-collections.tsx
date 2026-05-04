import Link from 'next/link'
import Image from 'next/image'

interface Collection {
  id: string
  title: string
  subtitle: string
  image: string
  href: string
  color: 'primary' | 'secondary' | 'accent'
}

interface DivineCollectionsProps {
  collections: Collection[]
  title?: string
}

export default function DivineCollections({
  collections,
  title = 'Curated Collections',
}: DivineCollectionsProps) {
  const colorClasses = {
    primary: 'from-primary/20 to-primary/10',
    secondary: 'from-secondary/20 to-secondary/10',
    accent: 'from-accent/20 to-accent/10',
  }

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-primary mb-3">
            Explore
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {collections.map((collection) => (
            <Link key={collection.id} href={collection.href}>
              <div className="group cursor-pointer h-full">
                {/* Image Container */}
                <div className="relative overflow-hidden mb-6 aspect-square bg-muted">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition duration-500"
                    quality={85}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/60 transition duration-300" />
                </div>

                {/* Collection Info */}
                <div className="space-y-3">
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-foreground/70">{collection.subtitle}</p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 pt-2 group-hover:gap-3 transition-all duration-300">
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                      Shop
                    </span>
                    <span className="text-primary transition group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
