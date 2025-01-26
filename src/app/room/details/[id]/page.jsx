'use client'
import { useEffect, useState } from 'react'
import { fetchLatestListing, fetchUserListing, toggleWishlist } from '@/app/redux/slice'
import Carousel from '@/components/ui/Carousel'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  Navigation2,
  ImageIcon,
  Wifi,
  Coffee,
  ShowerHead,
  Thermometer,
  ParkingMeter,
  Flower,
  AirVent,
  Home,
  Wind,
  User,
  MapPin,
  IndianRupee,
  Users,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from '@/components/ui/skeleton'

export default function DetailsPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const roomData = useSelector((state) => state?.user?.latestListings)
  const room = roomData?.find((room) => room.id === id)
  const [loading, setLoading] = useState(true)
  const [addWishlist, setAddWishlist] = useState(false)
  const wishlist = useSelector((state) => state?.user?.wishlist)
  const isInWishlist = wishlist.some(item => item.id === id)
  const [isRoomOwner, setIsRoomOwner] = useState(false);
  const roomOwner = useSelector((state) => state?.user?.listings);
 
  
  
 

  useEffect(() => {
    async function fetchData() {
      if (!roomData || roomData.length === 0) {
        await dispatch(fetchLatestListing())
      }
      if(!roomOwner || roomOwner.length === 0){
        await dispatch(fetchUserListing())
      }

      setLoading(false)

    }
    fetchData()
  }, [dispatch, roomData])

  useEffect(() => {
    const owner = roomOwner?.find((owner) => owner.id === room?.id);
    if (owner) {
      setIsRoomOwner(true);
    }
   
  },[])

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(room));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 ">
        {/* Header Skeleton */}
        <div className="relative">
          <Skeleton className="w-full h-[300px]" />
          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex gap-2">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>
          </div>
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
            <Skeleton className="w-16 h-4" />
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="container px-4 py-6">
          <div className="grid grid-cols-4 gap-4">
            {Array(4).fill().map((_, index) => (
              <Skeleton key={index} className="w-full h-16 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Details Content Skeleton */}
        <div className="container px-4">
          <Tabs defaultValue="overview">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview"><Skeleton className="w-24 h-8" /></TabsTrigger>
              <TabsTrigger value="features"><Skeleton className="w-24 h-8" /></TabsTrigger>
              <TabsTrigger value="value"><Skeleton className="w-24 h-8" /></TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              {Array(8).fill().map((_, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Skeleton className="w-6 h-6 mr-2" />
                  <Skeleton className="w-full h-4" />
                </div>
              ))}
            </TabsContent>
            <TabsContent value="features" className="mt-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4"><Skeleton className="w-32 h-8" /></h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {Array(6).fill().map((_, index) => (
                  <Skeleton key={index} className="w-24 h-8 rounded-full" />
                ))}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4"><Skeleton className="w-32 h-8" /></h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {Array(6).fill().map((_, index) => (
                  <Skeleton key={index} className="w-24 h-8 rounded-full" />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="value" className="mt-4">
              <Skeleton className="w-full h-4" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

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
    <div className="min-h-[100vh] bg-gray-50 ">
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
            <Button variant="ghost" size="icon" className="bg-white rounded-full" onClick={handleToggleWishlist}>
              <Heart className={`h-4 w-4 ${isInWishlist ? 'text-red-500 fill-current' : 'text-black'}`} />
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
            { icon: <MessageCircle className="h-6 w-6" />, label: "Message" , href: `/chat/${room.id}`},
            { icon: <Phone className="h-6 w-6" />, label: "Call.."  , href: `tel:${room.ownerPhone}`},
            { icon: <Navigation2 className="h-6 w-6" />, label: "Direction" ,href: `https://www.google.com/maps/search/?api=1&query=${room.location}`},
            { icon: <Share2 className="h-6 w-6" />, label: "Share", href: `https://wa.me/?text=${room.location}` },
          ].map((action) => (
            <Link href={action.href}>
            <Button
              key={action.label}
              variant="outline"
              className="flex flex-col items-center py-4 h-auto w-full"
            >
              {action.icon}
              <span className="mt-2 text-sm">{action.label}</span>
            </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Details Content */}
      <div className="container px-4 overflow-y-auto h-[60vh] ">
        <Tabs defaultValue="overview">
          <TabsList className="w-full grid grid-cols-2 gap-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <div className="flex items-center mb-2">
              <MapPin size={40} className="mr-2 text-gray-600" />
              <span className="text-gray-600">{room.location}</span>
            </div>
            <div className="flex items-center mb-2">
              <Phone size={20} className="mr-2 text-gray-600" />
              <span className="text-gray-600">{room.ownerPhone}</span>
            </div>
            <div className="flex items-center mb-2">
              <User size={20} className="mr-2 text-gray-600" />
              <span className="text-gray-600">{room.ownerName}</span>
            </div>
            <div className="flex items-center mb-2">
              <IndianRupee size={20} className="mr-2 text-gray-600" />
              <span className="text-gray-600">₹{room.price}/mo</span>
            </div>
            <div className="flex items-center mb-2">
              <Users size={20} className="mr-2 text-gray-600" />
              <span className="text-gray-600">Up to {room.sharingType} persons</span>
            </div>
            <div className="flex items-center mb-2">
              <Home size={20} className="mr-2 text-gray-600" />
              <span className="text-gray-600">{room.accommodationType}</span>
            </div>
            <div className="flex items-center mb-2">
              <User size={20} className={`mr-2 ${room.gender === 'female' ? 'text-pink-500' : 'text-blue-500'}`} />
              <span className="text-gray-600">{room.gender}</span>
            </div>
            <div className="flex items-center mb-2">
              <Check size={20} className="mr-2 text-gray-600" />
              <span className="text-gray-600">{room.isAvailable ? "Available" : "Not Available"}</span>
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
      {isRoomOwner ? "" : <>
      
      <div className=' grid grid-cols-2 gap-4 bg-white p-2  w-full mt-5 fixed bottom-0'>
        <Link href={`/chat/${room.id}`} >
          <Button  className="w-full mt-4 py-5 rounded-md bg-black">Chat Now</Button>
        
        </Link>
        <Button  className="w-full mt-4 py-5 rounded-md border-black bg-white border-2 text-black">Enquire Now</Button>
      </div>
      </>}
    </div>
  )
}