'use client'
import { useEffect, useState } from 'react'
import { fetchUser, fetchUserListing, fetchLatestListing } from '@/app/redux/slice'
import { useSelector, useDispatch } from 'react-redux'
import { ArrowLeft, Heart, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import RoomCard from '@/components/RoomCard'
import BottomNavigation from '@/components/ui/bottomNavigation'

export default function WishlistPage() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const userData = useSelector((state) => state?.user?.user)
  const userListing = useSelector((state) => state?.user?.listings)
  const wishlist = useSelector((state) => state?.user?.wishlist)

  useEffect(() => {
    async function fetchData() {
      if (!userData) {
        await dispatch(fetchUser())
      }
      if (!userListing) {
        await dispatch(fetchUserListing())
      }
      if (!wishlist || wishlist.length === 0) {
        await dispatch(fetchLatestListing())
      }
      setLoading(false)
    }

    if (!userData || !userListing || !wishlist) {
      fetchData()
    } else {
      setLoading(false)
    }
  }, [dispatch, userData, userListing, wishlist])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 mb-10">
        <div className="container px-4 py-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4"><Skeleton className="w-32 h-8" /></h2>
          <div className="grid grid-cols-1 gap-4">
            {Array(4).fill().map((_, index) => (
              <Skeleton key={index} className="w-full h-24 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!wishlist || wishlist.length === 0) {
    return <div className="min-h-screen bg-gray-50">No items in wishlist</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 mb-10">
      <div className='p-3 pt-5'>
        <Link href="/room">
          <Button variant="ghost" size="icon" className="bg-white rounded-full shadow-md absolute left-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-xl font-semibold text-center font-sans text-black">Wishlist</h2>
      </div>
      <div className="container px-4 py-6">
        <div className="grid grid-cols-1 gap-4">
          {wishlist.map((listing) => (
            <Link href={`/room/details/${listing.id}`} key={listing.id}>
              <RoomCard room={listing} />
            </Link>
          ))}
        </div>
      </div>
      <BottomNavigation />
    </div>
  )
}