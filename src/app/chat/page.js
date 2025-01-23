// import { supabase } from "../lib/supabase"
// import Link from "next/link"

// export default async function Home() {
//   const { data: rooms, error } = await supabase.from("rooms").select("*")

//   if (error) {
//     console.error("Error fetching rooms:", error)
//     return <div>Error loading rooms. Please try again later.</div>
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Available Rooms</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {rooms.map((room) => (
//           <div key={room.id} className="border rounded-lg p-4">
//             <h2 className="text-xl font-semibold">{room.title}</h2>
//             <p className="text-gray-600">{room.description}</p>
//             <p className="text-lg font-medium mt-2">${room.price} / night</p>
//             <Link
//               href={`/chat/${room.id}`}
//               className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Chat about this room
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

