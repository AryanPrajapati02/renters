import React, { useState } from "react";
import { MapPin, Users, Heart, Wifi, Coffee, ShowerHead, Wind } from "lucide-react";
import Image from "next/image";

const RoomCard = ({ room }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi size={16} className="mr-1 text-blue-500" />;
      case 'veg':
        return <Coffee size={16} className="mr-1 text-green-500" />;
      case 'common':
        return <ShowerHead size={16} className="mr-1 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getFacilityIcon = (facility) => {
    switch (facility) {
      case 'cooler':
        return <Wind size={16} className="mr-1 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform md:hover:scale-105">
      <div className="relative">
        <Image
          src={room?.listingImages?.[0]?.url || "/placeholder.svg"}
          alt={room?.title}
          width={500}
          height={300}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1 focus:outline-none"
        >
          <Heart
            size={24}
            className={`transition-colors duration-300 ${
              isFavorite ? "text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">{room?.title}</h3>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={35} className="mr-2" />
          <span className="text-sm">{room.location}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Users size={16} className="mr-1 text-gray-600" />
            <span className="text-sm text-gray-600">Up to {room?.sharingType} persons</span>
          </div>
          <span className="text-lg font-bold text-gray-800">₹{room?.price}/mo</span>
        </div>
        <div className="flex gap-2 flex-wrap">
        <div className="flex flex-wrap gap-2 mb-4">
          {room?.amenities?.food?.map((amenity, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full flex items-center">
              {getAmenityIcon(amenity)}
              {amenity}
            </span>
          ))}
          <span className="px-5 py-1 text-xs bg-gray-100 text-gray-600 rounded-full flex items-center">
            {getAmenityIcon(room?.amenities?.bathroom)}
            {room?.amenities?.bathroom}
          </span>
          {room?.amenities?.other?.map((amenity, index) => (
            <span key={index} className="px-5 py-1 text-xs bg-gray-100 text-gray-600 rounded-full flex items-center">
              {getAmenityIcon(amenity)}
              {amenity}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {room?.facilityType?.map((facility, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full flex items-center">
              {getFacilityIcon(facility)}
              {facility}
            </span>
          ))}
        </div>
        </div>
        <button className="w-full mt-4 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RoomCard;