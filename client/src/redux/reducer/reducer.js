import { CREATE_NEW_ANIMAL } from "../actions/actions";

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
    case SET_NEWANIMAL_LOADING:
      return {
        ...state,
        newAnimal: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
