'use client'

import { Send } from 'lucide-react'
import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    setEmail('')
  }

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-background">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Stay Inspired</h2>
        <p className="text-muted-foreground mb-8">
          Subscribe to receive exclusive previews, styling tips, and invitations to our private events. We respect your privacy.
        </p>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 items-center justify-center">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 w-full md:w-auto px-4 py-3 border border-border rounded bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-3 rounded font-medium transition flex items-center justify-center gap-2 w-full md:w-auto"
          >
            <Send className="w-5 h-5" />
            <span>Subscribe</span>
          </button>
        </form>
      </div>
    </section>
  )
}
