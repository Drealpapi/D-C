import { Suspense } from 'react'
import AuthForm from '@/components/auth-form'

export const metadata = { title: 'Sign In | Divine Couture' }

export default function LoginPage() {
  return (
    <Suspense>
      <AuthForm mode="login" />
    </Suspense>
  )
}
