import React from "react";
import { useDispatch } from "react-redux";
import { NoteModalEdit } from "./NoteModalEdit";
import { BiEditAlt } from "react-icons/bi";
import { deleteNote, getNotesFromUser } from "../../redux/features/notes";

export function NoteAcciones({ note }) {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("tokenCattleTracker");
  const [showValue, setShowValue] = React.useState(false);

  function handleDeleteWithPrompt(e) {
    console.log(e.target);
    let confirmPrompt = prompt(
      "Para confirmar la eliminación, escriba 'ELIMINAR'."
    );
    if (
      confirmPrompt === "ELIMINAR" ||
      confirmPrompt === "eliminar" ||
      confirmPrompt === "Eliminar"
    ) {
      console.log(`Eliminando animal con id ${e.target.value}`);
      const note_id = e.target.value;
      console.log(note_id);
      dispatch(deleteNote(note_id, accessToken));
      dispatch(getNotesFromUser(accessToken));
    } else {
      console.log(
        `No se ha eliminado al animal porque confirmPrompt == ${confirmPrompt}`
      );
    }
  }

  function showModal(e) {
    e.preventDefault();
    setShowValue(true);
  }

  return (
    <div className="flex gap-3">
      <button className="btn-edit" value={note?.id} onClick={showModal}>
        <BiEditAlt />
      </button>
      <button
        className="btn-delete"
        value={note?.id}
        onClick={handleDeleteWithPrompt}
      >
        X
      </button>
      <NoteModalEdit show={showValue} setShowValue={setShowValue} note={note} />
    </div>
  );
}
