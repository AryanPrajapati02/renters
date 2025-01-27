"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Cloud, ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { userCurrentAddress } from "@/action"
import { useRouter } from "next/navigation"

export default function LocationAccess({Email}) {
  const router = useRouter()
  const [locationData, setLocationData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLocationAccess = () => {
    setIsLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const data = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      
        
        

        // Example of using the coordinates
        fetchLocationDetails(data.lat, data.lng)
      },
      (error) => {
        //console.error("Location Error:", error) // Log any errors
        setError("Unable to retrieve your location")
        setIsLoading(false)
      },
      {
        enableHighAccuracy: true, // Get the best possible position
        timeout: 5000, // Time to wait for position
        maximumAge: 0, // Don't use cached position
      },
    )
  }

  // Example function to fetch location details using coordinates
  const fetchLocationDetails = async (lat, lng) => {
    try {
       const response = await userCurrentAddress({latitude:lat,longitude:lng , Email:Email});

       if(response.success){
         router.push('/room')
         setLocationData(response.address)
        setIsLoading(false)
       }
      
      
    } catch (error) {
      //console.error("Error fetching location details:", error)
    }
  }

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-gray-900 text-white border-none">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-xl font-semibold">Roomer</h1>
            <button className="text-gray-400 flex items-center text-sm" onClick={() => router.push('/room')}>
              Skip <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          {/* Location Icon */}
          <div className="relative h-48 flex items-center justify-center mb-8">
            <Cloud className="absolute text-gray-700 left-1/4 top-1/4 h-6 w-6" />
            <Cloud className="absolute text-gray-700 right-1/4 bottom-1/4 h-6 w-6" />
            <div
              className={cn(
                "relative w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center transition-transform",
                isLoading && "animate-bounce",
              )}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="h-full w-1/2 bg-orange-500 absolute right-0" />
              </div>
              <MapPin className="h-12 w-12 text-white z-10" />
            </div>
            <div className="absolute bottom-0 w-24 h-4 bg-black/20 rounded-full blur-sm" />
          </div>

          {/* Content */}
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-bold">Location Access</h2>
            <p className="text-gray-400 text-sm">Please enable location access to use this feature</p>
          </div>

          {/* Location Data Display */}
          {locationData && (
            <div className="mb-6 space-y-2">
              <div className="p-4 bg-gray-800 rounded-lg text-sm">
                <p>{locationData}</p>
               
              </div>
             
            </div>
          )}

          {/* Error Display */}
          {error && <div className="mb-6 text-red-400 text-sm text-center">{error}</div>}

          {/* Button */}
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleLocationAccess}
            disabled={isLoading}
          >
            {isLoading ? "ACCESSING LOCATION..." : "ENABLE LOCATION"}
          </Button>
        </div>
      </Card>
    </div>
  )
}

