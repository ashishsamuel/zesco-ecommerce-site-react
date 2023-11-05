import { createSlice } from "@reduxjs/toolkit";
import { getAllWishlistProducts,deleteWishlistProduct } from "../../services/allAPI";

const fetchWishlistProduct=async ()=>{
    const {data}= await getAllWishlistProducts();
    return data;
}

const wishlistProducts= await fetchWishlistProduct()

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: [...wishlistProducts],
    reducers: {
        storeAddToWishlist: (state, action) => {
            state.push(action.payload)
        },
        storeDeleteFromWishlist:(state,action)=>{
            return state.filter((item=>item.id!=action.payload))
        }
    }

})
export const { storeAddToWishlist,storeDeleteFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer