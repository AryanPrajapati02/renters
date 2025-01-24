'use server'
import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { cookies } from 'next/headers';
import  EmailTemplate  from '@/components/ui/EmailTemplate';
import jwt from 'jsonwebtoken';



async function sendMailOTP({ email, firstname, otp }) {
    console.log('otp', otp , 'email', email) 
    // try {
    //   const { data, error } = await resend.emails.send({
    //     from: 'Room <aryan@resend.dev>',
    //     to: [email],
    //     subject: "OTP Verification",
    //     react: EmailTemplate({ firstname, otp }),
    //   });
  
    //   if (error) {
    //     return {
    //       success: false,
    //       message: "Failed to send email",
    //       error,
    //     };
    //   }
    //   console.log('emails ent' , data)
  
    //   return {
    //     success: true,
    //     message: "Email sent successfully",
    //     data,
    //   };
    // } catch (error) {
    //     console.log('error', error)
    //   return {
    //     success: false,
    //     message: "An unexpected error occurred",
    //     error,
    //   };
    // }

     // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "boolean985@gmail.com", // your Gmail account
      pass: process.env.MAILER_PASSWORD , // your Gmail password or app-specific password
    },
  });

  // Define the email options
  let mailOptions = {
    from: '"Roomer"', // sender address
    to: email, // list of receivers
    subject: 'OTP Verification', // Subject line
    html: EmailTemplate({ firstname, otp }), // html body
  };

  // Send mail with defined transport object
  try {
    let info = await transporter.sendMail(mailOptions);
    // console.log('Message sent: %s', info.messageId);
    return {
      success: true,
      message: 'Email sent successfully',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Failed to send email',
      error,
    };
  }
  }

export async function generateOTP({ email, token , fullname }) {
    const otp = Math.floor(1000 + Math.random() * 9000);

const Udata = {
    'otp': otp,
    'token': token
}
    const { data, error } = await supabase
.from('user')
.update(Udata) 
.eq('email', email)
.select()


        
    if (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to generate OTP"
        })
    }
    
    await sendMailOTP({ email, firstname: fullname, otp })
    return NextResponse.json({
        success: true,
        message: "OTP generated successfully"
    })
 
}




export async function verifyOTP({ email, otp }) {
  
  
    try {
      const { data, error } = await supabase
        .from('user')
        .select('token')
        .eq('email', email)
        .eq('otp', otp)
        .single();
  
      if (error || !data) {
        return { success: false, message: "Invalid OTP" };
      }
  
      const { error: updateError } = await supabase
        .from('user')
        .update({ otp: null, token: null })
        .eq('email', email);
  
      if (updateError) throw updateError;
  
     const cookieStore =  await cookies()
     cookieStore.set('token', data.token, { 
        httpOnly: true, 
        maxAge: 60 * 60 * 24 * 3 // 3 days
      });
  
      return { success: true, message: "OTP verified successfully" };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return { success: false, message: "Failed to verify OTP" };
    }
  }

  export async function verifyUser({email}){
    // console.log('verify email', email)
    try {
        const { data, error } = await supabase
        .from('user')
        .update({verified: true })
        .eq('email', email)
        .select();
        if (error) throw error;
        // console.log('=verified')
        return { success: true, message: "User verified successfully" };
    

    }catch(error){
        console.error('Error verifying User:', error);
        return { success: false, message: "Failed to verify User" };
    }

  }

  export async function fetchUserDetail(req){
    try{
      const getCookies = await cookies();
      const token = getCookies.get('token')?.value || "";
      
      if (!token) {
        return { success: false, message: 'Invalid token' }
      }
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      
      
      if (!decode) {
        return { success: false, message: 'Invalid token' }
        }
    
  
      let { data: user, error } = await supabase
      .from('user')
      .select('*')
      .eq('id', decode.userId)
  
      if (error) {
        return { success: false, message: 'Failed to fetch user detail' , error };
      }
      const userData = {
        id: user[0]?.id,
        name: user[0]?.name,
        email: user[0]?.email,
        verified: user[0]?.verified,
        address: user[0]?.address,
        locationAccess: user[0]?.locationAccess,
        city: user[0]?.city,

       
      }
     
      return { success: true, message: 'User detail fetched successfully', userData };
              
  
  
      
  
    }catch(e){
      // console.log(e)
      return e
    }
  
  }
  
 

  export async function logoutUser(req){
    const cookie = await cookies()
    cookie.delete('token')
    return { success: true, message: ' logged out successfully' }
    
  }
  
  export async function userCurrentAddress({latitude, longitude , Email}){
    try{
    
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      // console.log('data', data)

      if (data?.status != 'OK') {
       return { success: false, message: 'Unable to fetch address' }
      }
      const addressComponents = data.results[0].address_components;
      let city = '';
      for (const component of addressComponents) {
        if (component.types.includes('locality')) {
          city = component.long_name;
          break;
        }
      }
  
      const address = data?.results[0].formatted_address;
      const { data: updatedUser, error } = await supabase
      .from('user')
      .update({ address, city,coordinates: { latitude, longitude }  , 
        locationAccess:true
        })
      .eq('email', Email)
      .select();

    if (error) {
      return { success: false, message: 'Failed to update address' };
    }

    return { success: true, message: 'Address updated successfully' , address: address };

  } catch (error) {
    console.error('Error updating address:', error);
    return { success: false, message: 'An unexpected error occurred' };
  }
}
  
  
//   module.exports.getAddressCoordinates = async (address) => {
//     if (!address) {
//         return new Error('Address is required');
//     }
//     try {
//         const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
//         if (response.data.status === 'OK') {
//             const location = response.data.results[ 0 ].geometry.location;
//             return {
//                 ltd: location.lat,
//                 lng: location.lng
//             };
//         } else {
//             throw new Error('Unable to fetch coordinates');
//         }
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }

export const getAutoCompleteSuggestions = async (input) => {
  if (!input) {
      return { success: false, message: 'Input is required' };
  }

 
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  try {
      const response = await fetch(url);
      const respons = await response.json();
      
      if (respons.status === 'OK') {
        const data = respons.predictions.map(prediction => prediction.description).filter(value => value);
       
        return {
            success: true,
            message: 'Suggestions fetched successfully',
            data
        };
      } else {
         return { success: false, message: 'Unable to fetch suggestions' };
      }
  } catch (err) {
      console.error(err);
      return { success: false, message: 'An unexpected error occurred' };
  }
}


export const fetchLatestListings = async()=>{
    try{
      const { data, error } = await supabase
      .from('listing')
      .select(`* , listingImages(url , listing_id)`)
      .order('created_at', { ascending: false })
      .limit(5);
  
      if (error) {
        return { success: false, message: 'Failed to fetch latest listings' };
      }
  
      return { success: true, message: 'Latest listings fetched successfully', data };
    }catch(e){
      console.log(e)
      return { success: false, message: 'An unexpected error occurred' };
    }
}