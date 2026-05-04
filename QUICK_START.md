# Divine Couture - Quick Start Guide

## Getting Started

### Installation
```bash
# Clone repository
git clone [repository-url]
cd divine-couture

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Project Overview

**Divine Couture** is a luxury Indian fashion e-commerce platform featuring:
- 5 dedicated category pages (Sarees, Lehengas, Jewelry, Accessories, Collections)
- 15+ reusable React components with animations
- 11 high-quality product images
- Sticky footer layout (always visible)
- Anti-gravity scroll animations
- Responsive mobile design
- GBP pricing throughout

---

## Key Pages & Routes

| Page | Route | Purpose |
|------|-------|---------|
| Homepage | `/` | Hero, collections, trending products |
| Sarees | `/shop/sarees` | 6 saree products with filters |
| Lehengas | `/shop/lehengas` | 6 bridal/festive lehengas with filters |
| Jewelry | `/shop/jewelry` | 6 jewelry pieces with filters |
| Accessories | `/shop/accessories` | 6 accessories with filters |
| Collections | `/shop/collections` | 6 curated collections |

---

## Component Quick Reference

### Animated Product Card
```tsx
import AnimatedProductCard from '@/components/animated-product-card'

<AnimatedProductCard
  id="1"
  name="Emerald Silk Saree"
  price={8500}
  originalPrice={10500}
  image="/images/saree-emerald-1.jpg"
  category="Saree"
  isNew={true}
  isOnSale={true}
  href="/shop/sarees"
/>
```

### Scroll Animation
```tsx
import ScrollAnimation from '@/components/scroll-animation'

<ScrollAnimation variant="antiGravity">
  <YourComponent />
</ScrollAnimation>

// Available variants:
// - fadeUp
// - slideLeft
// - slideRight
// - scaleIn
// - antiGravity
```

### Category Page
```tsx
import CategoryPageLayout from '@/components/category-page-layout'

<CategoryPageLayout
  categoryName="Sarees"
  categoryDescription="Explore our stunning saree collection"
  bannerImage="/images/collection-sarees.jpg"
  products={products}
  filters={filters}
/>
```

---

## Color System

```css
/* Emerald Green (Primary) */
oklch(0.43 0.18 150)  /* --primary */

/* Gold (Secondary) */
oklch(0.72 0.17 70)   /* --secondary */

/* Cream Background */
oklch(0.98 0.003 70)  /* --background */

/* Deep Charcoal Text */
oklch(0.15 0.01 40)   /* --foreground */
```

Use in Tailwind:
```tsx
<div className="bg-primary text-primary-foreground">Content</div>
<button className="hover:bg-secondary">Button</button>
```

---

## Adding New Products

1. Add image to `/public/images/`
2. Update `/lib/product-data.ts`:
```typescript
export const trendingProducts: Product[] = [
  {
    id: '9',
    name: 'New Product Name',
    price: 9999,
    originalPrice: 12000,
    image: '/images/product-new.jpg',
    category: 'saree',
    isNew: true,
    isOnSale: true,
    href: '/shop/sarees',
  },
  // ... more products
]
```

3. Update category page in `/app/shop/[category]/page.tsx`

---

## Animations

### Scroll-Triggered Animations
Components automatically animate when entering viewport:

```tsx
<ScrollAnimation variant="fadeUp">
  <div>This fades up when visible</div>
</ScrollAnimation>
```

### Hover Animations
Product cards have built-in hover effects:
- Image zoom (scale 1.1)
- Quick action buttons appear
- Wishlist toggle with icon change

### Custom Animations
Define in `/lib/animations.ts` and use with Framer Motion:

```typescript
export const customAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}
```

---

## Responsive Breakpoints

```css
/* Mobile First */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

Example:
```tsx
<div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {/* 1 column mobile, 2 tablet, 3 desktop */}
</div>
```

---

## Form & Input Components

All forms use consistent styling:
```tsx
<input 
  className="px-3 py-2 border border-border rounded-lg text-foreground"
  placeholder="Search..."
/>

<button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90">
  Submit
</button>
```

---

## SEO Setup

1. Update `/app/layout.tsx` metadata:
```typescript
export const metadata: Metadata = {
  title: 'Divine Couture - Luxury Indian Fashion',
  description: 'Exquisite sarees, lehengas, and jewelry',
}
```

2. Add structured data (JSON-LD) for products
3. Create `/public/sitemap.xml`
4. Create `/public/robots.txt`

---

## Performance Tips

1. Use Next.js Image component:
```tsx
import Image from 'next/image'
<Image src="/image.jpg" alt="desc" width={800} height={600} />
```

2. Lazy load images:
```tsx
<Image loading="lazy" />
```

3. Optimize animations (CSS > JS):
```css
/* Good - CSS animates at 60fps */
@keyframes slideIn { /* ... */ }

/* Avoid - JS causes jank */
element.style.left = x + 'px'
```

---

## Troubleshooting

### Footer Not Showing
- Check `/app/layout.tsx` has flex structure
- Ensure body has `flex flex-col min-h-screen`
- Main content should have `flex-1`

### Animations Not Working
- Verify ScrollAnimation wrapper is used
- Check globals.css includes animation keyframes
- Ensure variant name is correct

### Images Not Loading
- Check path starts with `/` (relative to public)
- Verify image exists in `/public/images/`
- Use Next.js Image component for optimization

### Filters Not Working
- Ensure filters passed to CategoryPageLayout
- Check filter structure matches FilterGroup interface
- Verify product category values match filter options

---

## Deployment

### Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys from GitHub
# Configure in Vercel dashboard
```

### Manual Deployment
```bash
pnpm build
pnpm start
```

---

## File Size Reference

- Main bundle: ~150KB
- CSS: ~50KB
- Images (11 products): ~5MB
- Total: ~5.2MB

---

## Support

- Documentation: `DIVINE_COUTURE_GUIDE.md`
- Components: Check JSDoc comments in component files
- Styling: Reference Tailwind CSS docs

---

Last Updated: 2024
Divine Couture © All Rights Reserved
