import RoomCard from './room-card'

const rooms = [
  {
    id: 1,
    name: 'FIDI Studio Office',
    location: 'New York, NY 100',
    rating: 4.8,
    beds: 2,
    bathrooms: 2,
    price: '32,00',
    imageUrl: 'https://media.istockphoto.com/id/1933752815/photo/modern-interior-of-living-room-with-leather-armchair-on-wood-flooring-and-dark-blue-wall.webp?a=1&b=1&s=612x612&w=0&k=20&c=Gz4wbPmGwj5VNuKWw6V7WWKi1Gq-qjIGw4O2nj6JbHE=',
    host: {
      name: 'John Adam Smith',
      avatar: '/placeholder.svg?height=32&width=32'
    }
  },
  {
    id: 2,
    name: 'FIDI Studio Office',
    location: 'New York, NY 100',
    rating: 4.8,
    beds: 2,
    bathrooms: 2,
    price: '32,00',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9vbXxlbnwwfHwwfHx8MA%3D%3D',
    host: {
      name: 'John Adam Smith',
      avatar: '/placeholder.svg?height=32&width=32'
    }
  },
  {
    id: 3,
    name: 'FIDI Studio Office',
    location: 'New York, NY 100',
    rating: 4.8,
    beds: 2,
    bathrooms: 2,
    price: '32,00',
    imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D',
    host: {
      name: 'John Adam Smith',
      avatar: '/placeholder.svg?height=32&width=32'
    }
  },
  {
    id: 4,
    name: 'FIDI Studio Office',
    location: 'New York, NY 100',
    rating: 4.8,
    beds: 2,
    bathrooms: 2,
    price: '32,00',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1678752717095-08cd0bd1d7e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cm9vbXxlbnwwfHwwfHx8MA%3D%3D',
    host: {
      name: 'John Adam Smith',
      avatar: '/placeholder.svg?height=32&width=32'
    }
  }
]

export default function RoomGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-5">
      {rooms.map(room => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  )
}

