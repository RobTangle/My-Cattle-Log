import { SEARCH_QUERY } from "../../constants/urls";
import {
  CLEAN_NEW_ANIMAL,
  CREATE_NEW_ANIMAL,
  GET_ALL_ANIMALS,
  SET_NEW_ANIMAL_TO_LOADING,
  SET_FETCHED_ANIMALS_TO_LOADING,
  SET_USER_ANIMALS_TO_LOADING,
  DELETED_ANIMAL,
  UPDATE_ANIMAL,
  CLEAN_UPDATE_ANIMAL,
  SET_UPDATE_ANIMAL_TO_LOADING,
  CLEAR_FETCHED_ANIMALS,
  GET_USER_INFO,
  GET_TYPES_OF_ANIMALS,
} from "../actions/types";

const initialState = {
  newAnimal: { pure: true },
  userInfo: { pure: true },
  userAnimals: [],
  fetchedAnimals: {
    status: { pure: true },
    result: [],
  },
  deletedAnimal: { pure: true },
  updatedAnimal: { pure: true },
  typesOfAnimals: [],
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
    case CLEAR_FETCHED_ANIMALS:
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
    case UPDATE_ANIMAL:
      return {
        ...state,
        updatedAnimal: action.payload,
      };
    case CLEAN_UPDATE_ANIMAL:
      return {
        ...state,
        updatedAnimal: action.payload,
      };
    case SET_UPDATE_ANIMAL_TO_LOADING:
      return {
        ...state,
        updatedAnimal: action.payload,
      };
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case GET_TYPES_OF_ANIMALS:
      return {
        ...state,
        typesOfAnimals: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
