'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchChatConnections, fetchLatestListings, fetchUserDetail } from '@/action';

const isBrowser = typeof window !== 'undefined';
// Define the initial state
const initialState = {
  user: null,
  listings:null,
  latestListings: null,
  wishlist: isBrowser ? JSON.parse(localStorage.getItem('wishlist')) || [] : [],
  status: 'idle',
  error: null,
  chatConnections:null
};

// Create an async thunk for fetching user data
export const fetchUser = createAsyncThunk('user/fetch', async () => {
 try{ const response = await fetchUserDetail();
   

    return response.userData
}
    catch(e){
       
        return e
    }
 
});
export const fetchUserListing = createAsyncThunk('user/room/fetch', async () => {
    try{


      const response = await fetch("/api/post-room")
       const data = await response.json()
       if(data.status){
              return data
       }
         else{
              return data
         }
       
      
    }catch(e){
        console.log(e)
        return e
    }
    
       
 
});
export const fetchLatestListing = createAsyncThunk('latest/listing/fetch', async () => {
    try{


      const data = await fetchLatestListings()
      
      
       if(data.status){
              return data
       }
         else{
              return data
         }
       
      
    }catch(e){
        console.log(e)
        return e
    }
    
       
 
});

export const chatConnectionsByUser = createAsyncThunk('chat/connections/fetch',async(currentUserId)=>{
  try{
    const data = await fetchChatConnections(currentUserId);
    if(data.success){
      const d = Array.from(new Set(data.data.map(item => item.listing_id)))
      return d
    }else{
      return data
    }
  }catch(e){
    console.log(e)
    return e
  }
})


const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const itemIndex = state.wishlist.findIndex(item => item.id === action.payload.id);
      let newWishlist;
      if (itemIndex >= 0) {
        newWishlist = state.wishlist.filter(item => item.id !== action.payload.id);
      } else {
        newWishlist = [...state.wishlist, action.payload];
      }
      state.wishlist = newWishlist;
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    },
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserListing.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listings = action.payload?.data;
      })
      .addCase(fetchLatestListing.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.latestListings = action.payload?.data;
      })
      .addCase(chatConnectionsByUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chatConnections = action.payload
      })
    
  },
});

export const { toggleWishlist } = userSlice.actions;
export default userSlice.reducer;