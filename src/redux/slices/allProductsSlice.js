import { createAsyncThunk, createSlice,current } from "@reduxjs/toolkit";
import { getAllProducts } from "../../services/allAPI";


// api call - createAsyncThunk
export const fetchAllProducts = createAsyncThunk('allProductsList/fetchAllProducts',async ()=>{
    // api call
        const {data} = await getAllProducts()
        data.filter(prod => {
            prod.price = Math.floor(prod.originalPrice * (prod.discountPercentage / 100))
        })
        return data
    })

const allProductsSlice = createSlice({
    name:'allProductsList',
    initialState:{
        loading:false,
        allProducts:[],
        filteredProducts:[],
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllProducts.pending,(state=>{
            state.loading = true
        }))
        builder.addCase(fetchAllProducts.fulfilled,(state,action)=>{
            state.loading = false
            state.allProducts = action.payload
            state.filteredProducts = []
            state.error = ''
        })
        builder.addCase(fetchAllProducts.rejected,(state,action)=>{
            state.loading = false
            state.allProducts = []
            state.filteredProducts = []
            state.error = action.error.message
        })
    },
    reducers:{
        filterProducts:(state,action)=>{
            const allProductsList = current(state.allProducts);
            // console.log(allProductsList);
            state.filteredProducts = allProductsList.filter(product=>product.title.toLowerCase().includes(action.payload))
            // console.log(allProductsList.filter(product=>product.title.toLowerCase().includes(action.payload)));
        }
    }
})

export default allProductsSlice.reducer
export const {filterProducts} = allProductsSlice.actions