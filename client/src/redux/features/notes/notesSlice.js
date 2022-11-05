import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: { newNote: { pure: true }, allNotes: { pure: true } },
    updatedNote: { pure: true },
  },
  reducers:{
    setNotes: (state, action) => {
      state.notes.allNotes = action.payload;

    },
  },
});

//export actions
export const { setNotes } = notesSlice.actions;

//export only the reducers
export default notesSlice.reducer;
