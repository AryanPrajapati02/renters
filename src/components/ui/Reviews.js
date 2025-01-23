"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const Reviews = ({ reviews }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Your Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{review.listingTitle}</h3>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-2">{review.comment}</p>
              <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Reviews

