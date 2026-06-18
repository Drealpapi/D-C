'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export default function CartView() {
  const { items, total, removeItem, updateQuantity } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-100 mb-4">Your Bag is Empty</h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm mb-8">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/shop/earrings" className="inline-block px-8 py-3 bg-rose-400 dark:bg-amber-500 text-white dark:text-stone-900 text-sm tracking-widest uppercase hover:bg-rose-500 dark:hover:bg-amber-400 transition">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-14">
      <h1 className="font-serif text-3xl md:text-4xl text-rose-950 dark:text-stone-100 mb-10">Your Bag</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 pb-6 border-b border-rose-100/70 dark:border-stone-800">
              <Link href={`/product/${item.id}`} className="relative w-24 h-24 flex-shrink-0 bg-rose-50 dark:bg-stone-800 overflow-hidden rounded-xl">
                <Image src={item.image} alt={item.name} fill className="object-cover object-center" sizes="96px" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div>
                    <p className="text-xs text-rose-400/80 dark:text-stone-500 uppercase tracking-wider mb-0.5 capitalize">{item.category}</p>
                    <Link href={`/product/${item.id}`} className="text-sm font-medium text-rose-900 dark:text-stone-200 hover:text-rose-600 dark:hover:text-stone-400 transition line-clamp-2">{item.name}</Link>
                    {item.selectedSize && <p className="text-xs text-rose-400/70 dark:text-stone-500 mt-1">Size: {item.selectedSize}</p>}
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-rose-200 dark:text-stone-600 hover:text-rose-500 dark:hover:text-stone-300 transition flex-shrink-0" aria-label="Remove item">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-rose-100 dark:border-stone-700 rounded-lg overflow-hidden">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 text-rose-400 dark:text-stone-400 hover:text-rose-700 dark:hover:text-stone-100 hover:bg-rose-50 dark:hover:bg-stone-700 transition" aria-label="Decrease quantity"><Minus className="w-3 h-3" /></button>
                    <span className="px-3 py-1.5 text-sm text-rose-900 dark:text-stone-200 min-w-[2rem] text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 text-rose-400 dark:text-stone-400 hover:text-rose-700 dark:hover:text-stone-100 hover:bg-rose-50 dark:hover:bg-stone-700 transition" aria-label="Increase quantity"><Plus className="w-3 h-3" /></button>
                  </div>
                  <span className="text-sm font-semibold text-rose-950 dark:text-stone-100">£{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-rose-50/70 dark:bg-stone-800/50 backdrop-blur-sm border border-rose-100/80 dark:border-stone-700/50 rounded-2xl p-5 md:p-6 lg:sticky lg:top-24">
            <h2 className="font-serif text-xl text-rose-950 dark:text-stone-100 mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between text-rose-700/70 dark:text-stone-400"><span>Subtotal</span><span>£{total.toFixed(2)}</span></div>
              <div className="flex justify-between text-rose-700/70 dark:text-stone-400"><span>Delivery</span><span>{total >= 75 ? 'Free' : '£4.99'}</span></div>
              {total < 75 && <p className="text-xs text-rose-400 dark:text-amber-400">Add £{(75 - total).toFixed(2)} more for free delivery</p>}
              <div className="border-t border-rose-100 dark:border-stone-700 pt-3 flex justify-between font-semibold text-rose-950 dark:text-stone-100"><span>Total</span><span>£{(total + (total >= 75 ? 0 : 4.99)).toFixed(2)}</span></div>
            </div>
            <Link href="/checkout" className="block w-full text-center py-4 bg-rose-400 dark:bg-amber-500 text-white dark:text-stone-900 text-sm tracking-widest uppercase hover:bg-rose-500 dark:hover:bg-amber-400 transition rounded-xl shadow-[0_4px_20px_rgba(225,100,120,0.25)]">Checkout</Link>
            <Link href="/shop/jewelry" className="block w-full text-center py-3 mt-3 text-xs text-rose-400/70 dark:text-stone-400 hover:text-rose-500 dark:hover:text-stone-200 transition">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
