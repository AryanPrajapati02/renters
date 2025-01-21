import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Carousel from '@/components/ui/Carousel'

export default function Hero() {
  return (
    <div className="relative isolate ">
      {/* <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div> */}
     

  <div>
  <main className="max-h-screen bg-gradient-to-r from-gray-100 to-gray-200 md:px-16 py-2 px-5 overflow-hidden">
      <div className="container py-2">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-block">
                <div className="flex items-center gap-2 bg-gray-300 rounded-full px-4 py-1.5 text-sm font-medium text-[#1E1E1E]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#95D03A] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E1E1E]"></span>
                  </span>
                 Live....
                </div>
              </div>
              <h5 className="text-3xl font-bold tracking-tight lg:text-6xl text-[#1E1E1E]">
              Find Your Perfect Room
              </h5>
              <p className="text-xl text-[#666666] max-w-xl">
              Find your perfect room. Browse listings, connect with landlords, and rent with ease.s
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="h-12 px-6 bg-[#1E1E1E] hover:bg-[#1E1E1E]/90 text-white"
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 px-6 border-[#1E1E1E] text-[#1E1E1E] hover:bg-[#1E1E1E]/10"
              >
                Learn More
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white bg-[#FFE7D6] flex items-center justify-center"
                    >
                      <span className="text-sm">👤</span>
                    </div>
                  ))}
                </div>
                <div>
                  <span className="text-2xl font-bold text-[#1E1E1E]">250+</span>
                </div>
              </div>
              <p className="text-sm text-[#666666] max-w-md">
                *Trusted by  satisfied users, have made a real impact on people lives*
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#F4F4F4] to-[#FAFAFA] rounded-3xl transform rotate-3"></div>
            <div className="relative">
              <Carousel />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

      {/* <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div> */}
    </div>
  )
}

