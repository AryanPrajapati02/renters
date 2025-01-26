"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
// import { submitEnquiry } from "../actions"

export default function RoomEnquiryForm({ onSubmitSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // const result = await submitEnquiry(data)
      setSubmitResult(result)
      if (result.success) {
        reset()
        if (onSubmitSuccess) {
          onSubmitSuccess()
        }
      }
    } catch (error) {
      setSubmitResult({ success: false, message: "An error occurred. Please try again." })
    }
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Name is required" })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          {...register("phone", { required: "Phone number is required" })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
            Check-in Date
          </label>
          <input
            type="date"
            id="checkIn"
            {...register("checkIn", { required: "Check-in date is required" })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold"
          />
          {errors.checkIn && <p className="mt-1 text-sm text-red-600">{errors.checkIn.message}</p>}
        </div>

        <div>
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
            Check-out Date
          </label>
          <input
            type="date"
            id="checkOut"
            {...register("checkOut", { required: "Check-out date is required" })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold"
          />
          {errors.checkOut && <p className="mt-1 text-sm text-red-600">{errors.checkOut.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
          Number of Guests
        </label>
        <input
          type="number"
          id="guests"
          {...register("guests", {
            required: "Number of guests is required",
            min: { value: 1, message: "Minimum 1 guest" },
          })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold"
        />
        {errors.guests && <p className="mt-1 text-sm text-red-600">{errors.guests.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          rows="4"
          {...register("message")}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
      >
        {isSubmitting ? "Submitting..." : "Submit Enquiry"}
      </button>

      {submitResult && (
        <div className={`mt-4 p-4 ${submitResult.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {submitResult.message}
        </div>
      )}
    </form>
  )
}

