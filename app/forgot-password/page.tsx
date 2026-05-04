import { Suspense } from 'react'
import AuthForm from '@/components/auth-form'

export const metadata = { title: 'Reset Password | Divine Couture' }

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <AuthForm mode="forgot" />
    </Suspense>
  )
}
