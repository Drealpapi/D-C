'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const products = [
  {
    id: 1,
    title: 'Soft Beige Silk Bridal Lehenga',
    price: '$825.00',
    image: '/images/gold-lehenga.jpg',
  },
  {
    id: 2,
    title: 'Peach Lehenga',
    price: '$895.00',
    image: '/images/gold-lehenga.jpg',
  },
  {
    id: 3,
    title: 'Floral Velvet Bridal Lehenga',
    price: '$895.00',
    image: '/images/red-bridal-lehenga.jpg',
  },
  {
    id: 4,
    title: 'Peach Floral Work Bridal Lehenga',
    price: '$1,125.00',
    image: '/images/red-bridal-lehenga.jpg',
  },
]

export default function BridalLehengas() {
  const [scrollPosition, setScrollPosition] = useState(0)

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('lehenga-carousel')
    if (container) {
      const scrollAmount = 320
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        setScrollPosition(Math.max(0, scrollPosition - scrollAmount))
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        setScrollPosition(scrollPosition + scrollAmount)
      }
    }
  }

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-12">Divine Bridal Collection</h2>

        {/* Carousel Container */}
        <div className="relative">
          <div
            id="lehenga-carousel"
            className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-64 sm:w-72 md:w-80 snap-start">
                <div className="group">
                  <div className="relative h-72 md:h-96 rounded overflow-hidden mb-4">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition duration-500"
                    />
                    {/* Gold Accent Badge */}
                    <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm font-medium">
                      New
                    </div>
                  </div>
                  <h3 className="font-serif text-base md:text-lg font-bold mb-2 group-hover:text-primary transition">
                    {product.title}
                  </h3>
                  <p className="text-primary font-semibold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows — visible on all sizes */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/3 -translate-y-1/2 bg-white hover:bg-white/90 text-foreground p-2 rounded-full shadow-lg transition z-10"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/3 -translate-y-1/2 bg-white hover:bg-white/90 text-foreground p-2 rounded-full shadow-lg transition z-10"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* See All Button */}
        <div className="flex justify-center mt-12">
          <Link href="#" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 rounded-full font-medium transition">
            See All
          </Link>
        </div>
      </div>
    </section>
  )
}
