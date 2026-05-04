'use client'

/* eslint-disable @next/next/no-img-element */
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface ThemeLogoProps {
  size?: number
  className?: string
  /** Always invert — for permanently dark backgrounds (footer, sidebar) */
  forceDark?: boolean
}

export default function ThemeLogo({ size = 40, className = '', forceDark = false }: ThemeLogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const invert = forceDark || (mounted && resolvedTheme === 'dark')

  return (
    <img
      src="/images/divine-couture-logo.png"
      alt="Divine Couture"
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        display: 'block',
        flexShrink: 0,
        filter: invert ? 'invert(1)' : 'none',
        transition: 'filter 0.2s ease',
        // hide until mounted to avoid flash of wrong theme
        opacity: mounted || forceDark ? 1 : 0,
      }}
      className={className}
    />
  )
}
