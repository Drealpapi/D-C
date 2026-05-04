import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative h-96 md:h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero-sarees-sherwani.jpg"
        alt="Divine Couture - Luxury Sarees & Sherwani Collection"
        fill
        className="object-cover object-center"
        priority
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 md:px-8">
        <p className="text-sm md:text-base font-medium tracking-widest opacity-90 mb-4">Divine Couture Collection</p>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-center text-balance mb-6">
          TIMELESS ELEGANCE
        </h1>
        <Link href="#" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 md:px-8 py-3 rounded font-medium transition">
          Shop Now
        </Link>
      </div>
    </section>
  )
}
