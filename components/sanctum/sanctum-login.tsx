'use client'

import { useState } from 'react'
import ThemeLogo from '@/components/logo'
import { useAdmin } from '@/lib/admin-context'
import { Eye, EyeOff, Shield } from 'lucide-react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'

const ParticleBg = dynamic(() => import('@/components/particle-bg'), { ssr: false })

type Mode = 'login' | 'register'

export default function SanctumLogin() {
  const { login, register } = useAdmin()
  const { resolvedTheme }   = useTheme()
  const isLight             = resolvedTheme === 'light'

  const [mode, setMode]         = useState<Mode>('login')
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow]         = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

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

  // Theme tokens
  const bg        = isLight ? 'bg-[#fdf0f2]'                    : 'bg-[#0a0b0f]'
  const panelBg   = isLight ? 'bg-[#fce8ec]/80 backdrop-blur-xl border-r border-rose-200/60'
                             : 'bg-[#0a0b0f]/80 backdrop-blur-xl border-r border-white/[0.05]'
  const cardBg    = isLight ? 'bg-white/70 backdrop-blur-xl border border-rose-200/60 shadow-[0_8px_40px_rgba(225,100,120,0.10)]'
                             : 'bg-white/[0.03] backdrop-blur-xl border border-white/[0.07] shadow-[0_8px_40px_rgba(0,0,0,0.4)]'
  const heading   = isLight ? 'text-rose-950'   : 'text-white/90'
  const subheading= isLight ? 'text-rose-400'   : 'text-white/30'
  const labelCl   = isLight ? 'text-rose-500/70' : 'text-white/35'
  const inputCl   = isLight
    ? 'border border-rose-200/80 bg-rose-50/60 text-rose-900 placeholder:text-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-200/40'
    : 'border border-white/[0.08] bg-white/[0.04] text-white/80 placeholder:text-white/20 focus:border-amber-500/60'
  const tabActive = isLight ? 'bg-rose-400 text-white shadow-[0_2px_12px_rgba(225,100,120,0.3)]'
                             : 'bg-amber-500 text-stone-900'
  const tabInactive = isLight ? 'text-rose-400/60 hover:text-rose-600' : 'text-white/30 hover:text-white/60'
  const tabBg     = isLight ? 'bg-rose-100/60 border border-rose-200/60' : 'bg-white/[0.04] border border-white/[0.06]'
  const btnCl     = isLight
    ? 'bg-rose-400 text-white hover:bg-rose-500 shadow-[0_4px_20px_rgba(225,100,120,0.35)]'
    : 'bg-amber-500 text-stone-900 hover:bg-amber-400'
  const demoBg    = isLight ? 'bg-rose-50/80 border border-rose-200/60' : 'bg-amber-500/[0.06] border border-amber-500/15'
  const demoLabel = isLight ? 'text-rose-500'   : 'text-amber-400/80'
  const demoText  = isLight ? 'text-rose-400'   : 'text-white/40'
  const linkCl    = isLight ? 'text-rose-500 hover:text-rose-700' : 'text-amber-400/70 hover:text-amber-400'
  const shieldBg  = isLight ? 'bg-rose-100 border border-rose-200/60' : 'bg-amber-500/10 border border-amber-500/20'
  const shieldIc  = isLight ? 'text-rose-400'   : 'text-amber-400'
  const mandala   = isLight ? 'text-rose-300/40' : 'text-amber-400/15'
  const divider   = isLight ? 'via-rose-300/40'  : 'via-amber-500/20'
  const footer    = isLight ? 'text-rose-300/60' : 'text-white/20'

  return (
    <div className={`min-h-screen ${bg} flex transition-colors duration-300`}>

      {/* Left — decorative panel */}
      <div className={`hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 overflow-hidden ${panelBg}`}>
        {!isLight && <ParticleBg />}

        {/* Soft radial glow for light mode */}
        {isLight && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-rose-200/30 blur-3xl" />
            <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-pink-200/20 blur-2xl" />
          </div>
        )}

        {/* Mandala */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none ${mandala}`}>
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
          <ThemeLogo size={40} forceDark={!isLight} />
          <div>
            <p className={`font-serif text-base tracking-wide ${heading}`}>Divine Couture</p>
            <p className={`text-[10px] tracking-[0.2em] uppercase ${subheading}`}>Admin Portal</p>
          </div>
        </div>

        {/* Centre */}
        <div className="relative z-10 text-center">
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${shieldBg} mb-6`}>
            <Shield className={`w-6 h-6 ${shieldIc}`} />
          </div>
          <h2 className={`font-serif text-2xl mb-3 ${heading}`}>Sanctum</h2>
          <p className={`text-sm leading-relaxed max-w-xs mx-auto ${subheading}`}>
            Secure admin portal for managing your Divine Couture catalogue and customers.
          </p>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <div className={`h-px bg-gradient-to-r from-transparent ${divider} to-transparent mb-4`} />
          <p className={`text-[11px] tracking-widest uppercase text-center ${footer}`}>
            Authorised Personnel Only
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className={`w-full max-w-sm rounded-2xl p-8 ${cardBg}`}>

          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <ThemeLogo size={48} forceDark={!isLight} className="mx-auto mb-3" />
            <p className={`font-serif text-lg ${heading}`}>Divine Couture</p>
            <p className={`text-[10px] tracking-[0.2em] uppercase mt-0.5 ${subheading}`}>Admin Portal</p>
          </div>

          <div className="mb-8">
            <h1 className={`font-serif text-2xl mb-1 ${heading}`}>
              {mode === 'login' ? 'Welcome Back' : 'Create Admin Account'}
            </h1>
            <p className={`text-sm ${subheading}`}>
              {mode === 'login' ? 'Sign in to Sanctum' : 'Register a new admin account'}
            </p>
          </div>

          {/* Tab switcher */}
          <div className={`flex ${tabBg} rounded-xl p-1 mb-6`}>
            {(['login', 'register'] as Mode[]).map((m) => (
              <button key={m} onClick={() => switchMode(m)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition duration-200 uppercase tracking-wider ${
                  mode === m ? tabActive : tabInactive
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className={`block text-[11px] uppercase tracking-[0.18em] mb-2 ${labelCl}`}>Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Your name" required
                  className={`w-full px-4 py-3.5 text-sm rounded-xl focus:outline-none transition ${inputCl}`} />
              </div>
            )}

            <div>
              <label className={`block text-[11px] uppercase tracking-[0.18em] mb-2 ${labelCl}`}>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@divinecouture.co.uk" required
                className={`w-full px-4 py-3.5 text-sm rounded-xl focus:outline-none transition ${inputCl}`} />
            </div>

            <div>
              <label className={`block text-[11px] uppercase tracking-[0.18em] mb-2 ${labelCl}`}>Password</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'register' ? 'Min. 8 characters' : '••••••••'}
                  required
                  className={`w-full px-4 py-3.5 pr-12 text-sm rounded-xl focus:outline-none transition ${inputCl}`} />
                <button type="button" onClick={() => setShow(!show)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 transition ${isLight ? 'text-rose-300 hover:text-rose-500' : 'text-white/25 hover:text-white/60'}`}>
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 text-xs text-red-500 bg-red-500/[0.08] border border-red-400/20 rounded-xl px-3 py-2.5">
                <span className="mt-0.5 shrink-0">⚠</span> {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className={`w-full py-3.5 text-xs font-bold tracking-[0.18em] uppercase rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 mt-2 ${btnCl}`}
            >
              {loading
                ? <span className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${isLight ? 'border-white' : 'border-stone-900'}`} />
                : mode === 'login' ? 'Sign In to Sanctum' : 'Create Account'
              }
            </button>
          </form>

          {/* Demo credentials */}
          {mode === 'login' && (
            <div className={`mt-5 px-4 py-3 rounded-xl ${demoBg}`}>
              <p className={`text-[11px] font-semibold mb-1.5 uppercase tracking-wider ${demoLabel}`}>Demo Credentials</p>
              <p className={`text-[11px] font-mono ${demoText}`}>admin@divinecouture.co.uk</p>
              <p className={`text-[11px] font-mono ${demoText}`}>divine-admin-2024</p>
            </div>
          )}

          <p className={`text-center text-xs mt-6 ${subheading}`}>
            {mode === 'login' ? "Need an account? " : 'Already registered? '}
            <button onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
              className={`underline underline-offset-4 transition ${linkCl}`}>
              {mode === 'login' ? 'Register' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
