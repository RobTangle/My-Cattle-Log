import React from "react";
import { PropsNotes } from "../PropsColumns/PropsNotes";

export function NoteCardContainer({ notesToRender }) {
  if (Array.isArray(notesToRender) && notesToRender.length === 0) {
    return <p>No hay notas para mostrar</p>;
  }
  if (Array.isArray(notesToRender) && notesToRender.length > 0) {
    return (
      <div>
        <PropsNotes notes={notesToRender} />
      </div>
    );
  }
}
