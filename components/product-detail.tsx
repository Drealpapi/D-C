'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { Product } from '@/lib/product-data'
import { useCart } from '@/lib/cart-context'
import ProductCard from '@/components/product-card'
import { ChevronLeft, ShoppingBag, Check, Shield, Truck, RotateCcw, Star } from 'lucide-react'

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const { addItem }     = useCart()
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? '')
  const [added, setAdded]               = useState(false)
  const [imgLoaded, setImgLoaded]       = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const categoryRoute =
    product.category === 'saree'   ? 'sarees'   :
    product.category === 'lehenga' ? 'lehengas' :
    product.category

  function handleAdd() {
    addItem(product, selectedSize || undefined)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">

      {/* Breadcrumb */}
      <Link
        href={`/shop/${categoryRoute}`}
        className="inline-flex items-center gap-1.5 text-xs text-rose-300 dark:text-white/30 hover:text-rose-600 dark:hover:text-amber-400 transition mb-8 group capitalize"
      >
        <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
        Back to {product.category}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-20 md:mb-28">

        {/* ── Image panel ── */}
        <div className="space-y-3">
          <div className="relative aspect-square bg-stone-100 dark:bg-white/[0.03] overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover object-center transition-all duration-700 ${imgLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              onLoad={() => setImgLoaded(true)}
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-rose-400 dark:bg-amber-500 text-white dark:text-stone-900 text-[10px] px-3 py-1 tracking-[0.18em] uppercase font-bold">
                  New
                </span>
              )}
              {product.isOnSale && discount > 0 && (
                <span className="bg-rose-600 dark:bg-amber-600 text-white text-[10px] px-3 py-1 tracking-[0.18em] uppercase font-bold">
                  −{discount}%
                </span>
              )}
            </div>

            {/* Shimmer overlay while loading */}
            {!imgLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-stone-100 via-stone-50 to-stone-100 dark:from-white/[0.03] dark:via-white/[0.06] dark:to-white/[0.03] animate-pulse" />
            )}
          </div>

          {/* Trust row under image */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Shield,    text: 'Authentic' },
              { icon: Truck,     text: 'UK Delivery' },
              { icon: RotateCcw, text: '30-Day Returns' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1.5 py-3 bg-rose-50/60 dark:bg-white/[0.02] border border-rose-100/80 dark:border-white/[0.05]">
                <Icon className="w-3.5 h-3.5 text-rose-400 dark:text-amber-500" />
                <span className="text-[10px] text-stone-500 dark:text-white/30 tracking-wide text-center">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Info panel ── */}
        <div className="flex flex-col justify-center">

          {/* Category */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-6 bg-rose-300 dark:bg-amber-500" />
            <p className="text-[11px] uppercase tracking-[0.22em] text-rose-400 dark:text-amber-400 capitalize">
              {product.category}
            </p>
          </div>

          {/* Name */}
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-stone-900 dark:text-white/90 mb-5 leading-snug">
            {product.name}
          </h1>

          {/* Rating (decorative) */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-rose-300 text-rose-300 dark:fill-amber-400 dark:text-amber-400" />
              ))}
            </div>
            <span className="text-xs text-stone-400 dark:text-white/30">(24 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-stone-900 dark:text-white/90">
              £{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-stone-400 dark:text-white/25 line-through text-lg">
                £{product.originalPrice.toFixed(2)}
              </span>
            )}
            {discount > 0 && (
              <span className="text-xs font-bold text-rose-500 dark:text-amber-400 bg-rose-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-sm">
                {discount}% off
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-stone-500 dark:text-white/40 text-sm leading-relaxed mb-8 max-w-md">
              {product.description}
            </p>
          )}

          {/* Size selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500 dark:text-white/35 mb-3 font-medium">
                Size
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 text-sm border transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-rose-400 dark:bg-amber-500 text-white dark:text-stone-900 border-rose-400 dark:border-amber-500 shadow-sm'
                        : 'bg-white dark:bg-white/[0.03] text-stone-700 dark:text-white/60 border-rose-100 dark:border-white/[0.08] hover:border-rose-300 dark:hover:border-amber-500/50 hover:text-rose-600 dark:hover:text-amber-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to bag */}
          <button
            onClick={handleAdd}
            className={`w-full py-4 flex items-center justify-center gap-2.5 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
              added
                ? 'bg-emerald-600 text-white shadow-[0_8px_24px_rgba(16,185,129,0.25)]'
                : 'bg-rose-400 dark:bg-amber-500 text-white dark:text-stone-900 hover:bg-rose-500 dark:hover:bg-amber-400 hover:shadow-[0_8px_30px_rgba(244,114,182,0.25)] dark:hover:shadow-[0_8px_30px_rgba(212,175,55,0.2)]'
            }`}
          >
            {added
              ? <><Check className="w-4 h-4" /> Added to Bag</>
              : <><ShoppingBag className="w-4 h-4" /> Add to Bag</>
            }
          </button>

          {/* Perks */}
          <div className="mt-8 pt-8 border-t border-rose-100/80 dark:border-white/[0.05] space-y-2.5">
            {[
              '✦ Free UK delivery on orders over £75',
              '✦ Handcrafted & quality checked',
              '✦ Easy 30-day returns',
              '✦ Secure checkout',
            ].map((perk) => (
              <p key={perk} className="text-xs text-rose-300 dark:text-white/25 tracking-wide">{perk}</p>
            ))}
          </div>
        </div>
      </div>

      {/* ── Related products ── */}
      {related.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-rose-400 dark:text-amber-400 mb-2">You May Also Like</p>
              <h2 className="font-serif text-2xl md:text-3xl text-stone-900 dark:text-white/90">Related Pieces</h2>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-stone-200 dark:from-white/[0.06] to-transparent hidden md:block" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
