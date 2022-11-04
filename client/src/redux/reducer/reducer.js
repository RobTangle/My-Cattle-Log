import {
  CLEAN_NEW_ANIMAL,
  CREATE_NEW_ANIMAL,
  GET_ALL_ANIMALS,
  SET_NEW_ANIMAL_TO_LOADING,
  SET_FETCHED_ANIMALS_TO_LOADING,
  SET_USER_ANIMALS_TO_LOADING,
  DELETE_ANIMAL,
  UPDATE_ANIMAL,
  CLEAN_UPDATE_ANIMAL,
  SET_UPDATE_ANIMAL_TO_LOADING,
  CLEAR_FETCHED_ANIMALS,
  GET_USER_INFO,
  GET_TYPES_OF_ANIMALS,
  GET_STATS,
  SET_STATS_TO_LOADING,
  CLEAN_STATS,
  GET_PREGNANT_ASC,
  SET_PREGNANT_ASC_TO_LOADING,
  CLEAN_PREGNANT_ASC,
  SEARCH_QUERY,
  POST_NEW_NOTE,
  CLEAN_NEW_NOTE,
  SET_NOTES_FROM_USER_TO_LOADING,
  GET_NOTES_FROM_USER,
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
  stats: { pure: true },
  pregnant: { pure: true },
  notes: { newNote: { pure: true }, allNotes: { pure: true } },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // NEW ANIMAL :
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
    case CLEAN_NEW_ANIMAL:
      return {
        ...state,
        newAnimal: action.payload,
      };
    // GET ALL ANIMALS:
    case GET_ALL_ANIMALS:
      return {
        ...state,
        userAnimals: action.payload,
      };
    case SET_USER_ANIMALS_TO_LOADING:
      return {
        ...state,
        userAnimals: action.payload,
      };

    // FETCH ANIMALS :
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
    // DELETE ANIMAL :
    case DELETE_ANIMAL:
      return {
        ...state,
        deletedAnimal: action.payload,
      };
    // UPDATE ANIMAL :
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
    // GET TYPES OF ANIMALS :
    case GET_TYPES_OF_ANIMALS:
      return {
        ...state,
        typesOfAnimals: action.payload,
      };
    // USER INFO :
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    // STATS :
    case GET_STATS:
      return {
        ...state,
        stats: action.payload,
      };
    case SET_STATS_TO_LOADING:
      return {
        ...state,
        stats: action.payload,
      };
    case CLEAN_STATS:
      return {
        ...state,
        stats: action.payload,
      };
    // PREGNANT_ASC
    case GET_PREGNANT_ASC:
      return {
        ...state,
        pregnant: action.payload,
      };
    case SET_PREGNANT_ASC_TO_LOADING:
      return {
        ...state,
        pregnant: action.payload,
      };
    case CLEAN_PREGNANT_ASC:
      return {
        ...state,
        pregnant: action.payload,
      };
    // NOTES :
    case POST_NEW_NOTE:
      return {
        ...state,
        notes: { ...state.notes, newNote: action.payload },
      };
    case CLEAN_NEW_NOTE:
      return {
        ...state,
        notes: { ...state.notes, newNote: { pure: true } },
      };
    case GET_NOTES_FROM_USER:
      return {
        ...state,
        notes: { ...state.notes, allNotes: action.payload },
      };
    case SET_NOTES_FROM_USER_TO_LOADING:
      return {
        ...state,
        notes: { ...state.notes, allNotes: action.payload },
      };
    default:
      return state;
  }
};

export default rootReducer;
