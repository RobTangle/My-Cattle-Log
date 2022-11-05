import axios from "axios";
import { header } from "../../../constants/token";
import { URL } from "../../../constants/urls";
import { setNotes } from "./notesSlice";

export const getNotesFromUser = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios(URL + "note/all", header(token));
      console.log('respuesta del thunk',response)
      dispatch(setNotes(response.data));
    } catch (error) {
      dispatch(setNotes({ error: error.message }));
    }
  };
};
