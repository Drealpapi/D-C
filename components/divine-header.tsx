'use client'

import ThemeLogo from '@/components/logo'
import Link from 'next/link'
import { Search, ShoppingBag, Menu, X, User, Sun, Moon, LogOut } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useTheme } from 'next-themes'
import { useCart } from '@/lib/cart-context'
import { useUserAuth } from '@/lib/user-auth-context'
import SearchModal from '@/components/search-modal'

const categories = [
  { name: 'Jewellery',   href: '/shop/jewelry' },
  { name: 'Earrings',    href: '/shop/earrings' },
  { name: 'Bangles',     href: '/shop/bangles' },
  { name: 'Accessories', href: '/shop/accessories' },
]

// ── Glide pill that slides between nav links ────────────────────────────────
function GlideNav({ isLight }: { isLight: boolean }) {
  const navRef   = useRef<HTMLElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 })

  const onEnter = useCallback((i: number) => {
    const link = linkRefs.current[i]
    const nav  = navRef.current
    if (!link || !nav) return
    const lr = link.getBoundingClientRect()
    const nr = nav.getBoundingClientRect()
    setPill({ left: lr.left - nr.left, width: lr.width, opacity: 1 })
  }, [])

  const onLeave = useCallback(() => setPill(p => ({ ...p, opacity: 0 })), [])

  return (
    <nav
      ref={navRef}
      className="hidden lg:flex items-center gap-1 relative"
      onMouseLeave={onLeave}
    >
      {/* Gliding pill */}
      <span
        aria-hidden="true"
        style={{
          position:   'absolute',
          top:         0,
          bottom:      0,
          left:        pill.left,
          width:       pill.width,
          opacity:     pill.opacity,
          transition:  'left 220ms cubic-bezier(0.4,0,0.2,1), width 220ms cubic-bezier(0.4,0,0.2,1), opacity 150ms ease',
          pointerEvents: 'none',
          borderRadius: '9999px',
          background: isLight
            ? 'rgba(251,113,133,0.12)'
            : 'rgba(255,255,255,0.07)',
          boxShadow: isLight
            ? 'inset 0 0 0 1px rgba(251,113,133,0.25)'
            : 'inset 0 0 0 1px rgba(255,255,255,0.08)',
        }}
      />

      {categories.map((cat, i) => (
        <Link
          key={cat.name}
          href={cat.href}
          ref={el => { linkRefs.current[i] = el }}
          onMouseEnter={() => onEnter(i)}
          className={`relative px-4 py-1.5 text-sm font-medium tracking-wide transition-colors duration-200 rounded-full ${
            isLight
              ? 'text-rose-700/70 hover:text-rose-700'
              : 'text-stone-400 hover:text-stone-100'
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  )
}

export default function DivineHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mounted, setMounted]       = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const { theme, setTheme }         = useTheme()
  const { itemCount }               = useCart()
  const { isLoggedIn, user, logout } = useUserAuth()

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isLight = mounted ? theme === 'light' : true

  return (
    <header
      className={`
        group/header
        w-full sticky top-0 z-50
        transition-all duration-300 ease-in-out
        ${scrolled
          ? 'bg-[#fdf0f2]/95 dark:bg-[#0d0f1a]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(225,100,120,0.10)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] border-b border-rose-200/70 dark:border-white/[0.06]'
          : 'bg-[#fdf0f2] dark:bg-[#0d0f1a]/95 border-b border-rose-200/60 dark:border-white/[0.05]'
        }
      `}
    >
      {/* ── Slim always-visible bar ── */}
      <div className="px-4 md:px-8 py-2.5 flex items-center justify-between max-w-7xl mx-auto">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group/logo shrink-0">
          <ThemeLogo size={40} />
          <div className="flex flex-col leading-none">
            <span className="font-serif text-sm md:text-base font-bold text-rose-900 dark:text-stone-100 tracking-wide group-hover/logo:text-rose-600 dark:group-hover/logo:text-amber-400 transition duration-300 whitespace-nowrap">
              Divine Couture
            </span>
            <span className="text-[9px] tracking-[0.22em] text-rose-400 dark:text-stone-500 uppercase hidden md:block font-medium">
              Indian Jewellery · UK
            </span>
          </div>
        </Link>

        {/* Action icons — always visible */}
        <div className="flex items-center gap-0 md:gap-1">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2.5 hover:bg-rose-200/50 dark:hover:bg-white/[0.06] rounded-full transition"
            aria-label="Search"
          >
            <Search className="w-[18px] h-[18px] text-rose-500 dark:text-stone-400" />
          </button>

          {mounted && isLoggedIn ? (
            <div className="hidden lg:flex items-center gap-1">
              <Link
                href="/profile"
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-rose-200/50 dark:hover:bg-white/[0.06] rounded-full transition"
              >
                <div className="w-6 h-6 rounded-full bg-rose-400 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">{user?.name.charAt(0)}</span>
                </div>
                <span className="text-xs font-medium text-rose-800 dark:text-stone-300 max-w-[80px] truncate">
                  {user?.name.split(' ')[0]}
                </span>
              </Link>
              <button
                onClick={logout}
                className="p-2.5 hover:bg-rose-200/50 dark:hover:bg-white/[0.06] rounded-full transition"
                aria-label="Sign out"
              >
                <LogOut className="w-[16px] h-[16px] text-rose-400 dark:text-stone-400" />
              </button>
            </div>
          ) : (
            <Link
              href="/profile"
              className="p-2.5 hover:bg-rose-200/50 dark:hover:bg-white/[0.06] rounded-full transition"
              aria-label="Account"
            >
              <User className="w-[18px] h-[18px] text-rose-500 dark:text-stone-400" />
            </Link>
          )}

          <Link
            href="/cart"
            className="p-2.5 hover:bg-rose-200/50 dark:hover:bg-white/[0.06] rounded-full relative transition"
            aria-label="Cart"
          >
            <ShoppingBag className="w-[18px] h-[18px] text-rose-500 dark:text-stone-400" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-400 dark:bg-amber-500 text-white dark:text-stone-900 text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-sm">
                {itemCount}
              </span>
            )}
          </Link>

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 hover:bg-rose-200/50 dark:hover:bg-white/[0.06] rounded-full transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark'
                ? <Sun  className="w-[18px] h-[18px] text-amber-400" />
                : <Moon className="w-[18px] h-[18px] text-rose-400" />
              }
            </button>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2.5 hover:bg-rose-200/50 dark:hover:bg-white/[0.06] rounded-full transition"
            aria-label="Menu"
          >
            {isMenuOpen
              ? <X    className="w-[18px] h-[18px] text-rose-700 dark:text-stone-300" />
              : <Menu className="w-[18px] h-[18px] text-rose-700 dark:text-stone-300" />
            }
          </button>
        </div>
      </div>

      {/* ── Expandable nav row with glide pill ── */}
      <div className="
        hidden lg:block
        overflow-hidden
        max-h-0 group-hover/header:max-h-16
        opacity-0 group-hover/header:opacity-100
        transition-all duration-300 ease-in-out
        border-t border-rose-100/40 dark:border-white/[0.04]
        group-hover/header:border-rose-200/60 dark:group-hover/header:border-white/[0.06]
      ">
        <div className="px-4 md:px-8 py-2.5 flex items-center justify-between max-w-7xl mx-auto">
          <GlideNav isLight={isLight} />
          <p className="text-[10px] tracking-[0.18em] text-rose-400/70 dark:text-white/25 uppercase hidden xl:block">
            ✦ &nbsp;Free UK delivery on orders over £75
          </p>
        </div>
      </div>

      {/* ── Mobile nav overlay ── */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-[#fdf0f2]/98 dark:bg-[#0d0f1a]/97 backdrop-blur-xl" />

        <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-rose-200/60 dark:border-white/[0.05]">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsMenuOpen(false)}>
            <ThemeLogo size={40} />
            <span className="font-serif text-sm font-bold text-rose-900 dark:text-stone-100">Divine Couture</span>
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-full bg-rose-200/60 dark:bg-white/[0.06] text-rose-600 dark:text-stone-300"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="relative z-10 px-6 pt-8 pb-6">
          <p className="text-[10px] uppercase tracking-[0.25em] text-rose-300 dark:text-white/20 mb-5">Shop</p>
          <div className="space-y-1">
            {categories.map((cat, i) => (
              <Link
                key={cat.name}
                href={cat.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between py-4 border-b border-rose-200/50 dark:border-white/[0.04] group/item"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="font-serif text-2xl text-rose-900 dark:text-stone-100 group-hover/item:text-rose-500 dark:group-hover/item:text-amber-400 transition duration-200">
                  {cat.name}
                </span>
                <span className="text-rose-300 dark:text-stone-600 text-lg group-hover/item:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            {mounted && isLoggedIn ? (
              <div className="space-y-3">
                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 p-3 bg-rose-100/80 dark:bg-white/[0.03] rounded-xl border border-rose-200/60 dark:border-white/[0.05]"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-white">{user?.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-rose-900 dark:text-stone-200">{user?.name}</p>
                    <p className="text-[11px] text-rose-400 dark:text-stone-500">View profile →</p>
                  </div>
                </Link>
                <button
                  onClick={() => { logout(); setIsMenuOpen(false) }}
                  className="w-full flex items-center gap-2 py-2.5 text-sm text-rose-400 hover:text-rose-600 transition"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}
                  className="flex-1 text-center py-3 text-xs tracking-widest uppercase border border-rose-300 dark:border-white/10 text-rose-700 dark:text-stone-300 hover:bg-rose-100 transition rounded-sm font-medium">
                  Sign In
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}
                  className="flex-1 text-center py-3 text-xs tracking-widest uppercase bg-rose-400 text-white hover:bg-rose-500 transition rounded-sm font-bold">
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="mt-10 pt-6 border-t border-rose-200/40 dark:border-white/[0.04] flex items-center justify-center gap-5">
            {['Handcrafted', 'UK Delivery', 'Bridal Specialists'].map((b, i) => (
              <div key={b} className="flex items-center gap-2">
                {i > 0 && <div className="w-px h-3 bg-rose-300/60 dark:bg-white/10" />}
                <span className="text-[10px] text-rose-400 dark:text-stone-500 tracking-wider">{b}</span>
              </div>
            ))}
          </div>
        </nav>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
