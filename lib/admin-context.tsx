'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import type { Product } from './product-data'
import { allProducts } from './product-data'

export interface AdminUser {
  id: string; name: string; email: string
  joined: string; status: 'active' | 'suspended'; orders: number
}

export interface AdminAccount {
  email: string; password: string; name: string
}

export type AdminProduct = Product

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface AdminOrder {
  id: string
  customer: string
  email: string
  items: { name: string; qty: number; price: number }[]
  total: number
  status: OrderStatus
  date: string
  address: string
}

export interface SiteSettings {
  storeName: string
  tagline: string
  currency: string
  freeShippingThreshold: number
  maintenanceMode: boolean
  heroTitle: string
  heroSubtitle: string
  contactEmail: string
  instagramHandle: string
}

const SEED_USERS: AdminUser[] = [
  { id: 'u1', name: 'Precious Wealth',  email: 'precious@divinecouture.co.uk', joined: '12 Mar 2024', status: 'active',    orders: 3 },
  { id: 'u2', name: 'Amara Osei',       email: 'amara@example.com',            joined: '5 Feb 2024',  status: 'active',    orders: 1 },
  { id: 'u3', name: 'Priya Sharma',     email: 'priya@example.com',            joined: '20 Jan 2024', status: 'suspended', orders: 0 },
  { id: 'u4', name: 'Fatima Al-Hassan', email: 'fatima@example.com',           joined: '8 Apr 2024',  status: 'active',    orders: 2 },
]

const SEED_ORDERS: AdminOrder[] = [
  {
    id: 'ORD-1001', customer: 'Precious Wealth', email: 'precious@divinecouture.co.uk',
    items: [{ name: 'Kundan Drop Earrings', qty: 1, price: 45 }, { name: 'Gold Polki Bangle Set', qty: 1, price: 89 }],
    total: 134, status: 'delivered', date: '14 Mar 2024', address: '12 Rose Lane, London, E1 4AB',
  },
  {
    id: 'ORD-1002', customer: 'Amara Osei', email: 'amara@example.com',
    items: [{ name: 'Pearl Jhumka Earrings', qty: 2, price: 38 }],
    total: 76, status: 'shipped', date: '6 Feb 2024', address: '45 Oak Street, Birmingham, B2 5CD',
  },
  {
    id: 'ORD-1003', customer: 'Fatima Al-Hassan', email: 'fatima@example.com',
    items: [{ name: 'Silk Embroidered Dupatta', qty: 1, price: 55 }, { name: 'Maang Tikka with Pearls', qty: 1, price: 34 }],
    total: 89, status: 'processing', date: '9 Apr 2024', address: '7 Maple Avenue, Manchester, M1 2EF',
  },
  {
    id: 'ORD-1004', customer: 'Priya Sharma', email: 'priya@example.com',
    items: [{ name: 'Meenakari Bangle Set', qty: 1, price: 72 }],
    total: 72, status: 'cancelled', date: '22 Jan 2024', address: '3 Birch Road, Leeds, LS1 3GH',
  },
  {
    id: 'ORD-1005', customer: 'Precious Wealth', email: 'precious@divinecouture.co.uk',
    items: [{ name: 'Antique Gold Kada', qty: 1, price: 115 }],
    total: 115, status: 'pending', date: '2 May 2024', address: '12 Rose Lane, London, E1 4AB',
  },
  {
    id: 'ORD-1006', customer: 'Amara Osei', email: 'amara@example.com',
    items: [{ name: 'Emerald Chandbali Earrings', qty: 1, price: 62 }],
    total: 62, status: 'delivered', date: '18 Feb 2024', address: '45 Oak Street, Birmingham, B2 5CD',
  },
]

const DEFAULT_SETTINGS: SiteSettings = {
  storeName: 'Divine Couture',
  tagline: 'Handpicked jewellery and accessories celebrating the beauty of Indian tradition',
  currency: 'GBP',
  freeShippingThreshold: 75,
  maintenanceMode: false,
  heroTitle: 'Crafted for the Modern Indian Woman',
  heroSubtitle: 'Handpicked jewellery and accessories celebrating the beauty of Indian tradition — delivered across the UK.',
  contactEmail: 'hello@divinecouture.co.uk',
  instagramHandle: '@divinecouture.uk',
}

// Default demo admin account
const DEFAULT_ADMIN: AdminAccount = {
  email: 'admin@divinecouture.co.uk',
  password: 'divine-admin-2024',
  name: 'Admin',
}

const LS_SESSION  = 'sanctum_session'
const LS_ACCOUNTS = 'sanctum_accounts'
const LS_PRODUCTS = 'sanctum_products'

