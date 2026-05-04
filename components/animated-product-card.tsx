'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/product-data'

interface AnimatedProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  isNew?: boolean
  isOnSale?: boolean
  href: string
}

export default function AnimatedProductCard(props: AnimatedProductCardProps) {
  const { id, name, price, originalPrice, image, category, isNew, isOnSale, href } = props
  const { addItem } = useCart()
  const [isFavorited, setIsFavorited] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [added, setAdded] = useState(false)

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  function handleAddToBag(e: React.MouseEvent) {
    e.preventDefault()
    addItem(props as unknown as Product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link href={href}>
      <div className="group cursor-pointer">
        {/* Image Container */}
        <div
          className="relative overflow-hidden rounded-lg mb-4 aspect-square bg-muted"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={image}
            alt={name}
            fill
            className={cn(
              'object-cover object-center transition-transform duration-500 ease-out',
              isHovered && 'scale-110'
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            {isNew && (
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                New
              </span>
            )}
            {isOnSale && discount > 0 && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                -{discount}%
              </span>
            )}
          </div>

          {/* Quick Action Buttons - Always visible on mobile, hover on desktop */}
          <div
            className={cn(
              'absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center gap-4 transition-opacity duration-300',
              isHovered ? 'opacity-100' : 'opacity-0 sm:opacity-0',
              'sm:group-hover:opacity-100'
            )}
          >
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsFavorited(!isFavorited)
              }}
              className="bg-white p-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
              aria-label="Add to wishlist"
            >
              <Heart
                size={20}
                className={isFavorited ? 'fill-red-500 text-red-500' : ''}
              />
            </button>
            <button
              onClick={handleAddToBag}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              aria-label="Add to bag"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">{added ? 'Added ✓' : 'Add to Bag'}</span>
            </button>
          </div>

          {/* Category Badge - Bottom Right */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-medium text-foreground">
            {category}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">£{price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                £{originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* View Details Link */}
          <p className="text-sm text-primary font-semibold group-hover:underline">
            View Details →
          </p>
        </div>
      </div>
    </Link>
  )
}
