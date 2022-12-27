import axios from "axios";
// import {
//     ORDER_CREATE_REQUEST,
//     ORDER_CREATE_SUCCESS,
//     ORDER_CREATE_FAIL,
//     ORDER_DETAILS_FAIL,
//     ORDER_DETAILS_SUCCESS,
//     ORDER_DETAILS_REQUEST,
//     ORDER_PAY_REQUEST,
//     ORDER_PAY_SUCCESS,
//     ORDER_PAY_FAIL,
//     ORDER_LIST_MY_REQUEST,
//     ORDER_LIST_MY_SUCCESS,
//     ORDER_LIST_MY_FAIL,
//     ORDER_LIST_REQUEST,
//     ORDER_LIST_SUCCESS,
//     ORDER_LIST_FAIL,
//     ORDER_DELIVER_REQUEST,
//     ORDER_DELIVER_SUCCESS,
//     ORDER_DELIVER_FAIL,
// } from "../constants/orderConstants";
import { order_create_request, order_create_success, order_create_fail } from "../reducers/orderReducers/orderCreateSlice";
import { order_details_request, order_details_success, order_details_fail } from "../reducers/orderReducers/orderDetailsSlice";
import { order_pay_request, order_pay_success, order_pay_fail } from "../reducers/orderReducers/orderPaySlice";
import { order_list_my_request, order_list_my_success, order_list_my_fail } from "../reducers/orderReducers/orderListMySlice";
import { order_list_request, order_list_success, order_list_fail } from "../reducers/orderReducers/orderListSlice";
import { order_deliver_request, order_deliver_success, order_deliver_fail } from "../reducers/orderReducers/orderDeliverSlice";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        // dispatch({
        //     type: ORDER_CREATE_REQUEST,
        // });
        dispatch(order_create_request());

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post(
            '/api/orders',
            order,
            config,
        );

        // dispatch({
        //     type: ORDER_CREATE_SUCCESS,
        //     payload: data,
        // })
        dispatch(order_create_success(data));

    } catch (error) {
        // dispatch({
        //     type: ORDER_CREATE_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // })
        const message = error.response &&
            error.response.data.message ?
            error.response.data.message :
            error.message
        dispatch(order_create_fail(message))
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        // dispatch({
        //     type: ORDER_DETAILS_REQUEST,
        // });
        dispatch(order_details_request());

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(
            `/api/orders/${id}`,
            config,
        );

        // dispatch({
        //     type: ORDER_DETAILS_SUCCESS,
        //     payload: data,
        // })
        dispatch(order_details_success(data))

    } catch (error) {
        // dispatch({
        //     type: ORDER_DETAILS_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // })
        const message = error.response &&
            error.response.data.message ?
            error.response.data.message :
            error.message
        dispatch(order_details_fail(message))
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        // dispatch({
        //     type: ORDER_PAY_REQUEST,
        // });
        dispatch(order_pay_request());

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.put(
            `/api/orders/${orderId}/pay`,
            paymentResult,
            config,
        );

        // dispatch({
        //     type: ORDER_PAY_SUCCESS,
        //     payload: data,
        // })
        dispatch(order_pay_success(data));

    } catch (error) {
        // dispatch({
        //     type: ORDER_PAY_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // })
        const message = error.response &&
            error.response.data.message ?
            error.response.data.message :
            error.message
        dispatch(order_pay_fail(message));
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        // dispatch({
        //     type: ORDER_DELIVER_REQUEST,
        // });
        dispatch(order_deliver_request());

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.put(
            `/api/orders/${order._id}/deliver`,
            {},
            config,
        );

        // dispatch({
        //     type: ORDER_DELIVER_SUCCESS,
        //     payload: data,
        // })
        dispatch(order_deliver_success(data));

    } catch (error) {
        // dispatch({
        //     type: ORDER_DELIVER_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // })
        const message = error.response &&
            error.response.data.message ?
            error.response.data.message :
            error.message
        dispatch(order_deliver_fail(message));
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        // dispatch({
        //     type: ORDER_LIST_MY_REQUEST,
        // });
        dispatch(order_list_my_request());

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(
            `/api/orders/myorders`,
            config,
        );

        // dispatch({
        //     type: ORDER_LIST_MY_SUCCESS,
        //     payload: data,
        // })
        dispatch(order_list_my_success(data));

    } catch (error) {
        // dispatch({
        //     type: ORDER_LIST_MY_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // })
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch(order_list_my_fail(message));
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        // dispatch({
        //     type: ORDER_LIST_REQUEST,
        // });
        dispatch(order_list_request());

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(
            `/api/orders/`,
            config,
        );

        // dispatch({
        //     type: ORDER_LIST_SUCCESS,
        //     payload: data,
        // })
        dispatch(order_list_success(data));
    } catch (error) {
        // dispatch({
        //     type: ORDER_LIST_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // })
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch(order_list_fail(message))
    }
}