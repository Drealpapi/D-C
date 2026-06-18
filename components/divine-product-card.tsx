'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'
import { useState } from 'react'

interface DivineProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: 'saree' | 'lehenga' | 'jewelry' | 'accessories'
  isNew?: boolean
  isOnSale?: boolean
  href: string
}

export default function DivineProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  isNew,
  isOnSale,
  href,
}: DivineProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const categoryLabel = {
    saree: 'Saree',
    lehenga: 'Lehenga',
    jewelry: 'Jewelry',
    accessories: 'Accessories',
  }

  const discountPercent = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <Link href={href}>
      <div className="group cursor-pointer">
        {/* Image Container */}
        <div className="relative bg-muted overflow-hidden mb-4 aspect-square">
          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover object-center transition duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoadingComplete={() => setImageLoaded(true)}
            quality={85}
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            {isNew && (
              <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                New
              </span>
            )}
            {isOnSale && discountPercent > 0 && (
              <span className="bg-secondary text-secondary-foreground px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsWishlisted(!isWishlisted)
            }}
            className="absolute top-4 right-4 z-10 bg-rose-50/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition duration-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 shadow-sm"
          >
            <Heart
              className={`w-5 h-5 transition ${
                isWishlisted
                  ? 'fill-primary text-primary'
                  : 'text-foreground/60 hover:text-primary'
              }`}
            />
          </button>

          {/* Quick Add */}
          <button
            onClick={(e) => {
              e.preventDefault()
              // Handle add to cart
            }}
            className="absolute bottom-0 left-0 right-0 bg-rose-400/95 backdrop-blur-sm text-white py-3 flex items-center justify-center gap-2 font-medium text-sm tracking-wide opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition duration-300 sm:translate-y-full sm:group-hover:translate-y-0"
          >
            <ShoppingBag className="w-5 h-5" />
            Add to Bag
          </button>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest text-foreground/60">
            {categoryLabel[category]}
          </p>
          <h3 className="font-serif text-base md:text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition">
            {name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-2">
            <span className="font-semibold text-foreground">₹{price.toLocaleString()}</span>
            {originalPrice && (
              <span className="text-sm text-foreground/50 line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
