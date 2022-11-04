import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotesFromUser,
  setNotesFromUserToLoading,
} from "../../redux/actions/note-actions/note-actions";
import { NoteForm } from "./NoteForm";
import { IoMdAddCircleOutline } from "react-icons/io";
import { NoteCardContainer } from "./NoteCardContainer";
import loadingGif from "../../assets/loading.gif";

export function NoteComponent() {
  const accessToken = localStorage.getItem("tokenCattleTracker");
  const [showNoteForm, setShowNoteForm] = React.useState(false);
  const notesState = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("UseEffect de NoteComponent");
    dispatch(setNotesFromUserToLoading());
    setTimeout(() => {
      dispatch(getNotesFromUser(accessToken));
    }, 50);
  }, []);

  function toggleNoteForm(e) {
    e.preventDefault();
    setShowNoteForm(!showNoteForm);
  }
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-green text-2xl font-semibold my-3">
        Notas personales
      </h2>
      <div>
        <button
          className="border border-solid border-transparent bg-green px-3 py-1 rounded-sm text-white hover:bg-white hover:text-green hover:border-green transition-all ease-in-out duration-500 text-green flex items-center gap-3"
          onClick={toggleNoteForm}
        >
          <IoMdAddCircleOutline />
          Crear nota{" "}
        </button>
      </div>
      <div>{showNoteForm && <NoteForm />}</div>
      <div class="text-green text-xl border-solid  border-b-2 border-green my-3 ">
        Mis notas
      </div>
      {notesState?.allNotes?.loading && (
        <img src={loadingGif} alt="loading gif" />
      )}
      {notesState?.allNotes && Array.isArray(notesState?.allNotes) && (
        <NoteCardContainer notesToRender={notesState?.allNotes} />
      )}
    </div>
  );
}
