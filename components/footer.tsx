import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Customer Support */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-6">Customer Support</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-secondary transition">Size Chart</Link></li>
              <li><Link href="#" className="hover:text-secondary transition">Shipping & Delivery</Link></li>
              <li><Link href="#" className="hover:text-secondary transition">Returns & Refunds</Link></li>
              <li><Link href="#" className="hover:text-secondary transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-secondary transition">Teams & Conditions</Link></li>
            </ul>
          </div>

          {/* Divine Couture */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-6">Divine Couture</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-secondary transition">About Us</Link></li>
              <li><Link href="#" className="hover:text-secondary transition">Superbrides</Link></li>
              <li><Link href="#" className="hover:text-secondary transition">Our Stores</Link></li>
              <li><Link href="#" className="hover:text-secondary transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Main Menu */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-6">Main Menu</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-secondary transition">New Arrivals</Link></li>
              <li><Link href="#" className="hover:text-secondary transition">All Styles</Link></li>
              <li><Link href="#" className="hover:text-secondary transition">Occasions</Link></li>
              <li><Link href="#" className="hover:text-secondary transition">Lehengas</Link></li>
              <li><Link href="#" className="hover:text-secondary transition">Sarees</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-6">Information</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-secondary mb-2">Elevating elegance through exquisite couture design</p>
              </div>
              <div>
                <p className="font-semibold mb-1">+1 (844) DIVINE-1</p>
              </div>
              <div>
                <p className="font-semibold">hello@divinecouture.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-center md:text-left">Copyright© 2024 Divine Couture. All rights reserved.</p>
          
          {/* Payment Methods */}
          <div className="flex items-center gap-3">
            <svg className="w-8 h-5 bg-white p-1 rounded" viewBox="0 0 48 32" fill="none">
              <rect width="48" height="32" rx="4" fill="white" />
              <text x="24" y="18" textAnchor="middle" fontSize="8" fontWeight="bold">VISA</text>
            </svg>
            <svg className="w-8 h-5 bg-orange-500 p-1 rounded" viewBox="0 0 48 32" fill="none">
              <rect width="48" height="32" rx="4" fill="#FF6000" />
            </svg>
            <svg className="w-8 h-5 bg-blue-600 p-1 rounded" viewBox="0 0 48 32" fill="none">
              <rect width="48" height="32" rx="4" fill="#1F4788" />
            </svg>
            <svg className="w-8 h-5 bg-red-600 p-1 rounded" viewBox="0 0 48 32" fill="none">
              <rect width="48" height="32" rx="4" fill="#C41C3B" />
            </svg>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-secondary transition">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-secondary transition">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-secondary transition">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-secondary transition">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-secondary transition">
              <Github className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
