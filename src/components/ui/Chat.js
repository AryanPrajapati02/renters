"use client"

import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Chat({ roomId }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [roomDetails, setRoomDetails] = useState(null)

  useEffect(() => {
    // Fetch existing messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("room_id", roomId)
        .order("created_at", { ascending: true })

      if (error) console.error("Error fetching messages:", error)
      else setMessages(data)
    }

    fetchMessages()

    // Subscribe to new messages
    const subscription = supabase
      .channel("messages")
      .on("INSERT", (payload) => {
        setMessages((prev) => [...prev, payload.new])
      })
      .subscribe()

    // Fetch room details
    const fetchRoomDetails = async () => {
      const { data, error } = await supabase.from("rooms").select("*").eq("id", roomId).single()

      if (error) console.error("Error fetching room details:", error)
      else setRoomDetails(data)
    }

    fetchRoomDetails()

    return () => {
      subscription.unsubscribe()
    }
  }, [roomId])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessage = {
      room_id: roomId,
      content: input,
      sender_name: "Anonymous User", // Since we're not using authentication
    }

    const { error } = await supabase.from("messages").insert(newMessage)

    if (error) console.error("Error sending message:", error)
    else {
      setInput("")
    }
  }

  return (
    <div className="flex flex-col h-[600px] max-w-md mx-auto border rounded-lg overflow-hidden">
      {roomDetails && (
        <div className="p-4 bg-gray-100 border-b">
          <h2 className="text-lg font-semibold">{roomDetails.title}</h2>
          <p className="text-sm text-gray-600">{roomDetails.description}</p>
          <p className="text-sm font-medium mt-2">${roomDetails.price} / night</p>
        </div>
      )}
      <ScrollArea className="flex-grow p-4">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <span className="inline-block p-2 rounded-lg bg-gray-200 text-gray-800">
              <strong>{message.sender_name}: </strong>
              {message.content}
            </span>
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  )
}

