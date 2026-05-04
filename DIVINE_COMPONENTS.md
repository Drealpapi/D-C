# Divine Couture - React/Next.js Component Library

Comprehensive documentation for reusable components tailored for Indian fashion and jewelry e-commerce.

## Design System Overview

**Color Palette:**
- **Primary (Emerald):** oklch(0.43 0.18 150) - Main brand color for CTAs and highlights
- **Secondary (Gold):** oklch(0.72 0.17 70) - Accent color for special elements
- **Background:** oklch(0.98 0.003 70) - Clean, minimal cream-white
- **Foreground:** oklch(0.15 0.01 40) - Deep charcoal for text
- **Muted:** oklch(0.92 0.01 70) - Light gray for hover states

**Typography:**
- **Headings:** Lora (Serif) - Elegant, traditional aesthetic
- **Body:** Geist (Sans-serif) - Modern, clean readability
- **Spacing:** 24px grid-based system (py-16, py-24 for sections)

**Layout:**
- Mobile-first responsive design
- 1 column mobile → 2 columns tablet → 3-4 columns desktop
- Generous whitespace (24-32px padding)
- Minimalist aesthetic with cultural elements

---

## Core Components

### 1. DivineHeader
**Location:** `/components/divine-header.tsx`

Navigation header with logo, category menu, search, wishlist, and cart.

**Props:**
```typescript
// No props - uses hardcoded categories
const categories = [
  { name: 'Sarees', href: '/shop/sarees' },
  { name: 'Lehengas', href: '/shop/lehengas' },
  { name: 'Jewelry', href: '/shop/jewelry' },
  { name: 'Accessories', href: '/shop/accessories' },
  { name: 'Collections', href: '/collections' },
]
```

**Features:**
- Sticky positioning
- Mobile hamburger menu
- Top promotional bar (hidden on mobile)
- Cart badge with item count
- Wishlist button
- Search functionality placeholder

**Usage:**
```tsx
import DivineHeader from '@/components/divine-header'

export default function Layout() {
  return <DivineHeader />
}
```

---

### 2. DivineHero
**Location:** `/components/divine-hero.tsx`

Full-width hero banner with overlay text and call-to-action.

**Props:**
```typescript
interface DivineHeroProps {
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  backgroundImage: string
}
```

**Features:**
- Full-width responsive height (500px mobile, 600px desktop)
- Gradient overlay with decorative mandala pattern
- Centered content with optimal text contrast
- Smooth hover effects on CTA button
- Image priority loading for performance

**Usage:**
```tsx
<DivineHero
  title="Where Tradition Meets Couture"
  subtitle="Discover exquisite Indian fashion and jewelry..."
  ctaText="Explore Collections"
  ctaHref="/shop"
  backgroundImage="/images/divine-hero.jpg"
/>
```

---

### 3. DivineProductCard
**Location:** `/components/divine-product-card.tsx`

Product showcase card with image, pricing, badges, and interactions.

**Props:**
```typescript
interface DivineProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: 'saree' | 'lehenga' | 'jewelry' | 'accessories'
  isNew?: boolean
  isOnSale?: boolean
  href: string
}
```

**Features:**
- Image zoom on hover (scale-110)
- New/Sale badges
- Dynamic discount percentage calculation
- Wishlist toggle button (appears on hover)
- "Add to Bag" button with icon
- Price display with strikethrough original price
- Indian Rupee currency formatting
- Smooth transitions and animations

**Usage:**
```tsx
<DivineProductCard
  id="1"
  name="Emerald Silk Saree"
  price={8500}
  originalPrice={10500}
  image="/images/product-saree-1.jpg"
  category="saree"
  isNew={true}
  isOnSale={true}
  href="/shop/sarees/emerald-silk-saree"
/>
```

---

### 4. DivineCollections
**Location:** `/components/divine-collections.tsx`

3-column grid showcasing featured collections.

**Props:**
```typescript
interface Collection {
  id: string
  title: string
  subtitle: string
  image: string
  href: string
  color: 'primary' | 'secondary' | 'accent'
}

interface DivineCollectionsProps {
  collections: Collection[]
  title?: string // Default: 'Curated Collections'
}
```

**Features:**
- Responsive 3-column desktop, 2-column tablet, 1-column mobile
- Image scale on hover
- Gradient overlay enhancement
- Shop CTA with arrow animation
- Section header with divider
- Multiple color theme support

**Usage:**
```tsx
<DivineCollections
  collections={collections}
  title="Curated Collections"
/>
```

---

### 5. DivineFeatured
**Location:** `/components/divine-featured.tsx`

Product showcase section with grid layout and "View All" button.

**Props:**
```typescript
interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: 'saree' | 'lehenga' | 'jewelry' | 'accessories'
  isNew?: boolean
  isOnSale?: boolean
  href: string
}

interface DivineFeaturedProps {
  title: string
  subtitle?: string
  products: Product[]
  viewAllHref?: string // Default: '/shop'
}
```

**Features:**
- 4-column responsive grid
- Subtitle/section label
- Decorative section divider
- "View All" button with border style
- Integrates DivineProductCard component

