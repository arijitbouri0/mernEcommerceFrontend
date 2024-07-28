import { api } from '../../Config/apiConfig'; 
import {
    FIND_PRODUCT_BY_ID_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST,
    FIND_PRODUCT_BY_ID_SUCCESS,
    FIND_PRODUCT_FAILURE,
    FIND_PRODUCT_REQUEST,
    FIND_PRODUCT_SUCCESS
} from './ActionType';


export const findProducts = (params = {}) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_REQUEST });

    try {
        const { data } = await api.get(`/api/products`, { params });
        dispatch({ type: FIND_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_FAILURE, payload: error.message });
    }
};


export const findProductsById = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
    const {productId}=reqData;
    try {
        const { data } = await api.get(`/api/products/id/${productId}`)
        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
    }
};
