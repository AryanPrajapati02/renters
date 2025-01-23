"use client"

import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import Link from "next/link"

export default function RecentChats({ currentUserId }) {
  const [recentChats, setRecentChats] = useState([])

  useEffect(() => {
    const fetchRecentChats = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("sender_id, receiver_id, content, created_at")
        .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
        .order("created_at", { ascending: false })
        .limit(10)

      if (error) {
        console.error("Error fetching recent chats:", error)
      } else {
        const uniqueChats = data.reduce((acc, message) => {
          const otherUserId = message.sender_id === currentUserId ? message.receiver_id : message.sender_id
          if (!acc.some((chat) => chat.otherUserId === otherUserId)) {
            acc.push({
              otherUserId,
              lastMessage: message.content,
              timestamp: message.created_at,
            })
          }
          return acc
        }, [])
        setRecentChats(uniqueChats)
      }
    }

    fetchRecentChats()
  }, [currentUserId])

  return (
    <div className="w-64 border-r">
      <h2 className="text-xl font-semibold p-4 border-b">Recent Chats</h2>
      <ul>
        {recentChats.map((chat, index) => (
          <li key={index} className="border-b last:border-b-0">
            <Link href={`/chat/${chat.otherUserId}`} className="block p-4 hover:bg-gray-100">
              <div className="font-medium">User {chat.otherUserId.slice(0, 8)}</div>
              <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
              <div className="text-xs text-gray-400">{new Date(chat.timestamp).toLocaleString()}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

