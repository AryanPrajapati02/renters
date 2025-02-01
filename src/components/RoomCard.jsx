import React, { useEffect, useState } from "react";
import { MapPin, Users, Heart, Wifi, Coffee, ShowerHead, Wind, Thermometer, ParkingMeter,  Flower, AirVent, Home, User } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";

const RoomCard = ({ room }) => {
  
  const roomOwner = useSelector((state) => state?.user?.listings);

  const [isRoomOwner, setIsRoomOwner] = useState(false);
  const checkRoomOwner = () => {
    const owner = roomOwner?.find((owner) => owner.id === room?.id);
    if (owner) {
      setIsRoomOwner(true);
    }
  }
useEffect(()=>{
  checkRoomOwner();
} , [])
  
  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi size={16} className="mr-1 text-blue-500" />;
      case 'veg':
        return <Coffee size={16} className="mr-1 text-green-500" />;
      case 'non-veg':
        return <Coffee size={16} className="mr-1 text-red-500" />;
      case 'attached':
        return <ShowerHead size={16} className="mr-1 text-yellow-500" />;
      case 'hot-water':
        return <Thermometer size={16} className="mr-1 text-orange-500" />;
      case 'parking':
        return <ParkingMeter size={16} className="mr-1 text-gray-500" />;
      
      case 'garden':
        return <Flower size={16} className="mr-1 text-green-500" />;
      default:
        return null;
    }
  };

  const getFacilityIcon = (facility) => {
    switch (facility) {
      case 'ac':
        return <AirVent size={16} className="mr-1 text-blue-500" />;
      case 'regular':
        return <Home size={16} className="mr-1 text-gray-500" />;
      case 'cooler':
        return <Wind size={16} className="mr-1 text-blue-500" />;
      case 'balcony':
        return <Home size={16} className="mr-1 text-green-500" />;
      default:
        return null;
    }
  };

  const getGenderIcon = (gender) => {
    switch (gender) {
      case 'female':
        return <User size={16} className="mr-1 text-pink-500" />;
      case 'male':
        return <User size={16} className="mr-1 text-blue-500" />;
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
        {/* <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1 focus:outline-none"
        >
          <Heart
            size={24}
            className={`transition-colors duration-300 ${
              isFavorite ? "text-red-500" : "text-gray-400"
            }`}
          />
        </button> */}
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
        <div className="flex flex-wrap gap-2 mb-4">
          {room?.amenities?.food?.map((amenity, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full flex items-center">
              {getAmenityIcon(amenity)}
              {amenity}
            </span>
          ))}
          {/* <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full flex items-center">
            {getAmenityIcon(room.amenities.bathroom)}
            {room.amenities.bathroom}
          </span> */}
          {room?.amenities?.other?.map((amenity, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full flex items-center">
              {getAmenityIcon(amenity)}
              {amenity}
            </span>

          ))}

          {room?.facilityType?.map((facility, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full flex items-center">
              {getFacilityIcon(facility)}
              {facility}
            </span>
          ))}
        {getGenderIcon(room?.gender)}
        <span className="text-sm text-gray-600">{room?.gender}</span>
        </div>
        {/* <div className="flex flex-wrap gap-2 mb-4">
        </div> */}
        {/* <div className="flex items-center mb-4">
        </div> */}
        {!isRoomOwner ? <>  <button className={`w-full mt-4 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition-colors `}>
          View Details
        </button> </> : <> <button className={`w-full mt-4 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition-colors `}>
         Edit Details
        </button></>}
       
      </div>
    </div>
  );
};

export default RoomCard;