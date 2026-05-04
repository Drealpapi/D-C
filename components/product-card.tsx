'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { Product } from '@/lib/product-data'
import { useCart } from '@/lib/cart-context'
import { ShoppingBag, Check } from 'lucide-react'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  // Hidden products are never shown to buyers
  if (product.hidden) return null

  const outOfStock = product.inStock === false

  // Only show discount badge if there's an actual original price higher than current price
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    if (outOfStock) return
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <Link href={`/product/${product.id}`} className="group block">
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-stone-100 dark:bg-stone-900/60 mb-3.5">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${
            outOfStock ? 'brightness-75' : ''
          }`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/20 transition-all duration-500" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-rose-400 dark:bg-amber-500 text-white dark:text-stone-900 text-[10px] px-2.5 py-0.5 tracking-[0.15em] uppercase font-semibold">
              New
            </span>
          )}
          {product.isOnSale && discount > 0 && (
            <span className="bg-rose-600 dark:bg-amber-600 text-white text-[10px] px-2.5 py-0.5 tracking-[0.15em] uppercase font-semibold">
              −{discount}%
            </span>
          )}
        </div>

        {/* Out of Stock overlay */}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 tracking-[0.18em] uppercase font-semibold backdrop-blur-sm">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick add — only shown when in stock */}
        {!outOfStock && (
          <button
            onClick={handleAdd}
            className={`absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 py-3 text-[11px] tracking-[0.18em] uppercase font-semibold transition-all duration-300 ${
              added
                ? 'bg-emerald-600 text-white translate-y-0 opacity-100'
                : 'bg-rose-400/95 dark:bg-amber-500 text-white dark:text-stone-900 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
            }`}
          >
            {added
              ? <><Check className="w-3.5 h-3.5" /> Added</>
              : <><ShoppingBag className="w-3.5 h-3.5" /> Quick Add</>
            }
          </button>
        )}
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p className="text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-[0.18em] capitalize">
          {product.category}
        </p>
        <h3 className="text-sm text-stone-800 dark:text-stone-200 font-medium leading-snug line-clamp-2 group-hover:text-rose-700 dark:group-hover:text-amber-400 transition duration-200">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-stone-900 dark:text-stone-100 font-bold text-sm">
            £{product.price.toFixed(2)}
          </span>
          {/* Only show original price if it's actually higher (real discount) */}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-stone-400 dark:text-stone-500 text-xs line-through">
              £{product.originalPrice.toFixed(2)}
            </span>
          )}
          {outOfStock && (
            <span className="text-[10px] text-stone-400 dark:text-stone-500 italic">· Out of stock</span>
          )}
        </div>
      </div>
    </Link>
  )
}
