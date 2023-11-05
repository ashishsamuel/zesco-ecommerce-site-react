import { createSlice } from "@reduxjs/toolkit";

const getSearchWordSlice = createSlice({
    name: 'searchText',
    initialState: { value: 0 },
    reducers: {
        getSearch: (state, action) => {
            state.value = action.payload
            console.log(state)
        },


    }
})

export const { getSearch } = getSearchWordSlice.actions
export default getSearchWordSlice.reducer
