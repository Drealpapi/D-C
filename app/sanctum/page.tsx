import { notFound } from 'next/navigation'

// Old route — now returns 404 so it reveals nothing
export default function OldSanctumPage() {
  notFound()
}
