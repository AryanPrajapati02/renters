'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"

import LocationAccess from './location-access'

export default function LocationDrawer({ openLocationDrawer  , Email}) {
//   const [isOpen, setIsOpen] = useState(false)

  return (
    <Drawer open={openLocationDrawer} >
      <DrawerTrigger asChild className='p-6 pt-16'>
        <Button>Open Location Access</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[100vh] max-h-none bg-gray-950 ">
        <div className="mx-auto w-full max-w-sm p-5 ">
         <LocationAccess  Email={Email} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}