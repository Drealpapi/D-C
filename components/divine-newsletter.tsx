'use client'

import { Mail } from 'lucide-react'
import { useState } from 'react'

export default function DivineNewsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-primary mb-3">
            Stay Connected
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Subscribe to Our Collections
          </h2>
          <p className="text-foreground/70 max-w-xl mx-auto">
            Be the first to know about new collections, exclusive offers, and styling tips from our experts.
          </p>
        </div>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="flex-1 relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 pointer-events-none" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 bg-background border-2 border-border focus:border-primary outline-none transition duration-300 text-foreground placeholder:text-foreground/40"
              disabled={status === 'loading'}
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold uppercase tracking-wider text-sm transition duration-300 disabled:opacity-70"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {/* Status Messages */}
        {status === 'success' && (
          <p className="mt-4 text-sm text-primary font-medium">
            ✓ Thank you for subscribing! Check your email for exclusive offers.
          </p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-sm text-destructive font-medium">
            Something went wrong. Please try again.
          </p>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-foreground/50 mt-6">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
