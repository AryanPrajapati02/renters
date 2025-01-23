"use client"

import styled from "styled-components"

export const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`

export const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 2rem;
`

export const ProfileName = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`

export const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`

export const TabButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1rem;
  background-color: ${(props) => (props.active ? "#007bff" : "#f8f9fa")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#e9ecef")};
  }
`

export const TabContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`

export const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`

export const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`

export const ListingsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`

export const ListingItem = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 4px;
  overflow: hidden;
`

export const ListingImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`

export const ListingDetails = styled.div`
  padding: 1rem;
`

export const BookingsContainer = styled.div`
  display: grid;
  gap: 2rem;
`

export const BookingItem = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 1rem;
`

export const BookingStatus = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: ${(props) => {
    switch (props.status) {
      case "Confirmed":
        return "#28a745"
      case "Pending":
        return "#ffc107"
      case "Cancelled":
        return "#dc3545"
      default:
        return "#6c757d"
    }
  }};
  color: #fff;
`

export const ReviewsContainer = styled.div`
  display: grid;
  gap: 2rem;
`

export const ReviewItem = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 1rem;
`

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`

export const ReviewRating = styled.span`
  font-weight: bold;
  color: #ffc107;
`

export const ReviewDate = styled.span`
  font-size: 0.875rem;
  color: #6c757d;
`

export const SettingsContainer = styled.div`
  display: grid;
  gap: 2rem;
`

export const Section = styled.section`
  margin-bottom: 2rem;
`

export const CheckboxGroup = styled.div`
  margin-bottom: 1rem;
`

