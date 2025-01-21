'use client'

import { useState } from "react"
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form";
import Link from "next/link"

import {toast} from 'react-hot-toast'
import { useRouter } from "next/navigation"
import { sendMailOTP } from "@/action"
import OtpVerificationDrawer from "./otpDrawer"
import { signIn, useSession } from "next-auth/react"



export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tick, setTick] = useState(false)
  
  const [openOTPDrawer, setOpenOTPDrawer] = useState(false)
  const router = useRouter()
  const [email, setEmail] = useState('')

  const session = useSession()

  if(session.status === "authenticated") {
    router.push('/room')

  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async(formData) => {
    const { email, fullname, password } = formData;
    // console.log(formData)
    if(fullname.length < 4) {
      setTick(true)
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid Email")
      return;

    }
    if (fullname?.length < 5) {
      toast.error('Full Name must be at least 5 characters')
      return;

    }
    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must contain at least 8 characters, one uppercase, one lowercase, one number")
      return;
    }

   

    try {
      setLoading(true)
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, fullname, password }),
      });

      const data = await response.json();
      // console.log(data)

      if (response.ok) {
        setEmail(email) 
        setOpenOTPDrawer(true)
        

      //  await router.push(`/auth/user/register/otp-verify/${encodeURIComponent(email)}`);
      
        setLoading(false)
        toast.success("Registration Successful, OTP sent to your email")
      } else {

        setLoading(false)
       toast.error(data.error)

      }
    } catch (error) {
      // console.error('Registration error:', error);
      setLoading(false)
      toast.error(`An error occured, please try again later, ${error}`)
    }





  };

  return (
    <div className="space-y-6">
      <Button variant="outline" className="w-full h-14 text-base font-normal"   onClick={()=>signIn('google')}>
        <img
          src="https://authjs.dev/img/providers/google.svg"
          className="w-5 h-5 mr-3"
          alt="Google"
        />
        Sign up with Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleLogin)} noValidate>

      <div className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Email"
            className="h-14"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
        <div>
          <div className="relative">
            <Input
              placeholder="Full Name"
              className="h-14 pr-10"
              name="fullname"
              
              {...register("fullname", { required: "Full Name is required" })}
            />
            {errors.fullname && <span className="text-red-500">{errors.fullname.message}</span>}
            {!tick ? "" :   <div className="absolute right-3 top-4 text-emerald-500"> ✓</div> }

            {/* <div className="absolute right-3 top-4 text-red-500"> ✗</div> */}
          </div>
        </div>
        <div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="h-14 pr-10"
              {...register("password", { required: "Password is required " })}
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-5 mb-5">
        <Label htmlFor="reminder" className="text-sm font-normal">
          Remember me next time
        </Label>
        <Switch id="reminder" />
      </div>

      <Button 
      type="submit"
      className="w-full h-14 text-base font-medium bg-primary hover:bg-primary/90">
        SIGN UP {loading ? <> <svg className="animate-spin h-5 w-5 text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg></> : ""}
      </Button>

      </form>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/user/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>

      {openOTPDrawer && <OtpVerificationDrawer email={email} setOpenOTPDrawer={setOpenOTPDrawer} openOTPDrawer={openOTPDrawer} />}
      
    </div>
  )
}