**Usage:**
```tsx
<DivineFeatured
  title="Trending This Season"
  subtitle="Most Loved"
  products={trendingProducts}
  viewAllHref="/shop"
/>
```

---

### 6. DivineStory
**Location:** `/components/divine-story.tsx`

Brand story section with stats and decorative elements.

**Features:**
- 2-column layout (left text, right stats)
- Animated background gradients
- Statistics showcase (500+ Designs, 10K+ Customers, etc.)
- Decorative dividers with symbols
- Responsive design

**Usage:**
```tsx
<DivineStory />
```

---

### 7. DivineCategories
**Location:** `/components/divine-categories.tsx`

4-category grid showcase with images.

**Props:**
```typescript
interface Category {
  id: string
  name: string
  description: string
  image: string
  href: string
  icon?: string
}

interface DivineCategoriesProps {
  categories: Category[]
}
```

**Features:**
- 4-column responsive grid
- Category images with overlays
- Descriptive text
- Dynamic background colors per category
- Image hover scale effects

**Usage:**
```tsx
<DivineCategories categories={categories} />
```

---

### 8. DivineNewsletter
**Location:** `/components/divine-newsletter.tsx`

Email subscription form with validation.

**Features:**
- Email input with icon
- Loading state management
- Success/error feedback
- Disabled state during submission
- Clean responsive design
- Form validation

**Usage:**
```tsx
<DivineNewsletter />
```

---

### 9. DivineFooter
**Location:** `/components/divine-footer.tsx`

Comprehensive footer with multiple columns and social links.

**Features:**
- Brand info and social links
- Shop category links
- Help & information links
- Contact information
- Current year auto-generation
- Mobile responsive layout
- Social media icons (Instagram, Facebook, Twitter, LinkedIn)
- Legal links (Privacy, Terms, Sitemap)

**Usage:**
```tsx
<DivineFooter />
```

---

## Layout Patterns

### Homepage Layout
```
DivineHeader
  ↓
DivineHero
  ↓
DivineCollections
  ↓
DivineStory
  ↓
DivineCategories
  ↓
DivineFeatured (Trending)
  ↓
DivineNewsletter
  ↓
DivineFooter
```

### Shop Page Layout
```
DivineHeader
  ↓
Category Hero Banner
  ↓
DivineCategories (Filters)
  ↓
Product Grid (Multiple DivineFeatured sections)
  ↓
DivineNewsletter
  ↓
DivineFooter
```

---

## Styling Guidelines

### Component Spacing
```
Section padding: py-16 (mobile) → py-24 (desktop)
Gap between items: gap-6 (mobile) → gap-8 (desktop)
Card padding: p-8 (mobile) → p-12 (desktop)
```

### Hover Effects
- Image zoom: scale-110 (500ms transition)
- Text color: hover:text-primary
- Opacity: opacity-0 → opacity-100 on group-hover
- Button: hover:bg-primary/90

### Responsive Breakpoints
```
Mobile: < 768px (md:)
Tablet: 768px - 1024px (lg:)
Desktop: > 1024px
```

---

## Color Usage Examples

**Primary (Emerald) Use Cases:**
- Main CTAs and buttons
- Section dividers
- Text highlights
- Link hovers
- Badge highlights

**Secondary (Gold) Use Cases:**
- Alternative CTAs
- Accent badges
- Social icons
- Special highlights
- Secondary buttons

**Muted Use Cases:**
- Hover backgrounds
- Secondary backgrounds
- Disabled states
- Background sections

---

## Best Practices

1. **Always use the design system colors** - Don't add arbitrary colors
2. **Maintain consistent spacing** - Use 24px grid multiples
3. **Prioritize mobile-first** - Build mobile layout first, then enhance
4. **Use semantic HTML** - Proper heading hierarchy, alt text
5. **Optimize images** - Use Next.js Image component with quality settings
6. **Link structure** - Use Next.js Link for internal navigation
7. **Accessibility** - Proper color contrast, aria labels where needed
8. **Performance** - Lazy load images, code-split components

---

## Integration with Next.js 16

All components are optimized for:
- App Router (default)
- Server Components (where applicable)
- Client Components (marked with 'use client')
- Image optimization
- Dynamic imports for better performance

---

## Customization Guide

### Adding New Categories
Edit `/app/page.tsx` categories array:
```tsx
const categories = [
  { id: '5', name: 'Fusion', description: '...', image: '...', href: '/shop/fusion' },
  // Add new category
]
```

### Changing Colors
Update `/app/globals.css` root variables:
```css
--primary: oklch(...) /* Your emerald shade */
--secondary: oklch(...) /* Your gold shade */
```

### Modifying Product Data
All products use the same `Product` interface - easily swap real database queries:
```tsx
// Replace mock data with:
const trendingProducts = await fetchTrendingProducts()
```

---

## Performance Optimizations

- Image lazy loading with next/image
- Dynamic component imports
- Responsive image sizes
- Optimized font loading (Lora + Geist)
- CSS classes instead of inline styles
- Efficient hover states using group selectors

---

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Future Enhancement Ideas

1. Product filters & search
2. Shopping cart integration
3. User authentication
4. Product reviews section
5. Size/color variant selection
6. Wishlist persistence
7. Payment integration
8. Order tracking dashboard
