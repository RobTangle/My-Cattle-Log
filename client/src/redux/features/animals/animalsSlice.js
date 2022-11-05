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
  reducers: {},
});
// Action creators are generated for each case reducer function
export const {  } = animalsSlice.actions;

export default animalsSlice.reducer;
