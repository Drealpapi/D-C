'use client'

import ThemeLogo from '@/components/logo'
import Link from 'next/link'
import {
  LayoutDashboard, Package, Users, LogOut, ExternalLink,
  ChevronRight, ShoppingBag, BarChart2, Settings,
} from 'lucide-react'
import { useAdmin } from '@/lib/admin-context'
import type { AdminView } from './sanctum-shell'

const NAV_GROUPS = [
  {
    label: 'Main',
    items: [
      { id: 'dashboard' as AdminView, label: 'Dashboard', icon: LayoutDashboard, desc: 'Overview & stats' },
      { id: 'analytics' as AdminView, label: 'Analytics',  icon: BarChart2,       desc: 'Revenue & insights' },
    ],
  },
  {
    label: 'Catalogue',
    items: [
      { id: 'products' as AdminView, label: 'Products', icon: Package,     desc: 'Manage catalogue' },
      { id: 'orders'   as AdminView, label: 'Orders',   icon: ShoppingBag, desc: 'Fulfilment & status' },
    ],
  },
  {
    label: 'People',
    items: [
      { id: 'users' as AdminView, label: 'Users', icon: Users, desc: 'Customer accounts' },
    ],
  },
]

export default function SanctumSidebar({ view, setView, bgClass = 'bg-[#0a0b0f]', isLight = false }: {
  view: AdminView
  setView: (v: AdminView) => void
  bgClass?: string
  isLight?: boolean
}) {
  const { logout, currentAdmin, orders } = useAdmin()
  const pendingCount = orders.filter((o) => o.status === 'pending').length

  const text    = isLight ? 'text-stone-700'   : 'text-white/50'
  const textHov = isLight ? 'hover:text-stone-900 hover:bg-stone-100' : 'hover:bg-white/[0.05] hover:text-white/90'
  const label   = isLight ? 'text-stone-400'   : 'text-white/20'
  const border  = isLight ? 'border-stone-200' : 'border-white/[0.05]'
  const subtext = isLight ? 'text-stone-400'   : 'text-white/30'
  const brandTx = isLight ? 'text-stone-800'   : 'text-white/90'

  return (
    <aside className={`w-[72px] lg:w-64 shrink-0 ${bgClass} border-r ${border} min-h-screen flex flex-col transition-colors duration-300`}>

      {/* Brand */}
      <div className={`px-4 py-5 border-b ${border}`}>
        <div className="flex items-center gap-3">
          <ThemeLogo size={30} forceDark={!isLight} />
          <div className="hidden lg:block">
            <p className={`font-serif text-sm ${brandTx} tracking-wide leading-none`}>Divine Couture</p>
            <p className={`text-[10px] tracking-[0.18em] ${subtext} uppercase mt-0.5`}>Sanctum Admin</p>
          </div>
        </div>
      </div>

      {/* Admin badge */}
      {currentAdmin && (
        <div className={`hidden lg:block px-4 py-3 border-b ${border}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-stone-900">{currentAdmin.name.charAt(0)}</span>
            </div>
            <div className="min-w-0">
              <p className={`text-xs font-medium ${brandTx} truncate`}>{currentAdmin.name}</p>
              <p className={`text-[10px] ${subtext} truncate`}>{currentAdmin.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav groups */}
      <nav className="flex-1 px-2 py-4 space-y-5 overflow-y-auto">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className={`hidden lg:block text-[10px] uppercase tracking-[0.2em] ${label} px-3 mb-2`}>
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map(({ id, label: itemLabel, icon: Icon, desc }) => {
                const active = view === id
                const badge  = id === 'orders' && pendingCount > 0 ? pendingCount : null
                return (
                  <button
                    key={id}
                    onClick={() => setView(id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group relative ${
                      active
                        ? 'bg-amber-500 text-stone-900'
                        : `${text} ${textHov}`
                    }`}
                  >
                    <div className="relative shrink-0">
                      <Icon className="w-4 h-4" />
                      {badge && (
                        <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center">
                          {badge}
                        </span>
                      )}
                    </div>
                    <div className="hidden lg:block text-left flex-1 min-w-0">
                      <p className={`text-sm font-medium leading-none ${active ? 'text-stone-900' : ''}`}>{itemLabel}</p>
                      <p className={`text-[10px] mt-0.5 ${active ? 'text-stone-700' : subtext}`}>{desc}</p>
                    </div>
                    {active && <ChevronRight className="w-3.5 h-3.5 hidden lg:block shrink-0 text-stone-700" />}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className={`px-2 py-4 border-t ${border} space-y-0.5`}>
        <button
          onClick={() => setView('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
            view === 'settings'
              ? 'bg-amber-500 text-stone-900'
              : `${text} ${textHov}`
          }`}
        >
          <Settings className="w-4 h-4 shrink-0" />
          <span className="hidden lg:block">Settings</span>
        </button>
        <Link
          href="/"
          target="_blank"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${text} ${textHov} transition`}
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          <span className="hidden lg:block">View Storefront</span>
        </Link>
        <button
          onClick={logout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
            isLight
              ? 'text-stone-400 hover:bg-red-50 hover:text-red-500'
              : 'text-white/40 hover:bg-red-500/10 hover:text-red-400'
          }`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="hidden lg:block">Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
