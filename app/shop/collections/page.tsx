import DivineHeader from '@/components/divine-header'
import DivineFooter from '@/components/divine-footer'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = { title: 'Collections | Divine Couture' }

const collections = [
  {
    name: 'Bridal Edit',
    description: 'Everything you need for the perfect bridal look — from statement earrings to delicate accessories.',
    image: '/images/lehenga-bridal-1.jpg',
    href: '/shop/earrings',
    tag: 'New Season',
  },
  {
    name: 'Festive Jewellery',
    description: 'Vibrant, celebratory pieces for Diwali, Eid, and every occasion in between.',
    image: '/images/jewelry-necklace-1.jpg',
    href: '/shop/bangles',
    tag: 'Bestsellers',
  },
  {
    name: 'Everyday Elegance',
    description: 'Understated pieces that bring a touch of Indian artisanship to your daily wardrobe.',
    image: '/images/jewelry-earrings-1.jpg',
    href: '/shop/accessories',
    tag: 'New In',
  },
]

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DivineHeader />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">Curated For You</p>
            <h1 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100">Collections</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((col) => (
              <Link key={col.name} href={col.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    className="object-cover object-center transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-white text-stone-900 text-xs px-3 py-1 tracking-wider uppercase">
                    {col.tag}
                  </span>
                  <div className="absolute bottom-0 left-0 p-5">
                    <h2 className="font-serif text-xl text-white font-semibold">{col.name}</h2>
                  </div>
                </div>
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{col.description}</p>
                <p className="text-xs text-stone-800 dark:text-stone-200 mt-2 underline underline-offset-4 group-hover:text-stone-600 dark:group-hover:text-stone-400 transition">
                  Shop now
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <DivineFooter />
    </div>
  )
}

