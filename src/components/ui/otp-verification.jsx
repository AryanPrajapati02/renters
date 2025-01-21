'use client'

import { useState, useRef } from 'react'
import { Smartphone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { verifyOTP, verifyUser } from '@/action'
import { useRouter } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import LocationDrawer from './loactionDrawer'
import toast from 'react-hot-toast'

export default function OtpVerification({ Email }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState(['', '', '', ''])
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]
  const [openLocationDrawer, setOpenLocationDrawer] = useState(false)

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value[0]
    }
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input if value is entered
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handleResend = () => {
    // Reset OTP
    setOtp(['', '', '', ''])
    // Focus first input
    inputRefs[0].current?.focus()
  }

  const handleVerify = async() => {
    const otpString = otp.join('')
    if (otpString.length === 4) {
     
      // Call API to verify OTP
      setLoading(true)
      const res = await verifyOTP({ email: Email, otp: otpString })
      // console.log(res)
      if (res.success) {
        await verifyUser({email: Email})
        // console.log('OTP Verified Successfully')
        setOpenLocationDrawer(true)
        setLoading(false)



      }
      if(res.success === false){
        // console.log('OTP Verification Failed')
        toast.error(res.message)
        setLoading(false)
      }

    }
  }

  return (
    <div className="flex flex-col  items-center space-y-8 pt-16">
      <div className="relative">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Smartphone className="w-8 h-8 text-primary" />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
          <span className="text-xs font-medium text-white">1</span>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">OTP Verification</h1>
        <p className="text-sm text-muted-foreground">
          Enter OTP Code sent to <Badge variant="secondary " className="bg-green-200 font-medium text-black border-green-400">{Email}</Badge>
        </p>
      </div>

      <div className="flex gap-3 w-full max-w-xs mx-auto">
        {otp.map((digit, index) => (
          <Input
            key={index}
            ref={inputRefs[index]}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            className="h-14 text-center text-lg font-medium"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </div>

      <div className="text-sm">
        Didn't receive OTP?{" "}
        <button
          onClick={handleResend}
          className="text-primary hover:underline font-medium"
        >
          Resend Code
        </button>
      </div>

      <Button
        className="w-full h-12 text-base font-medium"
        onClick={handleVerify}
        disabled={!otp.every(Boolean)}
      >
        Verify & Proceed {
          loading ? <> <svg className="animate-spin h-7 w-7 text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-50" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg></>: null
        }
      </Button>
      {openLocationDrawer && <LocationDrawer   openLocationDrawer={openLocationDrawer}  Email={Email}/>}
    </div>
  )
}

