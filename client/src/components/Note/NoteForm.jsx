import React from "react";
import { useDispatch } from "react-redux";
import { postNewNote } from "../../redux/actions/note-actions/note-actions";
import InputForm from "../Form/InputForm";
import { IoMdAddCircleOutline } from "react-icons/io";

export function NoteForm() {
  const [input, setInput] = React.useState({
    title: "",
    theme: "",
    comment: "",
    importance: "",
  });
  const accessToken = localStorage.getItem("tokenCattleTracker");
  const dispatch = useDispatch();

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postNewNote(input, accessToken));
    console.log("Nueva nota despachada...");
  }

  return (
    <div className=" ">
      <div class="text-green text-xl border-solid  border-b-2 border-green my-3 mx-3">
        Nueva nota
      </div>
      <form action="">
        <div className="inside-form-container flex">
          <div className="comentario-input">
            <div className="flex items-center gap-3 mb-3 w-full">
              <label
                htmlFor="comment"
                className="text-gray font-semibold w-[120px] md:w-[130px] text-sm after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Comentario
              </label>
              <textarea
                className="bg-gray/10 border border-solid border-gray/10 rounded-sm px-3 py-1  w-full"
                type="text"
                name="comment"
                id="comment"
                maxLength={900}
                onChange={handleOnChange}
                required="true"
                rows={5}
                cols={23}
                value={input.comment}
              />
            </div>
          </div>
          <div className="otros-inputs">
            <InputForm
              handleOnChange={handleOnChange}
              type="text"
              name="title"
              text="Título"
              value={input.title}
            />
            <InputForm
              handleOnChange={handleOnChange}
              type="text"
              name="importance"
              text="Importancia"
              placeholder={"Alta / Media / Baja"}
              value={input.importance}
            />
            <InputForm
              handleOnChange={handleOnChange}
              type="text"
              name="theme"
              text="Tema"
              value={input.theme}
            />
            <button
              className="border border-solid border-transparent bg-green px-3 py-1 rounded-sm text-white hover:bg-white hover:text-green hover:border-green transition-all ease-in-out duration-500 text-green flex items-center gap-3"
              onClick={handleSubmit}
            >
              <IoMdAddCircleOutline />
              Crear nota{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
