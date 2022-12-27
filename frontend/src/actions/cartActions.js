import axios from 'axios';
// import {
//     CART_ADD_ITEM,
//     CART_REMOVE_ITEM,
//     CART_SAVE_SHIPPING_ADDRESS,
//     CART_SAVE_PAYMENT_METHOD,
// } from '../constants/cartConstants';
import {
    cart_addItem,
    cart_removeItem,
    cart_save_payment_method,
    cart_save_shipping_address
} from "../reducers/cartReducers/cartSlice";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    // dispatch({
    //     type: CART_ADD_ITEM,
    //     payload: {
    //         product: data._id,
    //         name: data.name,
    //         image: data.image,
    //         price: data.price,
    //         countInStock: data.countInStock,
    //         qty
    //     }
    // })
    const cartItem = {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty
    }
    dispatch(cart_addItem(cartItem));


    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

export const removeFromCart = (id) => async (dispatch, getState) => {
    // dispatch({
    //     type: CART_REMOVE_ITEM,
    //     payload: id
    // })
    dispatch(cart_removeItem(id));

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

export const saveShippingAddress = (data) => async (dispatch) => {
    // dispatch({
    //     type: CART_SAVE_SHIPPING_ADDRESS,
    //     payload: data
    // })
    dispatch(cart_save_shipping_address(data));

    localStorage.setItem('shippingAddress', JSON.stringify(data))
};

export const savePaymentMethod = (data) => async (dispatch) => {
    // dispatch({
    //     type: CART_SAVE_PAYMENT_METHOD,
    //     payload: data
    // })
    dispatch(cart_save_payment_method(data));


    localStorage.setItem('paymentMethod', JSON.stringify(data))
};

