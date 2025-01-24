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



export default function HomePage() {

 const dispatch = useDispatch()
 const [latestListing , setLatestListing] = useState([])
 const data = useSelector((state) => state?.user?.latestListings)
 
 useEffect(() => {
   dispatch(fetchLatestListing())
   

 }, [dispatch])
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
            {/* {data?.map((listing) => (
              <Link href={`/room/details/${listing.id}`} key={listing.id}>
                <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <Image
                      src={listing?.listingImages[0]?.url}
                      alt={listing.title}
                      width={500}
                      height={300}
                      className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                    {listing.isNew && (
                      <Badge className="absolute top-3 left-3 bg-blue-500 hover:bg-blue-600">
                        New
                      </Badge>
                    )}
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-gray-900">
                        ₹{listing.price}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{listing.title}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                          {listing.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-600 border-t pt-4">
                      <span className="flex items-center gap-1">
                        <Home className="h-4 w-4" />
                        {listing.beds} Beds
                      </span>
                      <span>{listing.baths} Bath</span>
                      <span>{listing.sqft}</span>
                    </div>
                    
                  </CardContent>
                </Card>
              </Link>
            ))} */}
            {data?.map((listing) => (
              <Link href={`/room/details/${listing.id}`} key={listing.id}>
                <RoomCard room={listing} />
              </Link>
            ))}
         
          </div>
        </div>
        {/* Bottom Navigation */}
       <BottomNavigation />
      </div>
      </>
    
  



</>
}

