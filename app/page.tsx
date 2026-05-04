'use client'

import DivineHeader from '@/components/divine-header'
import DivineFooter from '@/components/divine-footer'
import DivineHero from '@/components/divine-hero'
import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/product-card'
import { useReveal } from '@/hooks/use-reveal'
import { useProducts } from '@/lib/use-products'

const categories = [
  { name: 'Earrings',    image: '/images/jewelry-earrings-1.jpg', href: '/shop/earrings',    description: 'Jhumkas, chandbalis & more' },
  { name: 'Bangles',     image: '/images/jewelry-bangles-1.jpg',  href: '/shop/bangles',     description: 'Polki, Kundan & glass sets' },
  { name: 'Accessories', image: '/images/accessory-scarf-1.jpg',  href: '/shop/accessories', description: 'Dupattas, tikkas & more' },
]

const features = [
  { icon: '✦', label: 'Handcrafted',       sub: 'Every piece made by artisans' },
  { icon: '◈', label: 'UK Delivery',        sub: 'Free on orders over £75' },
  { icon: '❋', label: 'Bridal Specialists', sub: 'Curated for your big day' },
  { icon: '◇', label: '30-Day Returns',     sub: 'Hassle-free guarantee' },
]

export default function Home() {
  const allProducts = useProducts()
  const newArrivals = allProducts.filter((p) => p.isNew).slice(0, 4)
  const featuresRef = useReveal()
  const catRef      = useReveal()
  const arrivalsRef = useReveal()
  const storyRef    = useReveal()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DivineHeader />

      <main className="flex-1">

        {/* ── Hero ── */}
        <DivineHero
          title="Crafted for the Modern Indian Woman"
          subtitle="Handpicked jewellery and accessories celebrating the beauty of Indian tradition — delivered across the UK."
          ctaText="Shop Now"
          ctaHref="/shop/earrings"
          backgroundImage="/images/divine-hero.jpg"
        />

        {/* ── Feature strip ── */}
        <section ref={featuresRef} className="py-10 md:py-12 px-4 border-b border-rose-100/60 dark:border-white/[0.05] bg-rose-50/40 dark:bg-white/[0.02]">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {features.map((f, i) => (
              <div key={f.label} className={`reveal text-center delay-${(i + 1) * 100}`}>
                <div className="text-2xl mb-2 text-rose-400 dark:text-amber-400">{f.icon}</div>
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-800 dark:text-stone-200 mb-1">{f.label}</p>
                <p className="text-xs text-stone-400 dark:text-stone-500 leading-snug">{f.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Featured Categories ── */}
        <section ref={catRef} className="py-20 md:py-28 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14 reveal">
              <p className="text-[11px] uppercase tracking-[0.25em] text-rose-400 dark:text-amber-400 mb-3">Browse</p>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 mb-4">Our Collections</h2>
              <div className="gold-divider" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {categories.map((cat, i) => (
                <Link key={cat.name} href={cat.href} className={`group block reveal delay-${(i + 1) * 100}`}>
                  <div className="relative aspect-[4/3] sm:aspect-[3/4] overflow-hidden bg-stone-100 dark:bg-stone-900">
                    <Image
                      src={cat.image} alt={cat.name} fill
                      className="object-cover object-center transition duration-700 group-hover:scale-[1.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-400/40 transition-all duration-500" />
                    <div className="absolute bottom-0 left-0 p-5 md:p-6">
                      <h3 className="font-serif text-xl md:text-2xl text-white font-semibold mb-1 group-hover:text-amber-300 transition duration-300">
                        {cat.name}
                      </h3>
                      <p className="text-white/65 text-xs tracking-wide">{cat.description}</p>
                      <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-xs text-amber-400 tracking-widest uppercase">Shop now</span>
                        <span className="text-amber-400 text-xs">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── New Arrivals ── */}
        <section ref={arrivalsRef} className="py-20 md:py-24 px-4 md:px-8 bg-rose-50/30 dark:bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div className="reveal">
                <p className="text-[11px] uppercase tracking-[0.25em] text-rose-400 dark:text-amber-400 mb-3">Just In</p>
                <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 mb-3">New Arrivals</h2>
                <div className="gold-divider" style={{ margin: 0 }} />
              </div>
              <Link href="/shop/earrings" className="reveal reveal-right text-xs tracking-widest uppercase text-stone-500 dark:text-stone-400 hover:text-rose-500 dark:hover:text-amber-400 transition hidden sm:flex items-center gap-2 group">
                View all <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {newArrivals.map((product, i) => (
                <div key={product.id} className={`reveal delay-${(i + 1) * 100}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link href="/shop/earrings" className="text-xs tracking-widest uppercase text-stone-500 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition">
                View all →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Brand Story ── */}
        <section ref={storyRef} className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden">
          {/* Mandala background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" aria-hidden="true">
            <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
              <circle cx="400" cy="200" r="180" stroke="currentColor" strokeWidth="0.5" fill="none"/>
              <circle cx="400" cy="200" r="140" stroke="currentColor" strokeWidth="0.5" fill="none"/>
              <circle cx="400" cy="200" r="100" stroke="currentColor" strokeWidth="0.5" fill="none"/>
              <circle cx="400" cy="200" r="60"  stroke="currentColor" strokeWidth="0.5" fill="none"/>
              {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => (
                <line key={deg} x1="400" y1="20" x2="400" y2="380"
                  stroke="currentColor" strokeWidth="0.3"
                  transform={`rotate(${deg} 400 200)`} />
              ))}
            </svg>
          </div>
          <div className="max-w-3xl mx-auto text-center relative">
            <p className="reveal text-[11px] uppercase tracking-[0.25em] text-rose-400 dark:text-amber-400 mb-4">Our Story</p>
            <h2 className="reveal delay-100 font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 mb-6 leading-tight">
              Where Tradition<br className="hidden md:block" /> Meets Elegance
            </h2>
            <div className="reveal delay-200 gold-divider mb-8" />
            <p className="reveal delay-300 text-stone-500 dark:text-stone-400 leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
              Divine Couture is a UK-based Indian jewellery and clothing brand. We source and curate handcrafted pieces that honour centuries of Indian artisanship — bringing them to modern wardrobes across Britain.
            </p>
            <div className="reveal delay-400 mt-10">
              <Link href="/shop/earrings" className="group inline-flex items-center gap-3 px-9 py-4 bg-rose-400 dark:bg-amber-500 text-white dark:text-stone-900 text-xs font-bold tracking-[0.2em] uppercase hover:bg-rose-500 dark:hover:bg-amber-400 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(244,114,182,0.25)] dark:hover:shadow-[0_8px_30px_rgba(212,175,55,0.25)]">
                Explore the Collection
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <DivineFooter />
    </div>
  )
}
