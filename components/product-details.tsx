'use client'

import { useState } from 'react'
import { Heart, Share2, ShoppingCart } from 'lucide-react'

interface ProductDetailsProps {
  name: string
  price: number
  category: string
  description: string
  details: string[]
  inStock: boolean
  sku: string
}

export default function ProductDetails({
  name,
  price,
  category,
  description,
  details,
  inStock,
  sku,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [wishlist, setWishlist] = useState(false)

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
          {category}
        </p>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
          {name}
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-foreground">
          £{price.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
        </p>
      </div>

      {/* Description */}
      <div>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Details List */}
      <div className="space-y-2 border-y border-border py-6">
        {details.map((detail, index) => (
          <p key={index} className="text-sm text-foreground">
            • {detail}
          </p>
        ))}
      </div>

      {/* Quantity & Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm tracking-wider uppercase text-muted-foreground">
            Quantity
          </span>
          <div className="flex items-center border border-border">
            <button
              onClick={decreaseQuantity}
              className="px-4 py-2 text-sm hover:bg-muted transition"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              readOnly
              className="w-12 text-center border-x border-border py-2 text-sm"
            />
            <button
              onClick={increaseQuantity}
              className="px-4 py-2 text-sm hover:bg-muted transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            disabled={!inStock}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-sm tracking-wider uppercase transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => setWishlist(!wishlist)}
              className="flex-1 border border-foreground text-foreground hover:bg-foreground hover:text-background py-3 text-sm tracking-wider uppercase transition flex items-center justify-center gap-2"
            >
              <Heart className={`w-5 h-5 ${wishlist ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">Add to Wishlist</span>
            </button>
            <button className="flex-1 border border-foreground text-foreground hover:bg-foreground hover:text-background py-3 text-sm tracking-wider uppercase transition flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* SKU */}
      <div className="text-xs text-muted-foreground space-y-2">
        <p>SKU: {sku}</p>
        <p>Shipping & Returns: Free UK shipping on orders over £150. Easy 30-day returns.</p>
      </div>
    </div>
  )
}
