import axios from "axios";
import { URL, POST_ANIMAL, REGISTER_NEW_USER } from "../../constants/urls";
import {
  SET_NEW_ANIMAL_TO_LOADING,
  CREATE_NEW_ANIMAL,
  GET_ALL_ANIMALS,
  CLEAN_NEW_ANIMAL,
} from "./types";
import { header } from "../../constants/token";

export const createNewAnimal = (obj, token) => {
  return async function (dispatch) {
    try {
      let response = await axios.post(POST_ANIMAL, obj, header(token));
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

export const cleanNewAnimal = () => {
  return async function (dispatch) {
    try {
      return dispatch({
        type: CLEAN_NEW_ANIMAL,
        payload: { pure: true },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getAllAnimals = (token) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(URL + "animal", header(token));
      console.log(header(token));
      return dispatch({
        type: GET_ALL_ANIMALS,
        payload: response.data,
      });
    } catch (error) {
      console.log(`Error en action getAllAnimals. ${error.message}`);
    }
  };
};

// export const regiterNewUser = (obj) => {
//   try {
//     return async function (dispatch) {
//       const response = await axios.post(REGITER_NEW_USER, input, header(tokenAccess))
//       if (response.status === 200) {
//         alert("Has sido registrado correctamente! Esperamos que disfrutes de la app.")
//       }

//       return dispatch({
//         type: REGITER_NEW_USER,
//         payload:
//       })
//     }
//   } catch (error) {

//   }
// }
