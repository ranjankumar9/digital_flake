import axios from "axios"
import { GET_DATA_ERROR, GET_DATA_REQ, GET_DATA_SUCCESS } from "./actionTypes"
import { Base_Url } from "../baseurl"
import Cookies from "js-cookie"

export const GetCategoryData = (token) => (dispatch) => {
    let Token = Cookies.get("bearertoken")
    dispatch({type: GET_DATA_REQ})
    return axios.get(`${Base_Url}/category`, {
        headers: {
            Authorization: `Bearer ${Token}`
        }
    }).then((res) => {
        dispatch({type: GET_DATA_SUCCESS, payload: res.data})
        return res;
    }).catch((err) => {
        dispatch({type: GET_DATA_ERROR, payload: err})
    })
}
