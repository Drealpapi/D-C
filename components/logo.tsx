'use client'

/* eslint-disable @next/next/no-img-element */
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface ThemeLogoProps {
  size?: number
  className?: string
  /** Force dark version — for permanently dark backgrounds (footer, admin sidebar) */
  forceDark?: boolean
}

export default function ThemeLogo({ size = 48, className = '', forceDark = false }: ThemeLogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = forceDark || (mounted && resolvedTheme === 'dark')

  // Light mode: tightly-cropped transparent pale-pink monogram
  // Dark mode:  tightly-cropped transparent white monogram — no filters, no blending tricks
  return (
    <img
      src={isDark
        ? '/images/divine-couture-logo-dark-transparent.png'
        : '/images/divine-couture-logo-transparent.png'
      }
      alt="Divine Couture"
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        display: 'block',
        flexShrink: 0,
        opacity: mounted || forceDark ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}
      className={className}
    />
  )
}
