'use client'

import { useState } from 'react'
import { useAdmin } from '@/lib/admin-context'
import SanctumLogin from './sanctum-login'
import SanctumSidebar from './sanctum-sidebar'
import SanctumDashboard from './sanctum-dashboard'
import SanctumProducts from './sanctum-products'
import SanctumUsers from './sanctum-users'
import SanctumOrders from './sanctum-orders'
import SanctumAnalytics from './sanctum-analytics'
import SanctumSettings from './sanctum-settings'
import { LayoutDashboard, Package, Users, ShoppingBag, BarChart2, Settings, Moon, Sun, SunMedium } from 'lucide-react'

export type AdminView = 'dashboard' | 'products' | 'users' | 'orders' | 'analytics' | 'settings'

const MOBILE_NAV = [
  { id: 'dashboard' as AdminView, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products'  as AdminView, label: 'Products',  icon: Package },
  { id: 'orders'    as AdminView, label: 'Orders',    icon: ShoppingBag },
  { id: 'users'     as AdminView, label: 'Users',     icon: Users },
  { id: 'analytics' as AdminView, label: 'Analytics', icon: BarChart2 },
]

const VIEW_LABELS: Record<AdminView, string> = {
  dashboard: 'Dashboard',
  products:  'Products',
  users:     'Users',
  orders:    'Orders',
  analytics: 'Analytics',
  settings:  'Settings',
}

// Admin uses its own independent theme state — doesn't affect the storefront
type AdminTheme = 'dark' | 'dim' | 'light'
function useAdminTheme() {
  const [theme, setTheme] = useState<AdminTheme>('light')
  const cycle = () => setTheme((t) => t === 'dark' ? 'dim' : t === 'dim' ? 'light' : 'dark')
  return { theme, cycle }
}

// Token maps per theme
const THEME_TOKENS: Record<AdminTheme, {
  bg: string; bgSide: string; topBar: string; mobileNav: string
  border: string; text: string; subtext: string; cardBg: string
}> = {
  dark: {
    bg:        'bg-[#0d0e12]',
    bgSide:    'bg-[#0a0b0f]/80',
    topBar:    'bg-[#0d0e12]/70 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.04)]',
    mobileNav: 'bg-[#0a0b0f]/90 backdrop-blur-xl',
    border:    'border-white/[0.06]',
    text:      'text-white/80',
    subtext:   'text-white/30',
    cardBg:    'bg-white/[0.04] backdrop-blur-sm',
  },
  dim: {
    bg:        'bg-[#161820]',
    bgSide:    'bg-[#12131a]/80',
    topBar:    'bg-[#161820]/70 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.03)]',
    mobileNav: 'bg-[#12131a]/90 backdrop-blur-xl',
    border:    'border-white/[0.06]',
    text:      'text-white/80',
    subtext:   'text-white/30',
    cardBg:    'bg-white/[0.04] backdrop-blur-sm',
  },
  light: {
    bg:        'bg-[#fdf4f5]',
    bgSide:    'bg-[#fef0f2]/80',
    topBar:    'bg-[#fdf4f5]/70 backdrop-blur-xl border-b border-rose-200/60 shadow-[0_1px_0_rgba(225,100,120,0.06)]',
    mobileNav: 'bg-[#fef0f2]/90 backdrop-blur-xl',
    border:    'border-rose-200/60',
    text:      'text-rose-950',
    subtext:   'text-rose-400',
    cardBg:    'bg-white/70 backdrop-blur-sm',
  },
}

export default function SanctumShell() {
  const { isAuthenticated } = useAdmin()
  const [view, setView] = useState<AdminView>('dashboard')
  const { theme, cycle: toggleTheme } = useAdminTheme()
  const tk = THEME_TOKENS[theme]
  const isLight = theme === 'light'

  if (!isAuthenticated) return <SanctumLogin />

  return (
    <div className={`min-h-screen ${tk.bg} flex flex-col md:flex-row transition-colors duration-300`}>
      {/* Sidebar */}
      <div className="hidden md:flex">
        <SanctumSidebar view={view} setView={setView} bgClass={tk.bgSide} isLight={isLight} />
      </div>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-auto pb-20 md:pb-0">
        {/* Top bar */}
        <div className={`sticky top-0 z-30 ${tk.topBar} px-6 py-4 flex items-center justify-between`}>
          <div>
            <p className={`text-[10px] uppercase tracking-[0.2em] mb-0.5 ${isLight ? 'text-rose-400' : 'text-amber-500/70'}`}>Divine Couture</p>
            <h2 className={`text-sm font-semibold ${tk.text}`}>{VIEW_LABELS[view]}</h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Live indicator */}
            <div className="flex items-center gap-2 mr-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className={`text-xs ${tk.subtext} hidden sm:block`}>Live</span>
            </div>

            {/* Theme toggle — cycles dark → dim → light */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Dim' : theme === 'dim' ? 'Switch to Light' : 'Switch to Dark'}
              className={`p-1.5 rounded-lg transition ${
                isLight
                  ? 'text-rose-300 hover:text-rose-600 hover:bg-rose-100/60'
                  : 'text-white/30 hover:text-white/70 hover:bg-white/[0.06]'
              }`}
            >
              {theme === 'dark'  && <Moon       className="w-4 h-4" />}
              {theme === 'dim'   && <SunMedium  className="w-4 h-4" />}
              {theme === 'light' && <Sun        className="w-4 h-4 text-rose-400" />}
            </button>

            {/* Settings shortcut */}
            <button
              onClick={() => setView('settings')}
              className={`p-1.5 rounded-lg transition ${
                view === 'settings'
                  ? isLight ? 'text-rose-600 bg-rose-100' : 'text-amber-500 bg-amber-500/10'
                  : isLight
                    ? 'text-rose-300 hover:text-rose-600 hover:bg-rose-100/60'
                    : 'text-white/25 hover:text-white/60 hover:bg-white/[0.05]'
              }`}
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-5 md:p-8 lg:p-10">
          {view === 'dashboard' && <SanctumDashboard setView={setView} isLight={isLight} />}
          {view === 'products'  && <SanctumProducts  isLight={isLight} />}
          {view === 'users'     && <SanctumUsers      isLight={isLight} />}
          {view === 'orders'    && <SanctumOrders     isLight={isLight} />}
          {view === 'analytics' && <SanctumAnalytics  isLight={isLight} />}
          {view === 'settings'  && <SanctumSettings   isLight={isLight} />}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-50 ${tk.mobileNav} border-t ${tk.border} flex transition-colors duration-300`}>
        {MOBILE_NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-all duration-200 ${
              view === id
                ? isLight ? 'text-rose-500' : 'text-amber-500'
                : isLight ? 'text-rose-300 hover:text-rose-600' : 'text-white/30 hover:text-white/60'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] tracking-wide">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
