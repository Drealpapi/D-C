import { notFound } from 'next/navigation'
import SanctumShell from '@/components/sanctum/sanctum-shell'

// Demo access key — replace with real auth (NextAuth + MongoDB) when backend is added
const ACCESS_KEY = 'dc-divine-2024-xk9'

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const key    = params?.access

  if (key !== ACCESS_KEY) {
    notFound()
  }

  return <SanctumShell />
}
