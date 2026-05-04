export default function DivineStory() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary mb-3">
                Our Story
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Where Tradition Meets Couture
              </h2>
            </div>

            <p className="text-foreground/80 leading-relaxed text-lg">
              Divine Couture celebrates the timeless beauty of Indian fashion, reimagined for the modern woman. Each piece is curated with meticulous attention to detail, blending centuries-old craftsmanship with contemporary design sensibility.
            </p>

            <p className="text-foreground/70 leading-relaxed">
              From intricately embroidered sarees to stunning lehengas, from delicate jewelry to elegant accessories—every creation tells a story of heritage, artistry, and luxury.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="text-primary font-semibold uppercase text-sm tracking-wider hover:gap-2 inline-flex gap-1 transition group"
              >
                Discover Our Collections
                <span className="group-hover:translate-x-1 transition">→</span>
              </a>
            </div>
          </div>

          {/* Right - Pattern & Stats */}
          <div className="relative">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />

            <div className="relative bg-white p-6 md:p-12 space-y-6 md:space-y-8 z-10">
              {/* Decorative Line */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-primary to-transparent" />
                <span className="text-primary font-serif text-2xl">✦</span>
                <div className="flex-1 h-px bg-gradient-to-l from-primary to-transparent" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div>
                  <p className="font-serif text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-foreground/60 uppercase tracking-wide">
                    Designs
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-primary">10K+</p>
                  <p className="text-sm text-foreground/60 uppercase tracking-wide">
                    Happy Clients
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-secondary">100%</p>
                  <p className="text-sm text-foreground/60 uppercase tracking-wide">
                    Authentic
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-secondary">5+ Yrs</p>
                  <p className="text-sm text-foreground/60 uppercase tracking-wide">
                    Excellence
                  </p>
                </div>
              </div>

              {/* Decorative Line */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary" />
                <span className="text-primary font-serif text-2xl">✦</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
