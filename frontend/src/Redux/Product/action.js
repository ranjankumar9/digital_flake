import axios from "axios"
import { ADD_DATA_ERROR, ADD_DATA_REQ, ADD_DATA_SUCCESS, DELETE_DATA_ERROR, DELETE_DATA_REQ, DELETE_DATA_SUCCESS, GET_DATA_ERROR, GET_DATA_REQ, GET_DATA_SUCCESS, UPDATE_DATA_ERROR, UPDATE_DATA_REQ, UPDATE_DATA_SUCCESS } from "./actionTypes"
import { Base_Url } from "../baseurl"
import Cookies from "js-cookie"


export const GetProductData = (name) => (dispatch) => {
    let Token = Cookies.get("bearertoken")
    dispatch({ type: GET_DATA_REQ })
    return axios.get(`${Base_Url}/product`, {
        params: { name }, 
        headers: {
            Authorization: `Bearer ${Token}`
        }
    }).then((res) => {
        dispatch({ type: GET_DATA_SUCCESS, payload: res.data })
        return res;
    }).catch((err) => {
        dispatch({ type: GET_DATA_ERROR, payload: err })
    })
}

export const AddProductData = (payload) => (dispatch) => {
    let Token = Cookies.get("bearertoken")
    dispatch({ type: ADD_DATA_REQ })
    return axios.post(`${Base_Url}/product/add`, payload, {
        headers: {
            Authorization: `Bearer ${Token}`
        }
    }).then((res) => {
        dispatch({ type: ADD_DATA_SUCCESS, payload: res })
        return res;
    }).catch((err) => {
        dispatch({ type: ADD_DATA_ERROR, payload: err })
    })
}
export const EditProductData = (id,payload) => (dispatch) => {
    let Token = Cookies.get("bearertoken");
    // console.log(Token)
    dispatch({ type: UPDATE_DATA_REQ});
    return axios.patch(`${Base_Url}/product/update/${id}`,payload,{
        headers: {
            Authorization: `Bearer ${Token}`
        }
    })
      .then((res) => {
        dispatch({ type: UPDATE_DATA_SUCCESS, payload: res.data }); 
        return res.data;
      })
      .catch((err) => {
        dispatch({ type: UPDATE_DATA_ERROR, payload: err });
        throw err;
      });
  };
  
export const DeleteProductData = (payload) => (dispatch) => {
    let Token = Cookies.get("bearertoken");
    // console.log(Token)
    dispatch({ type: DELETE_DATA_REQ });
    return axios.delete(`${Base_Url}/product/delete/${payload}`,{
        headers: {
            Authorization: `Bearer ${Token}`
        }
    })
      .then((res) => {
        dispatch({ type: DELETE_DATA_SUCCESS, payload: res.data }); 
        return res.data;
      })
      .catch((err) => {
        dispatch({ type: DELETE_DATA_ERROR, payload: err });
        throw err;
      });
  };
  

