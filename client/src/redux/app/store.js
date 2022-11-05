import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../features/notes/notesSlice";
import animalsSlice from "../features/animals/animalsSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    animals: animalsSlice.reducer,
  },
});
