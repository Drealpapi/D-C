import DivineHeader from '@/components/divine-header'
import CategoryPageLayout from '@/components/category-page-layout'
import DivineFooter from '@/components/divine-footer'

const filters = [
  {
    title: 'Type',
    options: [
      { label: 'Bridal', value: 'bridal', count: 16 },
      { label: 'Festive', value: 'festive', count: 20 },
      { label: 'Party Wear', value: 'party', count: 18 },
    ],
  },
  {
    title: 'Fabric',
    options: [
      { label: 'Velvet', value: 'velvet', count: 12 },
      { label: 'Net', value: 'net', count: 18 },
      { label: 'Silk', value: 'silk', count: 24 },
    ],
  },
  {
    title: 'Color',
    options: [
      { label: 'Red', value: 'red', count: 14 },
      { label: 'Emerald Green', value: 'green', count: 12 },
      { label: 'Gold', value: 'gold', count: 16 },
      { label: 'Maroon', value: 'maroon', count: 10 },
    ],
  },
]

const products = [
  {
    id: '1',
    name: 'Red Bridal Lehenga with Gold Zari',
    price: 45000,
    originalPrice: 55000,
    image: '/images/lehenga-bridal-1.jpg',
    category: 'Lehenga',
    isNew: true,
    isOnSale: true,
    href: '/shop/lehengas',
  },
  {
    id: '2',
    name: 'Emerald Green Festive Lehenga',
    price: 32000,
    image: '/images/lehenga-festive-1.jpg',
    category: 'Lehenga',
    isNew: true,
    isOnSale: false,
    href: '/shop/lehengas',
  },
  {
    id: '3',
    name: 'Maroon Velvet Bridal Lehenga',
    price: 52000,
    originalPrice: 62000,
    image: '/images/lehenga-bridal-1.jpg',
    category: 'Lehenga',
    isNew: false,
    isOnSale: true,
    href: '/shop/lehengas',
  },
  {
    id: '4',
    name: 'Gold Silk Party Wear Lehenga',
    price: 28000,
    image: '/images/lehenga-festive-1.jpg',
    category: 'Lehenga',
    isNew: false,
    isOnSale: false,
    href: '/shop/lehengas',
  },
  {
    id: '5',
    name: 'Burgundy Net Bridal Collection',
    price: 48000,
    originalPrice: 58000,
    image: '/images/lehenga-bridal-1.jpg',
    category: 'Lehenga',
    isNew: true,
    isOnSale: true,
    href: '/shop/lehengas',
  },
  {
    id: '6',
    name: 'Green Silk Festive Lehenga',
    price: 35000,
    image: '/images/lehenga-festive-1.jpg',
    category: 'Lehenga',
    isNew: false,
    isOnSale: false,
    href: '/shop/lehengas',
  },
]

export default function LehengasPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DivineHeader />
      <main className="flex-1">
        <CategoryPageLayout
          categoryName="Lehengas"
          categoryDescription="Celebrate your special moments with our exquisite bridal and festive lehenga collections"
          bannerImage="/images/collection-lehengas.jpg"
          products={products}
          filters={filters}
        />
      </main>
      <DivineFooter />
    </div>
  )
}

