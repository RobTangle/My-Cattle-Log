import axios from "axios";
import { URL, POST_ANIMAL } from "../../constants/urls";
import {
  SET_NEW_ANIMAL_TO_LOADING,
  CREATE_NEW_ANIMAL,
  GET_ALL_ANIMALS,
} from "./types";

export const createNewAnimal = (obj) => {
  return async function (dispatch) {
    try {
      let response = await axios.post(POST_ANIMAL, obj);
      return dispatch({ type: CREATE_NEW_ANIMAL, payload: response.data });
    } catch (error) {
      console.log(`Error en action createAnimal. ${error.message}`);
      return dispatch({
        type: CREATE_NEW_ANIMAL,
        payload: { error: error.message },
      });
    }
  };
};

export const setNewAnimalToLoading = () => {
  return async function (dispatch) {
    try {
      return dispatch({
        type: SET_NEW_ANIMAL_TO_LOADING,
        payload: { loading: true },
      });
    } catch (error) {
      console.log(`Error en setNewAnimalToLoading. ${error.message}`);
      return dispatch({
        type: SET_NEW_ANIMAL_TO_LOADING,
        payload: { error: error.message },
      });
    }
  };
};

export const getAllAnimals = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(URL + "animal");
      return dispatch({
        type: GET_ALL_ANIMALS,
        payload: response.data,
      });
    } catch (error) {}
  };
};
