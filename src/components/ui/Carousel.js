'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const images = [
  'https://imgs.search.brave.com/LUPRH2bxEkS6O5B2_e6D4c6nAuoypOXTJ4oyiKVAxEw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM0/NDA4MzI0MC9waG90/by9tb2Rlcm4tbGl2/aW5nLXJvb20uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPXl5/YVhQdThFTlBsek90/RHVobWJpcWJ2VFUt/RG9Ubm1QeVJ3US1y/bzdoMGs9',
  'https://imgs.search.brave.com/ckT2BAwm-c2jMWu_gQcJiAa0SnQ2lforotVAKtxfzVU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE1/NjAxMTc1Ni9waG90/by9kZWNvcmF0ZWQt/bGl2aW5nLXJvb20t/YXQtaG9tZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9OU1q/Y1ZHTTYwQjRXR3pH/aEVhdy1ZeTg1WjhG/eFRsTFkyMDAxU2o5/ZTA4VT0',
  'https://imgs.search.brave.com/ON-RxZo1-k1eVNJec3KI5TFi_QKtlfFzvV_GdTL159w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQz/NDA0NDYzMi9waG90/by9saXZpbmctcm9v/bS13aXRoLWFydHdv/cmtzLW9uLXRoZS13/YWxsLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1aQUZ6ZmZP/aS1VS2REeVJBZlpm/Y2p6RjJlQW1DNzZm/SkU1ajhQaDdHSy1z/PQ'
 
]

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <div className="relative w-full max-w-5xl rouned-xl mx-auto">
      <div className="overflow-hidden rounded-lg aspect-[16/9]">
        {images.map((image, index) => (
          <img
            key={index}
            src={image || "/placeholder.svg"}
            alt={`Slide ${index + 1}`}
            width={1200}
            height={600}
            className={cn(
              "absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-opacity duration-500",
              index === currentIndex ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 transform rounded-lg -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
            )}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

