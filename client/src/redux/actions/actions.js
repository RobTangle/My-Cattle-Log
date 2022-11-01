import axios from "axios";
import {
  URL,
  POST_ANIMAL,
  REGISTER_NEW_USER,
  SEARCH_QUERY,
  URL_GET_USER_INFO,
  URL_GET_TYPES_OF_ANIMALS,
  URL_GET_STATS,
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
  CLEAR_FETCHED_ANIMALS,
  GET_USER_INFO,
  GET_TYPES_OF_ANIMALS,
  GET_STATS,
  SET_STATS_TO_LOADING,
  CLEAN_STATS,
} from "./types";
import { header } from "../../constants/token";

export const createNewAnimal = (obj, token) => {
  return async function (dispatch) {
    try {
      let response = await axios.post(POST_ANIMAL, obj, header(token));
      return dispatch({ type: CREATE_NEW_ANIMAL, payload: response.data });
    } catch (error) {
      console.log(`Error en action createAnimal. ${error.message}`);
      console.log(error);
      console.log(error.response?.data?.error);
      return dispatch({
        type: CREATE_NEW_ANIMAL,
        payload: { error: error.response?.data?.error },
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
        payload: { error: "Error: " + error.response?.data?.error },
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
        payload: { error: error.response?.data?.error },
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
        payload: { result: [...response.data], status: { fetched: true } },
      });
    } catch (error) {
      return dispatch({
        type: SEARCH_QUERY,
        payload: { result: [], status: { error: error.response?.data?.error } },
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
        payload: { status: { loading: true } },
      });
    } catch (error) {
      return dispatch({
        type: SET_FETCHED_ANIMALS_TO_LOADING,
        payload: { result: [], status: { error: error.message } },
      });
    }
  };
}

export function clearFetchedAnimals() {
  return async function (dispatch) {
    try {
      return dispatch({
        type: CLEAR_FETCHED_ANIMALS,
        payload: {
          result: [],
          status: { pure: true },
        },
      });
    } catch (error) {}
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

export function getTypesOfAnimalsAllowed() {
  return async function (dispatch) {
    try {
      console.log("Buscando tipos de animales permitidos...");
      const response = await axios.get(URL_GET_TYPES_OF_ANIMALS);
      const typesOfAnimals = response.data;
      console.log(`Tipos de animales permitidos: `, typesOfAnimals);
      return dispatch({
        type: GET_TYPES_OF_ANIMALS,
        payload: typesOfAnimals,
      });
    } catch (error) {
      console.log(error.message);
      return dispatch({
        type: GET_TYPES_OF_ANIMALS,
        payload: { error: error?.response?.data?.error },
      });
    }
  };
}

export function getStats(token) {
  return async function (dispatch) {
    try {
      console.log(`Despachando getStats...`);
      const response = await axios.get(URL_GET_STATS, header(token));
      return dispatch({
        type: GET_STATS,
        payload: response.data,
      });
    } catch (error) {
      console.log(`Error en la action creator de getStatus. ${error.message}`);
      return dispatch({
        type: GET_STATS,
        payload: { error: error.response?.data?.error },
      });
    }
  };
}

export function setStatsToLoading() {
  return async function (dispatch) {
    try {
      console.log(`Setting stats to loading...`);
      return dispatch({
        type: SET_STATS_TO_LOADING,
        payload: { loading: true },
      });
    } catch (error) {
      return dispatch({
        type: SET_STATS_TO_LOADING,
        payload: { error: error.message },
      });
    }
  };
}

export function cleanStats() {
  return async function (dispatch) {
    try {
      return dispatch({
        type: CLEAN_STATS,
        payload: { pure: true },
      });
    } catch (error) {
      return dispatch({
        type: CLEAN_STATS,
        payload: { error: error.message },
      });
    }
  };
}
