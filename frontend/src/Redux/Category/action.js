import { ADD_DATA_ERROR, ADD_DATA_REQ, ADD_DATA_SUCCESS, DELETE_DATA_ERROR, DELETE_DATA_REQ, DELETE_DATA_SUCCESS, GET_DATA_ERROR, GET_DATA_REQ, GET_DATA_SUCCESS, UPDATE_DATA_ERROR, UPDATE_DATA_REQ, UPDATE_DATA_SUCCESS } from "./actionTypes"
import { Base_Url } from "../baseurl"
import axios from "axios"
import Cookies from "js-cookie"


export const GetCategoryData = (name) => (dispatch) => {
    let Token = Cookies.get("bearertoken")
    dispatch({ type: GET_DATA_REQ })
    return axios.get(`${Base_Url}/category`,{
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

export const AddCategoryData = (payload) => (dispatch) => {
    let Token = Cookies.get("bearertoken")
    dispatch({ type: ADD_DATA_REQ })
    return axios.post(`${Base_Url}/category/add`, payload, {
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

export const EditCategoryData = (id,payload) => (dispatch) => {
    let Token = Cookies.get("bearertoken");
    // console.log(Token)
    dispatch({ type: UPDATE_DATA_REQ});
    return axios.patch(`${Base_Url}/category/update/${id}`,payload,{
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
export const DeleteCategoryData = (payload) => (dispatch) => {
    let Token = Cookies.get("bearertoken");
    // console.log(Token)
    dispatch({ type: DELETE_DATA_REQ });
    return axios.delete(`${Base_Url}/category/delete/${payload}`,{
        headers: {
            Authorization: `Bearer ${Token}`
        }
    })
      .then((res) => {
        dispatch({ type: DELETE_DATA_SUCCESS, payload: res.data }); // Assuming you want to pass the response data
        return res.data; // Returning response data
      })
      .catch((err) => {
        dispatch({ type: DELETE_DATA_ERROR, payload: err });
        throw err; // Re-throwing error so that the caller can handle it
      });
  };
  

