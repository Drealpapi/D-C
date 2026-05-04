import DivineHeader from '@/components/divine-header'
import CategoryPageLayout from '@/components/category-page-layout'
import DivineFooter from '@/components/divine-footer'

const filters = [
  {
    title: 'Type',
    options: [
      { label: 'Necklace', value: 'necklace', count: 18 },
      { label: 'Earrings', value: 'earrings', count: 22 },
      { label: 'Bracelet', value: 'bracelet', count: 16 },
      { label: 'Bangles', value: 'bangles', count: 20 },
    ],
  },
  {
    title: 'Material',
    options: [
      { label: 'Gold', value: 'gold', count: 28 },
      { label: 'Silver', value: 'silver', count: 15 },
      { label: 'Mixed Metal', value: 'mixed', count: 12 },
    ],
  },
  {
    title: 'Stone',
    options: [
      { label: 'Emerald', value: 'emerald', count: 16 },
      { label: 'Diamond', value: 'diamond', count: 20 },
      { label: 'Pearl', value: 'pearl', count: 12 },
      { label: 'Kundan', value: 'kundan', count: 14 },
    ],
  },
]

const products = [
  {
    id: '1',
    name: 'Traditional Gold Necklace Set',
    price: 12500,
    image: '/images/jewelry-necklace-1.jpg',
    category: 'Jewelry',
    isNew: true,
    isOnSale: false,
    href: '/shop/jewelry',
  },
  {
    id: '2',
    name: 'Kundan and Pearl Earrings',
    price: 6800,
    originalPrice: 8200,
    image: '/images/jewelry-earrings-1.jpg',
    category: 'Jewelry',
    isNew: true,
    isOnSale: true,
    href: '/shop/jewelry',
  },
  {
    id: '3',
    name: 'Gold and Emerald Bracelet',
    price: 9200,
    image: '/images/jewelry-bracelet-1.jpg',
    category: 'Jewelry',
    isNew: false,
    isOnSale: false,
    href: '/shop/jewelry',
  },
  {
    id: '4',
    name: 'Kundan Bangle Set',
    price: 6500,
    originalPrice: 7800,
    image: '/images/jewelry-bangles-1.jpg',
    category: 'Jewelry',
    isNew: true,
    isOnSale: true,
    href: '/shop/jewelry',
  },
  {
    id: '5',
    name: 'Diamond and Gold Necklace',
    price: 18500,
    image: '/images/jewelry-necklace-1.jpg',
    category: 'Jewelry',
    isNew: false,
    isOnSale: false,
    href: '/shop/jewelry',
  },
  {
    id: '6',
    name: 'Pearl Drop Earrings',
    price: 5200,
    originalPrice: 6500,
    image: '/images/jewelry-earrings-1.jpg',
    category: 'Jewelry',
    isNew: true,
    isOnSale: true,
    href: '/shop/jewelry',
  },
]

export default function JewelryPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DivineHeader />
      <main className="flex-1">
        <CategoryPageLayout
          categoryName="Jewelry"
          categoryDescription="Discover our exquisite collection of traditional and contemporary jewelry pieces"
          bannerImage="/images/collection-jewelry.jpg"
          products={products}
          filters={filters}
        />
      </main>
      <DivineFooter />
    </div>
  )
}

