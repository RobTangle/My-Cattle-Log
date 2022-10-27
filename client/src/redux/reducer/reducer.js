import {
  CREATE_NEW_ANIMAL,
  GET_ALL_ANIMALS,
  SET_NEW_ANIMAL_TO_LOADING,
} from "../actions/types";

const initialState = {
  newAnimal: { pure: true },
  userAnimals: [],
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
    default:
      return state;
  }
};

export default rootReducer;
