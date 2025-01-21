import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t">
      {/* Newsletter Section */}
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">
            Join our newsletter to keep up to date with us!
          </h2>
          <div className="flex w-full md:w-auto gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="max-w-sm"
            />
            <Button className="bg-[#95D03A] hover:bg-[#85C02A] text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t">
        <div className="container px-4 py-12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Home className="h-6 w-6 text-[#95D03A]" />
                <span className="text-xl font-bold">RoomFinder</span>
              </div>
              <p className="text-muted-foreground">
                We help you find the perfect room with our comprehensive rental platform.
              </p>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link href="/search" className="text-muted-foreground hover:text-foreground">Find Rooms</Link></li>
                <li><Link href="/pricing" className="text-muted-foreground hover:text-foreground">Pricing Plans</Link></li>
                <li><Link href="/host" className="text-muted-foreground hover:text-foreground">Become a Host</Link></li>
                <li><Link href="/virtual-tours" className="text-muted-foreground hover:text-foreground">Virtual Tours</Link></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                <li><Link href="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link href="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
                <li><Link href="/safety" className="text-muted-foreground hover:text-foreground">Safety Guide</Link></li>
                <li><Link href="/terms" className="text-muted-foreground hover:text-foreground">Rental Terms</Link></li>
                <li><Link href="/community" className="text-muted-foreground hover:text-foreground">Community</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t">
        <div className="container px-4 py-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 RoomFinder Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
              <Link href="/cookies" className="hover:text-foreground">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

