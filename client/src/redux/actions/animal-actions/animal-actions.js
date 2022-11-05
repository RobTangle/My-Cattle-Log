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

  GET_DETAILS,
  RESET_DETAIL,
} from "../types";
import {
  URL,
  URL_GET_TYPES_OF_ANIMALS,
  URL_GET_STATS,

} from "../../../constants/urls";
import { header } from "../../../constants/token";




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
