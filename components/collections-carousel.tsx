'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const collections = [
  {
    id: 1,
    title: 'New Arrivals',
    image: '/images/gold-lehenga.jpg',
  },
  {
    id: 2,
    title: 'Lehengas',
    image: '/images/red-bridal-lehenga.jpg',
  },
  {
    id: 3,
    title: 'Sarees',
    image: '/images/hero-sarees-sherwani.jpg',
  },
]

export default function CollectionsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const scroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setActiveIndex((prev) => (prev === 0 ? collections.length - 1 : prev - 1))
    } else {
      setActiveIndex((prev) => (prev === collections.length - 1 ? 0 : prev + 1))
    }
  }

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-12">Collections</h2>
        
        <div className="relative">
          {/* Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((collection, index) => (
              <div
                key={collection.id}
                className={`relative h-64 md:h-80 rounded overflow-hidden cursor-pointer transition duration-300 ${
                  index === activeIndex ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition" />
                <div className="absolute inset-0 flex items-end p-6">
                  <h3 className="text-white font-serif text-xl md:text-2xl font-bold">{collection.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Desktop Only */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between px-4 pointer-events-none">
            <button
              onClick={() => scroll('left')}
              className="pointer-events-auto bg-white/80 hover:bg-white text-black p-2 rounded-full transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="pointer-events-auto bg-white/80 hover:bg-white text-black p-2 rounded-full transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex gap-2 justify-center mt-6 md:hidden">
            {collections.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition ${
                  index === activeIndex ? 'bg-primary w-8' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
