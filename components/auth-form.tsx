'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import ThemeLogo from '@/components/logo'
import { useState, useEffect } from 'react'
import { Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useUserAuth } from '@/lib/user-auth-context'
import dynamic from 'next/dynamic'

const ParticleBg = dynamic(() => import('@/components/particle-bg'), { ssr: false })

type AuthMode = 'login' | 'register' | 'forgot'

const ORNAMENT = (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true" className="opacity-20">
    <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="0.5"/>
    <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="0.5"/>
    <circle cx="60" cy="60" r="25" stroke="currentColor" strokeWidth="0.5"/>
    <circle cx="60" cy="60" r="4" fill="currentColor" opacity="0.4"/>
    {[0,45,90,135,180,225,270,315].map((deg) => (
      <line key={deg} x1="60" y1="5" x2="60" y2="115"
        stroke="currentColor" strokeWidth="0.3"
        transform={`rotate(${deg} 60 60)`}/>
    ))}
  </svg>
)

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/profile'
  const { login, register, isLoggedIn } = useUserAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted]       = useState(false)
  const [error, setError]               = useState('')
  const [loading, setLoading]           = useState(false)
  const [form, setForm]                 = useState({ name: '', email: '', password: '' })

  // If already logged in, redirect
  useEffect(() => {
    if (isLoggedIn && mode === 'login') router.replace(redirect)
  }, [isLoggedIn, mode, redirect, router])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 400))

    if (mode === 'login') {
      const err = login(form.email, form.password)
      if (err) { setError(err); setLoading(false); return }
      router.push(redirect)
    } else if (mode === 'register') {
      const err = register(form.name, form.email, form.password)
      if (err) { setError(err); setLoading(false); return }
      setSubmitted(true)
    } else {
      setSubmitted(true)
    }
    setLoading(false)
  }

  // ── Success states ──
  if (submitted && mode === 'register') {
    return (
      <AuthShell mode={mode}>
        <div className="text-center py-8 animate-scale-in">
          <CheckCircle2 className="w-14 h-14 text-amber-500 mx-auto mb-5" />
          <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-2">Welcome to Divine Couture</h2>
          <p className="text-stone-500 dark:text-stone-400 text-sm mb-8">Your account has been created. Sign in to continue.</p>
          <Link href="/login" className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-500 text-stone-900 text-xs font-bold tracking-[0.18em] uppercase hover:bg-amber-400 transition">
            Sign In Now →
          </Link>
        </div>
      </AuthShell>
    )
  }

  if (submitted && mode === 'forgot') {
    return (
      <AuthShell mode={mode}>
        <div className="text-center py-8 animate-scale-in">
          <div className="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center mx-auto mb-5">
            <span className="text-2xl">✉</span>
          </div>
          <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-2">Check Your Email</h2>
          <p className="text-stone-500 dark:text-stone-400 text-sm mb-8">
            If an account exists for <span className="text-stone-700 dark:text-stone-300 font-medium">{form.email}</span>, we've sent a reset link.
          </p>
          <Link href="/login" className="text-sm text-amber-600 dark:text-amber-400 hover:underline underline-offset-4 transition">
            ← Back to Sign In
          </Link>
        </div>
      </AuthShell>
    )
  }

  // ── Main form ──
  return (
    <AuthShell mode={mode}>
      <div className="animate-fade-up">
        <h1 className="font-serif text-2xl md:text-3xl text-stone-900 dark:text-stone-100 mb-1">
          {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Create Account' : 'Reset Password'}
        </h1>
        <p className="text-stone-400 dark:text-stone-500 text-sm mb-8">
          {mode === 'login'
            ? 'Sign in to your Divine Couture account'
            : mode === 'register'
            ? 'Join the Divine Couture family'
            : 'Enter your email to receive a reset link'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <Field label="Full Name" id="name" type="text" name="name"
              value={form.name} onChange={handleChange} placeholder="Precious Wealth" required />
          )}

          <Field label="Email Address" id="email" type="email" name="email"
            value={form.email} onChange={handleChange} placeholder="you@example.com" required />

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="text-[11px] uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 font-medium">
                  Password
                </label>
                {mode === 'login' && (
                  <Link href="/forgot-password" className="text-[11px] text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition underline-offset-4 hover:underline">
                    Forgot?
                  </Link>
                )}
              </div>
              <div className="relative">
                <input
                  id="password" name="password"
                  type={showPassword ? 'text' : 'password'}
                  required value={form.password} onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full border border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-white/[0.04] px-4 py-3.5 pr-12 text-sm text-stone-800 dark:text-stone-200 placeholder:text-stone-300 dark:placeholder:text-white/20 focus:outline-none focus:border-amber-500 dark:focus:border-amber-500/70 transition rounded-sm"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition"
                  aria-label={showPassword ? 'Hide' : 'Show'}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40 px-3 py-2.5 rounded-sm">
              <span className="mt-0.5">⚠</span> {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-4 bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-900 text-xs font-bold tracking-[0.2em] uppercase hover:bg-amber-700 dark:hover:bg-amber-400 transition-all duration-300 disabled:opacity-60 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_24px_rgba(212,175,55,0.2)] flex items-center justify-center gap-2"
          >
            {loading
              ? <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              : mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'
            }
          </button>
        </form>

        {/* Demo hint for login */}
        {mode === 'login' && (
          <div className="mt-5 px-4 py-3 bg-amber-50 dark:bg-amber-500/[0.07] border border-amber-100 dark:border-amber-500/20 rounded-sm">
            <p className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold mb-1 uppercase tracking-wider">Demo Account</p>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 font-mono">precious@divinecouture.co.uk</p>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 font-mono">divine123</p>
          </div>
        )}

        <div className="mt-7 text-center text-sm text-stone-400 dark:text-stone-500">
          {mode === 'login' ? (
            <>Don't have an account?{' '}
              <Link href="/register" className="text-stone-700 dark:text-amber-400 hover:underline underline-offset-4 transition font-medium">Register</Link>
            </>
          ) : mode === 'register' ? (
            <>Already have an account?{' '}
              <Link href="/login" className="text-stone-700 dark:text-amber-400 hover:underline underline-offset-4 transition font-medium">Sign In</Link>
            </>
          ) : (
            <Link href="/login" className="text-stone-700 dark:text-amber-400 hover:underline underline-offset-4 transition font-medium">← Back to Sign In</Link>
          )}
        </div>
      </div>
    </AuthShell>
  )
}

