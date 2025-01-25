'use client'
import { fetchMessages } from "@/action/index"
import ChatInterface from "@/components/ui/ChatInterface"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ChatPage() {
  const params = useParams()
  const listingId = params.id
  const [initialMessages, setInitialMessages] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const messages = await fetchMessages(listingId)
      setInitialMessages(messages)
    }
    fetchData()
  }, [listingId])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat for Listing {listingId}</h1>
      <ChatInterface listingId={listingId} initialMessages={initialMessages} />
    </div>
  )
}