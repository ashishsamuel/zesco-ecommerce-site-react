import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import wishlistSlice from './slices/wishlistSlice';
import allProductsSlice from './slices/allProductsSlice';

const store = configureStore({
    reducer: {
        cartReducer: cartSlice,
        wishlistReducer: wishlistSlice,
        allProductsReducer:allProductsSlice
    }
})

export default store;