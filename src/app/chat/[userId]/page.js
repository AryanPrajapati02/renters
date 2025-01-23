import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Chat from "@/components/Chat"
import RecentChats from "@/components/RecentChats"

export default async function ChatPage({ params }) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    // Handle unauthenticated user
    return <div>Please log in to access the chat.</div>
  }

  const currentUserId = session.user.id
  const otherUserId = params.userId

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="flex">
        <RecentChats currentUserId={currentUserId} />
        <div className="flex-grow">
          <Chat currentUserId={currentUserId} otherUserId={otherUserId} />
        </div>
      </div>
    </div>
  )
}

