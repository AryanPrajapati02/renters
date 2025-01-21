import { Heart, Share2, Star, Bed, Bath } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function RoomCard({ room }) {
  return (
    <Card className="group overflow-hidden border-none shadow-lg">
      <CardHeader className="p-0 relative">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
          <img
            src={room.imageUrl || "/placeholder.svg"}
            alt={room.name}
            className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{room.name}</h3>
            <p className="text-sm text-muted-foreground">{room.location}</p>
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-medium">{room.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{room.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{room.bathrooms} Bathrooms</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={room.host.avatar} alt={room.host.name} />
            <AvatarFallback>{room.host.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{room.host.name}</span>
        </div>
        <div className="font-semibold">
          ${room.price}
          <span className="text-muted-foreground font-normal">/night</span>
        </div>
      </CardFooter>
    </Card>
  )
}

