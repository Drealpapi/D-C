'use client'

import DivineHeader from '@/components/divine-header'
import DivineFooter from '@/components/divine-footer'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

interface ComingSoonProps {
  category: string
  description: string
}

export default function ComingSoon({ category, description }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-[#fdf0f2] dark:bg-[#0d0f1a] flex flex-col">
      <DivineHeader />
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-lg mx-auto">

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-500/10 border border-rose-200/60 dark:border-rose-500/20 mb-8">
            <Sparkles className="w-7 h-7 text-rose-400 dark:text-rose-300" />
          </div>

          {/* Label */}
          <p className="text-[11px] uppercase tracking-[0.3em] text-rose-400 dark:text-rose-400/70 mb-4 font-medium">
            Coming Soon
          </p>

          {/* Heading */}
          <h1 className="font-serif text-4xl md:text-5xl text-rose-950 dark:text-white/90 mb-5 leading-tight">
            {category}
          </h1>

          {/* Description */}
          <p className="text-sm text-rose-600/60 dark:text-white/35 leading-relaxed mb-10 max-w-sm mx-auto">
            {description} We're putting the finishing touches on this collection — check back soon.
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-rose-300/50 dark:via-rose-500/20 to-transparent mb-10" />

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/shop/jewelry"
              className="px-6 py-3 bg-rose-400 dark:bg-rose-500 text-white text-xs font-bold tracking-[0.15em] uppercase rounded-xl hover:bg-rose-500 dark:hover:bg-rose-400 transition shadow-[0_4px_20px_rgba(225,100,120,0.3)]"
            >
              Shop Jewellery
            </Link>
            <Link
              href="/"
              className="px-6 py-3 border border-rose-200 dark:border-white/10 text-rose-700 dark:text-white/50 text-xs font-medium tracking-[0.15em] uppercase rounded-xl hover:bg-rose-50 dark:hover:bg-white/[0.04] transition"
            >
              Back to Home
            </Link>
          </div>

          {/* Trust note */}
          <p className="mt-10 text-[10px] tracking-[0.2em] text-rose-300/70 dark:text-white/20 uppercase">
            ✦ &nbsp;Handcrafted Indian Jewellery · UK&nbsp; ✦
          </p>
        </div>
      </main>
      <DivineFooter />
    </div>
  )
}
