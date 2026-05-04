import Image from 'next/image'
import Link from 'next/link'

export default function ProductSpotlight() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-12">Featured Piece</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <div className="relative h-96 md:h-[500px] rounded overflow-hidden">
            <Image
              src="/images/red-bridal-lehenga.jpg"
              alt="Enchanted Ruby - Divine Couture Signature Bridal Lehenga"
              fill
              className="object-cover object-center hover:scale-105 transition duration-500"
            />
            {/* Dot Indicators */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              <button className="w-3 h-3 bg-white rounded-full hover:bg-secondary transition" />
              <button className="w-3 h-3 bg-white/50 rounded-full hover:bg-secondary transition" />
              <button className="w-3 h-3 bg-white/50 rounded-full hover:bg-secondary transition" />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl md:text-2xl font-serif font-bold">
              Enchanted Ruby - Signature Collection
            </h3>
            <p className="text-muted-foreground">SKU: DC-RUBY-001</p>
            <p className="text-3xl md:text-4xl font-bold text-primary">$1275.95</p>
            
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">SIZE</span>
              <select className="border border-border rounded px-4 py-2 bg-background">
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
              <div className="flex items-center border border-border rounded">
                <button className="px-4 py-2 text-foreground hover:bg-muted">−</button>
                <span className="px-4">1</span>
                <button className="px-4 py-2 text-foreground hover:bg-muted">+</button>
              </div>
            </div>

            <button className="bg-foreground text-background hover:bg-foreground/90 px-6 py-3 rounded font-medium transition w-full md:w-auto">
              ADD TO CART
            </button>

            <p className="text-sm text-muted-foreground leading-relaxed">
              A scintillating silver lehenga with sparkling stone work in delicate florals across the nack and U shaped back. Flattering floral clusters of stone, grace the lehenga and weaves diagonals adorn the sleeves.
            </p>

            <Link href="#" className="text-primary hover:text-primary/80 font-medium">
              See All
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
