'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Home } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Rooms', href: '/rooms' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Home className="h-6 w-6 text-[#95D03A]" />
          </Link>
        </div>
        <div className="flex lg:hidden">
        <Button className="mr-4" >
            <Link href="/auth/user/login">Log in</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Button asChild className="w-full">
                      <Link href="/" onClick={() => setOpen(false)}>+  Post Room</Link>
                    </Button>
                  </div>
                  <div className="py-6">
                    <Button asChild className="w-full">
                      <Link href="/auth/user/register" onClick={() => setOpen(false)}>Create Account</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary transition-colors">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button asChild>
            <Link href="/auth/user/login">Log in</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}

