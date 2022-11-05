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
  fetchedAnimals: {
    status: { pure: true },
    result: [],
  },
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
    searchedAnimal: (state, action) => {
      state.fetchedAnimals = action.payload;
    },
    setFetchedAnimalsToLoading: (state) => {
      state.fetchedAnimals = { status: { loading: true } };
    },
    clearFetchedAnimals: (state) => {
      state.fetchedAnimals = { status: { pure: true }, result: [] };
    },
    setDeleted: (state, action) => {
      state.deletedAnimal = action.payload;
    },
    setUpdateAnimalToLoading: (state) => {
      state.updatedAnimal = { loading: true };
    },
    setTypeOfAnimals: (state, action) => {
      state.typesOfAnimals = action.payload;
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
  searchedAnimal,
  setFetchedAnimalsToLoading,
  clearFetchedAnimals,
  setDeleted,
  setUpdateAnimalToLoading,
  setTypeOfAnimals,
} = animalsSlice.actions;

export default animalsSlice.reducer;
