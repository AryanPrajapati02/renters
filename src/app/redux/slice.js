'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLatestListings, fetchUserDetail } from '@/action';

// Define the initial state
const initialState = {
  user: null,
  listings:null,
  status: 'idle',
  error: null,
 latestListings: null,
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



const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //   .addCase(fetchUser.pending, (state) => {
    //     state.status = 'loading';
    //   })
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
    
  },
});

export const { } = userSlice.actions;
export default userSlice.reducer;