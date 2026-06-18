'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Package, Heart, MapPin, Settings, LogOut, Lock, User, ShoppingBag, Camera } from 'lucide-react'
import { useUserAuth } from '@/lib/user-auth-context'
import { useEffect, useRef, useState, useCallback } from 'react'

const DEMO_ORDERS = [
  { id: 'DC-2024-001', date: '12 Mar 2024', status: 'Delivered',  total: 83.00, items: 'Kundan Drop Earrings · Silk Dupatta' },
  { id: 'DC-2024-002', date: '28 Feb 2024', status: 'Processing', total: 89.00, items: 'Gold Polki Bangle Set' },
  { id: 'DC-2024-003', date: '5 Jan 2024',  status: 'Delivered',  total: 38.00, items: 'Pearl Jhumka Earrings' },
]

const statusStyle: Record<string, string> = {
  Delivered:  'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50',
  Processing: 'text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/50',
  Shipped:    'text-sky-700 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/50',
}

const quickLinks = [
  { label: 'Wishlist',  sub: 'Saved pieces',     icon: Heart,    href: '#' },
  { label: 'Addresses', sub: 'Delivery details',  icon: MapPin,   href: '#' },
  { label: 'Settings',  sub: 'Account & privacy', icon: Settings, href: '#' },
]

