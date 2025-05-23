"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { sendEnquiryMail } from "@/action"


export function RoomEnquiryDrawer({ isOpenD , onClose ,user ,listingId }) {

  
  const [isOpen, setIsOpen] = useState(isOpenD)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const promise = sendEnquiryMail(listingId, data)
      toast.promise(promise, {
        pending: "Sending...",
        success: "Enquiry sent successfully",
        error: "Failed to send enquiry",
      })
  
      const result = await promise
      if (result.success) {
        onClose()
      } else {
        toast.error(result.message)
      }
    } catch (e) {
      //console.log(e)
      toast.error("Failed to send enquiry")
    }
  }

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerTrigger asChild>
        <Button className="bg-deep-blue hover:bg-blue-800 text-white">Open Room Enquiry</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Room Enquiry</DrawerTitle>
            <DrawerDescription>Fill out the form to enquire rooms.</DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name", { required: true })} value={user.name} placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                {...register("email", { required: true })}
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"


                type="number"
                {...register("phone", { required: true })}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                {...register("message", {
                  required: "Message is required",
                  minLength: { value: 10, message: "Message must be at least 10 characters long" },
                })}
                placeholder="Any special requests or questions?"
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
            </div>
            <DrawerFooter>
              <Button type="submit" className="bg-gold hover:bg-gold-dark text-white bg-black">
                Submit Enquiry
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