// ── Shared field component ──
function Field({ label, id, ...props }: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 mb-2 font-medium">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-full border border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-white/[0.04] px-4 py-3.5 text-sm text-stone-800 dark:text-stone-200 placeholder:text-stone-300 dark:placeholder:text-white/20 focus:outline-none focus:border-amber-500 dark:focus:border-amber-500/70 transition rounded-sm"
      />
    </div>
  )
}

// ── Layout shell with split panel ──
function AuthShell({ mode, children }: { mode: AuthMode; children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — decorative, hidden on mobile */}
      <div className="hidden lg:flex lg:w-[45%] relative bg-stone-900 dark:bg-[#080a12] flex-col justify-between p-12 overflow-hidden">
        {/* Particles */}
        <ParticleBg />

        {/* Mandala ornament */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-400 pointer-events-none">
          {ORNAMENT}
        </div>

        {/* Top logo */}
        <Link href="/" className="relative z-10 flex items-center gap-3 group">
          <ThemeLogo size={36} forceDark />
          <div>
            <p className="font-serif text-base text-white/90 tracking-wide group-hover:text-amber-400 transition">Divine Couture</p>
            <p className="text-[10px] tracking-[0.2em] text-white/35 uppercase">Indian Jewellery · UK</p>
          </div>
        </Link>

        {/* Centre quote */}
        <div className="relative z-10 text-center">
          <p className="text-amber-400/60 text-3xl mb-4">✦</p>
          <blockquote className="font-serif text-xl text-white/80 leading-relaxed italic max-w-xs mx-auto">
            "Where every piece tells a story of tradition and grace."
          </blockquote>
          <p className="text-xs text-white/30 mt-4 tracking-widest uppercase">Divine Couture</p>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-10">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-4" />
          <p className="text-xs text-white/30 tracking-widest uppercase text-center">Handcrafted · UK Delivered · Bridal Specialists</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col bg-[#faf8f5] dark:bg-[#0d0f1a]">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-6 py-5 border-b border-stone-100 dark:border-white/[0.05]">
          <Link href="/" className="flex items-center gap-2.5">
            <ThemeLogo size={30} />
            <span className="font-serif text-sm text-stone-900 dark:text-stone-100">Divine Couture</span>
          </Link>
          <Link href="/" className="text-xs text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 flex items-center gap-1 transition">
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </Link>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 md:px-12">
          <div className="w-full max-w-md">
            {/* Back link — desktop */}
            <Link href="/" className="hidden lg:inline-flex items-center gap-1.5 text-xs text-stone-400 dark:text-stone-500 hover:text-amber-600 dark:hover:text-amber-400 transition mb-10 group">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              Back to store
            </Link>

            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
