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
  { name: 'Earrings',    image: '/images/jewelry-earrings-1.jpg', href: '/shop/earrings',    description: 'Jhumkas, chandbalis & more',      featured: true },
  { name: 'Bangles',     image: '/images/jewelry-bangles-1.jpg',  href: '/shop/bangles',     description: 'Polki, Kundan & glass sets',       featured: false },
  { name: 'Accessories', image: '/images/accessory-scarf-1.jpg',  href: '/shop/accessories', description: 'Dupattas, tikkas & more',          featured: false },
  { name: 'Jewelry',     image: '/images/jewelry-necklace-1.jpg', href: '/shop/jewelry',     description: 'Necklaces, bracelets & more',      featured: true },
  { name: 'Sarees',      image: '/images/collection-sarees.jpg',  href: '/shop/sarees',      description: 'Silk, cotton & embroidered',       featured: false },
  { name: 'Lehengas',    image: '/images/collection-lehengas.jpg',href: '/shop/lehengas',    description: 'Bridal & festive collections',     featured: false },
]

const features = [
  { icon: '✦', label: 'Handcrafted',       sub: 'Every piece made by artisans' },
  { icon: '◈', label: 'UK Delivery',        sub: 'Free on orders over £75' },
  { icon: '❋', label: 'Bridal Specialists', sub: 'Curated for your big day' },
  { icon: '◇', label: '30-Day Returns',     sub: 'Hassle-free guarantee' },
]

