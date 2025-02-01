import { ChevronLeft } from 'lucide-react'
import SignUpForm from "@/components/ui/signupForm"
import EmailTemplate from "@/components/ui/EmailTemplate"
import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/90 to-primary flex items-center justify-center">
      <div className="container max-w-md mx-auto ">
        <div className="pt-6 flex items-center justify-between text-white px-4">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <span className="text-sm">Need some help?</span>
        </div>
        <div className="mt-8 bg-background p-7 shadow-lg rounded-t-3xl">
          <div className="space-y-2 mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">Getting started</h1>
            <p className="text-muted-foreground">Create account to continue!</p>
          </div>
          <SignUpForm />
          <div className="text-balance mt-5 text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
            and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  )
}