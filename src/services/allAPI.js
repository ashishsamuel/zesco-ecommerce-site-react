import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";

export const getAllProducts = async () => {
    // call get http request to http://localhost:4000/products to get videos from json server return response to View component
    return await commonAPI("GET", `${serverURL}/products`, "")
}

export const getSingleProduct = async (id) => {
    // call get http request to http://localhost:4000/products to get videos from json server return response to View component
    return await commonAPI("GET", `${serverURL}/products/${id}`, "")
}

// add to cart 
export const addToCart = async (body) => {
    // call post http request to http://localhost:4000/carts to add cart in json server return response to Add component
    return await commonAPI("POST", `${serverURL}/carts`, body)
}

export const getAllCartProducts = async () => {
    // call get http request to http://localhost:4000/carts to get cart from json server return response to View component
    return await commonAPI("GET", `${serverURL}/carts`, "")
}

// add to wishlist 
export const addToWishlist = async (body) => {
    // call post http request to http://localhost:4000/wishlist to add video in json server return response to Add component
    return await commonAPI("POST", `${serverURL}/wishlists`, body)
}

export const getAllWishlistProducts = async () => {
    // call get http request to http://localhost:4000/carts to get wishlist product from json server return response to View component
    return await commonAPI("GET", `${serverURL}/wishlists`, "")
}

export const deleteCartProduct = async (id) => {
    return await commonAPI("DELETE", `${serverURL}/carts/${id}`, {})
}

export const deleteWishlistProduct = async (id) => {
    return await commonAPI("DELETE", `${serverURL}/wishlists/${id}`, {})
}


