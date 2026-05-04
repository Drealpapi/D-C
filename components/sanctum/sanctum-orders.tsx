'use client'

import { useState, useMemo } from 'react'
import { Search, X, ChevronDown, Trash2, Eye, ShoppingBag } from 'lucide-react'
import { useAdmin, type AdminOrder, type OrderStatus } from '@/lib/admin-context'

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  pending:    { label: 'Pending',    color: 'text-amber-400',  bg: 'bg-amber-500/10' },
  processing: { label: 'Processing', color: 'text-sky-400',    bg: 'bg-sky-500/10' },
  shipped:    { label: 'Shipped',    color: 'text-violet-400', bg: 'bg-violet-500/10' },
  delivered:  { label: 'Delivered',  color: 'text-emerald-400',bg: 'bg-emerald-500/10' },
  cancelled:  { label: 'Cancelled',  color: 'text-rose-400',   bg: 'bg-rose-500/10' },
}

const ALL_STATUSES: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

const STATUS_CONFIG_LIGHT: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  pending:    { label: 'Pending',    color: 'text-amber-700',   bg: 'bg-amber-100' },
  processing: { label: 'Processing', color: 'text-sky-700',     bg: 'bg-sky-100' },
  shipped:    { label: 'Shipped',    color: 'text-violet-700',  bg: 'bg-violet-100' },
  delivered:  { label: 'Delivered',  color: 'text-emerald-700', bg: 'bg-emerald-100' },
  cancelled:  { label: 'Cancelled',  color: 'text-rose-700',    bg: 'bg-rose-100' },
}

