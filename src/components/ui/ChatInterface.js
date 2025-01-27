"use client"

import { useState, startTransition, useEffect, useRef } from "react"
import { sendMessage } from "@/action/index"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "@/app/redux/slice"
import { Skeleton } from "@/components/ui/skeleton"

export default function ChatInterface({ listingId, initialMessages }) {
  const [messages, setMessages] = useState(initialMessages || [])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const currentUserId = useSelector((state) => state?.user?.user?.id)
  const sender_id = useSelector((state) => state?.user?.user?.id)
  const dispatch = useDispatch()
  const messagesEndRef = useRef(null)

  useEffect(() => {
    setMessages(initialMessages || [])
    setLoading(false)
  }, [initialMessages])

  useEffect(() => {
    if (!currentUserId) {
      dispatch(fetchUser())
    }
  }, [currentUserId, dispatch])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const optimisticMessage = {
      id: `temp-${Date.now()}`, // Temporary ID for optimistic rendering
      listing_id: listingId,
      sender_id: currentUserId,
      content: newMessage,
      created_at: new Date().toISOString(),
    }

    startTransition(() => {
      setMessages((prevMessages) => [...prevMessages, optimisticMessage])
    })

    setNewMessage("")

    try {
      const data = await sendMessage(listingId, sender_id, newMessage)
      if (!data.success) {
        return false
      }
      setMessages((prevMessages) => prevMessages?.map((msg) => msg.id === optimisticMessage.id ? data?.content : msg))
    } catch (error) {
      //console.error('Error sending message:', error)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      <ScrollArea className="flex-grow mb-4 p-4 border rounded-md">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-16 w-full mb-2" />
          ))
        ) : (
          messages?.map((message, idx) => (
            <div
              key={message?.id || `temp-${idx}`} // Ensure each message has a unique key
              className={`mb-2 p-2 rounded-lg ${
                message?.sender_id === currentUserId ? "bg-blue-100 ml-auto" : "bg-gray-100"
              }`}
              style={{ maxWidth: "70%" }}
            >
              {message?.sender_id && (
                <p className="text-sm text-gray-600">{new Date(message.created_at).toLocaleString()}</p>
              )}
              <p className="text-bold font-sans text-xl text-black">{message?.content}</p>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow text-black h-12"
        />
        <Button type="submit" className="h-12 py-2 px-6 bg-teal-600 text-white font-sans font-bold ">Send</Button>
      </form>
    </div>
  )
} 