'use client'
import RoomEnquiryForm from "@/components/RoomEnquiryForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"


export default function Home() {
  const params = useParams()
  const listingId = params.id

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center  sm:px-6 lg:px-8">
      <Link href="#">
      <ArrowLeft className="w-10 p-1 h-10 absolute top-7 left-5 bg-white shadow-lg rounded-full text-gray-600 " />
      </Link>
      <h2 className="font-sans font-semibold text-2xl absolute top-7 text-center ">Room Enquiry</h2>
      <RoomEnquiryForm  />
    </div>
  )
}

