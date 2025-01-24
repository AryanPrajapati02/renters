import Footer from '@/components/ui/footer'
import Header from '@/components/ui/header'
import Hero from '@/components/ui/hero'
import RoomGrid from '@/components/ui/room-grid'
import React from 'react'


function page() {
  
  return (
   <>
   <Header />
   <Hero />
   <div className='bg-gradient-to-r from-gray-100 to-gray-200 pt-5  px-5 md:px-16 md:py-16 border-t-2'>
    <div className='flex justify-between items-center'>
   <h3 className="text-2xl md:text-3xl   font-bold ">Featured Rooms</h3>
    <h2 className="text-lg underline cursor-pointer  font-semibold ">View all</h2>
    </div>
  
   <RoomGrid />
   </div>
   <Footer />
   </>
  )
}

export default page 