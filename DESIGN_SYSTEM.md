# LUXE - Design System Documentation

## Overview
LUXE is a contemporary luxury e-commerce platform for a UK-based fashion and jewelry brand. The design emphasizes sophisticated minimalism, timeless elegance, and a premium user experience.

## Color Palette

### Primary Colors
- **Emerald Green (Primary)**: `oklch(0.43 0.18 150)` - Rich, jewel-toned primary color representing luxury and sophistication
- **Gold (Secondary)**: `oklch(0.72 0.17 70)` - Warm accent color for highlights and CTAs

### Neutral Colors
- **Background**: `oklch(0.98 0.003 70)` - Off-white for premium appearance
- **Foreground**: `oklch(0.15 0.01 40)` - Deep charcoal for excellent readability
- **Muted**: `oklch(0.92 0.01 70)` - Light background for sections
- **Border**: `oklch(0.94 0.01 70)` - Subtle dividers and accents

### Dark Mode
- **Background**: `oklch(0.12 0.005 40)` - Deep charcoal
- **Foreground**: `oklch(0.95 0.003 70)` - Light off-white
- **Primary**: `oklch(0.55 0.18 150)` - Lighter emerald
- **Secondary**: `oklch(0.72 0.17 70)` - Gold remains consistent

## Typography

### Font Families
- **Serif (Headings)**: Geist Serif / Custom serif font - for elegant, premium feel
- **Sans-serif (Body)**: Geist / Inter - for modern readability

### Typography Scale
- **H1**: 2.25rem (36px) - 3rem (48px) on desktop
- **H2**: 1.875rem (30px) - 2.25rem (36px) on desktop
- **H3**: 1.5rem (24px)
- **Body**: 1rem (16px)
- **Small**: 0.875rem (14px)
- **Tiny**: 0.75rem (12px)

### Text Styles
- All uppercase navigation and CTAs for modern luxury aesthetic
- Letter spacing: `tracking-widest` (0.05em+) for nav items
- Line height: 1.6 (relaxed) for body text, 1.2 (tight) for headings

## Components

### 1. LuxuryHeader
Sticky navigation with:
- Logo (serif text or image)
- Desktop navigation menu (hidden on mobile)
- Search, cart, and mobile menu toggle
- Clean, minimal design with hover states

**Key Features:**
- Responsive design with hamburger menu
- Cart badge with item count
- Smooth transitions on interactions

### 2. ProductCard
Minimal product showcase with:
- High-resolution product image with hover scale effect
- Category label and product name
- Price in GBP format
- New badge for fresh arrivals
- Wishlist button on hover

**Layout:**
- 1 column mobile, 2 columns tablet, 4 columns desktop
- Generous spacing (gap-6 to gap-8)
- Image aspect ratio: 4:5 (portrait orientation)

### 3. HeroBanner
Full-width hero section with:
- Background image with dark overlay (40% opacity)
- Centered text content
- Prominent CTA button
- Responsive height (h-96 to h-[600px])

### 4. FeaturedCollections
Grid layout for collection highlights:
- 1 column mobile, 2 columns tablet, 3 columns desktop
- Collection images with hover scale effect
- Description text and "Explore" CTA
- Smooth transitions and overlays

### 5. ProductShowcase
Reusable section component:
- Flexible product grid
- Section title and optional subtitle
- "View All" button for browsing
- Optional background color (muted)

### 6. CategoryFilter
Sidebar filter panel with:
- Expandable filter sections (Category, Price)
- Checkbox selections
- Item counts per category
- Clear filters button
- Mobile-responsive (full-width then sidebar)

### 7. ImageGallery
Product image carousel:
- Main image display with thumbnail grid
- Previous/Next navigation arrows
- Image counter display
- Thumbnail selection
- Keyboard support (future enhancement)

### 8. ProductDetails
Product information panel:
- Product title, price, category
- Detailed description
- Bullet-point features
- Quantity selector with +/- buttons
- Add to cart and wishlist CTAs
- SKU and shipping information

### 9. NewsletterSection
Email signup form:
- Email input with validation
- Subscribe button with success state
- Privacy notice
- Muted background for distinction

### 10. LuxuryFooter
Comprehensive footer with:
- Brand information and social links
- Multi-column link structure
- Shop, Customer Care, About, Legal sections
- Copyright and location info
- Dark background (foreground color inverted)

## Layout & Spacing

### Grid System
- Max-width container: `max-w-7xl` (80rem)
- Responsive padding: `px-4 md:px-6`
- Gap spacing: `gap-6 md:gap-8` or `gap-8 md:gap-12`

### Vertical Spacing
- Section padding: `py-16 md:py-24`
- Component margins: `mb-4 md:mb-6`, `mb-8 md:mb-12`
- Consistent spacing scale using Tailwind's spacing

### Mobile-First Approach
- Default styles for mobile (360px+)
- `md:` breakpoint for tablets (768px+)
- `lg:` breakpoint for desktop (1024px+)
- Flexbox for primary layout method
- CSS Grid for 2D layouts (product grids)

## Interactive Elements

### Buttons
- **Primary CTA**: Solid emerald background with hover state
- **Secondary**: Bordered buttons with hover fill
- **Text Links**: Inline links with underline on hover
- Padding: `px-8 py-3` to `px-10 py-4` for prominence
- All uppercase text with letter spacing

### Hover States
- Image scale: `group-hover:scale-105` (5% zoom)
- Color transitions: `group-hover:text-primary`
- Opacity effects: `opacity-0 group-hover:opacity-100`
- Duration: `duration-500` for images, `transition` for text

### Form Elements
- Clean borders matching design system
- Focus states with primary color ring
- Placeholders in muted color
- Consistent padding and height

## Visual Effects

### Transitions
- Smooth transitions: `transition duration-500` for images
- Quick transitions: `transition` for text and borders
- Easing: Default ease-out for natural motion

### Overlays
- Dark overlays on images: 30-50% black opacity
- Hover overlays: Increase opacity on interaction
- Background gradients: Subtle primary/secondary color tints

### Typography Effects
- Text balance: `text-balance` for centered headings
- Pretty text: `text-pretty` for better line breaks
- Tracking: Increased letter spacing for upscale feel

## Responsive Breakpoints

| Breakpoint | Width | Use Case |
|------------|-------|----------|
| Mobile    | 360px+ | Default |
| `md:`     | 768px+ | Tablets & Small laptops |
| `lg:`     | 1024px+ | Desktops |

## Accessibility

- Semantic HTML structure (header, main, nav, footer)
- ARIA labels for icon-only buttons
- High contrast colors (WCAG AA compliant)
- Focus states for keyboard navigation
- Alt text on all product images
- Skip to main content links (future enhancement)

## Pages to Build

1. **Homepage** ✓ - Hero, collections, trending, newsletter
2. **Product Listing** - Category filters, sort, pagination
3. **Product Details** - Gallery, description, reviews, recommendations
4. **Shopping Cart** - Item list, quantity editor, checkout
5. **Checkout** - Shipping, payment, confirmation
6. **Account** - Login, profile, order history, wishlist
7. **About** - Brand story, values, team
8. **Contact** - Form, FAQs, support options

## Performance Considerations

- Next.js Image optimization
- Lazy loading for product images
- Component code splitting
- CSS-in-JS with Tailwind for minimal bundle
- Mobile-first responsive design
- SEO-friendly semantic HTML

## Future Enhancements

- Product recommendations engine
- Customer reviews and ratings
- Live chat support
- Augmented reality product preview
- Personalized shopping experience
- Advanced filtering (size, color, material)
- Social proof (customer photos)
- Inventory management
- Analytics integration
