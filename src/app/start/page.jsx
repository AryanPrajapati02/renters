import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <main className=" flex items-center justify-center bg-gray-50 h-[93vh]">
      <Card className="w-full h-[93vh]  overflow-hidden border-none ">
        <div className="relative w-full ">
          <img
            src="https://img.freepik.com/free-vector/pregnancy-maternity-scene_24908-56922.jpg?t=st=1737122188~exp=1737125788~hmac=150b4c45a2983c6fc913eef40a6281fef5d8d01408ba4462db6ebf1181c78c28&w=826"
            alt="Luxury resort poolside with palm trees"
            fill
            className="object-cover w-[100%] h-[50vh]"
            priority
          />
        </div>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Discover and Find Your Perfect Healing Place
            </h1>
            <p className="text-gray-500">
              Eheal is No.1 App to search and discover the most suitable place for you to stay.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link href="/auth/user/register">
            <Button className="w-full bg-black hover:bg-gray-800 py-6 text-lg  shadow-xl" size="lg">
              Register
            </Button>
            </Link>
            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/auth/user/login" className="text-orange-600 hover:underline">
                Log In
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

