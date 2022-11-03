import axios from "axios";
import {
  GET_NOTES_FROM_USER,
  POST_NEW_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
} from "../types";

export function getNotesFromUser(token) {
  return async function (dispatch) {
    try {
      const response = await axios.get(URL + "note/all", header(token));
      dispatch({
        type: GET_NOTES_FROM_USER,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_NOTES_FROM_USER,
        payload: { error: error.message },
      });
    }
  };
}

export function postNewNote(newNoteObj, token) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        URL + "note/newNote",
        newNoteObj,
        header(token)
      );
      dispatch({
        type: POST_NEW_NOTE,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: POST_NEW_NOTE,
        payload: { error: error.message },
      });
    }
  };
}

export function deleteNote(noteId, token) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(
        URL + `note/${noteId}`,
        header(token)
      );
      dispatch({
        type: DELETE_NOTE,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_NOTE,
        payload: { error: error.message },
      });
    }
  };
}

export function updateNote(noteObj, token) {
  return async function (dispatch) {
    try {
      const response = await axios.put(URL + "note/", noteObj, header(token));
      dispatch({
        type: UPDATE_NOTE,
        action: response.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_NOTE,
        action: { error: error.message },
      });
    }
  };
}
