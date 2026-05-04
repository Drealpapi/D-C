// This route is retired — kept to prevent accidental exposure
export const metadata = { title: 'Not Found' }

export default function RetiredLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
