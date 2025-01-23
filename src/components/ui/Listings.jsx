"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

const Listings = ({ listings }) => {
  const [listing, setListing] = useState([])
const fetchListings = async () => {
    const response = await fetch("/api/post-room")
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      setListing(data.data)
    } else {
      console.error("Failed to fetch listings:", data)
    }
}
useEffect(() => {
    fetchListings()
}, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Your Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listing.map((listing) => (
          <Card key={listing.id} className="overflow-hidden">
            <img src={listing.listingImages[0].url || "/placeholder.svg"} alt={listing.title} className="w-full h-48 object-cover" />
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
              <p className="text-gray-600 mb-2">{listing.description}</p>
              <Badge variant="secondary" className="mb-2">
                ₹{listing.price} /Month
              </Badge>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4">
              <button className="text-blue-600 hover:underline">Edit Listing</button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Listings

