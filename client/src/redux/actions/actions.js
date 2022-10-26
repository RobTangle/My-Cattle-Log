import axios from "axios";
import { URL } from "../../constants/urls";

export const CREATE_NEW_ANIMAL = "CREATE_ANIMAL";
export const SET_NEW_ANIMAL_TO_LOADING = "SET_NEW_ANIMAL_TO_LOADING";

export const createNewAnimal = (obj) => {
  return async function (dispatch) {
    try {
      let response = await axios.post(`${URL}animal`, obj);
      return dispatch({ type: CREATE_NEW_ANIMAL, payload: response.data });
    } catch (error) {
      console.log(`Error en action createAnimal. ${error.message}`);
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
