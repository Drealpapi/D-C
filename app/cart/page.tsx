import DivineHeader from '@/components/divine-header'
import DivineFooter from '@/components/divine-footer'
import CartView from '@/components/cart-view'

export const metadata = { title: 'Your Bag | Divine Couture' }

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DivineHeader />
      <main className="flex-1">
        <CartView />
      </main>
      <DivineFooter />
    </div>
  )
}

