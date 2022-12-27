import { createSlice } from "@reduxjs/toolkit";

export const productDetailsSlice = createSlice({
    name: 'productDetail',
    initialState: {
        product: {
            reviews: []
        }
    },
    reducers: {
        product_details_request: (state, action) => {
            return { ...state, loading: true }
        },
        product_details_success: (state, action) => {
            return { loading: false, product: action.payload }
        },
        product_details_fail: (state, action) => {
            return { loading: false, error: action.payload }
        }
    }
})

export const {
    product_details_request,
    product_details_success,
    product_details_fail
} = productDetailsSlice.actions

export default productDetailsSlice.reducer