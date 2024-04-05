import { ADD_DATA_ERROR, ADD_DATA_REQ, ADD_DATA_SUCCESS, DELETE_DATA_ERROR, DELETE_DATA_REQ, DELETE_DATA_SUCCESS, GET_DATA_ERROR, GET_DATA_REQ, GET_DATA_SUCCESS, UPDATE_DATA_ERROR, UPDATE_DATA_REQ, UPDATE_DATA_SUCCESS } from "./actionTypes";

// Initial state for your reducer
const initialState = {
    data: [],
    loading: false,
    error: null
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_REQ:
        case ADD_DATA_REQ:
        case UPDATE_DATA_REQ:
        case DELETE_DATA_REQ:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            };
        case ADD_DATA_SUCCESS:
        case UPDATE_DATA_SUCCESS:
        case DELETE_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case GET_DATA_ERROR:
        case ADD_DATA_ERROR:
        case UPDATE_DATA_ERROR:
        case DELETE_DATA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

