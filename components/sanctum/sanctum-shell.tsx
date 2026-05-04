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
import { LayoutDashboard, Package, Users, ShoppingBag, BarChart2, Settings, Moon, Sun } from 'lucide-react'

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
function useAdminTheme() {
  const [isDim, setIsDim] = useState(false)
  return { isDim, toggle: () => setIsDim((p) => !p) }
}

export default function SanctumShell() {
  const { isAuthenticated } = useAdmin()
  const [view, setView] = useState<AdminView>('dashboard')
  const { isDim, toggle: toggleTheme } = useAdminTheme()

  if (!isAuthenticated) return <SanctumLogin />

  // Dark = deep black (#0d0e12), Dim = slightly lighter slate
  const bg      = isDim ? 'bg-[#161820]' : 'bg-[#0d0e12]'
  const bgSide  = isDim ? 'bg-[#12131a]' : 'bg-[#0a0b0f]'
  const topBar  = isDim ? 'bg-[#161820]/90' : 'bg-[#0d0e12]/90'
  const mobileNav = isDim ? 'bg-[#12131a]' : 'bg-[#0a0b0f]'

  return (
    <div className={`min-h-screen ${bg} flex flex-col md:flex-row transition-colors duration-300`}>
      {/* Sidebar */}
      <div className="hidden md:flex">
        <SanctumSidebar view={view} setView={setView} bgClass={bgSide} />
      </div>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-auto pb-20 md:pb-0">
        {/* Top bar */}
        <div className={`sticky top-0 z-30 ${topBar} backdrop-blur border-b border-white/[0.05] px-6 py-4 flex items-center justify-between`}>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500/70 mb-0.5">Divine Couture</p>
            <h2 className="text-sm font-semibold text-white/80">{VIEW_LABELS[view]}</h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Live indicator */}
            <div className="flex items-center gap-2 mr-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white/30 hidden sm:block">Live</span>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={isDim ? 'Switch to Dark' : 'Switch to Dim'}
              className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition"
            >
              {isDim
                ? <Moon className="w-4 h-4" />
                : <Sun className="w-4 h-4" />
              }
            </button>

            {/* Settings shortcut */}
            <button
              onClick={() => setView('settings')}
              className={`p-1.5 rounded-lg transition ${
                view === 'settings'
                  ? 'text-amber-400 bg-amber-500/10'
                  : 'text-white/25 hover:text-white/60 hover:bg-white/[0.05]'
              }`}
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-5 md:p-8 lg:p-10">
          {view === 'dashboard' && <SanctumDashboard setView={setView} />}
          {view === 'products'  && <SanctumProducts />}
          {view === 'users'     && <SanctumUsers />}
          {view === 'orders'    && <SanctumOrders />}
          {view === 'analytics' && <SanctumAnalytics />}
          {view === 'settings'  && <SanctumSettings />}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-50 ${mobileNav} border-t border-white/[0.06] flex transition-colors duration-300`}>
        {MOBILE_NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-all duration-200 ${
              view === id ? 'text-amber-400' : 'text-white/30 hover:text-white/60'
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
