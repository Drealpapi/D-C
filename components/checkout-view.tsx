'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { useUserAuth } from '@/lib/user-auth-context'
import { ShoppingBag, Lock, CheckCircle2, ChevronRight, Truck, Shield, RotateCcw } from 'lucide-react'

const inputCls = "w-full border border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-white/[0.04] px-4 py-3.5 text-sm text-stone-800 dark:text-stone-200 placeholder:text-stone-300 dark:placeholder:text-white/20 focus:outline-none focus:border-amber-500 dark:focus:border-amber-500/60 transition rounded-sm"
const labelCls = "block text-[11px] uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 mb-2 font-medium"

const STEPS = ['Bag', 'Details', 'Payment', 'Confirm']

export default function CheckoutView() {
  const { items, total, clearCart } = useCart()
  const { isLoggedIn, user }        = useUserAuth()
  const [placed, setPlaced]         = useState(false)
  const [step, setStep]             = useState(1)

  const delivery    = total >= 75 ? 0 : 4.99
  const grandTotal  = total + delivery

  function handlePlace(e: React.FormEvent) {
    e.preventDefault()
    setStep(3)
    setTimeout(() => {
      clearCart()
      setPlaced(true)
    }, 600)
  }

  // ── Order confirmed ──
  if (placed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center animate-scale-in">
          <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-amber-600 dark:text-amber-400 mb-3">Order Placed</p>
          <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-100 mb-3">Thank You{user ? `, ${user.name.split(' ')[0]}` : ''}!</h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm mb-2">Your order has been confirmed.</p>
          <p className="text-stone-400 dark:text-stone-500 text-xs mb-10">A confirmation email will be sent to <span className="text-stone-600 dark:text-stone-300">{user?.email}</span></p>
          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-8" />
          <div className="flex gap-3 justify-center">
            <Link href="/" className="px-6 py-3 bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-900 text-xs font-bold tracking-widest uppercase hover:bg-amber-700 dark:hover:bg-amber-400 transition">
              Continue Shopping
            </Link>
            <Link href="/profile" className="px-6 py-3 border border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-300 text-xs font-medium tracking-widest uppercase hover:border-stone-400 dark:hover:border-white/20 transition">
              My Orders
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── Empty bag ──
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
        <div className="text-center">
          <ShoppingBag className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto mb-4" />
          <h1 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-3">Your bag is empty</h1>
          <p className="text-stone-400 dark:text-stone-500 text-sm mb-8">Add some pieces before checking out.</p>
          <Link href="/shop/earrings" className="inline-block px-8 py-3.5 bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-900 text-xs font-bold tracking-widest uppercase hover:bg-amber-700 dark:hover:bg-amber-400 transition">
            Shop Now
          </Link>
        </div>
      </div>
    )
  }

  // ── Auth gate ──
  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full animate-fade-up">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-7 h-7 text-amber-600 dark:text-amber-400" />
          </div>

          <div className="text-center mb-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-amber-600 dark:text-amber-400 mb-3">Secure Checkout</p>
            <h1 className="font-serif text-2xl md:text-3xl text-stone-900 dark:text-stone-100 mb-3">
              Sign in to Continue
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
              Create an account or sign in to complete your purchase and track your orders.
            </p>
          </div>

          {/* Order preview */}
          <div className="bg-stone-50 dark:bg-white/[0.03] border border-stone-100 dark:border-white/[0.06] rounded-sm p-4 mb-6">
            <p className="text-[11px] uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3">Your Bag ({items.length} {items.length === 1 ? 'item' : 'items'})</p>
            <div className="space-y-2.5 mb-4">
              {items.slice(0, 3).map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex items-center gap-3">
                  <div className="relative w-10 h-10 bg-stone-100 dark:bg-stone-800 overflow-hidden rounded-sm shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-stone-700 dark:text-stone-300 truncate">{item.name}</p>
                    <p className="text-xs text-stone-400 dark:text-stone-500">× {item.quantity}</p>
                  </div>
                  <p className="text-xs font-semibold text-stone-800 dark:text-stone-200">£{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              {items.length > 3 && (
                <p className="text-xs text-stone-400 dark:text-stone-500 text-center">+{items.length - 3} more items</p>
              )}
            </div>
            <div className="border-t border-stone-200 dark:border-white/[0.06] pt-3 flex justify-between">
              <span className="text-xs text-stone-500 dark:text-stone-400">Total</span>
              <span className="text-sm font-bold text-stone-900 dark:text-stone-100">£{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="space-y-3">
            <Link
              href={`/login?redirect=/checkout`}
              className="flex items-center justify-center gap-2 w-full py-4 bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-900 text-xs font-bold tracking-[0.18em] uppercase hover:bg-amber-700 dark:hover:bg-amber-400 transition-all duration-300 hover:shadow-lg"
            >
              Sign In to Checkout
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/register?redirect=/checkout`}
              className="flex items-center justify-center gap-2 w-full py-3.5 border border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-300 text-xs font-medium tracking-[0.18em] uppercase hover:border-amber-500 dark:hover:border-amber-500/50 hover:text-amber-700 dark:hover:text-amber-400 transition"
            >
              Create Account
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-stone-100 dark:border-white/[0.05]">
            {[
              { icon: Shield,    label: 'Secure Payment' },
              { icon: Truck,     label: 'Free UK Delivery' },
              { icon: RotateCcw, label: '30-Day Returns' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <Icon className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                <span className="text-[10px] text-stone-400 dark:text-stone-500 tracking-wide text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Checkout form (logged in) ──
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">

      {/* Header */}
      <div className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.22em] text-amber-600 dark:text-amber-400 mb-2">Secure Checkout</p>
        <h1 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100">Complete Your Order</h1>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-10 max-w-sm">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300 ${
              i < step ? 'bg-emerald-500 text-white' :
              i === step ? 'bg-amber-500 text-stone-900' :
              'bg-stone-100 dark:bg-white/[0.06] text-stone-400 dark:text-stone-500'
            }`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`text-[10px] ml-1.5 tracking-wider uppercase hidden sm:block ${
              i === step ? 'text-stone-700 dark:text-stone-300 font-semibold' : 'text-stone-400 dark:text-stone-500'
            }`}>{s}</span>
            {i < STEPS.length - 1 && (
              <div className={`w-8 h-px mx-2 transition-all duration-300 ${i < step ? 'bg-emerald-400' : 'bg-stone-200 dark:bg-white/10'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

        {/* Form */}
        <form onSubmit={handlePlace} className="lg:col-span-3 space-y-8">

          {/* Logged-in user greeting */}
          <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 dark:bg-emerald-500/[0.07] border border-emerald-100 dark:border-emerald-500/20 rounded-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              Signed in as <span className="font-semibold">{user?.name}</span> · <Link href="/profile" className="underline underline-offset-2 hover:no-underline">My Account</Link>
            </p>
          </div>

          {/* Delivery */}
          <div>
            <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-5 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-500" /> Delivery Details
            </h2>
            <div className="space-y-4">
              {[
                { id: 'fullName', label: 'Full Name',      type: 'text',  placeholder: user?.name || 'Your name',  defaultValue: user?.name || '' },
                { id: 'email',    label: 'Email Address',  type: 'email', placeholder: user?.email || 'you@example.com', defaultValue: user?.email || '' },
                { id: 'address',  label: 'Address Line 1', type: 'text',  placeholder: '123 High Street' },
                { id: 'city',     label: 'City',           type: 'text',  placeholder: 'London' },
                { id: 'postcode', label: 'Postcode',       type: 'text',  placeholder: 'SW1A 1AA' },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className={labelCls}>{field.label}</label>
                  <input id={field.id} type={field.type} required placeholder={field.placeholder}
                    defaultValue={field.defaultValue} className={inputCls} />
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div>
            <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-5 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-500" /> Payment
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="card" className={labelCls}>Card Number</label>
                <input id="card" type="text" placeholder="•••• •••• •••• ••••" maxLength={19} required className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className={labelCls}>Expiry</label>
                  <input id="expiry" type="text" placeholder="MM / YY" maxLength={7} required className={inputCls} />
                </div>
                <div>
                  <label htmlFor="cvv" className={labelCls}>CVV</label>
                  <input id="cvv" type="text" placeholder="•••" maxLength={4} required className={inputCls} />
                </div>
              </div>
            </div>
          </div>

          <button type="submit"
            className="w-full py-4 bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-900 text-xs font-bold tracking-[0.2em] uppercase hover:bg-amber-700 dark:hover:bg-amber-400 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_30px_rgba(212,175,55,0.2)] flex items-center justify-center gap-2"
          >
            <Lock className="w-3.5 h-3.5" />
            Place Order · £{grandTotal.toFixed(2)}
          </button>

          <p className="text-center text-xs text-stone-400 dark:text-stone-500 flex items-center justify-center gap-1.5">
            <Shield className="w-3 h-3" /> Secured with 256-bit SSL encryption
          </p>
        </form>

        {/* Order summary */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-5">Order Summary</h2>
            <div className="bg-stone-50 dark:bg-white/[0.03] border border-stone-100 dark:border-white/[0.06] p-5 space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 bg-stone-100 dark:bg-stone-800 overflow-hidden rounded-sm shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-stone-700 dark:text-stone-300 line-clamp-1 font-medium">{item.name}</p>
                    {item.selectedSize && <p className="text-[11px] text-stone-400 dark:text-stone-500">Size: {item.selectedSize}</p>}
                    <p className="text-[11px] text-stone-400 dark:text-stone-500">× {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 shrink-0">
                    £{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="border-t border-stone-200 dark:border-white/[0.06] pt-4 space-y-2.5 text-sm">
                <div className="flex justify-between text-stone-500 dark:text-stone-400">
                  <span>Subtotal</span><span>£{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-500 dark:text-stone-400">
                  <span>Delivery</span>
                  <span className={delivery === 0 ? 'text-emerald-600 dark:text-emerald-400 font-medium' : ''}>
                    {delivery === 0 ? 'Free ✓' : `£${delivery.toFixed(2)}`}
                  </span>
                </div>
                {total < 75 && (
                  <p className="text-[11px] text-amber-600 dark:text-amber-400">
                    Add £{(75 - total).toFixed(2)} more for free delivery
                  </p>
                )}
                <div className="border-t border-stone-200 dark:border-white/[0.06] pt-3 flex justify-between font-bold text-stone-900 dark:text-stone-100 text-base">
                  <span>Total</span><span>£{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Trust */}
            <div className="mt-4 space-y-2">
              {[
                { icon: Shield,    text: 'Secure SSL payment' },
                { icon: Truck,     text: 'Free delivery over £75' },
                { icon: RotateCcw, text: '30-day hassle-free returns' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-xs text-stone-400 dark:text-stone-500">
                  <Icon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
