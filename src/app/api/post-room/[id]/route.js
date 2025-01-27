import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    //console.error("Error fetching listing:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch listing" }, { status: 500 });
  }
}

// export async function PUT(req, { params }) {
//   try {
//     const formData = await req.formData();
//     const listingData = Object.fromEntries(formData.entries());

//     // Handle image uploads
//     const images = formData.getAll("images");
//     const imageUrls = await Promise.all(
//       images.map(async (image) => {
//         if (typeof image === "string") return image; // Keep existing image URLs

//         const { data, error } = await supabase.storage
//           .from("room-images")
//           .upload(`${Date.now()}-${image.name}`, image);

//         if (error) throw error;

//         const { publicUrl } = supabase.storage
//           .from("room-images")
//           .getPublicUrl(data.path);

//         return publicUrl;
//       })
//     );

//     // Prepare listing data for database update
//     const listing = {
//       ...listingData,
//       images: imageUrls,
//       amenities: JSON.parse(listingData.amenities),
//       facilityType: JSON.parse(listingData.facilityType),
//       price: Number.parseFloat(listingData.price),
//       sharingType: Number.parseInt(listingData.sharingType),
//       isAvailable: listingData.isAvailable === "true",
//     };

//     // Update listing in database
//     const { data, error } = await supabase
//       .from("listings")
//       .update(listing)
//       .eq("id", params.id)
//       .select();

//     if (error) throw error;

//     return NextResponse.json({ success: true, data });
//   } catch (error) {
//     //console.error("Error updating listing:", error);
//     return NextResponse.json({ success: false, error: "Failed to update listing" }, { status: 500 });
//   }
// }

export async function PUT(req) {
  try {
    const formData = await req.formData();
    const listingData = Object.fromEntries(formData.entries());
    const { id } = listingData;

    const listing = {
      ...listingData,
      amenities: JSON.parse(listingData.amenities),
      facilityType: JSON.parse(listingData.facilityType),
      price: Number.parseFloat(listingData.price),
      sharingType: Number.parseInt(listingData.sharingType),
      isAvailable: listingData.isAvailable === "true",
    };

    // Update listing in database
    const { data: updatedListing, error } = await supabase
      .from("listing")
      .update(listing)
      .eq("id", id)
      .select();

    if (error) throw error;

    // Handle image uploads
    const images = formData.getAll("images");
    let imageUrls = [];

    for (const image of images) {
      if (typeof image === "string") {
        imageUrls.push(image); // Keep existing image URLs
      } else {
        const fileName = Date.now().toString();
        const fileExt = image.name.split('.').pop();
        const { data, error } = await supabase.storage
          .from('listingImage')
          .upload(`${fileName}.${fileExt}`, image, {
            contentType: `image/${fileExt}`,
            upsert: false,
          });

        if (error) {
          return NextResponse.json({ success: false, error: "Failed to upload image" }, { status: 500 });
        }

        const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}${fileName}.${fileExt}`;
        imageUrls.push(imageUrl);

        const { error: insertError } = await supabase
          .from('listingImages')
          .insert({ url: imageUrl, listing_id: id })
          .select();

        if (insertError) {
          return NextResponse.json({ success: false, error: "Failed to update listing images" }, { status: 500 });
        }
      }
    }

    return NextResponse.json({ success: true, message: "Listing updated successfully", data: updatedListing });
  } catch (error) {
    //console.error("Error updating listing:", error);
    return NextResponse.json({ success: false, error: "Failed to update listing" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { error } = await supabase
      .from("listings")
      .delete()
      .eq("id", params.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    //console.error("Error deleting listing:", error);
    return NextResponse.json({ success: false, error: "Failed to delete listing" }, { status: 500 });
  }
}