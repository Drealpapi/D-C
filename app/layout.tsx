import type { Metadata } from 'next'
import { Lora, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/lib/cart-context'
import { UserAuthProvider } from '@/lib/user-auth-context'
import { AdminProvider } from '@/lib/admin-context'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const lora = Lora({ subsets: ["latin"], variable: "--font-serif" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: 'Divine Couture - Indian Jewellery & Clothing | UK',
  description: 'Handcrafted Indian jewellery, earrings, bangles and accessories. UK-based luxury brand celebrating the art of Indian tradition with contemporary elegance.',
  generator: 'v0.app',
  icons: {
    icon: '/images/divine-couture-logo.png',
    apple: '/images/divine-couture-logo.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AdminProvider>
            <UserAuthProvider>
              <CartProvider>
                <div className="flex-1">{children}</div>
              </CartProvider>
            </UserAuthProvider>
          </AdminProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

