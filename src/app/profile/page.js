import React from 'react'
import BottomNavigation from '@/components/ui/bottomNavigation'
import UserProfile from '@/components/ui/UserProfile'



function ProfilePage() {
  return (
    <div>
        <UserProfile />
        <BottomNavigation />
    </div>
  )
}

export default ProfilePage