// ── Anti-gravity orb layer ──────────────────────────────────────────────────
function AntiGravityBg({ isDark }: { isDark: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const orbsRef      = useRef<(HTMLDivElement | null)[]>([])
  const mouseRef     = useRef({ x: 0.5, y: 0.5 })
  const rafRef       = useRef<number | null>(null)

  const orbs = isDark
    ? [
        { size: 320, x: 15,  y: 20,  color: 'rgba(244,114,182,0.10)', blur: 80,  speed: 0.018 },
        { size: 260, x: 75,  y: 60,  color: 'rgba(251,191,36,0.08)',  blur: 70,  speed: 0.012 },
        { size: 200, x: 45,  y: 75,  color: 'rgba(167,139,250,0.08)', blur: 60,  speed: 0.022 },
        { size: 180, x: 85,  y: 15,  color: 'rgba(244,114,182,0.07)', blur: 50,  speed: 0.016 },
        { size: 140, x: 30,  y: 50,  color: 'rgba(251,191,36,0.06)',  blur: 40,  speed: 0.025 },
      ]
    : [
        { size: 340, x: 10,  y: 15,  color: 'rgba(251,113,133,0.18)', blur: 90,  speed: 0.018 },
        { size: 280, x: 70,  y: 55,  color: 'rgba(253,186,116,0.14)', blur: 80,  speed: 0.012 },
        { size: 220, x: 50,  y: 80,  color: 'rgba(249,168,212,0.20)', blur: 70,  speed: 0.022 },
        { size: 180, x: 88,  y: 10,  color: 'rgba(251,113,133,0.12)', blur: 55,  speed: 0.016 },
        { size: 150, x: 25,  y: 45,  color: 'rgba(253,186,116,0.10)', blur: 45,  speed: 0.025 },
      ]

  const currentPos = useRef(orbs.map(o => ({ x: o.x, y: o.y })))

  const animate = useCallback(() => {
    const mx = mouseRef.current.x
    const my = mouseRef.current.y
    orbs.forEach((orb, i) => {
      const el = orbsRef.current[i]
      if (!el) return
      const targetX = orb.x + (mx - 0.5) * 28 * orb.speed * 60
      const targetY = orb.y + (my - 0.5) * 28 * orb.speed * 60
      currentPos.current[i].x += (targetX - currentPos.current[i].x) * 0.04
      currentPos.current[i].y += (targetY - currentPos.current[i].y) * 0.04
      el.style.transform = `translate(${currentPos.current[i].x - orb.x}px, ${currentPos.current[i].y - orb.y}px)`
    })
    rafRef.current = requestAnimationFrame(animate)
  }, [orbs])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top)  / r.height,
      }
    }
    el.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      el.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {orbs.map((orb, i) => (
        <div
          key={i}
          ref={el => { orbsRef.current[i] = el }}
          style={{
            position:  'absolute',
            width:      orb.size,
            height:     orb.size,
            left:      `${orb.x}%`,
            top:       `${orb.y}%`,
            marginLeft: -orb.size / 2,
            marginTop:  -orb.size / 2,
            background: orb.color,
            borderRadius: '50%',
            filter:    `blur(${orb.blur}px)`,
            willChange: 'transform',
          }}
        />
      ))}

      {/* Subtle mandala watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] dark:opacity-[0.06]">
        <svg width="280" height="280" viewBox="0 0 280 280" fill="none">
          {[120,90,60,35,15].map(r => (
            <circle key={r} cx="140" cy="140" r={r} stroke="currentColor" strokeWidth="0.5"/>
          ))}
          {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg => (
            <line key={deg} x1="140" y1="20" x2="140" y2="260"
              stroke="currentColor" strokeWidth="0.3"
              transform={`rotate(${deg} 140 140)`}/>
          ))}
        </svg>
      </div>
    </div>
  )
}

// ── Main component ──────────────────────────────────────────────────────────
export default function ProfileView() {
  const { user, isLoggedIn, logout } = useUserAuth()
  const router   = useRouter()
  const fileRef  = useRef<HTMLInputElement>(null)
  const [avatar, setAvatar]   = useState<string | null>(null)
  const [isDark, setIsDark]   = useState(false)
  const [uploading, setUploading] = useState(false)

  // Detect dark mode
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  // Load saved avatar
  useEffect(() => {
    if (user?.email) {
      const saved = localStorage.getItem(`dc_avatar_${user.email}`)
      if (saved) setAvatar(saved)
    }
  }, [user?.email])

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) router.replace('/login?redirect=/profile')
  }, [isLoggedIn, router])

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !user?.email) return
    setUploading(true)
    const reader = new FileReader()
    reader.onload = (ev) => {
      const result = ev.target?.result as string
      setAvatar(result)
      localStorage.setItem(`dc_avatar_${user.email}`, result)
      setUploading(false)
    }
    reader.readAsDataURL(file)
  }

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-rose-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-rose-400/60">Redirecting…</p>
        </div>
      </div>
    )
  }

  function handleSignOut() {
    logout()
    router.push('/')
  }

  return (
    <div className="bg-[#fdf0f2] dark:bg-[#0d0f1a] min-h-screen transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16 space-y-5">

        {/* ── Hero banner with anti-gravity bg ── */}
        <div className="relative rounded-3xl overflow-hidden border border-rose-200/60 dark:border-white/[0.06] shadow-[0_8px_40px_rgba(225,100,120,0.12)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">

          {/* Anti-gravity layer */}
          <div className={`absolute inset-0 ${isDark ? 'bg-[#0d0f1a]' : 'bg-[#fdf0f2]'}`} />
          <AntiGravityBg isDark={isDark} />

          {/* Glass overlay */}
          <div className="absolute inset-0 bg-white/30 dark:bg-black/10 backdrop-blur-[2px]" />

          {/* Content */}
          <div className="relative z-10 px-6 pt-10 pb-8 flex flex-col sm:flex-row items-center sm:items-end gap-5">

            {/* Avatar with upload */}
            <div className="relative group shrink-0">
              <div className="w-24 h-24 rounded-full ring-4 ring-white/80 dark:ring-white/10 shadow-xl overflow-hidden">
                {avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-rose-300 to-rose-500 dark:from-amber-400 dark:to-amber-600 flex items-center justify-center">
                    <span className="font-serif text-3xl text-white font-bold select-none">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Edit overlay */}
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                aria-label="Change profile picture"
              >
                {uploading
                  ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <Camera className="w-6 h-6 text-white drop-shadow" />
                }
              </button>

              {/* Hidden file input */}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />

              {/* Edit badge */}
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-rose-400 dark:bg-amber-500 border-2 border-white dark:border-[#0d0f1a] flex items-center justify-center shadow-md cursor-pointer"
                onClick={() => fileRef.current?.click()}>
                <Camera className="w-3.5 h-3.5 text-white dark:text-stone-900" />
              </div>
            </div>

            {/* Name & email */}
            <div className="flex-1 min-w-0 text-center sm:text-left pb-1">
              <p className="text-[11px] uppercase tracking-[0.22em] text-rose-400 dark:text-amber-400 mb-1">Welcome back</p>
              <h1 className="font-serif text-2xl md:text-3xl text-rose-950 dark:text-stone-100 leading-tight">{user.name}</h1>
              <p className="text-sm text-rose-500/60 dark:text-stone-400 mt-0.5 truncate">{user.email}</p>
            </div>

            {/* Shop CTA */}
            <Link
              href="/shop/jewelry"
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-rose-400/90 dark:bg-amber-500/90 backdrop-blur-sm text-white dark:text-stone-900 text-xs font-bold tracking-wider uppercase hover:bg-rose-500 dark:hover:bg-amber-400 transition rounded-xl shadow-[0_4px_16px_rgba(225,100,120,0.3)]"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Shop Now
            </Link>
          </div>
        </div>

        {/* ── Quick links ── */}
        <div className="grid grid-cols-3 gap-3">
          {quickLinks.map(({ label, sub, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              className="group bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm border border-rose-100/80 dark:border-white/[0.06] rounded-2xl px-4 py-5 flex flex-col items-center text-center gap-2.5 hover:border-rose-300 dark:hover:border-amber-500/30 hover:shadow-[0_4px_20px_rgba(225,100,120,0.12)] hover:bg-rose-50/60 dark:hover:bg-white/[0.04] transition duration-200"
            >
              <Icon className="w-5 h-5 text-rose-300 dark:text-stone-500 group-hover:text-rose-400 dark:group-hover:text-amber-400 transition" />
              <div>
                <p className="text-xs font-semibold text-rose-950 dark:text-stone-200">{label}</p>
                <p className="text-[11px] text-rose-400/70 dark:text-stone-500 mt-0.5">{sub}</p>
              </div>
            </a>
          ))}
        </div>

        {/* ── Order history ── */}
        <div className="bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm border border-rose-100/80 dark:border-white/[0.06] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-rose-50/80 dark:border-white/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-rose-400 dark:text-amber-500" />
              <h2 className="font-serif text-lg text-rose-950 dark:text-stone-100">Order History</h2>
            </div>
            <span className="text-xs text-rose-400/70 dark:text-stone-400 bg-rose-50/80 dark:bg-white/[0.04] px-2.5 py-1 rounded-full border border-rose-100/60 dark:border-white/[0.06]">
              {DEMO_ORDERS.length} orders
            </span>
          </div>

          <div className="divide-y divide-rose-50/80 dark:divide-white/[0.04]">
            {DEMO_ORDERS.map((order) => (
              <div key={order.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-rose-50/40 dark:hover:bg-white/[0.02] transition duration-150">
                <div className="min-w-0">
                  <p className="text-sm text-rose-950 dark:text-stone-200 font-medium truncate">{order.items}</p>
                  <p className="text-xs text-rose-400/60 dark:text-stone-500 mt-0.5">{order.id} · {order.date}</p>
                </div>
                <div className="text-right shrink-0 space-y-1">
                  <p className="text-sm font-bold text-rose-950 dark:text-stone-100">£{order.total.toFixed(2)}</p>
                  <span className={`inline-block text-[11px] px-2.5 py-0.5 rounded-full font-medium ${statusStyle[order.status] ?? 'text-stone-500 bg-stone-50'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Account details ── */}
        <div className="bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm border border-rose-100/80 dark:border-white/[0.06] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-rose-50/80 dark:border-white/[0.04] flex items-center gap-2.5">
            <User className="w-4 h-4 text-rose-400 dark:text-amber-500" />
            <h2 className="font-serif text-lg text-rose-950 dark:text-stone-100">Account Details</h2>
          </div>

          <div className="divide-y divide-rose-50/80 dark:divide-white/[0.04]">
            {[
              { label: 'Full Name',     value: user.name },
              { label: 'Email Address', value: user.email },
              { label: 'Password',      value: '••••••••' },
            ].map(({ label, value }) => (
              <div key={label} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-rose-400/70 dark:text-stone-500 mb-0.5">{label}</p>
                  <p className="text-sm text-rose-950 dark:text-stone-200">{value}</p>
                </div>
                {label === 'Password' && (
                  <Link
                    href="/forgot-password"
                    className="flex items-center gap-1.5 text-xs text-rose-300 dark:text-stone-500 hover:text-rose-500 dark:hover:text-amber-400 transition"
                  >
                    <Lock className="w-3 h-3" /> Change
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Sign out ── */}
        <div className="pb-4">
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 text-sm text-rose-300/80 dark:text-stone-500 hover:text-red-500 dark:hover:text-red-400 transition"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>

      </div>
    </div>
  )
}