function CategoryCard({ cat, tall = false, delay = 0 }: {
  cat: typeof categories[0]; tall?: boolean; delay?: number
}) {
  return (
    <Link
      href={cat.href}
      className="group block reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`relative overflow-hidden bg-stone-100 dark:bg-stone-900 ${tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
        <Image
          src={cat.image} alt={cat.name} fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Always-strong base gradient so text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        {/* Hover: blush pink glow rises from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-rose-900/55 via-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Rose inset border glow */}
        <div className="absolute inset-0 ring-0 ring-inset ring-rose-300/0 group-hover:ring-2 group-hover:ring-inset group-hover:ring-rose-300/60 dark:group-hover:ring-amber-400/40 transition-all duration-500" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <h3
            className={`font-serif text-white font-semibold mb-1 transition-all duration-300 group-hover:text-rose-100 dark:group-hover:text-amber-200 ${tall ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}
          >
            {cat.name}
          </h3>
          <p className="text-white/80 text-xs tracking-wide drop-shadow">{cat.description}</p>
          {/* Shop now pill — slides up on hover */}
          <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-400/90 dark:bg-amber-500/90 text-white dark:text-stone-900 text-[10px] tracking-[0.18em] uppercase font-bold rounded-full shadow-lg">
              Shop now →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function Home() {
  const allProducts = useProducts()
  const newArrivals = allProducts.filter((p) => p.isNew).slice(0, 4)
  const onSale      = allProducts.filter((p) => p.isOnSale && p.inStock !== false).slice(0, 2)
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
        />

        {/* ── Feature strip ── */}
        <section ref={featuresRef} className="py-8 md:py-10 px-4 border-b border-rose-100/60 dark:border-white/[0.05] bg-rose-50/40 dark:bg-white/[0.02]">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {features.map((f, i) => (
              <div key={f.label} className={`reveal text-center delay-${(i + 1) * 100}`}>
                <div className="text-xl mb-2 text-rose-400 dark:text-amber-400">{f.icon}</div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-800 dark:text-stone-200 mb-0.5">{f.label}</p>
                <p className="text-[11px] text-stone-400 dark:text-stone-500 leading-snug">{f.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Our Collections — asymmetric editorial grid ── */}
        <section ref={catRef} className="py-20 md:py-28 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div className="reveal">
                <p className="text-[11px] uppercase tracking-[0.25em] text-rose-400 dark:text-amber-400 mb-2">Browse</p>
                <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 mb-3">Our Collections</h2>
                <div className="gold-divider" style={{ margin: 0 }} />
              </div>
              <Link href="/shop/collections" className="reveal reveal-right text-xs tracking-widest uppercase text-stone-400 dark:text-stone-500 hover:text-rose-500 dark:hover:text-amber-400 transition hidden sm:flex items-center gap-2 group">
                All collections <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>

            {/* Row 1: 1 tall + 2 square */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-3 md:mb-4">
              <div className="col-span-1 row-span-2">
                <CategoryCard cat={categories[0]} tall delay={100} />
              </div>
              <CategoryCard cat={categories[1]} delay={200} />
              <CategoryCard cat={categories[2]} delay={300} />
            </div>

            {/* Row 2: 2 square + 1 tall */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <CategoryCard cat={categories[3]} delay={150} />
              <CategoryCard cat={categories[4]} delay={250} />
              <div className="hidden md:block">
                <CategoryCard cat={categories[5]} tall delay={350} />
              </div>
              <div className="md:hidden">
                <CategoryCard cat={categories[5]} delay={350} />
              </div>
            </div>
          </div>
        </section>

        {/* ── New Arrivals + On Sale side by side ── */}
        <section ref={arrivalsRef} className="py-20 md:py-24 px-4 md:px-8 bg-rose-50/30 dark:bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex items-end justify-between mb-10">
              <div className="reveal">
                <p className="text-[11px] uppercase tracking-[0.25em] text-rose-400 dark:text-amber-400 mb-2">Just In</p>
                <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 mb-3">New Arrivals</h2>
                <div className="gold-divider" style={{ margin: 0 }} />
              </div>
              <Link href="/shop/earrings" className="reveal reveal-right text-xs tracking-widest uppercase text-stone-400 dark:text-stone-500 hover:text-rose-500 dark:hover:text-amber-400 transition hidden sm:flex items-center gap-2 group">
                View all <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>

            {/* Products grid — first card larger */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {newArrivals.map((product, i) => (
                <div
                  key={product.id}
                  className={`reveal delay-${(i + 1) * 100} ${i === 0 ? 'col-span-2 md:col-span-2' : ''}`}
                >
                  <ProductCard product={product} featured={i === 0} />
                </div>
              ))}
            </div>

            {/* Mobile view all */}
            <div className="mt-8 text-center sm:hidden">
              <Link href="/shop/earrings" className="text-xs tracking-widest uppercase text-stone-400 hover:text-rose-500 transition">
                View all →
              </Link>
            </div>

            {/* On Sale strip */}
            {onSale.length > 0 && (
              <div className="mt-16 pt-12 border-t border-rose-100/60 dark:border-white/[0.05]">
                <div className="flex items-end justify-between mb-8">
                  <div className="reveal">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-rose-400 dark:text-amber-400 mb-2">Limited Time</p>
                    <h2 className="font-serif text-2xl md:text-3xl text-stone-900 dark:text-stone-100">On Sale</h2>
                  </div>
                  <Link href="/shop/earrings" className="reveal text-xs tracking-widest uppercase text-stone-400 hover:text-rose-500 dark:hover:text-amber-400 transition hidden sm:flex items-center gap-2 group">
                    See all deals <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {onSale.map((product, i) => (
                    <div key={product.id} className={`reveal delay-${(i + 1) * 100}`}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Brand Story — full blush panel ── */}
        <section ref={storyRef} className="relative overflow-hidden">
          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[480px]">

            {/* Left — image */}
            <div className="relative h-64 md:h-auto">
              <Image
                src="/images/divine-hero.jpg"
                alt="Divine Couture story"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-rose-50/20 dark:to-[#0d0f1a]/40" />
            </div>

            {/* Right — text on blush */}
            <div className="relative bg-rose-50/60 dark:bg-white/[0.02] flex items-center px-8 md:px-14 py-16 md:py-20">
              {/* Mandala watermark */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] dark:opacity-[0.06] pointer-events-none" aria-hidden="true">
                <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
                  {[140,110,80,50,20].map((r) => (
                    <circle key={r} cx="160" cy="160" r={r} stroke="currentColor" strokeWidth="0.5"/>
                  ))}
                  {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => (
                    <line key={deg} x1="160" y1="20" x2="160" y2="300"
                      stroke="currentColor" strokeWidth="0.3"
                      transform={`rotate(${deg} 160 160)`}/>
                  ))}
                </svg>
              </div>

              <div className="relative max-w-md">
                <p className="reveal text-[11px] uppercase tracking-[0.25em] text-rose-400 dark:text-amber-400 mb-4">Our Story</p>
                <h2 className="reveal delay-100 font-serif text-3xl md:text-4xl lg:text-5xl text-stone-900 dark:text-stone-100 mb-6 leading-tight">
                  Where Tradition<br />Meets Elegance
                </h2>
                <div className="reveal delay-200 gold-divider mb-6" style={{ margin: '0 0 1.5rem 0' }} />
                <p className="reveal delay-300 text-stone-500 dark:text-stone-400 leading-relaxed text-sm md:text-base mb-8">
                  Divine Couture is a UK-based Indian jewellery and clothing brand. We source and curate handcrafted pieces that honour centuries of Indian artisanship — bringing them to modern wardrobes across Britain.
                </p>
                <div className="reveal delay-400 flex flex-wrap gap-4">
                  <Link
                    href="/shop/earrings"
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-rose-400 dark:bg-amber-500 text-white dark:text-stone-900 text-xs font-bold tracking-[0.18em] uppercase hover:bg-rose-500 dark:hover:bg-amber-400 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(244,114,182,0.3)] dark:hover:shadow-[0_8px_30px_rgba(212,175,55,0.25)]"
                  >
                    Explore the Collection
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </Link>
                  <Link
                    href="/shop/collections"
                    className="inline-flex items-center gap-2 px-7 py-3.5 border border-rose-200 dark:border-white/20 text-stone-700 dark:text-stone-300 text-xs font-medium tracking-[0.18em] uppercase hover:border-rose-400 dark:hover:border-white/40 hover:text-rose-600 dark:hover:text-white transition-all duration-300"
                  >
                    Our Collections
                  </Link>
                </div>

                {/* Stats */}
                <div className="reveal delay-500 flex items-center gap-8 mt-10 pt-8 border-t border-rose-100/60 dark:border-white/[0.06]">
                  {[
                    { value: '500+', label: 'Handcrafted pieces' },
                    { value: 'UK',   label: 'Nationwide delivery' },
                    { value: '100%', label: 'Artisan made' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">{stat.value}</p>
                      <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <DivineFooter />
    </div>
  )
}
