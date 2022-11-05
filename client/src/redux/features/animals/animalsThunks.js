import axios from "axios";
import { header } from "../../../constants/token";
import { URL, URL_POST_ANIMAL } from "../../../constants/urls";
import { newAnimal, update } from "./animalsSlice";


export const createNewAnimal = (obj, token) => {
  return async function (dispatch) {
    try {
      let response = await axios.post(URL_POST_ANIMAL, obj, header(token));
      return dispatch(newAnimal(response.data));
    } catch (error) {
      return dispatch(newAnimal({ error: error.message }));
    }
  };
};

export const updateAnimal = (obj, token) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(URL + "animal/", obj, header(token));
      return dispatch(update(response.data));
    } catch (error) {
      dispatch(update({ error: "Error: " + error.response?.data?.error }));
    }
  };
};