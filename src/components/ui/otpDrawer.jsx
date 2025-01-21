'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import OtpVerification from "@/components/ui/otp-verification"

export default function OtpVerificationDrawer({email ,openOTPDrawer }) {
  const [isOpen, setIsOpen] = useState(false)
//   const [email, setEmail] = useState('')

  const handleOpenChange = (open) => {
    setIsOpen(open)
    if (!open) {
    //   setEmail('')
    }
  }

  return (
    <Drawer open={openOTPDrawer} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild className='p-6 pt-16'>
        <Button>Open OTP Verification</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[100vh] max-h-none p-4">
        <div className="mx-auto w-full max-w-sm">
          <OtpVerification Email={email} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
