import {
    GET_ORDER_HISTORY_REQUEST,
    GET_ORDER_HISTORY_SUCCESS,
    GET_ORDER_HISTORY_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAILURE,
    CANCEL_ORDER_REQUEST,
    CANCEL_ORDER_SUCCESS,
    CANCEL_ORDER_FAILURE,
} from '../Orders/ActioType';

const initialState = {
    orders: [],
    order: null,
    orderHistory: [],
    loading: false,
    error: null,
    success: false,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
        case PLACE_ORDER_REQUEST:
        case GET_ORDER_HISTORY_REQUEST:
        case CANCEL_ORDER_REQUEST:
            return { 
                ...state,
                loading: true,
                error: null,
                success: false,
            };

        case CREATE_ORDER_SUCCESS:
        case PLACE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                order: action.payload,
                success: true,
            };

        case CANCEL_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
                order: state.order ? { ...state.order, status: 'CANCELLED' } : null, // Optional: Update order status in state
            };

        case GET_ORDER_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                orderHistory: action.payload,
            };

        case CREATE_ORDER_FAILURE:
        case PLACE_ORDER_FAILURE:
        case GET_ORDER_HISTORY_FAILURE:
        case CANCEL_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };

        case GET_ORDER_BY_ID_REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };

        case GET_ORDER_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                order: action.payload
            };

        case GET_ORDER_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};
