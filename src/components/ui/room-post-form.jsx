"use client"

import { useState, useCallback, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "react-hot-toast"
import { useDebouncedCallback } from "use-debounce"
import { fetchUserDetail, getAutoCompleteSuggestions } from "@/action"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  gender: z.enum(["male", "female", "any"]),
  accommodationType: z.enum(["hostel", "pg", "flat", "dormitory"]),
  sharingType: z.number().min(1).max(10),
  facilityType: z.array(z.string()).min(1, "Select at least one facility type"),
  amenities: z.object({
    food: z.array(z.enum(["veg", "non-veg"])),
    bathroom: z.enum(["common", "attached"]),
    other: z.array(z.string()),
  }),
  price: z.number().min(0, "Price must be a positive number"),
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
  ownerName: z.string().min(2, "Owner name is required"),
  ownerPhone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  isAvailable: z.boolean(),
  additionalDetails: z.string().optional(),
  location: z.string().min(1, "Location is required"),
})

export default function RoomPostForm() {

  const [user, setUser] = useState(null)
    const userDetail =useCallback(async()=>{
      const response = await fetchUserDetail()
      if(response.success){
      
        setUser(response.userData.id)
        

      }
    },[])
    useEffect(() => {
      userDetail();
    }, []);


    const router = useRouter()
    const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [locationSuggestions, setLocationSuggestions] = useState([])
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facilityType: [],
      amenities: {
        food: [],
        bathroom: "common",
        other: [],
      },
      isAvailable: true,
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const formData = new FormData()

      // Append all form fields to formData
      Object.entries(data).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((file) => formData.append("images", file))
        } else if (key === "amenities" || key === "facilityType") {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, value)
          
        }
      })
      formData.append("ownerId", user)

      const response = await fetch("/api/post-room", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        
        router.push(`/room`)
        setLoading(false)
        toast.success("Room details submitted successfully")

      } else {
        setLoading(false)
        toast.error(result.error || "Failed to submit room details")
      }
    } catch (error) {
      setLoading(false)
      toast.error("Failed to submit room details")
    }
  }
  const handleImageUpload = (e) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
      setValue("images", Array.from(e.target.files))
    }
  }

  const debouncedLocationSearch = useDebouncedCallback(async(input) => {
    // Call API to fetch location suggestions
    const res =  await getAutoCompleteSuggestions(input)
   
    if (res.success) {
      setLocationSuggestions([res.data])
      
    } else {
      console.log(res)
    }
  }, 300)

  const handleLocationChange = (e) => {
    const input = e.target.value
    setValue("location", input)
    debouncedLocationSearch(input)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-black">Post Room Details</CardTitle>
        <CardDescription className="text-gray-600">Fill in the details to list your room for rent.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-black">
              Title
            </Label>
            <Input id="title" {...register("title")} className="border-gray-300 focus:border-black focus:ring-black" />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-black">
              Description
            </Label>
            <Input
              id="description"
              {...register("description")}
              className="border-gray-300 focus:border-black focus:ring-black"
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-black">Gender</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" className="text-black" />
                    <Label htmlFor="male" className="text-black">
                      Male
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" className="text-black" />
                    <Label htmlFor="female" className="text-black">
                      Female
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="any" className="text-black" />
                    <Label htmlFor="any" className="text-black">
                      Any
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="accommodationType" className="text-black">
              Accommodation Type
            </Label>
            <Controller
              name="accommodationType"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="border-gray-300 focus:border-black focus:ring-black">
                    <SelectValue placeholder="Select accommodation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hostel">Hostel</SelectItem>
                    <SelectItem value="pg">PG</SelectItem>
                    <SelectItem value="flat">Flat</SelectItem>
                    <SelectItem value="dormitory">Dormitory</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.accommodationType && <p className="text-sm text-red-500">{errors.accommodationType.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sharingType" className="text-black">
              Sharing Type
            </Label>
            <Controller
              name="sharingType"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(Number.parseInt(value))}
                  defaultValue={field.value?.toString()}
                >
                  <SelectTrigger className="border-gray-300 focus:border-black focus:ring-black">
                    <SelectValue placeholder="Select sharing type" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "person" : "people"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.sharingType && <p className="text-sm text-red-500">{errors.sharingType.message}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-black">Facility Type</Label>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Controller
                name="facilityType"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <>
                    {["cooler", "ac", "balcony", "regular"].map((facility) => (
                      <div key={facility} className="flex items-center space-x-2">
                        <Checkbox
                          id={facility}
                          checked={field.value?.includes(facility)}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...field.value, facility]
                              : field.value?.filter((value) => value !== facility)
                            field.onChange(updatedValue)
                          }}
                          className="text-black focus:ring-black"
                        />
                        <Label htmlFor={facility} className="text-black">
                          {facility.charAt(0).toUpperCase() + facility.slice(1)}
                        </Label>
                      </div>
                    ))}
                  </>
                )}
              />
            </div>
            {errors.facilityType && <p className="text-sm text-red-500">{errors.facilityType.message}</p>}
          </div>

          <div className="space-y-4">
            <Label className="text-black">Amenities</Label>
            <div className="space-y-2">
              <Label className="text-black">Food</Label>
              <div className="flex flex-wrap gap-4">
                <Controller
                  name="amenities.food"
                  control={control}
                  render={({ field }) => (
                    <>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="veg"
                          checked={field.value.includes("veg")}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...field.value, "veg"]
                              : field.value.filter((value) => value !== "veg")
                            field.onChange(updatedValue)
                          }}
                          className="text-black focus:ring-black"
                        />
                        <Label htmlFor="veg" className="text-black">
                          Veg
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="non-veg"
                          checked={field.value.includes("non-veg")}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...field.value, "non-veg"]
                              : field.value.filter((value) => value !== "non-veg")
                            field.onChange(updatedValue)
                          }}
                          className="text-black focus:ring-black"
                        />
                        <Label htmlFor="non-veg" className="text-black">
                          Non-veg
                        </Label>
                      </div>
                    </>
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-black">Bathroom</Label>
              <Controller
                name="amenities.bathroom"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="common" id="common" className="text-black" />
                      <Label htmlFor="common" className="text-black">
                        Common
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="attached" id="attached" className="text-black" />
                      <Label htmlFor="attached" className="text-black">
                        Attached
                      </Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-black">Other Amenities</Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <Controller
                  name="amenities.other"
                  control={control}
                  render={({ field }) => (
                    <>
                      {["hot-water", "parking", "wifi", "laundry", "terrace", "garden"].map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity}
                            checked={field.value.includes(amenity)}
                            onCheckedChange={(checked) => {
                              const updatedValue = checked
                                ? [...field.value, amenity]
                                : field.value.filter((value) => value !== amenity)
                              field.onChange(updatedValue)
                            }}
                            className="text-black focus:ring-black"
                          />
                          <Label htmlFor={amenity} className="text-black">
                            {amenity.replace("-", " ").charAt(0).toUpperCase() + amenity.slice(1)}
                          </Label>
                        </div>
                      ))}
                    </>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-black">
              Price (per month)
            </Label>
            <Input
              id="price"
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="border-gray-300 focus:border-black focus:ring-black"
            />
            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="images" className="text-black">
              Upload Images
            </Label>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="border-gray-300 focus:border-black focus:ring-black"
            />
            {errors.images && <p className="text-sm text-red-500">{errors.images.message}</p>}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image) || "/placeholder.svg"}
                    alt={`Uploaded ${index + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownerName" className="text-black">
              Owner Name
            </Label>
            <Input
              id="ownerName"
              {...register("ownerName")}
              className="border-gray-300 focus:border-black focus:ring-black"
            />
            {errors.ownerName && <p className="text-sm text-red-500">{errors.ownerName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownerPhone" className="text-black">
              Owner Phone Number
            </Label>
            <Input
              id="ownerPhone"
              {...register("ownerPhone")}
              className="border-gray-300 focus:border-black focus:ring-black"
            />
            {errors.ownerPhone && <p className="text-sm text-red-500">{errors.ownerPhone.message}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="isAvailable" {...register("isAvailable")} />
            <Label htmlFor="isAvailable" className="text-black">
              Currently Available
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-black">
              Location
            </Label>
            <Input
              id="location"
              {...register("location")}
              onChange={handleLocationChange}
              className="border-gray-300 focus:border-black focus:ring-black"
            />
            {locationSuggestions.length > 0 && (
              <ul className="mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-sm">
                {locationSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-4 hover:bg-gray-100 cursor-pointer  "
                   
                  >
                    {suggestion.map((suggestion)=>{
                      return <p className="border-b border-gray-100 p-1 text-black font-sans"   onClick={() => {
                        setValue("location", suggestion)
                        setLocationSuggestions([])
                      }}>{suggestion}</p>
                    })}
                    {/* {suggestion} */}
                  </li>
                ))}
              </ul>
            )}
            {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalDetails" className="text-black">
              Additional Details
            </Label>
            <Textarea
              id="additionalDetails"
              {...register("additionalDetails")}
              className="border-gray-300 focus:border-black focus:ring-black"
              placeholder="Any other details you'd like to add..."
            />
          </div>

          <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
            Submit {
          loading ? <> <svg className="animate-spin h-7 w-7 text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-50" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg></>: null
        }
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

