"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const Bookings = ({ bookings }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{booking.listingTitle}</h3>
                  <p className="text-gray-600 mb-1">Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
                  <p className="text-gray-600 mb-2">Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
                  <p className="font-semibold">Total: ${booking.total}</p>
                </div>
                <Badge
                  variant={
                    booking.status === "Confirmed"
                      ? "success"
                      : booking.status === "Pending"
                        ? "warning"
                        : "destructive"
                  }
                >
                  {booking.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Bookings

