import LoginForm from "@/components/ui/loginForm"
import { Home } from 'lucide-react'
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex h-screen overflow-hidden flex-col bg-gray-500 justify-center items-center">
      <div className="flex items-center justify-between w-full px-6 pt-4 md:hidden mb-5">
        <Link href={'/'}> <Home className="w-6 h-6 text-white" /></Link>
        <h1 className="text-xl text-white font-medium">Need Help ?</h1>
      </div>
      <div className="w-full h-full md:h-auto md:max-w-md bg-white rounded-t-3xl md:rounded-3xl pt-12 px-6 mt-0 md:mt-10 shadow-lg">
        <div className="hidden md:flex items-center justify-between w-full px-6 pt-4 mb-5">
          <Link href={'/'}> <Home className="w-6 h-6 text-gray-500" /></Link>
          <h1 className="text-xl text-gray-500 font-medium">Need Help ?</h1>
        </div>
        <h2 className="text-3xl font-bold py-3 text-center">Welcome Back!</h2>
        <p className="text-muted-foreground py-3 font-semibold text-center">Login to your account</p>
        <LoginForm />
        <div className="text-balance mt-5 mb-5 text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  )
}