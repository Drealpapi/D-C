'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

interface Particle {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  opacity: number
  opacitySpeed: number
  color: string
}

export default function ParticleBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const animRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isDark = resolvedTheme === 'dark'

    // Gold tones for light, gold + indigo-tinted for dark
    const colors = isDark
      ? [
          'rgba(212,175,55,',   // gold
          'rgba(255,215,100,',  // bright gold
          'rgba(180,140,255,',  // soft violet
          'rgba(255,200,80,',   // amber
        ]
      : [
          'rgba(180,130,40,',   // deep gold
          'rgba(212,175,55,',   // gold
          'rgba(200,160,60,',   // warm gold
          'rgba(160,110,30,',   // dark gold
        ]

    function resize() {
      canvas!.width  = canvas!.offsetWidth
      canvas!.height = canvas!.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const COUNT = 38

    function makeParticle(): Particle {
      return {
        x:            Math.random() * canvas!.width,
        y:            canvas!.height + Math.random() * 100,
        size:         Math.random() * 3 + 0.8,
        speedY:       -(Math.random() * 0.5 + 0.2),
        speedX:       (Math.random() - 0.5) * 0.3,
        opacity:      0,
        opacitySpeed: Math.random() * 0.004 + 0.002,
        color:        colors[Math.floor(Math.random() * colors.length)],
      }
    }

    particlesRef.current = Array.from({ length: COUNT }, makeParticle)
    // stagger starting positions
    particlesRef.current.forEach((p, i) => {
      p.y = canvas.height - (i / COUNT) * canvas.height
    })

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      particlesRef.current.forEach((p, i) => {
        p.y += p.speedY
        p.x += p.speedX
        p.opacity += p.opacitySpeed
        if (p.opacity > 0.7) p.opacitySpeed = -Math.abs(p.opacitySpeed)

        // reset when off screen
        if (p.y < -20 || p.opacity <= 0) {
          particlesRef.current[i] = makeParticle()
          return
        }

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = p.color + Math.max(0, p.opacity).toFixed(2) + ')'
        ctx!.fill()
      })

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
