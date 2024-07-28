import { applyMiddleware, combineReducers, createStore } from 'redux';
import {thunk} from 'redux-thunk'; // Correct import for redux-thunk middleware
import { authReducer } from './Auth/Reducer';
import { customerProductReducer } from './Product/Reducer';
import { cartReducer } from './Cart/Reducer';
import { orderReducer } from './Orders/Reducer';

const rootReducers = combineReducers({
    auth: authReducer,
    product: customerProductReducer,
    cart: cartReducer,
    order: orderReducer,
});

export const store = createStore(rootReducers, applyMiddleware(thunk));
