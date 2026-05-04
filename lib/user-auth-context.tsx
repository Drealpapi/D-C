'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'

export interface UserAccount {
  name: string
  email: string
}

interface UserAuthContextType {
  user: UserAccount | null
  isLoggedIn: boolean
  login: (email: string, password: string) => string | null
  register: (name: string, email: string, password: string) => string | null
  logout: () => void
}

const DEMO_USER: UserAccount & { password: string } = {
  name: 'Precious Wealth',
  email: 'precious@divinecouture.co.uk',
  password: 'divine123',
}

const LS_KEY = 'dc_user_session'

const UserAuthContext = createContext<UserAuthContextType | null>(null)

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY)
      if (stored) setUser(JSON.parse(stored))
    } catch { /* ignore */ }
  }, [])

  const login = useCallback((email: string, password: string): string | null => {
    if (
      email.toLowerCase() === DEMO_USER.email.toLowerCase() &&
      password === DEMO_USER.password
    ) {
      const u: UserAccount = { name: DEMO_USER.name, email: DEMO_USER.email }
      setUser(u)
      localStorage.setItem(LS_KEY, JSON.stringify(u))
      return null
    }
    return 'Invalid email or password.'
  }, [])

  const register = useCallback((name: string, email: string, password: string): string | null => {
    if (password.length < 6) return 'Password must be at least 6 characters.'
    const u: UserAccount = { name, email }
    setUser(u)
    localStorage.setItem(LS_KEY, JSON.stringify(u))
    return null
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(LS_KEY)
  }, [])

  return (
    <UserAuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout }}>
      {children}
    </UserAuthContext.Provider>
  )
}

export function useUserAuth() {
  const ctx = useContext(UserAuthContext)
  if (!ctx) throw new Error('useUserAuth must be used within UserAuthProvider')
  return ctx
}
