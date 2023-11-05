import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../../services/allAPI";
import axios from "axios";

// api call - createAsyncThunk
export const fetchAllProducts = createAsyncThunk('allProducts/fetchAllProducts', () => {
    // api call
    return axios.get(getAllProducts()).then(response =>
        // console.log(response);
        response.data.products
    )
})
const allProductSlice = createSlice({
    name: 'allProducts',
    initialState: {
        loading: false,
        allProducts: [],
        filteredProducts: [],
        error: ''
    },
    

    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.loading = false
            state.allProducts = action.payload
            state.filteredProducts=[]
            state.error = ''
        })
        builder.addCase(fetchAllProducts.rejected, (state, action) => {
            state.loading = false
            state.allProducts = []
            state.filteredProducts=[]
            state.error = action.error
        })
    },
    reducers:{

        filterValueSearch:(state,action)=>{
            console.log("state" ,state)
            console.log(action,"action")
            console.log(state.allProducts)
            return state.allProducts?.filter(x => x.title.toLowerCase().includes(action.payload))
        }

    }
})

export const {filterValueSearch}=allProductSlice.actions
export default allProductSlice.reducer

