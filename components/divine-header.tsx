'use client'

import ThemeLogo from '@/components/logo'
import Link from 'next/link'
import { Search, ShoppingBag, Menu, X, User, Sun, Moon, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useCart } from '@/lib/cart-context'
import { useUserAuth } from '@/lib/user-auth-context'

export default function DivineHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
          ? 'glass shadow-[0_4px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] border-b border-stone-200/60 dark:border-white/[0.06]'
          : 'bg-[#faf8f5]/95 dark:bg-[#0d0f1a]/95 border-b border-stone-200/80 dark:border-white/[0.05]'
      }`}
    >
      {/* Announcement bar */}
      <div className="bg-stone-900 dark:bg-[#080a12] py-2 px-4 text-center text-[11px] tracking-[0.2em] text-white/65 uppercase">
        ✦ &nbsp;Free UK delivery on orders over £75&nbsp; · &nbsp;shop.divinecouture&nbsp; ✦
      </div>

      {/* Main row */}
      <div className="px-4 md:px-8 py-3.5 flex items-center justify-between max-w-7xl mx-auto">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <ThemeLogo size={38} />
          <div className="flex flex-col leading-none">
            <span className="font-serif text-base md:text-lg font-bold text-stone-900 dark:text-stone-100 tracking-wide group-hover:text-amber-700 dark:group-hover:text-amber-400 transition duration-300">
              Divine Couture
            </span>
            <span className="text-[9px] tracking-[0.22em] text-stone-400 dark:text-stone-500 uppercase hidden md:block">
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
              className="relative text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-amber-400 transition duration-200 tracking-wide group"
            >
              {cat.name}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-0.5 md:gap-1">
          <button
            className="p-2.5 hover:bg-stone-100 dark:hover:bg-white/[0.06] rounded-full transition duration-200"
            aria-label="Search"
          >
            <Search className="w-[18px] h-[18px] text-stone-600 dark:text-stone-400" />
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
              className="p-2.5 hover:bg-stone-100 dark:hover:bg-white/[0.06] rounded-full transition duration-200"
              aria-label="Account"
            >
              <User className="w-[18px] h-[18px] text-stone-600 dark:text-stone-400" />
            </Link>
          )}

          <Link
            href="/cart"
            className="p-2.5 hover:bg-stone-100 dark:hover:bg-white/[0.06] rounded-full transition duration-200 relative"
            aria-label="Cart"
          >
            <ShoppingBag className="w-[18px] h-[18px] text-stone-600 dark:text-stone-400" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-amber-500 text-stone-900 text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-sm">
                {itemCount}
              </span>
            )}
          </Link>

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 hover:bg-stone-100 dark:hover:bg-white/[0.06] rounded-full transition duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark'
                ? <Sun  className="w-[18px] h-[18px] text-amber-400" />
                : <Moon className="w-[18px] h-[18px] text-stone-500" />
              }
            </button>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2.5 hover:bg-stone-100 dark:hover:bg-white/[0.06] rounded-full transition duration-200"
            aria-label="Menu"
          >
            {isMenuOpen
              ? <X    className="w-[18px] h-[18px] text-stone-700 dark:text-stone-300" />
              : <Menu className="w-[18px] h-[18px] text-stone-700 dark:text-stone-300" />
            }
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="border-t border-stone-100 dark:border-white/[0.05] bg-[#faf8f5]/98 dark:bg-[#0d0f1a]/98 backdrop-blur-xl px-5 py-4 space-y-0.5">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="flex items-center justify-between text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-400 py-3.5 border-b border-stone-100/80 dark:border-white/[0.04] transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {cat.name}
              <span className="text-stone-300 dark:text-stone-600 text-xs">→</span>
            </Link>
          ))}

          {/* Mobile auth section */}
          {mounted && isLoggedIn ? (
            <div className="pt-4 pb-1 space-y-2">
              <Link
                href="/profile"
                className="flex items-center gap-3 py-2.5 text-sm text-stone-700 dark:text-stone-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-bold text-stone-900">{user?.name.charAt(0)}</span>
                </div>
                <span className="font-medium">{user?.name}</span>
              </Link>
              <button
                onClick={() => { logout(); setIsMenuOpen(false) }}
                className="w-full text-left py-2.5 text-sm text-stone-400 dark:text-stone-500 flex items-center gap-2 hover:text-stone-700 dark:hover:text-stone-300 transition"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-4 pb-1 flex gap-3">
              <Link
                href="/login"
                className="flex-1 text-center py-2.5 text-xs tracking-widest uppercase border border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/[0.05] transition rounded-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="flex-1 text-center py-2.5 text-xs tracking-widest uppercase bg-amber-500 text-stone-900 hover:bg-amber-400 transition rounded-sm font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
