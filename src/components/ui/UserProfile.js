"use client"

import { useState, useEffect } from "react"
import { fetchUserProfile, updateUserProfile } from "@/utils/api"
import PersonalInfo from "./PersonalInfo"
import Listings from "./Listings"
import Bookings from "./Bookings"
import Reviews from "./Reviews"
import Settings from "./Settings"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Home, MessageSquare, SettingsIcon, User } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { set } from "react-hook-form"
import { fetchUser, fetchUserListing } from "@/app/redux/slice"
import ProfileSkeleton from "./profile-skeleton"

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (!userDetail) {
      dispatch(fetchUser());
    } else {
      setUser(userDetail);
    }
  }, [userDetail, dispatch]);

  useEffect(() => {
    dispatch(fetchUserListing());
  }, [dispatch]);

  const handleUpdateProfile = async (updatedData) => {
    const updatedUser = await updateUserProfile(updatedData)
    setUser(updatedUser)
  }

  if (!user) return <div className="flex items-center justify-center h-screen"><ProfileSkeleton /></div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100   ">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-0 md:mr-8">
              <AvatarImage src={user?.profilePicture} alt={user?.name} />
              <AvatarFallback>
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
              <p className="text-gray-600 mb-1">{user?.role}</p>
              <p className="text-sm text-gray-500">Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {/* <div className="bg-purple-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-purple-600">{user?.activityMetrics.bookings}</p>
              <p className="text-sm text-gray-600">Bookings</p>
            </div> */}
            {/* <div className="bg-indigo-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-indigo-600">{user?.activityMetrics.messages}</p>
              <p className="text-sm text-gray-600">Messages</p>
            </div> */}
            {/* <div className="bg-pink-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-pink-600">{user?.listings.length}</p>
              <p className="text-sm text-gray-600">Listings</p>
            </div> */}
            {/* <div className="bg-blue-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-600">{user?.reviews.length}</p>
              <p className="text-sm text-gray-600">Reviews</p>
            </div> */}
          </div>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Info
              </TabsTrigger>
              <TabsTrigger value="listings" className="flex items-center">
                <Home className="w-4 h-4 mr-2" />
                Listings
              </TabsTrigger>
              {/* <TabsTrigger value="bookings" className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-2" />
                Bookings
              </TabsTrigger> */}
              {/* <TabsTrigger value="reviews" className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Reviews
              </TabsTrigger> */}
              <TabsTrigger value="settings" className="flex items-center">
                <SettingsIcon className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <PersonalInfo user={user} onUpdate={handleUpdateProfile} />
            </TabsContent>
            <TabsContent value="listings">
              <Listings listings={user?.listings} />
            </TabsContent>
            <TabsContent value="bookings">
              <Bookings bookings={user?.bookings} />
            </TabsContent>
            <TabsContent value="reviews">
              <Reviews reviews={user?.reviews} />
            </TabsContent>
            <TabsContent value="settings">
              <Settings user={user && user} onUpdate={handleUpdateProfile} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserProfile

