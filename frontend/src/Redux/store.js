import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { reducer as authReducer } from "../Redux/Auth/reducer";
import {reducer as categoryReducer } from '../Redux/Category/reducer';
import {reducer as productReducer } from '../Redux/Product/reducer'
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    products: productReducer
});

const store = legacy_createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
