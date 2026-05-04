# LUXE - Components Reference Guide

## Component Overview

This guide provides detailed documentation for all reusable React components in the LUXE e-commerce platform. Each component is designed to be modular, maintainable, and follows the luxury design system.

---

## 1. LuxuryHeader

**File:** `components/luxury-header.tsx`

**Description:** Sticky navigation header with responsive design, search, shopping cart, and mobile menu toggle.

**Props:** None (standalone component)

**Features:**
- Sticky positioning with z-50
- Mobile hamburger menu
- Search icon integration
- Shopping cart with badge counter
- Responsive typography and spacing

**Usage:**
```tsx
import LuxuryHeader from '@/components/luxury-header'

export default function Page() {
  return (
    <>
      <LuxuryHeader />
      {/* Page content */}
    </>
  )
}
```

**Key Classes:**
- `sticky top-0 z-50` - Sticky positioning
- `text-sm tracking-wide uppercase` - Navigation styling
- `absolute -top-2 -right-2` - Badge positioning

---

## 2. ProductCard

**File:** `components/product-card.tsx`

**Description:** Individual product showcase with image, name, price, category, and wishlist functionality.

**Props:**
```tsx
interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: 'clothing' | 'accessories' | 'jewelry'
  isNew?: boolean
}
```

**Features:**
- Responsive image with hover scale effect
- New badge for recent products
- Wishlist button on hover
- Price formatted in GBP
- Category label with link

**Usage:**
```tsx
import ProductCard from '@/components/product-card'

export default function Collection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <ProductCard
        id="1"
        name="Emerald Drop Earrings"
        price={2450}
        image="/images/product-1.jpg"
        category="jewelry"
        isNew={true}
      />
    </div>
  )
}
```

---

## 3. HeroBanner

**File:** `components/hero-banner.tsx`

**Description:** Full-width hero section with background image, overlay, text content, and CTA button.

**Props:**
```tsx
interface HeroBannerProps {
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  backgroundImage: string
}
```

**Features:**
- Responsive height (h-96 to h-[600px])
- Dark overlay for text readability
- Centered text content
- Prominent CTA button
- Optimized image loading

**Usage:**
```tsx
import HeroBanner from '@/components/hero-banner'

export default function Page() {
  return (
    <HeroBanner
      title="Curated for You"
      subtitle="Discover our handpicked collection"
      ctaText="Shop Now"
      ctaHref="/shop"
      backgroundImage="/images/hero.jpg"
    />
  )
}
```

---

## 4. FeaturedCollections

**File:** `components/featured-collections.tsx`

**Description:** Grid layout showcasing curated collection categories with hover effects.

**Props:**
```tsx
interface Collection {
  id: string
  name: string
  image: string
  href: string
  description?: string
}

interface FeaturedCollectionsProps {
  collections: Collection[]
  title?: string
}
```

**Features:**
- Responsive 3-column grid (1 mobile, 2 tablet, 3 desktop)
- Image hover scale effect (110%)
- Overlay darkness on hover
- Optional description text
- "Explore" link with arrow

**Usage:**
```tsx
import FeaturedCollections from '@/components/featured-collections'

const collections = [
  {
    id: '1',
    name: 'Emerald Elegance',
    description: 'Jewelry collection',
    image: '/images/collection-1.jpg',
    href: '/shop/jewelry',
  },
]

export default function Page() {
  return <FeaturedCollections collections={collections} />
}
```

---

## 5. ProductShowcase

**File:** `components/product-showcase.tsx`

**Description:** Section component displaying products in grid with optional "View All" button.

**Props:**
```tsx
interface Product {
  id: string
  name: string
  price: number
  image: string
  category: 'clothing' | 'accessories' | 'jewelry'
  isNew?: boolean
}

interface ProductShowcaseProps {
  title: string
  subtitle?: string
  products: Product[]
  showViewAll?: boolean
}
```

**Features:**
- Flexible product grid (responsive columns)
- Section title and subtitle
- Optional "View All" button
- Uses ProductCard component
- Reusable across multiple sections

**Usage:**
```tsx
import ProductShowcase from '@/components/product-showcase'

const products = [
  {
    id: '1',
    name: 'Product Name',
    price: 1500,
    image: '/images/product.jpg',
    category: 'jewelry',
  },
]

export default function Page() {
  return (
    <ProductShowcase
      title="Trending This Season"
      subtitle="Most sought-after pieces"
      products={products}
    />
  )
}
```

---

## 6. CategoryFilter

**File:** `components/category-filter.tsx`

**Description:** Sidebar filter panel with expandable category and price filters.

**Props:**
```tsx
interface FilterOption {
  name: string
  value: string
  count: number
}

interface CategoryFilterProps {
  categories: FilterOption[]
  priceRange?: { min: number; max: number }
  onFilterChange?: (filters: any) => void
}
```

**Features:**
- Expandable filter sections
- Checkbox selections with counts
- Price range input fields
- Clear filters button
- Mobile-responsive (stacked on mobile)

**Usage:**
```tsx
import CategoryFilter from '@/components/category-filter'

const categories = [
  { name: 'Jewelry', value: 'jewelry', count: 24 },
  { name: 'Clothing', value: 'clothing', count: 18 },
  { name: 'Accessories', value: 'accessories', count: 31 },
]

export default function ShopPage() {
  return (
    <div className="flex gap-8">
      <CategoryFilter
        categories={categories}
        priceRange={{ min: 0, max: 5000 }}
      />
    </div>
  )
}
```

