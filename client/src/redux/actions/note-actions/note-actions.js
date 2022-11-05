import axios from "axios";
import {
  GET_NOTES_FROM_USER,
  POST_NEW_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
  SET_NOTES_FROM_USER_TO_LOADING,
  SET_UPDATED_NOTE_TO_LOADING,
  CLEAN_UPDATED_NOTE,
} from "../types";
import { header } from "../../../constants/token";
import { URL } from "../../../constants/urls";

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

export function setNotesFromUserToLoading() {
  return async function (dispatch) {
    try {
      dispatch({
        type: SET_NOTES_FROM_USER_TO_LOADING,
        payload: { loading: true },
      });
    } catch (error) {
      dispatch({
        type: SET_NOTES_FROM_USER_TO_LOADING,
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
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_NOTE,
        payload: { error: "Ha habido un error" },
      });
    }
  };
}

export function setUpdatedNoteToLoading() {
  return async function (dispatch) {
    try {
      dispatch({
        type: SET_UPDATED_NOTE_TO_LOADING,
        payload: { loading: true },
      });
    } catch (error) {
      dispatch({
        type: SET_UPDATED_NOTE_TO_LOADING,
        payload: { error: error.message },
      });
    }
  };
}

export function cleanUpdatedNote() {
  return async function (dispatch) {
    try {
      dispatch({
        type: CLEAN_UPDATED_NOTE,
        payload: { pure: true },
      });
    } catch (error) {
      dispatch({
        type: CLEAN_UPDATED_NOTE,
        payload: { error: error.message },
      });
    }
  };
}
