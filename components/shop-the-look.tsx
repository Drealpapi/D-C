import Image from 'next/image'
import Link from 'next/link'

export default function ShopTheLook() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-12">Shop The Look</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Sangeet */}
          <div className="relative group overflow-hidden rounded">
            <Image
              src="/images/sangeet-outfit.jpg"
              alt="Sangeet Look"
              width={500}
              height={400}
              className="w-full h-96 object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-white font-serif text-2xl font-bold mb-3">Sangeet</h3>
              <Link href="#" className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded transition">
                <span>Explore</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Haldi */}
          <div className="relative group overflow-hidden rounded">
            <Image
              src="/images/gold-lehenga.jpg"
              alt="Haldi Look"
              width={500}
              height={400}
              className="w-full h-96 object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-white font-serif text-2xl font-bold mb-3">New Haldi</h3>
              <Link href="#" className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded transition">
                <span>Explore</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
