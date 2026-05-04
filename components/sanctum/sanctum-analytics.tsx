'use client'

import { useMemo } from 'react'
import { TrendingUp, ShoppingBag, Users, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { useAdmin } from '@/lib/admin-context'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Simulated monthly revenue data for the chart
const MONTHLY_REVENUE = [420, 680, 890, 1240, 960, 1380, 1520, 1100, 1750, 2100, 1890, 2340]
const MONTHLY_ORDERS  = [4, 7, 9, 12, 10, 14, 15, 11, 17, 21, 19, 23]

export default function SanctumAnalytics({ isLight = false }: { isLight?: boolean }) {
  const { products, users, orders } = useAdmin()

  const stats = useMemo(() => {
    const delivered  = orders.filter((o) => o.status === 'delivered')
    const revenue    = delivered.reduce((s, o) => s + o.total, 0)
    const avgOrder   = delivered.length ? Math.round(revenue / delivered.length) : 0
    const topCats    = products.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1
      return acc
    }, {})
    const sortedCats = Object.entries(topCats).sort((a, b) => b[1] - a[1])
    return { revenue, avgOrder, sortedCats }
  }, [products, orders])

  const maxRevenue = Math.max(...MONTHLY_REVENUE)

  const card    = isLight ? 'bg-white border-stone-200'    : 'bg-[#13141a] border-white/[0.06]'
  const card2   = isLight ? 'bg-white border-stone-200'    : 'bg-[#13141a] border-white/[0.06]'
  const heading = isLight ? 'text-stone-800'  : 'text-white/90'
  const muted   = isLight ? 'text-stone-400'  : 'text-white/40'
  const subtext = isLight ? 'text-stone-500'  : 'text-white/30'
  const sectionBorder = isLight ? 'border-stone-100' : 'border-white/[0.05]'

  const maxOrders  = Math.max(...MONTHLY_ORDERS)

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Header */}
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-amber-500/70 mb-1">Insights</p>
        <h1 className={`font-serif text-2xl md:text-3xl ${heading}`}>Analytics</h1>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue',     value: `£${stats.revenue.toLocaleString()}`, icon: TrendingUp, color: 'text-amber-500', bg: isLight ? 'bg-amber-100' : 'bg-amber-500/10', change: '+18%', up: true,  sub: 'vs last month' },
          { label: 'Total Orders',      value: orders.length,                        icon: ShoppingBag, color: 'text-sky-500',  bg: isLight ? 'bg-sky-100'   : 'bg-sky-500/10',   change: '+12%', up: true,  sub: 'vs last month' },
          { label: 'Active Customers',  value: users.filter((u) => u.status === 'active').length, icon: Users, color: 'text-emerald-500', bg: isLight ? 'bg-emerald-100' : 'bg-emerald-500/10', change: '+5%', up: true, sub: 'vs last month' },
          { label: 'Avg. Order Value',  value: `£${stats.avgOrder}`,                icon: Package,    color: 'text-violet-500', bg: isLight ? 'bg-violet-100' : 'bg-violet-500/10', change: '-3%', up: false, sub: 'vs last month' },
        ].map(({ label, value, icon: Icon, color, bg, change, up, sub }) => (
          <div key={label} className={`relative border rounded-xl p-5 overflow-hidden ${card}`}>
            <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20 ${bg}`} />
            <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${bg} mb-4`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className={`text-2xl font-bold mb-1 ${heading}`}>{value}</p>
            <p className={`text-xs mb-3 ${muted}`}>{label}</p>
            <div className="flex items-center gap-1.5">
              {up
                ? <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                : <ArrowDownRight className="w-3.5 h-3.5 text-rose-500" />
              }
              <span className={`text-xs font-medium ${up ? 'text-emerald-500' : 'text-rose-500'}`}>{change}</span>
              <span className={`text-xs ${muted}`}>{sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className={`border rounded-2xl p-6 ${card}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className={`text-[10px] uppercase tracking-[0.2em] mb-1 ${muted}`}>Monthly</p>
            <h3 className={`text-sm font-semibold ${heading}`}>Revenue Overview</h3>
          </div>
          <div className={`flex items-center gap-4 text-xs ${muted}`}>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-amber-500/70" />
              Revenue
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-sky-500/70" />
              Orders
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div className="flex items-end gap-1.5 h-40">
          {MONTHS.map((month, i) => (
            <div key={month} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex flex-col items-center gap-0.5">
                <div
                  className="w-full bg-amber-500/60 rounded-t-sm transition-all duration-700 hover:bg-amber-400/80"
                  style={{ height: `${(MONTHLY_REVENUE[i] / maxRevenue) * 120}px` }}
                  title={`£${MONTHLY_REVENUE[i]}`}
                />
              </div>
              <span className={`text-[9px] hidden sm:block ${muted}`}>{month}</span>
            </div>
          ))}
        </div>

        {/* Orders sparkline */}
        <div className={`mt-4 pt-4 border-t ${sectionBorder}`}>
          <p className={`text-[10px] mb-2 uppercase tracking-wider ${muted}`}>Orders per month</p>
          <div className="flex items-end gap-1.5 h-10">
            {MONTHLY_ORDERS.map((val, i) => (
              <div
                key={i}
                className="flex-1 bg-sky-500/50 rounded-sm hover:bg-sky-400/70 transition-all duration-500"
                style={{ height: `${(val / maxOrders) * 40}px` }}
                title={`${val} orders`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Two-column: Category breakdown + Top customers */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* Category breakdown */}
        <div className={`border rounded-2xl p-6 ${card2}`}>
          <p className={`text-[10px] uppercase tracking-[0.2em] mb-1 ${muted}`}>Catalogue</p>
          <h3 className={`text-sm font-semibold mb-5 ${heading}`}>Products by Category</h3>
          <div className="space-y-3">
            {stats.sortedCats.map(([cat, count]) => {
              const pct = Math.round((count / products.length) * 100)
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-xs capitalize ${isLight ? 'text-stone-600' : 'text-white/60'}`}>{cat}</span>
                    <span className={`text-xs ${muted}`}>{count} products · {pct}%</span>
                  </div>
                  <div className={`h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-stone-100' : 'bg-white/[0.05]'}`}>
                    <div
                      className="h-full bg-amber-500/60 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top customers */}
        <div className={`border rounded-2xl p-6 ${card2}`}>
          <p className={`text-[10px] uppercase tracking-[0.2em] mb-1 ${muted}`}>Customers</p>
          <h3 className={`text-sm font-semibold mb-5 ${heading}`}>Top Customers by Orders</h3>
          <div className="space-y-3">
            {[...users]
              .sort((a, b) => b.orders - a.orders)
              .slice(0, 5)
              .map((u, i) => (
                <div key={u.id} className="flex items-center gap-3">
                  <span className={`text-xs w-4 ${muted}`}>{i + 1}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isLight ? 'bg-amber-100' : 'bg-amber-500/20'}`}>
                    <span className={`text-xs font-bold ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>{u.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate ${isLight ? 'text-stone-700' : 'text-white/70'}`}>{u.name}</p>
                    <p className={`text-xs truncate ${muted}`}>{u.email}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${isLight ? 'text-stone-700' : 'text-white/70'}`}>{u.orders}</p>
                    <p className={`text-[10px] ${muted}`}>orders</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Order status breakdown */}
      <div className={`border rounded-2xl p-6 ${card}`}>
        <p className={`text-[10px] uppercase tracking-[0.2em] mb-1 ${muted}`}>Fulfilment</p>
        <h3 className={`text-sm font-semibold mb-5 ${heading}`}>Order Status Breakdown</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {(['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map((status) => {
            const count = orders.filter((o) => o.status === status).length
            const pct   = orders.length ? Math.round((count / orders.length) * 100) : 0
            const colors: Record<string, string> = isLight ? {
              pending:    'text-amber-700 bg-amber-100',
              processing: 'text-sky-700 bg-sky-100',
              shipped:    'text-violet-700 bg-violet-100',
              delivered:  'text-emerald-700 bg-emerald-100',
              cancelled:  'text-rose-700 bg-rose-100',
            } : {
              pending:    'text-amber-400 bg-amber-500/10',
              processing: 'text-sky-400 bg-sky-500/10',
              shipped:    'text-violet-400 bg-violet-500/10',
              delivered:  'text-emerald-400 bg-emerald-500/10',
              cancelled:  'text-rose-400 bg-rose-500/10',
            }
            return (
              <div key={status} className={`rounded-xl p-4 text-center ${colors[status]}`}>
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-[10px] uppercase tracking-wider mt-1 opacity-70 capitalize">{status}</p>
                <p className="text-xs opacity-50 mt-0.5">{pct}%</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
