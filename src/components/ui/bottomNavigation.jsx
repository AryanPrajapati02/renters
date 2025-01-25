'use client'
import React from 'react'
import { Search, Menu, Bell, Home, MessageCircle, Plus, Heart, User, Mic } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"


function BottomNavigation() {
  // const router = useRouter()
  // const addListing = () => {
  //   router.push('/post-room')
  // }
  // const profile=()=>{
  //   router.push('/profile')
  // }
  return (
   <>
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-4 backdrop-blur-lg bg-white/90">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link href={`/room`}>
            <Button variant="ghost" size="icon" className="flex flex-col items-center">
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Home</span>
            </Button>
            </Link>
            <Link href={`/chat`}>
            <Button variant="ghost" size="icon" className="flex flex-col items-center">
              <MessageCircle className="h-5 w-5" />
              <span className="text-xs mt-1">Messages</span>
            </Button>
            </Link>
            <div className="relative -top-4">
              <Link href={`/post-room`}>
              <Button 
             
                size="icon" 
                className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
              >
                <Plus className="h-6 w-6 text-white" />
              </Button>
              </Link>
            </div>
            <Link href={`/wishlist`}>
            <Button variant="ghost" size="icon" className="flex flex-col items-center">
              <Heart className="h-5 w-5" />
              <span className="text-xs mt-1">Saved</span>
            </Button>
            </Link>
            <Link href={`/profile`}>
            <Button variant="ghost" size="icon" className="flex flex-col items-center" >
              <User className="h-5 w-5" />
              <span className="text-xs mt-1">Profile</span>
            </Button>
            </Link>
          </div>
        </div>
      </div>
   </>
  )
}

export default BottomNavigation