import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newAnimal: { pure: true },
  deletedAnimal: { pure: true },
  updatedAnimal: { pure: true },
  typesOfAnimals: [],
  stats: { pure: true },
  pregnant: { pure: true },
  detail: { pure: true },
};

export const animalsSlice = createSlice({
  name: "animals",
  initialState,
  reducers: {
    newAnimal: (state, action) => {
      state.newAnimal = action.payload;
    },
    update: (state, action) => {
      state.updatedAnimal = action.payload;
    },
    cleanUpdateAnimal: (state) => {
      state.updatedAnimal = { pure: true };
    },
    setNewAnimalToLoading: (state) => {
      state.newAnimal = { loading: true };
    },
    cleanNewAnimal: (state) => {
      state.newAnimal = { pure: true };
    }
  },
});
// Action creators are generated for each case reducer function
export const {
  newAnimal,
  update,
  cleanUpdateAnimal,
  setNewAnimalToLoading,
  cleanNewAnimal,
} = animalsSlice.actions;

export default animalsSlice.reducer;
