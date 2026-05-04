'use client'

import Image from 'next/image'

interface CategoryBannerProps {
  title: string
  subtitle?: string
  backgroundImage: string
  overlay?: boolean
}

export default function CategoryBanner({
  title,
  subtitle,
  backgroundImage,
  overlay = true,
}: CategoryBannerProps) {
  return (
    <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden rounded-lg">
      <Image
        src={backgroundImage}
        alt={title}
        fill
        className="object-cover object-center"
        priority
      />

      {overlay && <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl font-light max-w-lg">
            {subtitle}
          </p>
        )}
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" />
    </div>
  )
}
