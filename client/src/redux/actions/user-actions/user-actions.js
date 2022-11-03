import axios from "axios";
import { URL_GET_USER_INFO } from "../../../constants/urls";
import { GET_USER_INFO } from "../types";
import { header } from "../../../constants/token";

export function getUserInfo(token) {
  return async function (dispatch) {
    try {
      let response = await axios.get(URL_GET_USER_INFO, header(token));

      return dispatch({
        type: GET_USER_INFO,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_USER_INFO,
        payload: { error: error.response?.data?.error },
      });
    }
  };
}
