import { SEARCH_QUERY } from "../../constants/urls";
import {
  CLEAN_NEW_ANIMAL,
  CREATE_NEW_ANIMAL,
  GET_ALL_ANIMALS,
  SET_NEW_ANIMAL_TO_LOADING,
  SET_FETCHED_ANIMALS_TO_LOADING,
  SET_USER_ANIMALS_TO_LOADING,
  DELETED_ANIMAL,
} from "../actions/types";

const initialState = {
  newAnimal: { pure: true },
  userAnimals: [],
  fetchedAnimals: [],
  deletedAnimal: { pure: true },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_ANIMAL:
      return {
        ...state,
        newAnimal: action.payload,
      };
    case SET_NEW_ANIMAL_TO_LOADING:
      return {
        ...state,
        newAnimal: action.payload,
      };
    case GET_ALL_ANIMALS:
      return {
        ...state,
        userAnimals: action.payload,
      };
    case CLEAN_NEW_ANIMAL:
      return {
        ...state,
        newAnimal: action.payload,
      };
    case SEARCH_QUERY:
      return {
        ...state,
        fetchedAnimals: action.payload,
      };
    case SET_FETCHED_ANIMALS_TO_LOADING:
      return {
        ...state,
        fetchedAnimals: action.payload,
      };
    case SET_USER_ANIMALS_TO_LOADING:
      return {
        ...state,
        userAnimals: action.payload,
      };
    case DELETED_ANIMAL:
      return {
        ...state,
        deletedAnimal: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
