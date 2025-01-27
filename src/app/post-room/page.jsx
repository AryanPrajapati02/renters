import { Button } from "@/components/ui/button"
import RoomPostForm from "@/components/ui/room-post-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PostRoomPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
         <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Link href="/room">
            <Button variant="ghost" size="icon" className="bg-white rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          
         
        </div>
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-8 text-black font-sans">Post Your Room</h1>
        <RoomPostForm />
      </div>
    </div>
  )
}

