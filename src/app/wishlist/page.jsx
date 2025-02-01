// 'use client'
// import { useEffect, useState } from 'react'
// import { fetchUser, fetchUserListing, fetchLatestListing } from '@/app/redux/slice'
// import { useSelector, useDispatch } from 'react-redux'
// import { ArrowLeft, Heart, X } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Skeleton } from '@/components/ui/skeleton'
// import Link from 'next/link'
// import RoomCard from '@/components/RoomCard'
// import BottomNavigation from '@/components/ui/bottomNavigation'

// export default function WishlistPage() {
//   const dispatch = useDispatch()
//   const [loading, setLoading] = useState(true)
//   const userData = useSelector((state) => state?.user?.user)
//   const userListing = useSelector((state) => state?.user?.listings)
//   const wishlist = useSelector((state) => state?.user?.wishlist)

//   useEffect(() => {
//     async function fetchData() {
//       if (!userData) {
//         await dispatch(fetchUser())
//       }
//       if (!userListing) {
//         await dispatch(fetchUserListing())
//       }
//       if (!wishlist || wishlist.length === 0) {
//         await dispatch(fetchLatestListing())
//       }
//       setLoading(false)
//     }

//     if (!userData || !userListing || !wishlist) {
//       fetchData()
//     } else {
//       setLoading(false)
//     }
//   }, [dispatch, userData, userListing, wishlist])

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 mb-10">
//         <div className="container px-4 py-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4"><Skeleton className="w-32 h-8" /></h2>
//           <div className="grid grid-cols-1 gap-4">
//             {Array(4).fill().map((_, index) => (
//               <Skeleton key={index} className="w-full h-24 rounded-lg" />
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (!wishlist || wishlist.length === 0) {
//     return <>
//      <div className="min-h-screen bg-gray-50 mb-10">
//       <div className='p-3 pt-5'>
//         <Link href="/room">
//           <Button variant="ghost" size="icon" className="bg-white rounded-full shadow-md absolute left-4">
//             <ArrowLeft className="h-4 w-4" />
//           </Button>
//         </Link>
//         <h2 className="text-xl font-semibold text-center font-sans text-black">Wishlist</h2>
//       </div>
//       <div className="container px-4 py-6"><h2 className="text-xl font-semibold text-gray-800 mb-4">No Room Found in WishList</h2></div>
//       <BottomNavigation />
//     </div>
//     </>
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 mb-10">
//       <div className='p-3 pt-5'>
//         <Link href="/room">
//           <Button variant="ghost" size="icon" className="bg-white rounded-full shadow-md absolute left-4">
//             <ArrowLeft className="h-4 w-4" />
//           </Button>
//         </Link>
//         <h2 className="text-xl font-semibold text-center font-sans text-black">Wishlist</h2>
//       </div>
//       <div className="container px-4 py-6">
//         <div className="grid grid-cols-1 gap-4">
//           {wishlist.map((listing) => (
//             <Link href={`/room/details/${listing.id}`} key={listing.id}>
//               <RoomCard room={listing} />
//             </Link>
//           ))}
//         </div>
//       </div>
//       <BottomNavigation />
//     </div>
//   )
// }

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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-4 shadow-lg rounded-lg min-h-[90vh] md:rounded-xl">
          <div className="container px-4 py-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4"><Skeleton className="w-32 h-8" /></h2>
            <div className="grid grid-cols-1 gap-4">
              {Array(4).fill().map((_, index) => (
                <Skeleton key={index} className="w-full h-24 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-4 shadow-lg rounded-lg min-h-[90vh] md:rounded-xl">
          <div className='p-3 pt-5'>
            <Link href="/room">
              <Button variant="ghost" size="icon" className="bg-white rounded-full shadow-md absolute left-4">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h2 className="text-xl font-semibold text-center font-sans text-black">Wishlist</h2>
          </div>
          <div className="container px-4 py-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">No Room Found in WishList</h2>
          </div>
          <div className="block md:hidden w-full max-w-md mx-auto mt-4">
            <BottomNavigation />
          </div>
        </div>
        <div className="hidden md:block w-full max-w-md mx-auto mt-4">
          <BottomNavigation />
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <div className="w-full max-w-md bg-white p-4 shadow-lg rounded-lg md:min-h-[100vh] md:rounded-xl ">
        <div className='p-3 md:pt-5'>
          <Link href="/room">
            <Button variant="ghost" size="icon" className="bg-white rounded-full shadow-md absolute left-4 md:left-[37%]">
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
        <div className=" w-full max-w-md mx-auto mt-4">
          <BottomNavigation />
        </div>
      </div>
      
    </div>
  )
}