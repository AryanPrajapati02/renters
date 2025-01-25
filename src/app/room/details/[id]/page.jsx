'use client'
import { useEffect } from 'react'
import { fetchLatestListing } from '@/app/redux/slice'
import Carousel from '@/components/ui/Carousel'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'next/navigation'
import { ArrowLeft, Heart, Share2, Phone, MessageCircle, Navigation2, ImageIcon, Wifi, Coffee, ShowerHead, Thermometer, ParkingMeter, Flower, AirVent, Home, Wind, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"

export default function DetailsPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const roomData = useSelector((state) => state?.user?.latestListings)
  const room = roomData?.find((room) => room.id === id)

  useEffect(() => {
    async function fetchData() {
      if (!roomData || roomData.length === 0) {
        await dispatch(fetchLatestListing())
      }
    }
    fetchData()
  }, [dispatch, roomData])

  if (!room) {
    return <div>Room not found</div>
  }

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi size={16} className="mr-1 text-blue-500" />
      case 'veg':
        return <Coffee size={16} className="mr-1 text-green-500" />
      case 'non-veg':
        return <Coffee size={16} className="mr-1 text-red-500" />
      case 'attached':
        return <ShowerHead size={16} className="mr-1 text-yellow-500" />
      case 'hot-water':
        return <Thermometer size={16} className="mr-1 text-orange-500" />
      case 'parking':
        return <ParkingMeter size={16} className="mr-1 text-gray-500" />
      case 'laundry':
        return <ImageIcon size={16} className="mr-1 text-blue-500" />
      case 'garden':
        return <Flower size={16} className="mr-1 text-green-500" />
      default:
        return null
    }
  }

  const getFacilityIcon = (facility) => {
    switch (facility) {
      case 'ac':
        return <AirVent size={16} className="mr-1 text-blue-500" />
      case 'regular':
        return <Home size={16} className="mr-1 text-gray-500" />
      case 'cooler':
        return <Wind size={16} className="mr-1 text-blue-500" />
      case 'balcony':
        return <Home size={16} className="mr-1 text-green-500" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative">
        <Carousel images={room.listingImages.map(image => image.url)} />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Link href="/room">
            <Button variant="ghost" size="icon" className="bg-white rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="bg-white rounded-full">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="bg-white rounded-full">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-[-13vh] right-4 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
          <ImageIcon className="h-4 w-4 inline mr-1" />
          {room.listingImages.length}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="container px-4 py-6 mt-[13vh] ">
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: <Phone className="h-6 w-6" />, label: "Call" },
            { icon: <MessageCircle className="h-6 w-6" />, label: "Message" },
            { icon: <Navigation2 className="h-6 w-6" />, label: "Direction" },
            { icon: <Share2 className="h-6 w-6" />, label: "Share" },
          ].map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="flex flex-col items-center py-4 h-auto"
            >
              {action.icon}
              <span className="mt-2 text-sm">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Details Content */}
      <div className="container px-4">
        <Tabs defaultValue="overview">
          <TabsList className="w-full grid grid-cols-2 gap-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <p className="text-gray-600">{room.description}</p>
            <div className="mt-4">
              <strong>Location:</strong> {room.location}
            </div>
            <div className="mt-2">
              <strong>Owner Phone:</strong> {room.ownerPhone}
            </div>
            <div className="mt-2">
              <strong>Owner Name:</strong> {room.ownerName}
            </div>
            <div className="mt-2">
              <strong>Price:</strong> ₹{room.price}/mo
            </div>
            <div className="mt-2">
              <strong>Sharing Type:</strong> Up to {room.sharingType} persons
            </div>
            <div className="mt-2">
              <strong>Accommodation Type:</strong> {room.accommodationType}
            </div>
            <div className="mt-2">
              <strong>Gender:</strong> {room.gender}
            </div>
            <div className="mt-2">
              <strong>Availability:</strong> {room.isAvailable ? "Available" : "Not Available"}
            </div>
          </TabsContent>
          <TabsContent value="features" className="mt-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Amenities</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {room.amenities.food.map((amenity, index) => (
                <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full flex items-center capitalize">
                  {getAmenityIcon(amenity)}
                  {amenity}
                </span>
              ))}
              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-600 rounded-full flex items-center capitalize">
                {getAmenityIcon(room.amenities.bathroom)}
                {room.amenities.bathroom}
              </span>
              {room.amenities.other.map((amenity, index) => (
                <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full flex items-center capitalize">
                  {getAmenityIcon(amenity)}
                  {amenity}
                </span>
              ))}
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Facilities</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {room.facilityType.map((facility, index) => (
                <span key={index} className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded-full flex items-center capitalize">
                  {getFacilityIcon(facility)}
                  {facility}
                </span>
              ))}
            </div>
          </TabsContent>
         
        </Tabs>
      </div>
    </div>
  )
}