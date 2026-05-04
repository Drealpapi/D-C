'use client'

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect, useState, useCallback } from 'react'

const ParticleBg = dynamic(() => import('@/components/particle-bg'), { ssr: false })

interface Slide {
  image: string
  location: string
  tagline: string
}

const SLIDES: Slide[] = [
  {
    image: '/images/divine-hero.jpg',
    location: 'Divine Couture · UK',
    tagline: 'Crafted for the Modern Indian Woman',
  },
  {
    image: '/images/hero-sarees-sherwani.jpg',
    location: 'Inspired by Jaipur',
    tagline: "The Pink City's Timeless Elegance",
  },
  {
    image: '/images/collection-lehengas.jpg',
    location: 'Inspired by Udaipur',
    tagline: 'City of Lakes, City of Royals',
  },
  {
    image: '/images/collection-sarees.jpg',
    location: 'Inspired by Varanasi',
    tagline: 'Where Silk Weaving Meets Sacred Tradition',
  },
  {
    image: '/images/gold-lehenga.jpg',
    location: 'Inspired by Mumbai',
    tagline: 'Where Bollywood Glamour Meets Heritage',
  },
  {
    image: '/images/collection-jewelry.jpg',
    location: 'Inspired by Hyderabad',
    tagline: 'The City of Nizams & Pearls',
  },
]

interface DivineHeroProps {
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  backgroundImage?: string
}

export default function DivineHero({ title, subtitle, ctaText, ctaHref }: DivineHeroProps) {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev]       = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)

  const goTo = useCallback((idx: number) => {
    if (transitioning || idx === current) return
    setPrev(current)
    setTransitioning(true)
    setCurrent(idx)
    setTimeout(() => {
      setPrev(null)
      setTransitioning(false)
    }, 1200)
  }, [current, transitioning])

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length)
  }, [current, goTo])

  // Auto-advance every 17 seconds
  useEffect(() => {
    const id = setInterval(next, 17000)
    return () => clearInterval(id)
  }, [next])

  const slide = SLIDES[current]

  return (
    <section className="relative w-full h-[70vh] min-h-[480px] md:h-[92vh] overflow-hidden bg-stone-900">

      {/* Previous slide (fading out) */}
      {prev !== null && (
        <div className="absolute inset-0 z-0">
          <Image
            src={SLIDES[prev].image}
            alt={SLIDES[prev].location}
            fill
            className="object-cover object-center scale-105"
            quality={92}
          />
        </div>
      )}

      {/* Current slide (fading in) */}
      <div
        key={current}
        className="absolute inset-0 z-10"
        style={{
          animation: 'heroFadeIn 1.2s ease-in-out forwards',
        }}
      >
        <Image
          src={slide.image}
          alt={slide.location}
          fill
          className="object-cover object-center scale-105"
          priority={current === 0}
          quality={92}
        />
      </div>

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/72 via-black/38 to-black/12" />
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

      {/* Floating gold particles */}
      <div className="absolute inset-0 z-20">
        <ParticleBg />
      </div>

      {/* Decorative corner ornament */}
      <div className="absolute top-8 right-8 md:top-12 md:right-12 opacity-30 hidden md:block z-30">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <path d="M40 4 L76 40 L40 76 L4 40 Z" stroke="rgba(212,175,55,0.8)" strokeWidth="1" fill="none"/>
          <path d="M40 14 L66 40 L40 66 L14 40 Z" stroke="rgba(212,175,55,0.5)" strokeWidth="0.5" fill="none"/>
          <circle cx="40" cy="40" r="3" fill="rgba(212,175,55,0.6)"/>
        </svg>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-30 flex flex-col justify-center px-5 md:px-16 lg:px-24">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <div
            key={`eyebrow-${current}`}
            className="flex items-center gap-3 mb-3 md:mb-6 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="h-px w-6 md:w-8 bg-amber-400/70" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-amber-300/90 font-medium">
              {slide.location}
            </p>
          </div>

          {/* Title */}
          <h1
            key={`title-${current}`}
            className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-3 md:mb-6 animate-fade-up"
            style={{ animationDelay: '0.25s', textShadow: '0 2px 40px rgba(0,0,0,0.4)' }}
          >
            {current === 0 ? title : slide.tagline}
          </h1>

          {/* Subtitle — hidden on smallest screens to reduce clutter */}
          <p
            key={`sub-${current}`}
            className="hidden sm:block text-white/75 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-10 max-w-lg animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            {subtitle}
          </p>

          {/* CTAs — always side by side, compact */}
          <div className="flex flex-row gap-2.5 animate-fade-up" style={{ animationDelay: '0.55s' }}>
            <Link
              href={ctaHref}
              className="group relative inline-flex items-center gap-2 px-5 md:px-8 py-2.5 md:py-3.5 bg-rose-400 dark:bg-amber-500 text-white dark:text-stone-900 text-[11px] md:text-xs font-bold tracking-[0.12em] md:tracking-[0.15em] uppercase transition-all duration-300 hover:bg-rose-500 dark:hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(244,114,182,0.35)] dark:hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] whitespace-nowrap"
            >
              <span>{ctaText}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/shop/collections"
              className="inline-flex items-center gap-2 px-5 md:px-8 py-2.5 md:py-3.5 border border-white/40 text-white text-[11px] md:text-xs font-medium tracking-[0.12em] md:tracking-[0.15em] uppercase hover:border-rose-300/70 dark:hover:border-amber-400/70 hover:text-rose-200 dark:hover:text-amber-300 transition-all duration-300 backdrop-blur-sm whitespace-nowrap"
            >
              Collections
            </Link>
          </div>

          {/* Trust badges — hidden on mobile, shown sm+ */}
          <div className="hidden sm:flex items-center gap-5 mt-8 md:mt-12 animate-fade-in" style={{ animationDelay: '0.75s' }}>
            {['Handcrafted', 'UK Delivery', 'Bridal Specialists'].map((badge, i) => (
              <div key={badge} className="flex items-center gap-2">
                {i > 0 && <div className="w-px h-3 bg-white/20" />}
                <span className="text-xs text-white/55 tracking-wider">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide indicators — moved up slightly on mobile */}
      <div className="absolute bottom-6 md:bottom-10 left-5 md:left-16 lg:left-24 z-30 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-500 rounded-full ${
              i === current
                ? 'w-8 h-1.5 bg-amber-400'
                : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-[2px] bg-white/10">
        <div
          key={`progress-${current}`}
          className="h-full bg-amber-400/60"
          style={{ animation: 'slideProgress 17s linear forwards' }}
        />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 z-30 bg-gradient-to-t from-background to-transparent" />

      <style jsx>{`
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  )
}
