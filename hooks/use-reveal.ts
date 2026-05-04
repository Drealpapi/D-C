'use client'

import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to a section ref.
 * Any child with class `reveal`, `reveal-left`, or `reveal-right`
 * gets the `visible` class added when it enters the viewport.
 */
export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll<HTMLElement>('.reveal, .reveal-left, .reveal-right')
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
