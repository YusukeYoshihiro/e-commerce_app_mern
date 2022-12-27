// import { createStore, combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import {
//     productListReducer,
//     productDetailsReducer,
//     productDeleteReducer,
//     productCreateReducer,
//     productUpdateReducer,
//     productReviewCreateReducer,
//     productTopRatedReducer,
// } from './reducers/productReducers';
// import { cartReducer } from './reducers/cartReducers';
// import {
//     userLoginReducer,
//     userRegisterReducer,
//     userDetailsReducer,
//     userUpdateProfileReducer,
//     userListReducer,
//     userDeleteReducer,
//     userUpdateReducer,
// } from './reducers/userReducers';
// import {
//     orderCreateReducer,
//     orderDetailsReducer,
//     orderPayReducer,
//     orderListMyReducer,
//     orderListReducer,
//     orderDeliverReducer,
// } from './reducers/orderReducers';
import productDetailsReducer from './reducers/productReducers/productDetailsSlice';
import productListReducer from './reducers/productReducers/productListSlice';
import productDeleteReducer from './reducers/productReducers/productDeleteSlice';
import productCreateReducer from './reducers/productReducers/productCreateSlice';
import productUpdateReducer from './reducers/productReducers/productUpdateSlice';
import productReviewCreateReducer from './reducers/productReducers/productReviewCreateSlice';
import productTopRatedReducer from './reducers/productReducers/productTopRatedSlice';

import cartReducer from './reducers/cartReducers/cartSlice';

import userLoginReducer from './reducers/userReducers/userLoginSlice';
import userRegisterReducer from './reducers/userReducers/userRegisterSlice';
import userDetailsReducer from './reducers/userReducers/userDetailsSlice';
import userUpdateReducer from './reducers/userReducers/userUpdateSlice';
import userUpdateProfileReducer from './reducers/userReducers/userUpdateProfileSlice';
import userListReducer from './reducers/userReducers/userListSlice';
import userDeleteReducer from './reducers/userReducers/userDeleteSlice';

import orderCreateReducer from './reducers/orderReducers/orderCreateSlice';
import orderDetailsReducer from './reducers/orderReducers/orderDetailsSlice';
import orderPayReducer from './reducers/orderReducers/orderPaySlice';
import orderDeliverReducer from './reducers/orderReducers/orderDeliverSlice';
import orderListMyReducer from './reducers/orderReducers/orderListMySlice';
import orderListReducer from './reducers/orderReducers/orderListSlice';


// const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

// const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

// const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};

// const initialState = {
//     cart: {
//         cartItems: cartItemsFromStorage,
//         shippingAddress: shippingAddressFromStorage,
//     },
//     userLogin: { userInfo: userInfoFromStorage },
// };

const middleware = [thunk];

// const reducer = combineReducers({
//     productList: productListReducer,
//     productDetails: productDetailsReducer,
//     productDelete: productDeleteReducer,
//     productCreate: productCreateReducer,
//     productUpdate: productUpdateReducer,
//     productReviewCreate: productReviewCreateReducer,
//     productTopRated: productTopRatedReducer,
//     cart: cartReducer,
//     userLogin: userLoginReducer,
//     userRegister: userRegisterReducer,
//     userDetails: userDetailsReducer,
//     userUpdateProfile: userUpdateProfileReducer,
//     userList: userListReducer,
//     userDelete: userDeleteReducer,
//     userUpdate: userUpdateReducer,
//     orderCreate: orderCreateReducer,
//     orderDetails: orderDetailsReducer,
//     orderPay: orderPayReducer,
//     orderDeliver: orderDeliverReducer,
//     orderListMy: orderListMyReducer,
//     orderList: orderListReducer,
// });

// const store = createStore(
//     reducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware))
// );

const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        productDelete: productDeleteReducer,
        productCreate: productCreateReducer,
        productUpdate: productUpdateReducer,
        productReviewCreate: productReviewCreateReducer,
        productTopRated: productTopRatedReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userUpdate: userUpdateReducer,
        userUpdateProfile: userUpdateProfileReducer,
        userDelete: userDeleteReducer,
        userList: userListReducer,
        orderCreate: orderCreateReducer,
        orderDetails: orderDetailsReducer,
        orderPay: orderPayReducer,
        orderDeliver: orderDeliverReducer,
        orderListMy: orderListMyReducer,
        orderList: orderListReducer
    },
    preloadedState: {},
    middleware
})

export default store;