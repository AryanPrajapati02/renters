'use client'
import { fetchMessages } from "@/action/index"
import ChatInterface from "@/components/ui/ChatInterface"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function ChatPage() {
  const params = useParams()
  const listingId = params.id
  const [initialMessages, setInitialMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const messages = await fetchMessages(listingId)
      setInitialMessages(messages)
      setLoading(false)
    }
    fetchData()
  }, [listingId])

  return (
    <div className="container mx-auto p-4">
      <Link href="/room">
        <ArrowLeft className="h-10 w-10 absolute shadow-lg rounded-full p-2" />
      </Link>
      <h1 className="text-2xl font-bold mb-4 mt-5 font-sans text-center text-teal-500">Chat for Listing </h1>
      {loading ? (
        <div className="space-y-4 animate-pulse bg-slate-100">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : (
        <ChatInterface listingId={listingId} initialMessages={initialMessages} />
      )}
    </div>
  )
}