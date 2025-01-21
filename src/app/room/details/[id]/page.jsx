import { ArrowLeft, Heart, Share2, Phone, MessageCircle, Navigation2, ImageIcon, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"

export default function DetailsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative">
        <Image
          src="/placeholder.svg?height=400&width=800"
          alt="Property Image"
          width={800}
          height={400}
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Link href="/">
            <Button variant="ghost" size="icon" className="bg-white rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="bg-white rounded-full">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="bg-white rounded-full">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
          <ImageIcon className="h-4 w-4 inline mr-1" />
          24
        </div>
      </div>

      {/* Action Buttons */}
      <div className="container px-4 py-6">
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: <Phone className="h-6 w-6" />, label: "Call" },
            { icon: <MessageCircle className="h-6 w-6" />, label: "Message" },
            { icon: <Navigation2 className="h-6 w-6" />, label: "Direction" },
            { icon: <Share2 className="h-6 w-6" />, label: "Share" },
          ].map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="flex flex-col items-center py-4 h-auto"
            >
              {action.icon}
              <span className="mt-2 text-sm">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Details Content */}
      <div className="container px-4">
        <Tabs defaultValue="overview">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="value">House Value</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <p className="text-gray-600">
              Cozy and homey with the most affordable price available in the marketplace. Beautifully
              designed by the world class. Cozy and homey with the most affordable price available in
              the marketplace.
            </p>
            
            {/* Rating Section */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold ml-1">4.9</span>
                  </div>
                  <span className="text-gray-600">· 2K Reviews</span>
                </div>
                <Button variant="ghost" className="text-blue-600">
                  Top rated
                </Button>
              </div>

              {/* Review */}
              <div className="mt-4 p-4 bg-white rounded-lg">
                <p className="text-gray-600 italic">
                  "...We were only sad not to stay longer. We hope to be back to explore Nantes some
                  more and would love to stay at Golwen's place again, if they'll have us!..."
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="features">
            <p className="text-gray-600">Property features and amenities...</p>
          </TabsContent>
          <TabsContent value="value">
            <p className="text-gray-600">Property value information...</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

