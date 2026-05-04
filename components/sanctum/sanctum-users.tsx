'use client'

import { useState, useMemo } from 'react'
import { Trash2, SnowflakeIcon, CheckCircle, Search, X, Users, ShieldOff, ShieldCheck } from 'lucide-react'
import { useAdmin } from '@/lib/admin-context'

export default function SanctumUsers() {
  const { users, deleteUser, toggleFreeze } = useAdmin()
  const [deleteConfirm, setDeleteConfirm]   = useState<string | null>(null)
  const [query, setQuery]                   = useState('')
  const [statusFilter, setStatusFilter]     = useState<'all' | 'active' | 'suspended'>('all')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return users.filter((u) => {
      const matchQ = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      const matchS = statusFilter === 'all' || u.status === statusFilter
      return matchQ && matchS
    })
  }, [users, query, statusFilter])

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-amber-500/70 mb-1">Accounts</p>
        <h1 className="font-serif text-2xl md:text-3xl text-white/90">Users</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total',     value: users.length,                                    color: 'text-white/70' },
          { label: 'Active',    value: users.filter((u) => u.status === 'active').length,    color: 'text-emerald-400' },
          { label: 'Suspended', value: users.filter((u) => u.status === 'suspended').length, color: 'text-rose-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-[#13141a] border border-white/[0.06] rounded-xl px-4 py-3 text-center">
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="text-[11px] text-white/30 uppercase tracking-wider mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email…"
            className="w-full pl-10 pr-9 py-2.5 text-sm bg-[#13141a] border border-white/[0.06] rounded-xl text-white/70 placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 transition"
          />
          {query && (
            <button onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="flex rounded-xl overflow-hidden border border-white/[0.06] shrink-0">
          {(['all', 'active', 'suspended'] as const).map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3.5 py-2.5 text-xs font-medium capitalize transition ${
                statusFilter === s
                  ? 'bg-amber-500 text-stone-900'
                  : 'bg-[#13141a] text-white/40 hover:bg-white/[0.04] hover:text-white/70'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#13141a] border border-white/[0.06] rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Users className="w-10 h-10 text-white/10 mx-auto mb-3" />
            <p className="text-sm text-white/30">
              {query ? `No users match "${query}"` : 'No users found'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  {['User', 'Joined', 'Orders', 'Status', ''].map((h, i) => (
                    <th key={i} className={`text-left px-5 py-3.5 text-[11px] uppercase tracking-[0.18em] text-white/25 font-medium ${
                      h === 'Joined' ? 'hidden sm:table-cell' :
                      h === 'Orders' ? 'hidden md:table-cell' : ''
                    }`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0 shadow-sm">
                          <span className="text-xs font-bold text-stone-900">{u.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white/80">
                            {query ? <Highlight text={u.name} query={query} /> : u.name}
                          </p>
                          <p className="text-[11px] text-white/30">
                            {query ? <Highlight text={u.email} query={query} /> : u.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-white/35 hidden sm:table-cell">{u.joined}</td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-sm font-semibold text-white/60">{u.orders}</span>
                      <span className="text-[11px] text-white/25 ml-1">orders</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full font-medium ${
                        u.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {u.status === 'active'
                          ? <CheckCircle className="w-3 h-3" />
                          : <SnowflakeIcon className="w-3 h-3" />
                        }
                        {u.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 justify-end opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => toggleFreeze(u.id)}
                          className={`p-2 rounded-lg transition ${
                            u.status === 'active'
                              ? 'text-white/25 hover:text-sky-400 hover:bg-sky-500/10'
                              : 'text-sky-400 hover:text-white/50 hover:bg-white/[0.05]'
                          }`}
                          title={u.status === 'active' ? 'Suspend user' : 'Reactivate user'}
                        >
                          {u.status === 'active'
                            ? <ShieldOff className="w-3.5 h-3.5" />
                            : <ShieldCheck className="w-3.5 h-3.5" />
                          }
                        </button>

                        {deleteConfirm === u.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => { deleteUser(u.id); setDeleteConfirm(null) }}
                              className="text-[11px] px-2.5 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="text-[11px] px-2 py-1 text-white/30 hover:text-white/60 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(u.id)}
                            className="p-2 text-white/25 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                            aria-label="Delete user"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/[0.04] flex items-center justify-between">
          <p className="text-[11px] text-white/25">
            {filtered.length} of {users.length} users
          </p>
          {(query || statusFilter !== 'all') && (
            <button
              onClick={() => { setQuery(''); setStatusFilter('all') }}
              className="text-[11px] text-white/30 hover:text-amber-400 transition"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Highlight({ text, query }: { text: string; query: string }) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-amber-500/25 text-amber-300 rounded-sm px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}