export default function SanctumOrders({ isLight = false }: { isLight?: boolean }) {
  const { orders, updateOrderStatus, deleteOrder } = useAdmin()
  const [query, setQuery]               = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [expandedId, setExpandedId]     = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return orders.filter((o) => {
      const matchQ = !q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.email.toLowerCase().includes(q)
      const matchS = statusFilter === 'all' || o.status === statusFilter
      return matchQ && matchS
    })
  }, [orders, query, statusFilter])

  const stats = useMemo(() => ({
    total:      orders.length,
    pending:    orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped:    orders.filter((o) => o.status === 'shipped').length,
    delivered:  orders.filter((o) => o.status === 'delivered').length,
    revenue:    orders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0),
  }), [orders])

  const card    = isLight ? 'bg-white border-stone-200'    : 'bg-[#13141a] border-white/[0.06]'
  const heading = isLight ? 'text-stone-800'  : 'text-white/90'
  const muted   = isLight ? 'text-stone-400'  : 'text-white/30'
  const divider = isLight ? 'divide-stone-100' : 'divide-white/[0.04]'
  const rowHov  = isLight ? 'hover:bg-stone-50' : 'hover:bg-white/[0.02]'
  const searchBg = isLight
    ? 'w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-stone-200 rounded-xl text-stone-700 placeholder:text-stone-300 focus:outline-none focus:border-amber-500/50 transition'
    : 'w-full pl-10 pr-9 py-2.5 text-sm bg-[#13141a] border border-white/[0.06] rounded-xl text-white/70 placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 transition'
  const selectCls = isLight
    ? 'px-4 py-2.5 text-sm bg-white border border-stone-200 rounded-xl text-stone-600 focus:outline-none focus:border-amber-500/50 transition'
    : 'px-4 py-2.5 text-sm bg-[#13141a] border border-white/[0.06] rounded-xl text-white/60 focus:outline-none focus:border-amber-500/50 transition'
  const cfg_map = isLight ? STATUS_CONFIG_LIGHT : STATUS_CONFIG

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-amber-500/70 mb-1">Fulfilment</p>
        <h1 className={`font-serif text-2xl md:text-3xl ${heading}`}>Orders</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Total',      value: stats.total,                    color: isLight ? 'text-stone-700' : 'text-white/70' },
          { label: 'Pending',    value: stats.pending,                  color: 'text-amber-500' },
          { label: 'Processing', value: stats.processing,               color: 'text-sky-500' },
          { label: 'Shipped',    value: stats.shipped,                  color: 'text-violet-500' },
          { label: 'Delivered',  value: stats.delivered,                color: 'text-emerald-500' },
          { label: 'Revenue',    value: `£${stats.revenue.toLocaleString()}`, color: 'text-amber-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`border rounded-xl px-4 py-3 text-center ${card}`}>
            <p className={`text-lg font-bold ${color}`}>{value}</p>
            <p className={`text-[10px] uppercase tracking-wider mt-0.5 ${muted}`}>{label}</p>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${muted}`} />
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by order ID, customer or email…"
            className={searchBg}
          />
          {query && (
            <button onClick={() => setQuery('')} className={`absolute right-3 top-1/2 -translate-y-1/2 transition ${muted}`}>
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
          className={selectCls}
        >
          <option value="all">All Statuses</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
          ))}
        </select>
      </div>

      {/* Orders table */}
      <div className={`border rounded-2xl overflow-hidden ${card}`}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingBag className={`w-10 h-10 mb-3 ${muted}`} />
            <p className={`text-sm ${muted}`}>No orders found</p>
          </div>
        ) : (
          <div className={`divide-y ${divider}`}>
            {filtered.map((order) => {
              const cfg = cfg_map[order.status]
              const isExpanded = expandedId === order.id
              return (
                <div key={order.id}>
                  {/* Row */}
                  <div className={`flex items-center gap-3 px-5 py-4 ${rowHov} transition`}>
                    {/* Order ID */}
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-mono ${isLight ? 'text-amber-600' : 'text-amber-400/80'}`}>{order.id}</p>
                      <p className={`text-xs mt-0.5 ${muted}`}>{order.date}</p>
                    </div>

                    {/* Customer */}
                    <div className="hidden sm:block min-w-0 flex-1">
                      <p className={`text-sm truncate ${isLight ? 'text-stone-700' : 'text-white/80'}`}>{order.customer}</p>
                      <p className={`text-xs truncate ${muted}`}>{order.email}</p>
                    </div>

                    {/* Total */}
                    <div className="hidden md:block w-20 text-right">
                      <p className={`text-sm font-semibold ${isLight ? 'text-stone-700' : 'text-white/80'}`}>£{order.total}</p>
                      <p className={`text-xs ${muted}`}>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                    </div>

                    {/* Status selector */}
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className={`appearance-none pl-3 pr-7 py-1.5 text-xs font-medium rounded-full border-0 focus:outline-none focus:ring-1 focus:ring-amber-500/40 cursor-pointer transition ${cfg.color} ${cfg.bg}`}
                      >
                        {ALL_STATUSES.map((s) => (
                          <option key={s} value={s} className={isLight ? 'bg-white text-stone-700' : 'bg-[#13141a] text-white/70'}>
                            {STATUS_CONFIG[s].label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className={`absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none ${cfg.color}`} />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : order.id)}
                        className={`p-1.5 rounded-lg transition ${isLight ? 'text-stone-400 hover:text-stone-700 hover:bg-stone-100' : 'text-white/30 hover:text-white/70 hover:bg-white/[0.06]'}`}
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {deleteConfirm === order.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => { deleteOrder(order.id); setDeleteConfirm(null) }}
                            className="px-2 py-1 text-xs bg-rose-500 text-white rounded-lg hover:bg-rose-400 transition"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className={`px-2 py-1 text-xs rounded-lg transition ${isLight ? 'bg-stone-100 text-stone-500 hover:bg-stone-200' : 'bg-white/[0.06] text-white/50 hover:bg-white/[0.1]'}`}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(order.id)}
                          className={`p-1.5 rounded-lg transition ${isLight ? 'text-stone-300 hover:text-rose-500 hover:bg-rose-50' : 'text-white/20 hover:text-rose-400 hover:bg-rose-500/10'}`}
                          title="Delete order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className={`px-5 pb-5 border-t ${isLight ? 'bg-stone-50 border-stone-100' : 'bg-white/[0.015] border-white/[0.04]'}`}>
                      <div className="grid sm:grid-cols-2 gap-6 pt-4">
                        {/* Items */}
                        <div>
                          <p className={`text-[10px] uppercase tracking-[0.18em] mb-3 ${muted}`}>Items</p>
                          <div className="space-y-2">
                            {order.items.map((item, i) => (
                              <div key={i} className="flex items-center justify-between">
                                <span className={`text-sm ${isLight ? 'text-stone-600' : 'text-white/70'}`}>{item.name} × {item.qty}</span>
                                <span className={`text-sm ${muted}`}>£{item.price * item.qty}</span>
                              </div>
                            ))}
                            <div className={`flex items-center justify-between pt-2 border-t ${isLight ? 'border-stone-200' : 'border-white/[0.06]'}`}>
                              <span className={`text-sm font-semibold ${isLight ? 'text-stone-700' : 'text-white/80'}`}>Total</span>
                              <span className={`text-sm font-bold ${isLight ? 'text-amber-600' : 'text-amber-400'}`}>£{order.total}</span>
                            </div>
                          </div>
                        </div>
                        {/* Delivery */}
                        <div>
                          <p className={`text-[10px] uppercase tracking-[0.18em] mb-3 ${muted}`}>Delivery Address</p>
                          <p className={`text-sm leading-relaxed ${isLight ? 'text-stone-600' : 'text-white/60'}`}>{order.address}</p>
                          <p className={`text-[10px] mt-3 ${muted}`}>Customer: {order.email}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
