import { NextResponse } from "next/server";
import {supabase} from "@/lib/db"
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const listingData = Object.fromEntries(formData.entries());

    const listing = {
      ...listingData,
      
      amenities: JSON.parse(listingData.amenities),
      facilityType: JSON.parse(listingData.facilityType),
      price: Number.parseFloat(listingData.price),
      sharingType: Number.parseInt(listingData.sharingType),
      isAvailable: listingData.isAvailable === "true",
    };

    // Insert listing into database
    const { data :listings, error } = await supabase.from("listing").insert(listing).select();

    if (error) throw error;
 
    // Handle image uploads
    const images = formData.getAll("images");
   
    let imageUrls

    for (const image of images){
      const file =image;
      const fileName = Date.now().toString();
      const fileExt = file.name.split('.').pop();
      const {data,error} = await supabase.storage.from('listingImage').upload(`${fileName}` , file , {
        contentType: `image/${fileExt}`,
        upsert: false
      })
      if(error) {
        return NextResponse.json({ success: false, error: "Failed to create listing !!" }, { status: 500 });


      }
      else{
      
       imageUrls = `${process.env.NEXT_PUBLIC_IMAGE_URL}${fileName}`
       const {data,error} = await supabase.from('listingImages').insert({url:imageUrls ,listing_id:listings[0].id }).select()
       
        if(error){
          return NextResponse.json({ success: false, error: "Failed to create listing" }, { status: 500 });
        }
        

      }

    }
    
  

    return NextResponse.json({ success: true,message: "Listing created successfully" , data : listings });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json({ success: false, error: "Failed to create listing" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const cookieStore = await cookies()
    const userCookie = cookieStore.get('user')?.value || ""
    const user = userCookie ? JSON.parse(userCookie) : null
    
    const {data , error} = await supabase.from("listing").select(`* , listingImages(url , listing_id)`).eq('ownerId', user.userId)
    

    if (error){
      return NextResponse.json({ success: false, error: "Failed to fetch listings" }, { status: 500 });
    }

    return NextResponse.json({ success: true , data : data });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch listings" }, { status: 500 });
  }
}
