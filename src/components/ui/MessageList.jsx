import { useEffect, useRef } from "react"

export default function MessageList({ messages, currentUserId }) {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-2 rounded-lg shadow ${
            message.sender_id === currentUserId ? "bg-blue-100 ml-auto" : "bg-white mr-auto"
          }`}
          style={{ maxWidth: "70%" }}
        >
          <p className="text-sm text-gray-600">{message.content}</p>
          <p className="text-xs text-gray-400 mt-1">{new Date(message.created_at).toLocaleString()}</p>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

