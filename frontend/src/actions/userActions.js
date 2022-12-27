import axios from 'axios';
// import {
//     USER_DETAILS_FAIL,
//     USER_DETAILS_REQUEST,
//     USER_DETAILS_SUCCESS,
//     USER_DETAILS_RESET,
//     USER_LOGIN_FAIL,
//     USER_LOGIN_REQUEST,
//     USER_LOGIN_SUCCESS,
//     USER_LOGOUT,
//     USER_REGISTER_FAIL,
//     USER_REGISTER_REQUEST,
//     USER_REGISTER_SUCCESS,
//     USER_UPDATE_PROFILE_FAIL,
//     USER_UPDATE_PROFILE_REQUEST,
//     USER_UPDATE_PROFILE_SUCCESS,
//     USER_LIST_REQUEST,
//     USER_LIST_SUCCESS,
//     USER_LIST_FAIL,
//     USER_LIST_RESET,
//     USER_DELETE_REQUEST,
//     USER_DELETE_SUCCESS,
//     USER_DELETE_FAIL,
//     USER_UPDATE_REQUEST,
//     USER_UPDATE_SUCCESS,
//     USER_UPDATE_FAIL,
// } from "../constants/userConstants";
// import {
//     ORDER_LIST_MY_RESET
// } from "../constants/orderConstants";
import { order_list_my_reset } from "../reducers/orderReducers/orderListMySlice"
import { login_fail, login_request, login_success, logout as logoutSlice } from "../reducers/userReducers/userLoginSlice"
import { user_register_request, user_register_success, user_register_fail } from "../reducers/userReducers/userRegisterSlice"
import { user_details_request, user_details_success, user_details_fail, user_details_reset } from "../reducers/userReducers/userDetailsSlice"
import { update_profile_fail, update_profile_request, update_profile_success } from "../reducers/userReducers/userUpdateProfileSlice"
import { user_list_request, user_list_success, user_list_fail, user_list_reset } from "../reducers/userReducers/userListSlice"
import { user_delete_request, user_delete_success, user_delete_fail } from "../reducers/userReducers/userDeleteSlice"
import { user_update_request, user_update_success, user_update_fail } from "../reducers/userReducers/userUpdateSlice"

export const login = (email, password) => async (dispatch) => {
    try {
        // dispatch({
        //     type: USER_LOGIN_REQUEST,
        // });
        dispatch(login_request());

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login', { email, password }, config);

        // dispatch({
        //     type: USER_LOGIN_SUCCESS,
        //     payload: data,
        // });
        dispatch(login_success(data));

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
        // dispatch({
        //     type: USER_LOGIN_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // });
        const message = err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        dispatch(login_fail(message));
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    // dispatch({ type: USER_LOGOUT });
    // dispatch({ type: USER_DETAILS_RESET });
    // dispatch({ type: ORDER_LIST_MY_RESET });
    // dispatch({ type: USER_LIST_RESET });
    dispatch(logoutSlice())
    dispatch(order_list_my_reset())
    dispatch(user_details_reset())
    dispatch(user_list_reset())
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        // dispatch({
        //     type: USER_REGISTER_REQUEST,
        // });
        dispatch(user_register_request());

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users',
            { name, email, password },
            config
        );

        // dispatch({
        //     type: USER_REGISTER_SUCCESS,
        //     payload: data,
        // })

        // dispatch({
        //     type: USER_LOGIN_SUCCESS,
        //     payload: data,
        // })
        dispatch(user_register_success(data));
        dispatch(login_success(data));

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
        // dispatch({
        //     type: USER_REGISTER_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // });
        const message = err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        dispatch(user_register_fail(message))
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        // dispatch({
        //     type: USER_DETAILS_REQUEST,
        // });
        dispatch(user_details_request());

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(
            `/api/users/${id}`,
            config,
        );

        // dispatch({
        //     type: USER_DETAILS_SUCCESS,
        //     payload: data,
        // });
        dispatch(user_details_success(data))

    } catch (err) {
        // dispatch({
        //     type: USER_DETAILS_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // })
        const message = err.response &&
            err.response.data.message ?
            err.response.data.message :
            err.message
        dispatch(user_details_fail(message))
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        // dispatch({
        //     type: USER_UPDATE_PROFILE_REQUEST,
        // });
        dispatch(update_profile_request());

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.put(
            '/api/users/profile',
            user,
            config,
        );

        // dispatch({
        //     type: USER_UPDATE_PROFILE_SUCCESS,
        //     payload: data,
        // })

        // dispatch({
        //     type: USER_LOGIN_SUCCESS,
        //     payload: data,
        // })
        dispatch(update_profile_success(data))
        dispatch(login_success(data));

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
        // dispatch({
        //     type: USER_UPDATE_PROFILE_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // })
        const message = err.response &&
            err.response.data.message ?
            err.response.data.message :
            err.message
        dispatch(update_profile_fail(message));
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        // dispatch({
        //     type: USER_LIST_REQUEST,
        // });
        dispatch(user_list_request());

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(
            '/api/users',
            config,
        );

        // dispatch({
        //     type: USER_LIST_SUCCESS,
        //     payload: data,
        // });
        dispatch(user_list_success(data));

    } catch (err) {
        // dispatch({
        //     type: USER_LIST_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // })
        const message = err.response &&
            err.response.data.message ?
            err.response.data.message :
            err.message
        dispatch(user_list_fail(message))
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        // dispatch({
        //     type: USER_DELETE_REQUEST,
        // });
        dispatch(user_delete_request());

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        await axios.delete(
            `/api/users/${id}`,
            config,
        );

        // dispatch({ type: USER_DELETE_SUCCESS })
        dispatch(user_delete_success());
    } catch (err) {
        // dispatch({
        //     type: USER_DELETE_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // })
        const message = err.response &&
            err.response.data.message ?
            err.response.data.message :
            err.message
        dispatch(user_delete_fail(message))
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        // dispatch({
        //     type: USER_UPDATE_REQUEST,
        // });
        dispatch(user_update_request());

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.put(
            `/api/users/${user._id}`,
            user,
            config,
        );

        // dispatch({ type: USER_UPDATE_SUCCESS })

        // dispatch({ type: USER_DELETE_SUCCESS, payload: data })
        dispatch(user_update_success());
        dispatch(user_details_success(data));

    } catch (err) {
        // dispatch({
        //     type: USER_UPDATE_FAIL,
        //     payload: error.response && error.response.data.message
        //         ? error.response.data.message
        //         : error.message,
        // })
        const message = err.response &&
            err.response.data.message ?
            err.response.data.message :
            err.message
        dispatch(user_update_fail(message))
    }
}