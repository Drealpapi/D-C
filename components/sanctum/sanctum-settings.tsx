'use client'

import { useState } from 'react'
import { Save, Check, Store, Mail, Instagram, Truck, Globe, Shield, AlertTriangle } from 'lucide-react'
import { useAdmin } from '@/lib/admin-context'

const inputCls = "w-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-amber-500/60 rounded-lg transition"
const labelCls = "block text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2 font-medium"

export default function SanctumSettings({ isLight = false }: { isLight?: boolean }) {
  const { settings, updateSettings, currentAdmin } = useAdmin()
  const [form, setForm] = useState({ ...settings })
  const [saved, setSaved] = useState(false)

  const iCls  = isLight
    ? 'w-full border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:border-amber-500/60 rounded-lg transition'
    : inputCls
  const lCls  = isLight
    ? 'block text-[11px] uppercase tracking-[0.18em] text-stone-400 mb-2 font-medium'
    : labelCls
  const card  = isLight ? 'bg-white border-stone-200'    : 'bg-[#13141a] border-white/[0.06]'
  const heading = isLight ? 'text-stone-800' : 'text-white/90'
  const muted   = isLight ? 'text-stone-400' : 'text-white/30'

  function set(k: keyof typeof form, v: string | boolean | number) {
    setForm((prev) => ({ ...prev, [k]: v }))
  }

  function handleSave() {
    updateSettings(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-amber-500/70 mb-1">Configuration</p>
          <h1 className={`font-serif text-2xl md:text-3xl ${heading}`}>Settings</h1>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
            saved
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-amber-500 text-stone-900 hover:bg-amber-400'
          }`}
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Store Identity */}
      <section className={`border rounded-2xl p-6 space-y-5 ${card}`}>
        <div className="flex items-center gap-2.5 mb-2">
          <Store className="w-4 h-4 text-amber-400" />
          <h2 className={`text-sm font-semibold ${heading}`}>Store Identity</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={lCls}>Store Name</label>
            <input type="text" value={form.storeName} onChange={(e) => set('storeName', e.target.value)} className={iCls} placeholder="Divine Couture" />
          </div>
          <div>
            <label className={lCls}>Currency</label>
            <select value={form.currency} onChange={(e) => set('currency', e.target.value)} className={iCls + ' cursor-pointer'}>
              <option value="GBP">GBP — British Pound (£)</option>
              <option value="USD">USD — US Dollar ($)</option>
              <option value="EUR">EUR — Euro (€)</option>
              <option value="INR">INR — Indian Rupee (₹)</option>
            </select>
          </div>
        </div>
        <div>
          <label className={lCls}>Store Tagline</label>
          <input type="text" value={form.tagline} onChange={(e) => set('tagline', e.target.value)} className={iCls} placeholder="Your store tagline…" />
        </div>
      </section>

      {/* Hero Content */}
      <section className={`border rounded-2xl p-6 space-y-5 ${card}`}>
        <div className="flex items-center gap-2.5 mb-2">
          <Globe className="w-4 h-4 text-sky-400" />
          <h2 className={`text-sm font-semibold ${heading}`}>Homepage Hero</h2>
        </div>
        <div>
          <label className={lCls}>Hero Title</label>
          <input type="text" value={form.heroTitle} onChange={(e) => set('heroTitle', e.target.value)} className={iCls} placeholder="Hero headline…" />
        </div>
        <div>
          <label className={lCls}>Hero Subtitle</label>
          <textarea value={form.heroSubtitle} onChange={(e) => set('heroSubtitle', e.target.value)} rows={3} className={iCls + ' resize-none'} placeholder="Hero subtitle text…" />
        </div>
      </section>

      {/* Shipping */}
      <section className={`border rounded-2xl p-6 space-y-5 ${card}`}>
        <div className="flex items-center gap-2.5 mb-2">
          <Truck className="w-4 h-4 text-violet-400" />
          <h2 className={`text-sm font-semibold ${heading}`}>Shipping</h2>
        </div>
        <div>
          <label className={lCls}>Free Shipping Threshold (£)</label>
          <input type="number" value={form.freeShippingThreshold} onChange={(e) => set('freeShippingThreshold', Number(e.target.value))} className={iCls} min={0} step={5} />
          <p className={`text-xs mt-2 ${muted}`}>Orders above this amount qualify for free UK delivery.</p>
        </div>
      </section>

      {/* Contact & Social */}
      <section className={`border rounded-2xl p-6 space-y-5 ${card}`}>
        <div className="flex items-center gap-2.5 mb-2">
          <Mail className="w-4 h-4 text-emerald-400" />
          <h2 className={`text-sm font-semibold ${heading}`}>Contact & Social</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={lCls}>Contact Email</label>
            <input type="email" value={form.contactEmail} onChange={(e) => set('contactEmail', e.target.value)} className={iCls} placeholder="hello@example.com" />
          </div>
          <div>
            <label className={lCls}>Instagram Handle</label>
            <div className="relative">
              <Instagram className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${muted}`} />
              <input type="text" value={form.instagramHandle} onChange={(e) => set('instagramHandle', e.target.value)} className={iCls + ' pl-10'} placeholder="@yourhandle" />
            </div>
          </div>
        </div>
      </section>

      {/* Admin Account */}
      <section className={`border rounded-2xl p-6 ${card}`}>
        <div className="flex items-center gap-2.5 mb-5">
          <Shield className="w-4 h-4 text-amber-400" />
          <h2 className={`text-sm font-semibold ${heading}`}>Admin Account</h2>
        </div>
        <div className={`flex items-center gap-3 p-4 rounded-xl border ${isLight ? 'bg-stone-50 border-stone-200' : 'bg-white/[0.03] border-white/[0.05]'}`}>
          <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-stone-900">{currentAdmin?.name.charAt(0)}</span>
          </div>
          <div>
            <p className={`text-sm font-medium ${heading}`}>{currentAdmin?.name}</p>
            <p className={`text-xs ${muted}`}>{currentAdmin?.email}</p>
          </div>
          <div className="ml-auto">
            <span className="text-[10px] uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full">
              Super Admin
            </span>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className={`rounded-2xl p-6 ${isLight ? 'bg-rose-50 border border-rose-200' : 'bg-rose-500/[0.04] border border-rose-500/20'}`}>
        <div className="flex items-center gap-2.5 mb-5">
          <AlertTriangle className="w-4 h-4 text-rose-500" />
          <h2 className={`text-sm font-semibold ${isLight ? 'text-rose-600' : 'text-rose-400/80'}`}>Danger Zone</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${isLight ? 'text-stone-700' : 'text-white/60'}`}>Maintenance Mode</p>
            <p className={`text-xs mt-0.5 ${muted}`}>Temporarily disable the storefront for visitors.</p>
          </div>
          <button
            onClick={() => set('maintenanceMode', !form.maintenanceMode)}
            className={`relative w-11 h-6 rounded-full transition-all duration-300 ${form.maintenanceMode ? 'bg-rose-500' : isLight ? 'bg-stone-200' : 'bg-white/10'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${form.maintenanceMode ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>
        {form.maintenanceMode && (
          <p className={`mt-3 text-xs px-3 py-2 rounded-lg ${isLight ? 'text-rose-600 bg-rose-100' : 'text-rose-400/70 bg-rose-500/10'}`}>
            ⚠ Maintenance mode is ON — the storefront will show a maintenance page to visitors.
          </p>
        )}
      </section>

      {/* Save button (bottom) */}
      <div className="flex justify-end pb-4">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
            saved
              ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
              : 'bg-amber-500 text-stone-900 hover:bg-amber-400'
          }`}
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'All changes saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
