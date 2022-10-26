import { CREATE_NEW_ANIMAL, SET_NEW_ANIMAL_TO_LOADING } from "../actions/types";

const initialState = {
  newAnimal: { pure: true },
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

    default:
      return state;
  }
};

export default rootReducer;
