'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useCart } from '@/lib/cart-context'
import { useUserAuth } from '@/lib/user-auth-context'
import { ShoppingBag, Lock, CheckCircle2, ChevronRight, Truck, Shield, RotateCcw } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const inputCls = "w-full border border-rose-100 dark:border-white/10 bg-rose-50/40 dark:bg-white/[0.04] px-4 py-3.5 text-sm text-stone-800 dark:text-stone-200 placeholder:text-stone-300 dark:placeholder:text-white/20 focus:outline-none focus:border-rose-400 dark:focus:border-amber-500/60 transition rounded-xl"
const labelCls = "block text-[11px] uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 mb-2 font-medium"

const STEPS = ['Bag', 'Details', 'Payment', 'Confirm']

// ── Inner payment form (needs to be inside <Elements>) ──
function PaymentForm({
  grandTotal,
  user,
  onSuccess,
}: {
  grandTotal: number
  user: { name: string; email: string } | null
  onSuccess: () => void
}) {
  const stripe   = useStripe()
  const elements = useElements()
  const [step, setStep]       = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError('')
    setStep(2)

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message ?? 'Payment failed')
      setLoading(false)
      setStep(1)
      return
    }

    // Create PaymentIntent server-side
    const res = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount:   Math.round(grandTotal * 100), // convert £ to pence
        currency: 'gbp',
        metadata: { customer: user?.name ?? 'Guest', email: user?.email ?? '' },
      }),
    })

    const data = await res.json()
    if (data.error) {
      setError(data.error)
      setLoading(false)
      setStep(1)
      return
    }

    // Confirm payment with Stripe
    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret: data.clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/checkout?success=true`,
        payment_method_data: {
          billing_details: {
            name:  user?.name  ?? '',
            email: user?.email ?? '',
          },
        },
      },
      redirect: 'if_required',
    })

    if (confirmError) {
      setError(confirmError.message ?? 'Payment failed. Please try again.')
      setLoading(false)
      setStep(1)
    } else {
      setStep(3)
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-2 max-w-sm">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300 ${
              i < step ? 'bg-emerald-500 text-white' :
              i === step ? 'bg-rose-400 dark:bg-amber-500 text-white dark:text-stone-900' :
              'bg-stone-100 dark:bg-white/[0.06] text-stone-400 dark:text-stone-500'
            }`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`text-[10px] ml-1.5 tracking-wider uppercase hidden sm:block ${
              i === step ? 'text-stone-700 dark:text-stone-300 font-semibold' : 'text-stone-400 dark:text-stone-500'
            }`}>{s}</span>
            {i < STEPS.length - 1 && (
              <div className={`w-8 h-px mx-2 transition-all ${i < step ? 'bg-emerald-400' : 'bg-stone-200 dark:bg-white/10'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Delivery fields */}
      <div>
        <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-5 flex items-center gap-2">
          <Truck className="w-4 h-4 text-rose-400 dark:text-amber-500" /> Delivery Details
        </h2>
        <div className="space-y-4">
          {[
            { id: 'fullName', label: 'Full Name',      type: 'text',  placeholder: user?.name  || 'Your name',            defaultValue: user?.name  || '' },
            { id: 'email',    label: 'Email Address',  type: 'email', placeholder: user?.email || 'you@example.com',       defaultValue: user?.email || '' },
            { id: 'address',  label: 'Address Line 1', type: 'text',  placeholder: '123 High Street',                     defaultValue: '' },
            { id: 'city',     label: 'City',           type: 'text',  placeholder: 'London',                              defaultValue: '' },
            { id: 'postcode', label: 'Postcode',       type: 'text',  placeholder: 'SW1A 1AA',                            defaultValue: '' },
          ].map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className={labelCls}>{f.label}</label>
              <input id={f.id} type={f.type} required placeholder={f.placeholder}
                defaultValue={f.defaultValue} className={inputCls} />
            </div>
          ))}
        </div>
      </div>

      {/* Stripe Payment Element */}
      <div>
        <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-5 flex items-center gap-2">
          <Shield className="w-4 h-4 text-rose-400 dark:text-amber-500" /> Payment
        </h2>
        <div className="border border-rose-100 dark:border-white/10 rounded-xl p-4 bg-rose-50/30 dark:bg-white/[0.02]">
          <PaymentElement
            options={{
              layout: 'tabs',
              paymentMethodOrder: ['card', 'apple_pay', 'google_pay'],
            }}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 text-xs text-red-500 bg-red-50 dark:bg-red-500/[0.08] border border-red-200 dark:border-red-500/20 rounded-xl px-4 py-3">
          <span className="shrink-0 mt-0.5">⚠</span> {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full py-4 bg-rose-400 dark:bg-amber-500 text-white dark:text-stone-900 text-xs font-bold tracking-[0.2em] uppercase hover:bg-rose-500 dark:hover:bg-amber-400 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(225,100,120,0.3)]"
      >
        {loading
          ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          : <><Lock className="w-3.5 h-3.5" /> Pay £{grandTotal.toFixed(2)}</>
        }
      </button>

      <p className="text-center text-xs text-stone-400 dark:text-stone-500 flex items-center justify-center gap-1.5">
        <Shield className="w-3 h-3" /> Secured by Stripe · 256-bit SSL encryption
      </p>
    </form>
  )
}

// ── Main checkout view ──
export default function CheckoutView() {
  const { items, total, clearCart } = useCart()
  const { isLoggedIn, user }        = useUserAuth()
  const [placed, setPlaced]         = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const delivery   = total >= 75 ? 0 : 4.99
  const grandTotal = total + delivery

  // Check for Stripe redirect success
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'true') {
      clearCart()
      setPlaced(true)
    }
  }, [clearCart])

  // Pre-fetch a PaymentIntent as soon as we know the total
  useEffect(() => {
    if (!isLoggedIn || items.length === 0 || placed) return
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Math.round(grandTotal * 100), currency: 'gbp' }),
    })
      .then((r) => r.json())
      .then((d) => { if (d.clientSecret) setClientSecret(d.clientSecret) })
      .catch(console.error)
  }, [isLoggedIn, grandTotal, items.length, placed])

  // ── Order confirmed ──
  if (placed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-rose-400 dark:text-amber-400 mb-3">Payment Confirmed</p>
          <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-100 mb-3">Thank You{user ? `, ${user.name.split(' ')[0]}` : ''}!</h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm mb-2">Your order has been placed and payment received.</p>
          <p className="text-stone-400 dark:text-stone-500 text-xs mb-10">
            A confirmation will be sent to <span className="text-stone-600 dark:text-stone-300">{user?.email}</span>
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent mb-8" />
          <div className="flex gap-3 justify-center">
            <Link href="/" className="px-6 py-3 bg-rose-400 dark:bg-amber-500 text-white dark:text-stone-900 text-xs font-bold tracking-widest uppercase hover:bg-rose-500 dark:hover:bg-amber-400 transition rounded-xl">
              Continue Shopping
            </Link>
            <Link href="/profile" className="px-6 py-3 border border-rose-200 dark:border-white/10 text-stone-700 dark:text-stone-300 text-xs font-medium tracking-widest uppercase hover:border-rose-300 transition rounded-xl">
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
          <Link href="/shop/jewelry" className="inline-block px-8 py-3.5 bg-rose-400 dark:bg-amber-500 text-white dark:text-stone-900 text-xs font-bold tracking-widest uppercase hover:bg-rose-500 transition rounded-xl">
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
        <div className="max-w-md w-full">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-amber-500/10 border border-rose-100 dark:border-amber-500/20 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-7 h-7 text-rose-400 dark:text-amber-400" />
          </div>
          <div className="text-center mb-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-rose-400 dark:text-amber-400 mb-3">Secure Checkout</p>
            <h1 className="font-serif text-2xl md:text-3xl text-stone-900 dark:text-stone-100 mb-3">Sign in to Continue</h1>
            <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
              Create an account or sign in to complete your purchase and track your orders.
            </p>
          </div>

          {/* Order preview */}
          <div className="bg-rose-50/60 dark:bg-white/[0.03] border border-rose-100 dark:border-white/[0.06] rounded-xl p-4 mb-6">
            <p className="text-[11px] uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3">Your Bag ({items.length} {items.length === 1 ? 'item' : 'items'})</p>
            <div className="space-y-2.5 mb-4">
              {items.slice(0, 3).map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex items-center gap-3">
                  <div className="relative w-10 h-10 bg-stone-100 dark:bg-stone-800 overflow-hidden rounded-lg shrink-0">
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
                <p className="text-xs text-stone-400 text-center">+{items.length - 3} more items</p>
              )}
            </div>
            <div className="border-t border-rose-100 dark:border-white/[0.06] pt-3 flex justify-between">
              <span className="text-xs text-stone-500">Total</span>
              <span className="text-sm font-bold text-stone-900 dark:text-stone-100">£{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/login?redirect=/checkout"
              className="flex items-center justify-center gap-2 w-full py-4 bg-rose-400 dark:bg-amber-500 text-white dark:text-stone-900 text-xs font-bold tracking-[0.18em] uppercase hover:bg-rose-500 transition rounded-xl shadow-[0_4px_20px_rgba(225,100,120,0.3)]">
              Sign In to Checkout <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/register?redirect=/checkout"
              className="flex items-center justify-center w-full py-3.5 border border-rose-200 dark:border-white/10 text-stone-700 dark:text-stone-300 text-xs font-medium tracking-[0.18em] uppercase hover:border-rose-400 transition rounded-xl">
              Create Account
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-rose-100 dark:border-white/[0.05]">
            {[{ icon: Shield, label: 'Secure Payment' }, { icon: Truck, label: 'Free UK Delivery' }, { icon: RotateCcw, label: '30-Day Returns' }].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <Icon className="w-4 h-4 text-rose-300 dark:text-stone-500" />
                <span className="text-[10px] text-stone-400 dark:text-stone-500 tracking-wide text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Main checkout (logged in + Stripe) ──
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">

      <div className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.22em] text-rose-400 dark:text-amber-400 mb-2">Secure Checkout</p>
        <h1 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100">Complete Your Order</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

        {/* Left: payment form */}
        <div className="lg:col-span-3">

          {/* Signed-in notice */}
          <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 dark:bg-emerald-500/[0.07] border border-emerald-100 dark:border-emerald-500/20 rounded-xl mb-6">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              Signed in as <span className="font-semibold">{user?.name}</span> ·{' '}
              <Link href="/profile" className="underline underline-offset-2">My Account</Link>
            </p>
          </div>

          {clientSecret ? (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary:       '#f87171',
                    colorBackground:    '#fff8f8',
                    colorText:          '#1c1917',
                    colorDanger:        '#ef4444',
                    fontFamily:         'system-ui, sans-serif',
                    borderRadius:       '12px',
                    spacingUnit:        '4px',
                  },
                },
              }}
            >
              <PaymentForm
                grandTotal={grandTotal}
                user={user}
                onSuccess={() => { clearCart(); setPlaced(true) }}
              />
            </Elements>
          ) : (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3">
                <span className="w-8 h-8 border-2 border-rose-300 border-t-rose-500 rounded-full animate-spin" />
                <p className="text-xs text-stone-400 tracking-wider">Preparing secure checkout…</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: order summary */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-5">Order Summary</h2>
            <div className="bg-rose-50/40 dark:bg-white/[0.03] border border-rose-100 dark:border-white/[0.06] rounded-xl p-5 space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 bg-stone-100 dark:bg-stone-800 overflow-hidden rounded-lg shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-stone-700 dark:text-stone-300 line-clamp-1 font-medium">{item.name}</p>
                    {item.selectedSize && <p className="text-[11px] text-stone-400">Size: {item.selectedSize}</p>}
                    <p className="text-[11px] text-stone-400">× {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 shrink-0">
                    £{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="border-t border-rose-100 dark:border-white/[0.06] pt-4 space-y-2.5 text-sm">
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
                <div className="border-t border-rose-100 dark:border-white/[0.06] pt-3 flex justify-between font-bold text-stone-900 dark:text-stone-100 text-base">
                  <span>Total</span><span>£{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {[
                { icon: Shield,    text: 'Secure payment via Stripe' },
                { icon: Truck,     text: 'Free delivery over £75' },
                { icon: RotateCcw, text: '30-day hassle-free returns' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-xs text-stone-400 dark:text-stone-500">
                  <Icon className="w-3.5 h-3.5 text-rose-400 dark:text-amber-500 shrink-0" />
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
