import axios from 'axios';
// import {
//     PRODUCT_LIST_REQUEST,
//     PRODUCT_LIST_SUCCESS,
//     PRODUCT_LIST_FAIL,
//     PRODUCT_DETAILS_REQUEST,
//     PRODUCT_DETAILS_SUCCESS,
//     PRODUCT_DETAILS_FAIL,
//     PRODUCT_DELETE_REQUEST,
//     PRODUCT_DELETE_SUCCESS,
//     PRODUCT_DELETE_FAIL,
//     PRODUCT_CREATE_REQUEST,
//     PRODUCT_CREATE_SUCCESS,
//     PRODUCT_CREATE_FAIL,
//     PRODUCT_UPDATE_REQUEST,
//     PRODUCT_UPDATE_SUCCESS,
//     PRODUCT_UPDATE_FAIL,
//     PRODUCT_CREATE_REVIEW_REQUEST,
//     PRODUCT_CREATE_REVIEW_SUCCESS,
//     PRODUCT_CREATE_REVIEW_FAIL,
//     PRODUCT_TOP_FAIL,
//     PRODUCT_TOP_SUCCESS,
//     PRODUCT_TOP_REQUEST
// } from '../constants/productConstants';
import { products_request, products_success, products_fail } from "../reducers/productReducers/productListSlice"
import { product_delete_request, product_delete_success, product_delete_fail } from "../reducers/productReducers/productDeleteSlice"
import { product_details_request, product_details_success, product_details_fail } from "../reducers/productReducers/productDetailsSlice"
import { product_create_request, product_create_success, product_create_fail } from "../reducers/productReducers/productCreateSlice"
import { product_update_request, product_update_success, product_update_fail } from "../reducers/productReducers/productUpdateSlice"
import { product_create_review_request, product_create_review_success, product_create_review_fail } from "../reducers/productReducers/productReviewCreateSlice"
import { product_top_request, product_top_success, product_top_fail } from "../reducers/productReducers/productTopRatedSlice"

export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        // dispatch({ type: PRODUCT_LIST_REQUEST });
        dispatch(products_request());
        const { data } = await axios.get(
            `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
        );

        // dispatch({
        //     type: PRODUCT_LIST_SUCCESS,
        //     payload: data
        // })
        dispatch(products_success(data));

    } catch (error) {
        // dispatch({
        //     type: PRODUCT_LIST_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // });
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch(products_fail(message));
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        // dispatch({ type: PRODUCT_DETAILS_REQUEST });
        dispatch(product_details_request());

        const { data } = await axios.get(`/api/products/${id}`);

        // dispatch({
        //     type: PRODUCT_DETAILS_SUCCESS,
        //     payload: data
        // })
        dispatch(product_details_success(data));
    } catch (error) {
        // dispatch({
        //     type: PRODUCT_DETAILS_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // })
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(product_details_fail(message));

    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        // dispatch({
        //     type: PRODUCT_DELETE_REQUEST,
        // });
        dispatch(product_delete_request());


        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        await axios.delete(
            `/api/products/${id}`,
            config,
        );

        // dispatch({
        //     type: PRODUCT_DELETE_SUCCESS,
        // });
        dispatch(product_delete_success());


    } catch (error) {
        // dispatch({
        //     type: PRODUCT_DELETE_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // });
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(product_delete_fail(message))
    }
}

export const createProduct = (product) => async (dispatch, getState) => {
    try {
        // dispatch({
        //     type: PRODUCT_CREATE_REQUEST,
        // });
        dispatch(product_create_request());

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post(
            `/api/products/`,
            product,
            config,
        );

        // dispatch({
        //     type: PRODUCT_CREATE_SUCCESS,
        //     payload: data,
        // });
        dispatch(product_create_success(data));

    } catch (err) {
        // dispatch({
        //     type: PRODUCT_CREATE_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // });
        const message = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(product_create_fail(message))
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        // dispatch({
        //     type: PRODUCT_UPDATE_REQUEST,
        // });
        dispatch(product_update_request());

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.put(
            `/api/products/${product._id}`,
            product,
            config,
        );

        // dispatch({
        //     type: PRODUCT_UPDATE_SUCCESS,
        //     payload: data,
        // });
        dispatch(product_update_success(data));

    } catch (err) {
        // dispatch({
        //     type: PRODUCT_UPDATE_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // });
        const message = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(product_update_fail(message))
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        // dispatch({
        //     type: PRODUCT_CREATE_REVIEW_REQUEST,
        // });
        dispatch(product_create_review_request());

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        await axios.post(
            `/api/products/${productId}/reviews`,
            review,
            config,
        );

        // dispatch({
        //     type: PRODUCT_CREATE_REVIEW_SUCCESS,
        // })
        dispatch(product_create_review_success());

    } catch (err) {
        // dispatch({
        //     type: PRODUCT_CREATE_REVIEW_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // })
        const message = err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        dispatch(product_create_review_fail(message))
    }
}

export const listTopProducts = () => async (dispatch) => {
    try {
        // dispatch({ type: PRODUCT_TOP_REQUEST });
        dispatch(product_top_request());

        const { data } = await axios.get(
            `/api/products/top`
        );

        // dispatch({
        //     type: PRODUCT_TOP_SUCCESS,
        //     payload: data
        // })
        dispatch(product_top_success(data));
    } catch (err) {
        // dispatch({
        //     type: PRODUCT_TOP_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // })
        const message = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(product_top_fail(message));
    }
}