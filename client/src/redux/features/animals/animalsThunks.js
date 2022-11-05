import axios from "axios";
import { header } from "../../../constants/token";
import { URL, URL_POST_ANIMAL, URL_SEARCH_QUERY } from "../../../constants/urls";
import { newAnimal, searchedAnimal, setAllAnimals, setDeleted, update } from "./animalsSlice";

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

export const getAllAnimals = (token) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(URL + "animal", header(token));
      return dispatch(setAllAnimals(response.data));
    } catch (error) {
      return dispatch(setAllAnimals({ error: error.message }));
    }
  };
};

export function searchQuery(value, token) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        URL_SEARCH_QUERY + `?value=${value}`,
        header(token)
      );
      return dispatch(
        searchedAnimal({
          result: [...response.data],
          status: { fetched: true },
        })
      );
    } catch (error) {
      return dispatch(
        searchedAnimal({ result: [], status: { error: error.message } })
      );
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
      return dispatch(setDeleted(response.data));
    } catch (error) {
      return dispatch(setDeleted({ error: error.message }));
    }
  };
}
