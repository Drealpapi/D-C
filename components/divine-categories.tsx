import Link from 'next/link'
import Image from 'next/image'

interface Category {
  id: string
  name: string
  description: string
  image: string
  href: string
  icon?: string
}

interface DivineCategoriesProps {
  categories: Category[]
}

export default function DivineCategories({ categories }: DivineCategoriesProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-primary mb-3">
            Browse
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, idx) => {
            const colors = [
              'from-primary/20 to-primary/10',
              'from-secondary/20 to-secondary/10',
              'from-accent/20 to-accent/10',
              'from-primary/10 to-secondary/20',
            ]
            return (
              <Link key={category.id} href={category.href}>
                <div className="group cursor-pointer h-full">
                  <div
                    className={`relative overflow-hidden mb-4 aspect-square bg-gradient-to-br ${
                      colors[idx % colors.length]
                    } flex items-center justify-center`}
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover object-center group-hover:scale-110 transition duration-500 opacity-70"
                      quality={80}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  <div className="text-center space-y-2">
                    <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition">
                      {category.name}
                    </h3>
                    <p className="text-xs text-foreground/60 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
