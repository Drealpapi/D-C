import DivineHeader from '@/components/divine-header'
import CategoryPageLayout from '@/components/category-page-layout'
import DivineFooter from '@/components/divine-footer'

const filters = [
  {
    title: 'Fabric',
    options: [
      { label: 'Pure Silk', value: 'silk', count: 24 },
      { label: 'Cotton', value: 'cotton', count: 18 },
      { label: 'Linen Blend', value: 'linen', count: 12 },
    ],
  },
  {
    title: 'Color',
    options: [
      { label: 'Emerald Green', value: 'green', count: 15 },
      { label: 'Gold', value: 'gold', count: 14 },
      { label: 'Burgundy', value: 'burgundy', count: 10 },
      { label: 'Cream', value: 'cream', count: 15 },
    ],
  },
  {
    title: 'Embroidery',
    options: [
      { label: 'Zari Work', value: 'zari', count: 22 },
      { label: 'Embroidered', value: 'embroidered', count: 18 },
      { label: 'Plain', value: 'plain', count: 14 },
    ],
  },
]

const products = [
  {
    id: '1',
    name: 'Emerald Silk Saree with Gold Zari',
    price: 8500,
    originalPrice: 10500,
    image: '/images/saree-emerald-1.jpg',
    category: 'Saree',
    isNew: true,
    isOnSale: true,
    href: '/shop/sarees',
  },
  {
    id: '2',
    name: 'Golden Yellow Pure Silk Saree',
    price: 7200,
    image: '/images/saree-gold-1.jpg',
    category: 'Saree',
    isNew: false,
    isOnSale: false,
    href: '/shop/sarees',
  },
  {
    id: '3',
    name: 'Burgundy Silk Saree with Pearl Work',
    price: 9100,
    originalPrice: 11000,
    image: '/images/saree-emerald-1.jpg',
    category: 'Saree',
    isNew: true,
    isOnSale: true,
    href: '/shop/sarees',
  },
  {
    id: '4',
    name: 'Cream Cotton Saree with Embroidery',
    price: 4500,
    image: '/images/saree-gold-1.jpg',
    category: 'Saree',
    isNew: false,
    isOnSale: false,
    href: '/shop/sarees',
  },
  {
    id: '5',
    name: 'Emerald Green Linen Blend Saree',
    price: 5800,
    originalPrice: 7200,
    image: '/images/saree-emerald-1.jpg',
    category: 'Saree',
    isNew: true,
    isOnSale: true,
    href: '/shop/sarees',
  },
  {
    id: '6',
    name: 'Royal Blue Silk with Gold Borders',
    price: 8900,
    image: '/images/saree-gold-1.jpg',
    category: 'Saree',
    isNew: false,
    isOnSale: false,
    href: '/shop/sarees',
  },
]

export default function SareesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DivineHeader />
      <main className="flex-1">
        <CategoryPageLayout
          categoryName="Sarees"
          categoryDescription="Explore our stunning collection of traditional and contemporary sarees, crafted from the finest fabrics"
          bannerImage="/images/collection-sarees.jpg"
          products={products}
          filters={filters}
        />
      </main>
      <DivineFooter />
    </div>
  )
}

