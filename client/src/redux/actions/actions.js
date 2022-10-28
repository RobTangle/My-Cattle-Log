import axios from "axios";
import {
  URL,
  POST_ANIMAL,
  REGISTER_NEW_USER,
  SEARCH_QUERY,
} from "../../constants/urls";
import {
  SET_NEW_ANIMAL_TO_LOADING,
  CREATE_NEW_ANIMAL,
  GET_ALL_ANIMALS,
  CLEAN_NEW_ANIMAL,
  SET_FETCHED_ANIMALS_TO_LOADING,
  SET_USER_ANIMALS_TO_LOADING,
  DELETED_ANIMAL,
  UPDATE_ANIMAL,
  CLEAN_UPDATE_ANIMAL,
  SET_UPDATE_ANIMAL_TO_LOADING,
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

export const updateAnimal = (obj, token) => {
  return async function (dispatch) {
    try {
      const respuesta = await axios.put(URL + "animal/", obj, header(token));
      return dispatch({
        type: UPDATE_ANIMAL,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(`Error en updateAnimal creation creator. ${error.message}`);
      dispatch({
        type: UPDATE_ANIMAL,
        payload: { error: error.message },
      });
    }
  };
};

export const cleanUpdateAnimal = () => {
  return async function (dispatch) {
    try {
      dispatch({
        type: CLEAN_UPDATE_ANIMAL,
        payload: { pure: true },
      });
    } catch (error) {
      dispatch({
        type: CLEAN_UPDATE_ANIMAL,
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
      return dispatch({
        type: GET_ALL_ANIMALS,
        payload: { error: error.message },
      });
    }
  };
};

export const setUserAnimalsToLoading = () => {
  return async function (dispatch) {
    try {
      return dispatch({
        type: SET_USER_ANIMALS_TO_LOADING,
        payload: { loading: true },
      });
    } catch (error) {
      return dispatch({
        type: SET_USER_ANIMALS_TO_LOADING,
        payload: { error: error.message },
      });
    }
  };
};

export function searchQuery(value, token) {
  return async function (dispatch) {
    try {
      console.log("disparando get a la query.");
      console.log("value = ", value);
      const response = await axios.get(
        URL + `animal/search?value=${value}`,
        header(token)
      );
      return dispatch({
        type: SEARCH_QUERY,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: SEARCH_QUERY,
        payload: { error: error.message },
      });
    }
  };
}

export function setFetchedAnimalsToLoading() {
  return async function (dispatch) {
    try {
      console.log("Seting fetchedAnimals to loading...");
      return dispatch({
        type: SET_FETCHED_ANIMALS_TO_LOADING,
        payload: { loading: true },
      });
    } catch (error) {
      return dispatch({
        type: SET_FETCHED_ANIMALS_TO_LOADING,
        payload: { error: error.message },
      });
    }
  };
}

export function deleteAnimal(id, token) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(
        URL + "animal/delete/" + id,
        header(token)
      );
      return dispatch({
        type: DELETED_ANIMAL,
        payload: response.data,
      });
    } catch (error) {
      console.log(`Error en action creator deleteAnimal`);
      return dispatch({
        type: DELETED_ANIMAL,
        payload: { error: error.message },
      });
    }
  };
}

export function setUpdateAnimalToLoading() {
  return async function (dispatch) {
    try {
      return dispatch({
        type: SET_UPDATE_ANIMAL_TO_LOADING,
        payload: { loading: true },
      });
    } catch (error) {}
  };
}
