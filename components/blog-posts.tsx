'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    title: '5 Interesting Ways to Shine in a Wedding!',
    excerpt: 'What according to you makes a bride look different from other brides in the country?',
    image: '/images/blog-wedding-looks.jpg',
  },
  {
    id: 2,
    title: '3 Offbeat Places to Consider for a Destination Wedding!',
    excerpt: 'Thinking of experimenting with your traditional wedding venue? Team Kokishh tells...',
    image: '/images/blog-wedding-destinations.jpg',
  },
  {
    id: 3,
    title: 'Winter Wedding Ideas for Your Special Day!',
    excerpt: 'Winter is always considered magical, and one of the best times to get married. Winter weddings...',
    image: '/images/blog-wedding-looks.jpg',
  },
  {
    id: 4,
    title: '5 Interesting Ways to Shine in a Wedding!',
    excerpt: 'What according to you makes a bride look different from other brides in the country?',
    image: '/images/blog-wedding-destinations.jpg',
  },
]

export default function BlogPosts() {
  const [scrollPosition, setScrollPosition] = useState(0)

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('blog-carousel')
    if (container) {
      const scrollAmount = 350
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        setScrollPosition(Math.max(0, scrollPosition - scrollAmount))
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        setScrollPosition(scrollPosition + scrollAmount)
      }
    }
  }

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-12">Blog Posts</h2>

        {/* Carousel Container */}
        <div className="relative">
          <div
            id="blog-carousel"
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {blogPosts.map((post) => (
              <div key={post.id} className="flex-shrink-0 w-full md:w-96 group">
                <div className="relative h-48 rounded overflow-hidden mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition duration-500"
                  />
                </div>
                <h3 className="font-serif text-lg font-bold mb-3 group-hover:text-primary transition line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <Link href="#" className="text-primary hover:text-primary/80 text-sm font-medium">
                  Read More
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/4 -translate-y-1/2 bg-white hover:bg-white/90 text-foreground p-2 rounded-full shadow-lg transition z-10 hidden md:block"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/4 -translate-y-1/2 bg-white hover:bg-white/90 text-foreground p-2 rounded-full shadow-lg transition z-10 hidden md:block"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Chat Icon */}
          <button className="absolute bottom-4 right-4 bg-secondary text-secondary-foreground p-3 rounded-full shadow-lg hover:bg-secondary/90 transition hidden md:flex">
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
