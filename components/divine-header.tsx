'use client'

import ThemeLogo from '@/components/logo'
import Link from 'next/link'
import { Search, ShoppingBag, Menu, X, User, Sun, Moon, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useCart } from '@/lib/cart-context'
import { useUserAuth } from '@/lib/user-auth-context'
import SearchModal from '@/components/search-modal'

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

  const categories = [
    { name: 'Earrings',    href: '/shop/earrings' },
    { name: 'Bangles',     href: '/shop/bangles' },
    { name: 'Accessories', href: '/shop/accessories' },
    { name: 'Collections', href: '/shop/collections' },
  ]

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-[0_4px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] border-b border-rose-100/80 dark:border-white/[0.06]'
          : 'bg-[#fdf8f8]/95 dark:bg-[#0d0f1a]/95 border-b border-rose-100 dark:border-white/[0.05]'
      }`}
    >
      {/* Announcement bar */}
      <div className="bg-stone-900 dark:bg-[#080a12] py-1.5 px-4 text-center text-[10px] md:text-[11px] tracking-[0.15em] md:tracking-[0.2em] text-white/65 uppercase truncate">
        ✦ &nbsp;Free UK delivery on orders over £75&nbsp; · &nbsp;shop.divinecouture&nbsp; ✦
      </div>

      {/* Main row */}
      <div className="px-4 md:px-8 py-3.5 flex items-center justify-between max-w-7xl mx-auto">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <ThemeLogo size={32} />
          <div className="flex flex-col leading-none">
            <span className="font-serif text-sm md:text-lg font-bold text-stone-900 dark:text-stone-100 tracking-wide group-hover:text-rose-700 dark:group-hover:text-amber-400 transition duration-300 whitespace-nowrap">
              Divine Couture
            </span>
            <span className="text-[9px] tracking-[0.22em] text-rose-400 dark:text-stone-500 uppercase hidden md:block font-medium">
              Indian Jewellery · UK
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="relative text-sm font-medium text-stone-500 dark:text-stone-400 tracking-wide
                         transition-all duration-300 ease-in
                         hover:text-rose-600 dark:hover:text-amber-300
                         hover:translate-y-[3px]
                         hover:drop-shadow-[0_6px_10px_rgba(225,100,120,0.45)]
                         dark:hover:drop-shadow-[0_6px_10px_rgba(251,191,36,0.4)]"
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-0 md:gap-1">
          <button
            onClick={() => setSearchOpen(true)}
            className="icon-btn p-2.5 hover:bg-rose-50 dark:hover:bg-white/[0.06] rounded-full"
            aria-label="Search"
          >
            <Search className="w-[18px] h-[18px] text-stone-500 dark:text-stone-400 transition-colors duration-200 hover:text-rose-500 dark:hover:text-amber-400" />
          </button>

          {/* Account — shows name if logged in */}
          {mounted && isLoggedIn ? (
            <div className="hidden lg:flex items-center gap-1">
              <Link
                href="/profile"
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-stone-100 dark:hover:bg-white/[0.06] rounded-full transition duration-200"
              >
                <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-stone-900">{user?.name.charAt(0)}</span>
                </div>
                <span className="text-xs font-medium text-stone-700 dark:text-stone-300 max-w-[80px] truncate">
                  {user?.name.split(' ')[0]}
                </span>
              </Link>
              <button
                onClick={logout}
                className="p-2.5 hover:bg-stone-100 dark:hover:bg-white/[0.06] rounded-full transition duration-200"
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut className="w-[16px] h-[16px] text-stone-500 dark:text-stone-400" />
              </button>
            </div>
          ) : (
            <Link
              href="/profile"
              className="p-2.5 hover:bg-rose-50 dark:hover:bg-white/[0.06] rounded-full transition duration-200"
              aria-label="Account"
            >
              <User className="w-[18px] h-[18px] text-stone-500 dark:text-stone-400" />
            </Link>
          )}

          <Link
            href="/cart"
            className="icon-btn p-2.5 hover:bg-rose-50 dark:hover:bg-white/[0.06] rounded-full relative"
            aria-label="Cart"
          >
            <ShoppingBag className="w-[18px] h-[18px] text-stone-500 dark:text-stone-400" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-400 dark:bg-amber-500 text-white dark:text-stone-900 text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-sm">
                {itemCount}
              </span>
            )}
          </Link>

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="icon-btn p-2.5 hover:bg-rose-50 dark:hover:bg-white/[0.06] rounded-full"
              aria-label="Toggle theme"
            >
              {theme === 'dark'
                ? <Sun  className="w-[18px] h-[18px] text-amber-400 transition-transform duration-500 hover:rotate-45" />
                : <Moon className="w-[18px] h-[18px] text-rose-300 transition-transform duration-500 hover:-rotate-12" />
              }
            </button>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="icon-btn lg:hidden p-2.5 hover:bg-rose-50 dark:hover:bg-white/[0.06] rounded-full"
            aria-label="Menu"
          >
            {isMenuOpen
              ? <X    className="w-[18px] h-[18px] text-stone-700 dark:text-stone-300" />
              : <Menu className="w-[18px] h-[18px] text-stone-700 dark:text-stone-300" />
            }
          </button>
        </div>
      </div>

      {/* Mobile nav — full screen overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Blush backdrop */}
        <div className="absolute inset-0 bg-[#fdf6f7]/97 dark:bg-[#0d0f1a]/97 backdrop-blur-xl" />

        {/* Top bar inside overlay */}
        <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-rose-100/60 dark:border-white/[0.05]">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
            <ThemeLogo size={28} />
            <span className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100">Divine Couture</span>
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-full bg-rose-100/60 dark:bg-white/[0.06] text-stone-600 dark:text-stone-300"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="relative z-10 px-6 pt-8 pb-6">
          <p className="text-[10px] uppercase tracking-[0.25em] text-rose-300 dark:text-white/20 mb-5">Shop</p>
          <div className="space-y-1">
            {categories.map((cat, i) => (
              <Link
                key={cat.name}
                href={cat.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between py-4 border-b border-rose-100/50 dark:border-white/[0.04] group"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="font-serif text-2xl text-stone-800 dark:text-stone-100 group-hover:text-rose-500 dark:group-hover:text-amber-400 transition duration-200">
                  {cat.name}
                </span>
                <span className="text-rose-300 dark:text-stone-600 text-lg group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            ))}
          </div>

          {/* Auth section */}
          <div className="mt-8">
            {mounted && isLoggedIn ? (
              <div className="space-y-3">
                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 p-3 bg-rose-50/80 dark:bg-white/[0.03] rounded-xl border border-rose-100/60 dark:border-white/[0.05]"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 dark:from-amber-400 dark:to-amber-600 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-white">{user?.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">{user?.name}</p>
                    <p className="text-[11px] text-rose-400 dark:text-stone-500">View profile →</p>
                  </div>
                </Link>
                <button
                  onClick={() => { logout(); setIsMenuOpen(false) }}
                  className="w-full flex items-center gap-2 py-2.5 text-sm text-stone-400 dark:text-stone-500 hover:text-rose-500 dark:hover:text-stone-300 transition"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 text-center py-3 text-xs tracking-widest uppercase border border-rose-200 dark:border-white/10 text-stone-700 dark:text-stone-300 hover:bg-rose-50 dark:hover:bg-white/[0.05] transition rounded-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 text-center py-3 text-xs tracking-widest uppercase bg-rose-400 text-white hover:bg-rose-500 dark:bg-amber-500 dark:text-stone-900 dark:hover:bg-amber-400 transition rounded-sm font-bold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Bottom trust line */}
          <div className="mt-10 pt-6 border-t border-rose-100/40 dark:border-white/[0.04] flex items-center justify-center gap-5">
            {['Handcrafted', 'UK Delivery', 'Bridal Specialists'].map((b, i) => (
              <div key={b} className="flex items-center gap-2">
                {i > 0 && <div className="w-px h-3 bg-rose-200/60 dark:bg-white/10" />}
                <span className="text-[10px] text-rose-300 dark:text-stone-500 tracking-wider">{b}</span>
              </div>
            ))}
          </div>
        </nav>
      </div>
      {/* Search modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
