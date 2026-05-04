'use client'

import { Package, Users, ShoppingBag, TrendingUp, ArrowUpRight, Activity, Clock } from 'lucide-react'
import { useAdmin } from '@/lib/admin-context'
import type { AdminView } from './sanctum-shell'
import type React from 'react'

const STATUS_COLORS: Record<string, string> = {
  pending:    'bg-amber-500/10 text-amber-400',
  processing: 'bg-sky-500/10 text-sky-400',
  shipped:    'bg-violet-500/10 text-violet-400',
  delivered:  'bg-emerald-500/10 text-emerald-400',
  cancelled:  'bg-rose-500/10 text-rose-400',
}

export default function SanctumDashboard({ setView }: { setView: (v: AdminView) => void }) {
  const { products, users, orders } = useAdmin()

  const activeUsers    = users.filter((u) => u.status === 'active').length
  const suspendedUsers = users.filter((u) => u.status === 'suspended').length
  const pendingOrders  = orders.filter((o) => o.status === 'pending').length
  const revenue        = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((s, o) => s + o.total, 0)

  const stats: {
    label: string; value: string | number; icon: React.ElementType
    change: string; positive: boolean
    action: (() => void) | null; color: string; bg: string
  }[] = [
    {
      label: 'Total Products', value: products.length, icon: Package,
      change: '+3 this week', positive: true,
      action: () => setView('products'), color: 'text-amber-400', bg: 'bg-amber-500/10',
    },
    {
      label: 'Active Users', value: activeUsers, icon: Users,
      change: `${suspendedUsers} suspended`, positive: suspendedUsers === 0,
      action: () => setView('users'), color: 'text-emerald-400', bg: 'bg-emerald-500/10',
    },
    {
      label: 'Total Orders', value: orders.length, icon: ShoppingBag,
      change: `${pendingOrders} pending`, positive: pendingOrders === 0,
      action: () => setView('orders'), color: 'text-sky-400', bg: 'bg-sky-500/10',
    },
    {
      label: 'Revenue', value: `£${revenue.toLocaleString()}`, icon: TrendingUp,
      change: 'Delivered orders', positive: true,
      action: () => setView('analytics'), color: 'text-violet-400', bg: 'bg-violet-500/10',
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Header */}
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-amber-500/70 mb-1">Welcome back</p>
        <h1 className="font-serif text-2xl md:text-3xl text-white/90">Dashboard</h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, change, positive, action, color, bg }) => (
          <div
            key={label}
            onClick={action ?? undefined}
            className={`relative bg-[#13141a] border border-white/[0.06] rounded-xl p-5 overflow-hidden transition-all duration-200 ${
              action ? 'cursor-pointer hover:border-white/[0.12] hover:bg-[#16171e]' : ''
            }`}
          >
            {/* Glow */}
            <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20 ${bg}`} />

            <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${bg} mb-4`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-white/90 mb-1">{value}</p>
            <p className="text-xs text-white/40 mb-2">{label}</p>
            <div className="flex items-center gap-1">
              <Activity className={`w-3 h-3 ${positive ? 'text-emerald-400' : 'text-rose-400'}`} />
              <span className={`text-[10px] ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>{change}</span>
            </div>
            {action && (
              <ArrowUpRight className="absolute top-4 right-4 w-3.5 h-3.5 text-white/20" />
            )}
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Add Product',   action: () => setView('products'),  color: 'text-amber-400',  bg: 'hover:bg-amber-500/10' },
          { label: 'View Orders',   action: () => setView('orders'),    color: 'text-sky-400',    bg: 'hover:bg-sky-500/10' },
          { label: 'Analytics',     action: () => setView('analytics'), color: 'text-violet-400', bg: 'hover:bg-violet-500/10' },
          { label: 'Settings',      action: () => setView('settings'),  color: 'text-white/50',   bg: 'hover:bg-white/[0.05]' },
        ].map(({ label, action, color, bg }) => (
          <button
            key={label}
            onClick={action}
            className={`flex items-center justify-center gap-2 px-4 py-3 bg-[#13141a] border border-white/[0.06] rounded-xl text-xs font-medium transition-all duration-200 ${color} ${bg} hover:border-white/[0.1]`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Two-column lower section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent orders */}
        <div className="bg-[#13141a] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-white/40" />
              <h2 className="text-sm font-semibold text-white/80">Recent Orders</h2>
            </div>
            <button
              onClick={() => setView('orders')}
              className="text-[11px] text-amber-500/70 hover:text-amber-400 transition flex items-center gap-1"
            >
              View all <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {orders.slice(0, 5).map((o) => (
              <div key={o.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-white/[0.02] transition">
                <div className="min-w-0">
                  <p className="text-sm font-mono text-amber-400/70">{o.id}</p>
                  <p className="text-[11px] text-white/40 truncate">{o.customer}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-3">
                  <span className="text-sm font-semibold text-white/70">£{o.total}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_COLORS[o.status] ?? 'text-white/40'}`}>
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent users */}
        <div className="bg-[#13141a] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-white/40" />
              <h2 className="text-sm font-semibold text-white/80">Recent Users</h2>
            </div>
            <button
              onClick={() => setView('users')}
              className="text-[11px] text-amber-500/70 hover:text-amber-400 transition flex items-center gap-1"
            >
              View all <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {users.slice(0, 5).map((u) => (
              <div key={u.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-white/[0.02] transition">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-stone-900">{u.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm text-white/80 font-medium">{u.name}</p>
                    <p className="text-[11px] text-white/30">{u.joined}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-white/30">{u.orders} orders</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    u.status === 'active'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {u.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent products */}
      <div className="bg-[#13141a] border border-white/[0.06] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Package className="w-4 h-4 text-white/40" />
            <h2 className="text-sm font-semibold text-white/80">Recent Products</h2>
          </div>
          <button
            onClick={() => setView('products')}
            className="text-[11px] text-amber-500/70 hover:text-amber-400 transition flex items-center gap-1"
          >
            View all <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {products.slice(0, 5).map((p) => (
            <div key={p.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-white/[0.02] transition">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] overflow-hidden shrink-0 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-white/80 font-medium truncate">{p.name}</p>
                  <p className="text-[11px] text-white/30 capitalize">{p.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                {p.isNew && <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/10 text-amber-400 rounded">New</span>}
                {p.isOnSale && <span className="text-[10px] px-1.5 py-0.5 bg-rose-500/10 text-rose-400 rounded">Sale</span>}
                <span className="text-sm font-semibold text-white/70">£{p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity feed */}
      <div className="bg-[#13141a] border border-white/[0.06] rounded-xl p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <Clock className="w-4 h-4 text-white/40" />
          <h2 className="text-sm font-semibold text-white/80">Recent Activity</h2>
        </div>
        <div className="space-y-3">
          {[
            { text: 'New order ORD-1005 placed by Precious Wealth',  time: '2 min ago',  dot: 'bg-amber-400' },
            { text: 'Order ORD-1002 status updated to Shipped',       time: '1 hr ago',   dot: 'bg-violet-400' },
            { text: 'User Fatima Al-Hassan placed a new order',       time: '3 hrs ago',  dot: 'bg-sky-400' },
            { text: 'Product "Antique Gold Kada" added to catalogue', time: '1 day ago',  dot: 'bg-emerald-400' },
            { text: 'Order ORD-1001 marked as Delivered',             time: '2 days ago', dot: 'bg-emerald-400' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${item.dot}`} />
              <p className="text-xs text-white/50 flex-1">{item.text}</p>
              <span className="text-[10px] text-white/20 shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
