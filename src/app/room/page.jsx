'use client'
import { useEffect, useState } from 'react'
import { Search, Menu, Bell, Home, MessageCircle, Plus, Heart, User, Mic } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { HeaderSearch } from '@/components/ui/headerSearch'
import BottomNavigation from '@/components/ui/bottomNavigation'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLatestListing } from '../redux/slice'
import RoomCard from '@/components/RoomCard'
import RoomCardSkeleton from '@/components/ui/RoomCardSkeleton'



export default function HomePage() {

 const dispatch = useDispatch()
 const [loading, setLoading] = useState(true);
 const data = useSelector((state) => state?.user?.latestListings)
 const [isFetching, setIsFetching] = useState(false)

 useEffect(() => {
   const fetchData = async () => {
     if (!data || data.length === 0) {
       if (!isFetching) {
         setIsFetching(true)
         await dispatch(fetchLatestListing())
         setIsFetching(false)
         setLoading(false)
       }
     } else {
       setLoading(false)
     }
   }

   fetchData()
 }, [dispatch, data, isFetching])

  return <>
 
  {/* { isAuthenticated &&  ( */}
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white"> 
        {/* Top Navigation */}
       <HeaderSearch />
  
        {/* Featured Listings */}
       
        <div className="container px-4 py-8 min-h-screen mb-14">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured listing</h2>
              <p className="text-gray-500 mt-1">Discover our hand-picked properties</p>
            </div>
            <Link 
              href="/all-listings" 
              className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              View all
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
       {loading ? <><RoomCardSkeleton />
        <RoomCardSkeleton />
       </>  :  <> {data?.map((listing) => (
              <Link href={`/room/details/${listing.id}`} key={listing.id}>
                <RoomCard room={listing} />
              </Link>
            ))}</>}
         
          </div>
        </div>
        {/* Bottom Navigation */}
       <BottomNavigation />
      </div>
      </>
    
  



</>
}

