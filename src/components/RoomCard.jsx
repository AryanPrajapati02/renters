import React from "react"
import { MapPin, Users } from "lucide-react"

const RoomCard = ({ room }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img src={room.image || "/placeholder.svg"} alt={room.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{room.title}</h3>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{room.location}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Users size={16} className="mr-1 text-gray-600" />
            <span className="text-sm text-gray-600">Up to {room.capacity} persons</span>
          </div>
          <span className="text-lg font-bold text-gray-800">${room.price}/mo</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {room.amenities.map((amenity, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
              {amenity}
            </span>
          ))}
        </div>
        <button className="w-full mt-4 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  )
}

export default RoomCard

