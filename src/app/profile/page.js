import React from 'react'
import BottomNavigation from '@/components/ui/bottomNavigation'
import UserProfile from '@/components/ui/UserProfile'



function ProfilePage() {
  return (
    <div className=' bg-gray-100  mx-auto max-w-md' >
        <UserProfile />
        <BottomNavigation />
    </div>
  )
}

export default ProfilePage