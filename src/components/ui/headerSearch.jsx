"use client"

import { useState, useEffect, useCallback } from 'react'
import { Search, Menu, Bell, Mic, HomeIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { signOut } from 'next-auth/react'
import {  logoutUser } from '@/action'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, fetchUserListing } from '@/app/redux/slice'
import { set } from 'react-hook-form'

export function HeaderSearch() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)


  const dispatch = useDispatch()
  

  const userData = useSelector((state) => state?.user?.user)
  


  const [loading, setLoading] = useState(false)
  const logout = async()=>{
    setLoading(true)
   
    await logoutUser()
    await signOut('google')
    router.push('/')
    setLoading(false)
  }
 
  // setUser(userData?.name)
  useEffect(() => {
  
    dispatch(fetchUser())
    dispatch(fetchUserListing())
  
  }, [dispatch]);
 


  useEffect(() => {
    // userDetail()
    const controlHeader = () => {
      const currentScrollY = window.scrollY
      
      // Show header when scrolling up or at top
      // Hide header when scrolling down and past 100px
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', controlHeader)
    
    return () => {
      window.removeEventListener('scroll', controlHeader)

    }
  }, [lastScrollY ])

  return (
    <header className={`sticky top-0 bg-gradient-to-r from-orange-50 to-pink-100 border-b z-50 shadow-sm transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container px-4 py-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <Menu className="h-6 w-6" />
          </Button>
          <div className="relative flex items-center space-x-4">
            <Button onClick= {logout}>Log{loading ? <>ing out... <svg className="animate-spin h-5 w-5 text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg></> : "out"}</Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <Bell className="h-6 w-6" />
            </Button>
           
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div>
        <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Hi, {userData?.name}
        </h1>
        
        {/* Search Bar */}
        <div className="relative mt-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for your dream home..."
              className="w-full pl-12 pr-12 py-3 rounded-2xl border bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 rounded-xl"
            >
              <Mic className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

