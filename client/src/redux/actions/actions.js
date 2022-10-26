import axios from "axios";
import { URL } from "../../constants/urls";

export const CREATE_NEW_ANIMAL = "CREATE_ANIMAL";

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
