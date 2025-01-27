'use client'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { chatConnectionsByUser, fetchLatestListing, fetchUser } from '../redux/slice'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import BottomNavigation from '@/components/ui/bottomNavigation'
import { Skeleton } from '@/components/ui/skeleton'

export default function ChatConnectionsPage() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const currentUserId = useSelector((state) => state?.user?.user?.id)
  const latestListing = useSelector((state) => state?.user?.latestListings)
  const chatConnectionsData = useSelector((state) => state?.user?.chatConnections)

  useEffect(() => {
    if (!currentUserId) {
      dispatch(fetchUser())
    }
  }, [currentUserId, dispatch])

  useEffect(() => {
    const fetchData = async () => {
      if (currentUserId) {
        await dispatch(chatConnectionsByUser(currentUserId))
        setLoading(false)
      }
    }
    fetchData()
  }, [currentUserId, dispatch])

  useEffect(() => {
    if (!latestListing) {
      dispatch(fetchLatestListing())
    }
  }, [latestListing, dispatch])

  const getListingDetails = (listingId) => {
    return latestListing?.find((listing) => listing.id === listingId)
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/room">
        <ArrowLeft className="h-10 w-10 absolute shadow-lg rounded-full p-2" />
      </Link>
      <h1 className="text-3xl font-bold mb-12 text-center font-sans ">Chat Connections</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-zinc-300 rounded-lg animate-pulse">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : chatConnectionsData?.length === 0 ? (
        <p className="text-center text-gray-600">No chat connections found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatConnectionsData?.map((connection) => {
            const listingDetails = getListingDetails(connection)
            return (
              <div
                key={connection}
                className="border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/chat/${connection}`} className="block">
                  {listingDetails && (
                    <div className='flex'>
                      <Image
                        src={listingDetails?.listingImages?.[0].url}
                        alt={`Listing ${connection}`}
                        width={200}
                        height={400}
                        className="w-full h-36 p-2 object-cover rounded-xl flex-1"
                      />
                      <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Owner: {listingDetails.ownerName}</h2>
                      </div>
                    </div>
                  )}
                </Link>
              </div>
            )
          })}
        </div>
      )}
      <BottomNavigation />
    </div>
  )
}