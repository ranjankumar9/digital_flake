import { FORGOT_PASSWORD, LOGIN_FAILURE, LOGIN_REQ, LOGIN_SUCCESS, LOGOUT, RESET_PASSWORD, SIGNUP_FAILURE, SIGNUP_REQ, SIGNUP_SUCCESS } from "./actionTypes";


const initialState = {
    users: [],
    isAuth: false,
    isLoading: false,
    isError: false,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_REQ:
        case LOGIN_REQ:
            return { ...state, isLoading: true, isError: false };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                users: [...state.users, action.payload]
            };
        case LOGIN_SUCCESS:
            return { ...state, isAuth: true, users: action.payload, isLoading: false, isError: false }
        case LOGOUT:
            return { ...state, isAuth: false, isLoading: false, isError: false }
        case FORGOT_PASSWORD:
        case RESET_PASSWORD:
            return { ...state, isAuth: false, isLoading: false, isError: false }
        case LOGIN_FAILURE:
        case SIGNUP_FAILURE:
            return { ...state, isLoading: false, isError: true };
        default:
            return state;
    }
};
