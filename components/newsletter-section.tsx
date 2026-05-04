'use client'

import { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section className="bg-muted py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Content */}
        <h2 className="text-2xl md:text-4xl font-serif font-bold text-foreground mb-4">
          Subscribe to Luxury
        </h2>
        <p className="text-muted-foreground text-sm md:text-base mb-8">
          Receive exclusive previews of new collections, styling tips, and special offers delivered to your inbox
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-6 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-sm tracking-wider uppercase transition whitespace-nowrap"
          >
            {submitted ? 'Subscribed' : 'Subscribe'}
          </button>
        </form>

        {/* Note */}
        <p className="text-xs text-muted-foreground mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}
