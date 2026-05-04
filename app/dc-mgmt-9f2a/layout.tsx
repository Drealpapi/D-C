// AdminProvider is at root layout — no need to wrap again here
export const metadata = { title: 'Divine Couture' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
