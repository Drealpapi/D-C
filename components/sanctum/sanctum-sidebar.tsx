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

export default function SanctumSidebar({ view, setView, bgClass = 'bg-[#0a0b0f]/80', isLight = false }: {
  view: AdminView
  setView: (v: AdminView) => void
  bgClass?: string
  isLight?: boolean
}) {
  const { logout, currentAdmin, orders } = useAdmin()
  const pendingCount = orders.filter((o) => o.status === 'pending').length

  const text    = isLight ? 'text-rose-800'   : 'text-white/50'
  const textHov = isLight ? 'hover:text-rose-950 hover:bg-rose-100/60' : 'hover:bg-white/[0.06] hover:text-white/90'
  const labelCl = isLight ? 'text-rose-300'   : 'text-white/20'
  const border  = isLight ? 'border-rose-200/60' : 'border-white/[0.06]'
  const subtext = isLight ? 'text-rose-400'   : 'text-white/30'
  const brandTx = isLight ? 'text-rose-950'   : 'text-white/90'

  return (
    <aside
      className={`
        group/sidebar
        w-[68px] hover:w-60
        shrink-0 ${bgClass}
        backdrop-blur-xl
        border-r ${border}
        min-h-screen flex flex-col
        transition-[width] duration-300 ease-in-out
        overflow-hidden
        ${isLight
          ? 'shadow-[4px_0_24px_rgba(225,100,120,0.07)]'
          : 'shadow-[4px_0_24px_rgba(0,0,0,0.3)]'
        }
      `}
    >
      {/* Brand */}
      <div className={`px-3 py-5 border-b ${border} flex items-center gap-3 min-w-0`}>
        <div className="shrink-0">
          <ThemeLogo size={40} forceDark={!isLight} />
        </div>
        <div className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 overflow-hidden whitespace-nowrap">
          <p className={`font-serif text-sm ${brandTx} tracking-wide leading-none`}>Divine Couture</p>
          <p className={`text-[10px] tracking-[0.18em] ${subtext} uppercase mt-0.5`}>Sanctum Admin</p>
        </div>
      </div>

      {/* Admin badge */}
      {currentAdmin && (
        <div className={`px-3 py-3 border-b ${border} flex items-center gap-2.5 min-w-0`}>
          <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${isLight ? 'bg-rose-300 text-white' : 'bg-amber-500 text-stone-900'}`}>
            {currentAdmin.name.charAt(0)}
          </div>
          <div className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 overflow-hidden whitespace-nowrap min-w-0">
            <p className={`text-xs font-medium ${brandTx} truncate`}>{currentAdmin.name}</p>
            <p className={`text-[10px] ${subtext} truncate`}>{currentAdmin.email}</p>
          </div>
        </div>
      )}

      {/* Nav groups */}
      <nav className="flex-1 px-2 py-4 space-y-5 overflow-y-auto overflow-x-hidden">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            {/* Group label — only visible when expanded */}
            <p className={`
              text-[10px] uppercase tracking-[0.2em] ${labelCl} px-3 mb-2
              opacity-0 group-hover/sidebar:opacity-100
              transition-opacity duration-200
              whitespace-nowrap overflow-hidden
            `}>
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
                    title={itemLabel}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                      transition-all duration-200 group/btn relative
                      ${active
                        ? isLight
                          ? 'bg-rose-400/90 backdrop-blur-sm text-white shadow-[0_2px_12px_rgba(225,100,120,0.3)]'
                          : 'bg-amber-500/90 backdrop-blur-sm text-stone-900 shadow-[0_2px_12px_rgba(245,158,11,0.25)]'
                        : `${text} ${textHov}`
                      }
                    `}
                  >
                    <div className="relative shrink-0">
                      <Icon className="w-4 h-4" />
                      {badge && (
                        <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center">
                          {badge}
                        </span>
                      )}
                    </div>
                    {/* Label — slides in on hover */}
                    <div className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 text-left flex-1 min-w-0 overflow-hidden whitespace-nowrap">
                      <p className={`text-sm font-medium leading-none ${active ? (isLight ? 'text-white' : 'text-stone-900') : ''}`}>
                        {itemLabel}
                      </p>
                      <p className={`text-[10px] mt-0.5 ${active ? (isLight ? 'text-rose-100' : 'text-stone-700') : subtext}`}>
                        {desc}
                      </p>
                    </div>
                    {active && (
                      <ChevronRight className={`w-3.5 h-3.5 shrink-0 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 ${isLight ? 'text-rose-100' : 'text-stone-700'}`} />
                    )}
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
          title="Settings"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
            view === 'settings'
              ? isLight
                ? 'bg-rose-400/90 backdrop-blur-sm text-white shadow-[0_2px_12px_rgba(225,100,120,0.3)]'
                : 'bg-amber-500/90 backdrop-blur-sm text-stone-900 shadow-[0_2px_12px_rgba(245,158,11,0.25)]'
              : `${text} ${textHov}`
          }`}
        >
          <Settings className="w-4 h-4 shrink-0" />
          <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 whitespace-nowrap overflow-hidden">
            Settings
          </span>
        </button>

        <Link
          href="/"
          target="_blank"
          title="View Storefront"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${text} ${textHov} transition-all duration-200`}
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 whitespace-nowrap overflow-hidden">
            View Storefront
          </span>
        </Link>

        <button
          onClick={logout}
          title="Sign Out"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
            isLight
              ? 'text-rose-300 hover:bg-rose-100/60 hover:text-rose-600'
              : 'text-white/40 hover:bg-red-500/10 hover:text-red-400'
          }`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 whitespace-nowrap overflow-hidden">
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  )
}
