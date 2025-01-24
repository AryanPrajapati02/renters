"use client"

import { useState } from "react"
import { validateEmail, validatePhone } from "@/utils/validation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useSelector } from "react-redux"

const PersonalInfo = ({ user, onUpdate }) => {
  const userData = useSelector((state) => state?.user?.user)
  const [name, setName] = useState(userData?.name)
  const [email, setEmail] = useState(userData?.email)
  const [phone, setPhone] = useState(userData?.phone)
  const [address, setAddress] = useState(userData?.address)
  const [errors, setErrors] = useState({})
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!validateEmail(email)) newErrors.email = "Invalid email address"
    if (!validatePhone(phone)) newErrors.phone = "Invalid phone number"

    if (Object.keys(newErrors).length === 0) {
      onUpdate({ name, email, phone, address })
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 3000)
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </div>
      <Button type="submit" className="w-full">
        Update Profile
      </Button>
      {isSuccess && (
        <Alert className="bg-green-100 border-green-400 text-green-700">
          <AlertDescription>Profile updated successfully!</AlertDescription>
        </Alert>
      )}
    </form>
  )
}

export default PersonalInfo

