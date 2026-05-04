'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Package, Heart, MapPin, Settings, LogOut, Lock, User, ShoppingBag } from 'lucide-react'
import { useUserAuth } from '@/lib/user-auth-context'
import { useEffect } from 'react'

const DEMO_ORDERS = [
  { id: 'DC-2024-001', date: '12 Mar 2024', status: 'Delivered',  total: 83.00, items: 'Kundan Drop Earrings · Silk Dupatta' },
  { id: 'DC-2024-002', date: '28 Feb 2024', status: 'Processing', total: 89.00, items: 'Gold Polki Bangle Set' },
  { id: 'DC-2024-003', date: '5 Jan 2024',  status: 'Delivered',  total: 38.00, items: 'Pearl Jhumka Earrings' },
]

const statusStyle: Record<string, string> = {
  Delivered:  'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50',
  Processing: 'text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/50',
  Shipped:    'text-sky-700 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/50',
}

const quickLinks = [
  { label: 'Wishlist',   sub: 'Saved pieces',     icon: Heart,       href: '#' },
  { label: 'Addresses',  sub: 'Delivery details',  icon: MapPin,      href: '#' },
  { label: 'Settings',   sub: 'Account & privacy', icon: Settings,    href: '#' },
]

export default function ProfileView() {
  const { user, isLoggedIn, logout } = useUserAuth()
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) router.replace('/login?redirect=/profile')
  }, [isLoggedIn, router])

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-stone-400 dark:text-stone-500">Redirecting…</p>
        </div>
      </div>
    )
  }

  function handleSignOut() {
    logout()
    router.push('/')
  }

  return (
    <div className="bg-[#fdf8f8] dark:bg-[#0d0f1a] min-h-screen transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16 space-y-5">

        {/* ── Hero card ── */}
        <div className="bg-white dark:bg-white/[0.03] border border-stone-100 dark:border-white/[0.06] rounded-2xl px-6 py-8 flex items-center gap-5 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 dark:from-amber-400 dark:to-amber-600 flex items-center justify-center shrink-0 shadow-md">
            <span className="font-serif text-2xl text-white font-bold select-none">
              {user.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-[0.2em] text-rose-400 dark:text-amber-400 mb-1">Welcome back</p>
            <h1 className="font-serif text-2xl text-stone-900 dark:text-stone-100 leading-tight truncate">{user.name}</h1>
            <p className="text-sm text-stone-400 dark:text-stone-500 mt-0.5 truncate">{user.email}</p>
          </div>
          <Link
            href="/shop/earrings"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-rose-400 dark:bg-amber-500 text-white dark:text-stone-900 text-xs font-bold tracking-wider uppercase hover:bg-rose-500 dark:hover:bg-amber-400 transition rounded-sm shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Shop
          </Link>
        </div>

        {/* ── Quick links ── */}
        <div className="grid grid-cols-3 gap-3">
          {quickLinks.map(({ label, sub, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              className="group bg-white dark:bg-white/[0.03] border border-rose-100/80 dark:border-white/[0.06] rounded-xl px-4 py-5 flex flex-col items-center text-center gap-2.5 hover:border-rose-200 dark:hover:border-amber-500/30 hover:shadow-md hover:bg-rose-50/50 dark:hover:bg-white/[0.02] transition duration-200"
            >
              <Icon className="w-5 h-5 text-stone-400 dark:text-stone-500 group-hover:text-rose-400 dark:group-hover:text-amber-400 transition" />
              <div>
                <p className="text-xs font-semibold text-stone-800 dark:text-stone-200">{label}</p>
                <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5">{sub}</p>
              </div>
            </a>
          ))}
        </div>

        {/* ── Order history ── */}
        <div className="bg-white dark:bg-white/[0.03] border border-rose-100/80 dark:border-white/[0.06] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-rose-50 dark:border-white/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-rose-400 dark:text-amber-500" />
              <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100">Order History</h2>
            </div>
            <span className="text-xs text-stone-400 dark:text-stone-500 bg-rose-50/80 dark:bg-white/[0.04] px-2.5 py-1 rounded-full">
              {DEMO_ORDERS.length} orders
            </span>
          </div>

          <div className="divide-y divide-stone-50 dark:divide-white/[0.04]">
            {DEMO_ORDERS.map((order) => (
              <div key={order.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-rose-50/40 dark:hover:bg-white/[0.02] transition duration-150">
                <div className="min-w-0">
                  <p className="text-sm text-stone-800 dark:text-stone-200 font-medium truncate">{order.items}</p>
                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">{order.id} · {order.date}</p>
                </div>
                <div className="text-right shrink-0 space-y-1">
                  <p className="text-sm font-bold text-stone-900 dark:text-stone-100">£{order.total.toFixed(2)}</p>
                  <span className={`inline-block text-[11px] px-2.5 py-0.5 rounded-full font-medium ${statusStyle[order.status] ?? 'text-stone-500 bg-stone-50'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Account details ── */}
        <div className="bg-white dark:bg-white/[0.03] border border-rose-100/80 dark:border-white/[0.06] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-rose-50 dark:border-white/[0.04] flex items-center gap-2.5">
            <User className="w-4 h-4 text-rose-400 dark:text-amber-500" />
            <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100">Account Details</h2>
          </div>

          <div className="divide-y divide-stone-50 dark:divide-white/[0.04]">
            {[
              { label: 'Full Name',     value: user.name },
              { label: 'Email Address', value: user.email },
              { label: 'Password',      value: '••••••••' },
            ].map(({ label, value }) => (
              <div key={label} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500 mb-0.5">{label}</p>
                  <p className="text-sm text-stone-800 dark:text-stone-200">{value}</p>
                </div>
                {label === 'Password' && (
                  <Link
                    href="/forgot-password"
                    className="flex items-center gap-1.5 text-xs text-stone-400 dark:text-stone-500 hover:text-rose-500 dark:hover:text-amber-400 transition"
                  >
                    <Lock className="w-3 h-3" /> Change
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Sign out ── */}
        <div className="pb-4">
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 text-sm text-stone-400 dark:text-stone-500 hover:text-red-500 dark:hover:text-red-400 transition"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>

      </div>
    </div>
  )
}
