'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"



export default function Carousel({images}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  //   }, 4000)

  //   return () => clearInterval(timer)
  // }, [])

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
          <Image
            key={index}
            src={image || "/placeholder.svg"}
            alt={`Slide ${index + 1}`}
            width={1200}
            height={600}
            className={cn(
              "absolute top-0 left-0 w-full h-[40vh] object-cover rounded-lg transition-opacity duration-500",
              index === currentIndex ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-[20vh] left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-[20vh] right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-[-20vh] left-1/2 transform rounded-lg -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all hidden duration-300",
              index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
            )}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

