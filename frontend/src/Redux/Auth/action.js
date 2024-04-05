import axios from "axios"
import { FORGOT_PASSWORD, LOGIN_FAILURE, LOGIN_REQ, LOGIN_SUCCESS, LOGOUT, SIGNUP_FAILURE, SIGNUP_REQ, SIGNUP_SUCCESS } from "./actionTypes"
import Cookies from "js-cookie"
import { Base_Url } from "../baseurl"


const SignupReq = () => {
    return { type: SIGNUP_REQ }
}
const SignupSuccess = (payload) => {
    return { type: SIGNUP_SUCCESS, payload }
}
const SignupError = () => {
    return { type: SIGNUP_FAILURE }
}
const LoginReq = () => {
    return { type: LOGIN_REQ }
}
const LoginSuccess = (payload) => {
    return { type: LOGIN_SUCCESS, payload }
}
const LoginError = () => {
    return { type: LOGIN_FAILURE }
}

const LogOut = (payload) => {
    return { type: LOGOUT, payload }
}
const ForgotPassword = (payload) => {
    return { type: FORGOT_PASSWORD, payload }
}
const ResetPassword = (payload) => {
    return { type: FORGOT_PASSWORD, payload }
}

export const SignUpUser = (payload) => (dispatch) => {
    dispatch(SignupReq());
    return axios.post(`${Base_Url}/user/signup`, payload)
        .then((res) => {
            dispatch(SignupSuccess(res.data));
            return res;
        })
        .catch((err) => {
            dispatch(SignupError(err));
            throw err.response.data.message;
        });
};

export const LoginUser = (payload) => (dispatch) => {
    dispatch(LoginReq())
    return axios.post(`${Base_Url}/user/login`, payload).then((res) => {
        dispatch(LoginSuccess(res))
        Cookies.set('token', res?.data?.userDetails?.email)
        return res;
    })
        .catch((err) => {
            dispatch(LoginError(err))
        })
}

export const LogOutUser = (payload) => (dispatch) => {
    return axios.post(`${Base_Url}/user/logout`, payload).then((res) => {
        dispatch(LogOut(res.data))
        return res;
    })
        .catch((err) => {
            console.log(err)
        })
}

export const ForgotPasswordUser = (payload) => (dispatch) => {
    return axios.post(`${Base_Url}/user/forgot-password`, payload).then((res) => {
        dispatch(ForgotPassword(res.data))
        return res;
    })
        .catch((err) => {
            console.log(err)
        })
}
export const ResetPasswordUser = (payload) => (dispatch) => {
    return axios.post(`${Base_Url}/user/reset-password`, payload).then((res) => {
        dispatch(ResetPassword(res.data))
        return res;
    })
        .catch((err) => {
            console.log(err)
        })
}

