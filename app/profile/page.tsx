import DivineHeader from '@/components/divine-header'
import DivineFooter from '@/components/divine-footer'
import ProfileView from '@/components/profile-view'

export const metadata = { title: 'My Account | Divine Couture' }

export default function ProfilePage() {
  return (
    <>
      <DivineHeader />
      <ProfileView />
      <DivineFooter />
    </>
  )
}
