'use client';

import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link"
import { useForm } from "react-hook-form";


 import {toast} from 'react-hot-toast'
 import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
    
    const router = useRouter()
     const session = useSession()
    
      if(session.status === "authenticated") {
        router.push('/room')
    
      }
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        await router.push('/room');
        setLoading(false);
        toast.success("Login Successful");
      } else {
        setLoading(false);
        toast.error(result.error);
       
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Invalid Credentials",
        description: "Please enter a valid Credentials to continue",
       
        variant: "destructive",
       
      })
    }
  };

  return (
    <div className="space-y-6">
      <Button variant="outline" className="w-full h-14 text-base font-normal" onClick={()=>signIn('google')}>
        <img
          src="https://authjs.dev/img/providers/google.svg"
          className="w-5 h-5 mr-3"
          alt="Google"
        />
        Login with Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} >
      <div className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Email"
            className="h-14"
            {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="h-14 pr-10"
              {...register("password", { required: "Password is required" })}
            />
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
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>
      </div>

      <div className="flex items-center justify-between py-4">
        <Link href="/auth/user/forgot-password" className="text-sm text-primary hover:underline">
          Forgot your password?
        </Link>
      </div>

      <Button type='submit' className="w-full h-14 text-base font-medium bg-primary hover:bg-primary/90">
        LOGIN  {
          loading ? <> <svg className="animate-spin h-7 w-7 text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-50" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg></>: null
        }
      </Button>
      </form>
      <div className="text-center text-sm">
        Don’t have an account?{" "}
        <Link href="/auth/user/register" className="text-blue-400 underline hover:underline">
          Create an Account
        </Link>
      </div>
    </div>
  );
}
