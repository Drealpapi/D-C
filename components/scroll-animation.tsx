'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  variant?: 'fadeUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'antiGravity'
}

export default function ScrollAnimation({
  children,
  className = '',
  variant = 'fadeUp',
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const animationClasses = {
    fadeUp: 'opacity-0 translate-y-8 animate-[fadeUp_0.6s_ease-out_forwards]',
    slideLeft: 'opacity-0 -translate-x-8 animate-[slideLeft_0.6s_ease-out_forwards]',
    slideRight: 'opacity-0 translate-x-8 animate-[slideRight_0.6s_ease-out_forwards]',
    scaleIn: 'opacity-0 scale-95 animate-[scaleIn_0.6s_ease-out_forwards]',
    antiGravity: 'opacity-0 translate-y-12 animate-[antiGravity_0.8s_cubic-bezier(0.34,1.56,0.64,1)_forwards]',
  }

  return (
    <div
      ref={ref}
      className={`${animationClasses[variant]} ${className}`}
    >
      {children}
    </div>
  )
}
