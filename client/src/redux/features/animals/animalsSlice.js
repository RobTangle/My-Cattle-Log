import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newAnimal: { pure: true },
  deletedAnimal: { pure: true },
  updatedAnimal: { pure: true },
  typesOfAnimals: [],
  stats: { pure: true },
  pregnant: { pure: true },
  detail: { pure: true },
  userAnimals: [],
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
    },
    setAllAnimals: (state, action) => {
      state.userAnimals = action.payload;
    },
    setAllAnimalsToLoading: (state) => {
      state.userAnimals = { loading: true };
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  newAnimal,
  update,
  cleanUpdateAnimal,
  setNewAnimalToLoading,
  cleanNewAnimal,
  setAllAnimals,
  setAllAnimalsToLoading,
} = animalsSlice.actions;

export default animalsSlice.reducer;
