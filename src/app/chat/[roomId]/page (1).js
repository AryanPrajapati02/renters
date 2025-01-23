import Chat from "@/components/Chat"

export default function ChatPage({ params }) {
  const roomId = params.roomId

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Room</h1>
      <Chat roomId={roomId} />
    </div>
  )
}

