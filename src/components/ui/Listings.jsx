"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Image from "next/image"
import { fetchUserListing } from "@/app/redux/slice"
import RoomCard from "@/components/RoomCard"
// import { fetchUserListing } from "@/app/redux/slice"

const Listings = () => {
  const dispatch = useDispatch()
  
  const listing = useSelector((state) => state?.user?.listings)

 
  useEffect(() => {
    if (!listing || listing.length === 0) {
      dispatch(fetchUserListing())
    }
  }, [dispatch, listing])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Your Listings</h2>
      <div className="grid grid-cols-1  gap-6">
        {listing.map((listing) => (
         <RoomCard key={listing.id} room={listing} />
        ))}
      </div>
    </div>
  )
}

export default Listings

