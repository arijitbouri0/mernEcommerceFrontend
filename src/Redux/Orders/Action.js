
import { toast } from 'react-toastify';
import { api } from '../../Config/apiConfig'

import { CANCEL_ORDER_FAILURE, CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_HISTORY_FAILURE, GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS, PLACE_ORDER_FAILURE, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from "./ActioType";


export const createOrder = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const response = await api.post(`/api/orders/`,reqData);
        const data=response.data;
        if(data && data._id){
            reqData.navigate({search : `step=2&order_id=${data._id}`})
        }
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message })
        toast.error(error,{position:'top-center',autoClose:2000});
    }
}

export const getOrderById = (orderId) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });

    try {
        const response = await api.get(`/api/orders/${orderId}`);
        const data=response.data;
        dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
        toast.error(error,{position:'top-center',autoClose:2000});
        
    } catch (error) {
        dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message })
    }
}

export const placeOrder = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: PLACE_ORDER_REQUEST });

        const { data } = await api.post('/api/orders/payment', { orderId });

        dispatch({
            type: PLACE_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PLACE_ORDER_FAILURE,
            payload: error.response ? error.response.data.error : error.message,
        });
        toast.error(error,{position:'top-center',autoClose:2000});
    }
};

export const getOrderHistory = (userId) => async (dispatch) => {
    dispatch({ type: GET_ORDER_HISTORY_REQUEST });
    
    try {
        const response = await api.get(`/api/orders/user`, userId);
        const data = response.data;
        
        dispatch({ type: GET_ORDER_HISTORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ORDER_HISTORY_FAILURE, payload: error.message });
        toast.error(error,{position:'top-center',autoClose:2000});
    }
};
export const cancelOrder = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: CANCEL_ORDER_REQUEST });

        const { data } = await api.delete(`/api/orders/${orderId}`); // Correctly include orderId in URL

        dispatch({
            type: CANCEL_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CANCEL_ORDER_FAILURE,
            payload: error.response ? error.response.data.error : error.message,
        });
        toast.error(error,{position:'top-center',autoClose:2000});
    }
};
