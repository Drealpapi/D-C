import Image from 'next/image'
import Link from 'next/link'

interface HeroBannerProps {
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  backgroundImage: string
}

export default function HeroBanner({ title, subtitle, ctaText, ctaHref, backgroundImage }: HeroBannerProps) {
  return (
    <section className="relative h-96 md:h-[600px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt={title}
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8 text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 text-balance">
          {title}
        </h1>
        <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl text-balance">
          {subtitle}
        </p>
        <Link
          href={ctaHref}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 md:px-10 py-3 md:py-4 text-sm md:text-base tracking-wider uppercase transition inline-block"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  )
}
