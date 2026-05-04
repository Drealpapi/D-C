import DivineHeader from '@/components/divine-header'
import DivineFooter from '@/components/divine-footer'
import CheckoutView from '@/components/checkout-view'

export const metadata = { title: 'Checkout | Divine Couture' }

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DivineHeader />
      <main className="flex-1">
        <CheckoutView />
      </main>
      <DivineFooter />
    </div>
  )
}

