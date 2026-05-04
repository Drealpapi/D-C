'use client'

import { useState } from 'react'
import ThemeLogo from '@/components/logo'
import { useAdmin } from '@/lib/admin-context'
import { Eye, EyeOff, Shield } from 'lucide-react'
import dynamic from 'next/dynamic'

const ParticleBg = dynamic(() => import('@/components/particle-bg'), { ssr: false })

type Mode = 'login' | 'register'

export default function SanctumLogin() {
  const { login, register } = useAdmin()
  const [mode, setMode]     = useState<Mode>('login')
  const [name, setName]     = useState('')
  const [email, setEmail]   = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow]     = useState(false)
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  function reset() { setError(''); setName(''); setEmail(''); setPassword('') }
  function switchMode(m: Mode) { setMode(m); reset() }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 350))
    const err = mode === 'login'
      ? login(email, password)
      : register(name, email, password)
    if (err) setError(err)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0b0f] flex">

      {/* Left — decorative panel */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 overflow-hidden border-r border-white/[0.05]">
        <ParticleBg />

        {/* Mandala */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-400/15 pointer-events-none">
          <svg width="320" height="320" viewBox="0 0 320 320" fill="none" aria-hidden="true">
            {[140,110,80,50,20].map((r) => (
              <circle key={r} cx="160" cy="160" r={r} stroke="currentColor" strokeWidth="0.5"/>
            ))}
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => (
              <line key={deg} x1="160" y1="20" x2="160" y2="300"
                stroke="currentColor" strokeWidth="0.3"
                transform={`rotate(${deg} 160 160)`}/>
            ))}
            <circle cx="160" cy="160" r="5" fill="currentColor" opacity="0.4"/>
          </svg>
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <ThemeLogo size={36} forceDark />
          <div>
            <p className="font-serif text-base text-white/80 tracking-wide">Divine Couture</p>
            <p className="text-[10px] tracking-[0.2em] text-white/25 uppercase">Admin Portal</p>
          </div>
        </div>

        {/* Centre */}
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <Shield className="w-6 h-6 text-amber-400" />
          </div>
          <h2 className="font-serif text-2xl text-white/70 mb-3">Sanctum</h2>
          <p className="text-sm text-white/30 leading-relaxed max-w-xs mx-auto">
            Secure admin portal for managing your Divine Couture catalogue and customers.
          </p>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-4" />
          <p className="text-[11px] text-white/20 tracking-widest uppercase text-center">
            Authorised Personnel Only
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <ThemeLogo size={44} forceDark className="mx-auto mb-3" />
            <p className="font-serif text-lg text-white/80">Divine Couture</p>
            <p className="text-[10px] tracking-[0.2em] text-white/25 uppercase mt-0.5">Admin Portal</p>
          </div>

          <div className="mb-8">
            <h1 className="font-serif text-2xl text-white/90 mb-1">
              {mode === 'login' ? 'Welcome Back' : 'Create Admin Account'}
            </h1>
            <p className="text-sm text-white/30">
              {mode === 'login' ? 'Sign in to Sanctum' : 'Register a new admin account'}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-white/[0.04] border border-white/[0.06] rounded-xl p-1 mb-6">
            {(['login', 'register'] as Mode[]).map((m) => (
              <button key={m} onClick={() => switchMode(m)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition duration-200 uppercase tracking-wider ${
                  mode === m
                    ? 'bg-amber-500 text-stone-900'
                    : 'text-white/30 hover:text-white/60'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] text-white/35 mb-2">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Your name" required
                  className="w-full border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-amber-500/60 rounded-lg transition" />
              </div>
            )}

            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-white/35 mb-2">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@divinecouture.co.uk" required
                className="w-full border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-amber-500/60 rounded-lg transition" />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-white/35 mb-2">Password</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'register' ? 'Min. 8 characters' : '••••••••'}
                  required
                  className="w-full border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 pr-12 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-amber-500/60 rounded-lg transition" />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 text-xs text-red-400 bg-red-500/[0.08] border border-red-500/20 rounded-lg px-3 py-2.5">
                <span className="mt-0.5 shrink-0">⚠</span> {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-amber-500 text-stone-900 text-xs font-bold tracking-[0.18em] uppercase rounded-lg hover:bg-amber-400 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {loading
                ? <span className="w-4 h-4 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" />
                : mode === 'login' ? 'Sign In to Sanctum' : 'Create Account'
              }
            </button>
          </form>

          {/* Demo credentials */}
          {mode === 'login' && (
            <div className="mt-5 px-4 py-3 bg-amber-500/[0.06] border border-amber-500/15 rounded-lg">
              <p className="text-[11px] text-amber-400/80 font-semibold mb-1.5 uppercase tracking-wider">Demo Credentials</p>
              <p className="text-[11px] text-white/40 font-mono">admin@divinecouture.co.uk</p>
              <p className="text-[11px] text-white/40 font-mono">divine-admin-2024</p>
            </div>
          )}

          <p className="text-center text-xs text-white/20 mt-6">
            {mode === 'login' ? "Need an account? " : 'Already registered? '}
            <button onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
              className="text-amber-400/70 hover:text-amber-400 underline underline-offset-4 transition">
              {mode === 'login' ? 'Register' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