---

## 7. ImageGallery

**File:** `components/image-gallery.tsx`

**Description:** Product image carousel with thumbnail grid and navigation controls.

**Props:**
```tsx
interface ImageGalleryProps {
  images: string[]
  productName: string
}
```

**Features:**
- Main image display with hover navigation arrows
- Thumbnail grid for quick selection
- Image counter display
- Smooth hover transitions
- Responsive layout

**Usage:**
```tsx
import ImageGallery from '@/components/image-gallery'

const productImages = [
  '/images/product-1.jpg',
  '/images/product-2.jpg',
  '/images/product-3.jpg',
]

export default function ProductPage() {
  return (
    <ImageGallery
      images={productImages}
      productName="Emerald Drop Earrings"
    />
  )
}
```

---

## 8. ProductDetails

**File:** `components/product-details.tsx`

**Description:** Product information panel with description, quantity selector, and purchase options.

**Props:**
```tsx
interface ProductDetailsProps {
  name: string
  price: number
  category: string
  description: string
  details: string[]
  inStock: boolean
  sku: string
}
```

**Features:**
- Product title, price, and category
- Detailed description with features list
- Quantity selector with +/- buttons
- Add to Cart button
- Wishlist and Share buttons
- SKU and shipping information display

**Usage:**
```tsx
import ProductDetails from '@/components/product-details'

export default function ProductPage() {
  return (
    <ProductDetails
      name="Emerald Drop Earrings"
      price={2450}
      category="Jewelry"
      description="Stunning emerald drop earrings..."
      details={[
        'Emerald gemstones',
        '14K gold setting',
        'Hypoallergenic',
      ]}
      inStock={true}
      sku="EMLD-001"
    />
  )
}
```

---

## 9. NewsletterSection

**File:** `components/newsletter-section.tsx`

**Description:** Email signup form with validation and success state feedback.

**Props:** None (standalone)

**Features:**
- Email input with validation
- Submit button with success state
- Privacy notice
- Muted background section
- Clear messaging

**Usage:**
```tsx
import NewsletterSection from '@/components/newsletter-section'

export default function Page() {
  return (
    <>
      <main>{/* Content */}</main>
      <NewsletterSection />
    </>
  )
}
```

---

## 10. LuxuryFooter

**File:** `components/luxury-footer.tsx`

**Description:** Comprehensive footer with multiple link columns, social media, and brand info.

**Props:** None (standalone)

**Features:**
- Brand information and tagline
- Social media links (Instagram, Facebook, Twitter, LinkedIn)
- Multi-column link structure
- Copyright and location info
- Dark background with light text
- Fully responsive

**Usage:**
```tsx
import LuxuryFooter from '@/components/luxury-footer'

export default function Layout() {
  return (
    <>
      <main>{/* Content */}</main>
      <LuxuryFooter />
    </>
  )
}
```

---

## Component Composition Example

Here's how components work together on the homepage:

```tsx
import LuxuryHeader from '@/components/luxury-header'
import HeroBanner from '@/components/hero-banner'
import FeaturedCollections from '@/components/featured-collections'
import ProductShowcase from '@/components/product-showcase'
import NewsletterSection from '@/components/newsletter-section'
import LuxuryFooter from '@/components/luxury-footer'

export default function HomePage() {
  return (
    <main>
      <LuxuryHeader />
      
      <HeroBanner
        title="Curated for You"
        subtitle="Luxury fashion and jewelry"
        ctaText="Shop Now"
        ctaHref="/shop"
        backgroundImage="/images/hero.jpg"
      />
      
      <FeaturedCollections collections={featuredCollections} />
      
      <ProductShowcase
        title="Trending This Season"
        products={trendingProducts}
      />
      
      <NewsletterSection />
      
      <LuxuryFooter />
    </main>
  )
}
```

---

## Styling Patterns

### Hover Effects
```tsx
// Image scale on hover
<Image
  src={src}
  alt={alt}
  className="group-hover:scale-105 transition duration-500"
/>

// Text color on hover
<a href="#" className="hover:text-primary transition">
  Link
</a>

// Button hover
<button className="bg-primary hover:bg-primary/90 transition">
  Button
</button>
```

### Responsive Spacing
```tsx
// Section padding
<section className="py-16 md:py-24 px-4 md:px-6">

// Grid gaps
<div className="gap-6 md:gap-8">

// Typography scaling
<h1 className="text-3xl md:text-4xl font-serif">
```

### Grid Layouts
```tsx
// 4-column product grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

// 3-column collection grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// 2-column banner section
<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
```

---

## Best Practices

1. **Always use Image component from Next.js** for automatic optimization
2. **Implement proper error boundaries** for image loading failures
3. **Use semantic HTML** for accessibility (nav, main, article, etc.)
4. **Add descriptive alt text** to all images
5. **Test responsive breakpoints** on actual devices
6. **Use Tailwind's `group` utilities** for hover effects on containers
7. **Keep components focused** - one responsibility per component
8. **Document complex props** with TypeScript interfaces
9. **Use consistent spacing** from the design system
10. **Optimize images** with appropriate sizes and formats

---

## Future Component Ideas

- Product reviews section
- Customer testimonials carousel
- Size/color selectors
- Related products section
- Breadcrumb navigation
- Product comparison
- Live chat widget
- Abandoned cart notification
- VIP membership banner