interface AdminContextType {
  isAuthenticated: boolean
  currentAdmin: AdminAccount | null
  login: (email: string, password: string) => string | null
  register: (name: string, email: string, password: string) => string | null
  logout: () => void
  products: AdminProduct[]
  addProduct: (p: Omit<AdminProduct, 'id' | 'href'>) => void
  updateProduct: (id: string, p: Partial<AdminProduct>) => void
  deleteProduct: (id: string) => void
  users: AdminUser[]
  deleteUser: (id: string) => void
  toggleFreeze: (id: string) => void
  orders: AdminOrder[]
  updateOrderStatus: (id: string, status: OrderStatus) => void
  deleteOrder: (id: string) => void
  settings: SiteSettings
  updateSettings: (s: Partial<SiteSettings>) => void
}

const AdminContext = createContext<AdminContextType | null>(null)

function getAccounts(): AdminAccount[] {
  if (typeof window === 'undefined') return [DEFAULT_ADMIN]
  try {
    const stored = localStorage.getItem(LS_ACCOUNTS)
    const accounts: AdminAccount[] = stored ? JSON.parse(stored) : []
    // Always ensure default admin exists
    if (!accounts.find((a) => a.email === DEFAULT_ADMIN.email)) {
      accounts.push(DEFAULT_ADMIN)
      localStorage.setItem(LS_ACCOUNTS, JSON.stringify(accounts))
    }
    return accounts
  } catch { return [DEFAULT_ADMIN] }
}

function saveAccounts(accounts: AdminAccount[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LS_ACCOUNTS, JSON.stringify(accounts))
  }
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentAdmin, setCurrentAdmin] = useState<AdminAccount | null>(null)
  const [users, setUsers] = useState<AdminUser[]>(SEED_USERS)
  const [orders, setOrders] = useState<AdminOrder[]>(SEED_ORDERS)
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS)

  // Load products from localStorage (admin edits) or fall back to seed data
  const [products, setProducts] = useState<AdminProduct[]>(() => {
    if (typeof window === 'undefined') return allProducts
    try {
      const stored = localStorage.getItem(LS_PRODUCTS)
      return stored ? JSON.parse(stored) : allProducts
    } catch { return allProducts }
  })

  // Persist products to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LS_PRODUCTS, JSON.stringify(products))
    }
  }, [products])

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const session = localStorage.getItem(LS_SESSION)
      if (session) {
        const admin: AdminAccount = JSON.parse(session)
        setCurrentAdmin(admin)
        setIsAuthenticated(true)
      }
    } catch { /* ignore */ }
  }, [])

  const login = useCallback((email: string, password: string): string | null => {
    const accounts = getAccounts()
    const match = accounts.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    )
    if (!match) return 'Invalid email or password.'
    setCurrentAdmin(match)
    setIsAuthenticated(true)
    localStorage.setItem(LS_SESSION, JSON.stringify(match))
    return null
  }, [])

  const register = useCallback((name: string, email: string, password: string): string | null => {
    const accounts = getAccounts()
    if (accounts.find((a) => a.email.toLowerCase() === email.toLowerCase())) {
      return 'An account with this email already exists.'
    }
    if (password.length < 8) return 'Password must be at least 8 characters.'
    const newAccount: AdminAccount = { name, email, password }
    const updated = [...accounts, newAccount]
    saveAccounts(updated)
    setCurrentAdmin(newAccount)
    setIsAuthenticated(true)
    localStorage.setItem(LS_SESSION, JSON.stringify(newAccount))
    return null
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setCurrentAdmin(null)
    localStorage.removeItem(LS_SESSION)
  }, [])

  const addProduct = useCallback((p: Omit<AdminProduct, 'id' | 'href'>) => {
    const id = `prod-${Date.now()}`
    setProducts((prev) => [...prev, { ...p, id, href: `/product/${id}` }])
  }, [])

  const updateProduct = useCallback((id: string, p: Partial<AdminProduct>) => {
    setProducts((prev) => prev.map((x) => x.id === id ? { ...x, ...p } : x))
  }, [])

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((x) => x.id !== id))
  }, [])

  const deleteUser = useCallback((id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }, [])

  const toggleFreeze = useCallback((id: string) => {
    setUsers((prev) => prev.map((u) =>
      u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u
    ))
  }, [])

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o))
  }, [])

  const deleteOrder = useCallback((id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id))
  }, [])

  const updateSettings = useCallback((s: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...s }))
  }, [])

  return (
    <AdminContext.Provider value={{
      isAuthenticated, currentAdmin, login, register, logout,
      products, addProduct, updateProduct, deleteProduct,
      users, deleteUser, toggleFreeze,
      orders, updateOrderStatus, deleteOrder,
      settings, updateSettings,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}
