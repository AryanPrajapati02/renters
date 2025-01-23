const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  address: "123 Main St, Anytown, USA",
  profilePicture: "/placeholder.svg?height=150&width=150",
  role: "Room Owner",
  createdAt: "2023-01-01",
  activityMetrics: {
    bookings: 15,
    messages: 42,
  },
  notifications: {
    email: true,
    sms: false,
    inApp: true,
  },
  listings: [
    {
      id: 1,
      title: "Cozy Studio in Downtown",
      description: "A beautiful studio apartment in the heart of the city.",
      price: 80,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Spacious 2BR with Ocean View",
      description: "Enjoy the ocean view from this spacious 2-bedroom apartment.",
      price: 150,
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  bookings: [
    {
      id: 1,
      listingTitle: "Mountain Retreat",
      checkIn: "2023-07-15",
      checkOut: "2023-07-20",
      total: 500,
      status: "Confirmed",
    },
    {
      id: 2,
      listingTitle: "Beach House",
      checkIn: "2023-08-01",
      checkOut: "2023-08-07",
      total: 1200,
      status: "Pending",
    },
  ],
  reviews: [
    {
      id: 1,
      listingTitle: "City Loft",
      rating: 4,
      comment: "Great location and amenities. Highly recommended!",
      date: "2023-06-10",
    },
    {
      id: 2,
      listingTitle: "Suburban House",
      rating: 5,
      comment: "Perfect for families. We had a wonderful stay!",
      date: "2023-05-22",
    },
  ],
}

export const fetchUserProfile = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUser)
    }, 500)
  })
}

export const updateUserProfile = (updatedData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedUser = { ...mockUser, ...updatedData }
      resolve(updatedUser)
    }, 500)
  })
}

