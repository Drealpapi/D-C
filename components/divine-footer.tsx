'use client'

import ThemeLogo from '@/components/logo'
import Link from 'next/link'
import { useState } from 'react'

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

export default function DivineFooter() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  function handleNewsletter(e: React.FormEvent) {
    e.preventDefault()
    if (email) { setJoined(true); setEmail('') }
  }
  const shopLinks = [
    { label: 'Earrings',    href: '/shop/earrings' },
    { label: 'Bangles',     href: '/shop/bangles' },
    { label: 'Accessories', href: '/shop/accessories' },
    { label: 'Collections', href: '/shop/collections' },
    { label: 'Jewelry',     href: '/shop/jewelry' },
    { label: 'Sarees',      href: '/shop/sarees' },
    { label: 'Lehengas',    href: '/shop/lehengas' },
  ]
  const accountLinks = [
    { label: 'My Account',  href: '/profile' },
    { label: 'Sign In',     href: '/login' },
    { label: 'Register',    href: '/register' },
    { label: 'Your Bag',    href: '/cart' },
  ]

  return (
    <footer className="bg-[#0d0e10] dark:bg-[#080a12] border-t border-white/[0.06]">

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">

        {/* Brand column */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <ThemeLogo size={34} forceDark />
            <div>
              <p className="font-serif text-base font-bold text-white tracking-wide">Divine Couture</p>
              <p className="text-[10px] tracking-[0.2em] text-white/35 uppercase">Indian Jewellery · UK</p>
            </div>
          </div>
          <p className="text-sm text-white/45 leading-relaxed mb-6 max-w-xs">
            Handcrafted Indian jewellery and clothing, curated for the modern South Asian woman in Britain.
          </p>
          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/shop.divinecouture"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-amber-400 hover:border-amber-400/40 transition duration-200"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-amber-400 hover:border-amber-400/40 transition duration-200"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Shop links */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-amber-500/80 mb-5 font-semibold">Shop</p>
          <ul className="space-y-3">
            {shopLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-white/45 hover:text-amber-400 transition duration-200">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account links */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-amber-500/80 mb-5 font-semibold">Account</p>
          <ul className="space-y-3">
            {accountLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-white/45 hover:text-amber-400 transition duration-200">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-amber-500/80 mb-5 font-semibold">Stay Connected</p>
          <p className="text-sm text-white/45 leading-relaxed mb-4">
            New arrivals, exclusive offers and bridal edits — straight to your inbox.
          </p>
          {joined ? (
            <div className="flex items-center gap-2 px-3 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-sm">
              <span className="text-emerald-400 text-sm">✓</span>
              <p className="text-xs text-emerald-400">You're on the list!</p>
            </div>
          ) : (
            <form className="flex gap-2" onSubmit={handleNewsletter}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 min-w-0 bg-white/[0.05] border border-white/10 px-3 py-2.5 text-xs text-white placeholder:text-white/25 focus:outline-none focus:border-amber-500/50 transition rounded-sm"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-amber-500 text-stone-900 text-xs font-bold tracking-wider uppercase hover:bg-amber-400 transition rounded-sm shrink-0"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Gold divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/25">
          © {new Date().getFullYear()} Divine Couture. All rights reserved.
        </p>
        <div className="flex items-center gap-5 text-xs text-white/25">
          <a href="#" className="hover:text-white/50 transition">Privacy</a>
          <a href="#" className="hover:text-white/50 transition">Terms</a>
          <a href="#" className="hover:text-white/50 transition">Cookies</a>
        </div>
      </div>
    </footer>
  )
}
