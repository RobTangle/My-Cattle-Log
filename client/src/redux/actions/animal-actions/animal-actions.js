import axios from "axios";
import {

  CLEAN_PREGNANT_ASC,
  CLEAN_STATS,
  CLEAR_FETCHED_ANIMALS,
  DELETE_ANIMAL,
  SET_FETCHED_ANIMALS_TO_LOADING,
  SET_UPDATE_ANIMAL_TO_LOADING,
  GET_TYPES_OF_ANIMALS,
  GET_STATS,
  SET_STATS_TO_LOADING,
  GET_PREGNANT_ASC,
  SET_PREGNANT_ASC_TO_LOADING,
  SET_USER_ANIMALS_TO_LOADING,
  SEARCH_QUERY,
  GET_DETAILS,
  RESET_DETAIL,
} from "../types";
import {
  URL,
  URL_GET_TYPES_OF_ANIMALS,
  URL_GET_STATS,
  URL_SEARCH_QUERY,
} from "../../../constants/urls";
import { header } from "../../../constants/token";



export function searchQuery(value, token) {
  return async function (dispatch) {
    try {
      console.log("disparando get a la query.");
      console.log("value = ", value);
      const response = await axios.get(
        URL_SEARCH_QUERY + `?value=${value}`,
        header(token)
      );
      return dispatch({
        type: SEARCH_QUERY,
        payload: { result: [...response.data], status: { fetched: true } },
      });
    } catch (error) {
      return dispatch({
        type: SEARCH_QUERY,
        payload: { result: [], status: { error: error.message } },
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
    } catch (error) {
      return dispatch({
        type: SET_FETCHED_ANIMALS_TO_LOADING,
        payload: {
          result: [],
          status: { error: error.message },
        },
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
        type: DELETE_ANIMAL,
        payload: response.data,
      });
    } catch (error) {
      console.log(`Error en action creator deleteAnimal`);
      return dispatch({
        type: DELETE_ANIMAL,
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
    } catch (error) {
      return dispatch({
        type: SET_UPDATE_ANIMAL_TO_LOADING,
        payload: { error: error.message },
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
        payload: { error: error.message },
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
        payload: { error: error.message },
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

export function getPregnantAsc(token) {
  console.log(`Accionando getPregnantAsc`);
  return async function (dispatch) {
    try {
      const response = await axios.get(
        URL + "animal/isPregnant?status=true&order=ASC",
        header(token)
      );
      return dispatch({
        type: GET_PREGNANT_ASC,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_PREGNANT_ASC,
        payload: { error: error.message },
      });
    }
  };
}

export function setPregnantAscToLoading() {
  return async function (dispatch) {
    try {
      dispatch({
        type: SET_PREGNANT_ASC_TO_LOADING,
        payload: { loading: true },
      });
    } catch (error) {
      dispatch({
        type: SET_PREGNANT_ASC_TO_LOADING,
        payload: { error: error.message },
      });
    }
  };
}

export function cleanPregnantAsc() {
  return async function (dispatch) {
    try {
      dispatch({
        type: CLEAN_PREGNANT_ASC,
        payload: { pure: true },
      });
    } catch (error) {
      dispatch({
        type: CLEAN_PREGNANT_ASC,
        payload: { error: error.message },
      });
    }
  };
}

export const getAnimalDetail = (id, token) => async (dispatch) => {
  try {
    const response = await axios.get(URL + "animal/id/" + id, header(token));
    return dispatch({
      type: GET_DETAILS,
      payload: response.data,
    });
  } catch (error) {
    return dispatch({
      type: GET_DETAILS,
      payload: { error: error.message },
    });
  }
};

export const resetDetail = () => async (dispatch) => {
  try {
    return dispatch({
      type: RESET_DETAIL,
      payload: { pure: true },
    });
  } catch (error) {
    return dispatch({
      type: RESET_DETAIL,
      payload: { error: error.message },
    });
  }
};
