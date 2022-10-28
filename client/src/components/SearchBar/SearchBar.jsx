import React from "react";
import { useDispatch } from "react-redux";
import {
  searchQuery,
  setFetchedAnimalsToLoading,
} from "../../redux/actions/actions";

export function SearchBar() {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("tokenCattleTracker");
  const [input, setInput] = React.useState({
    inputValue: "",
  });

  function handleChange(e) {
    setInput({
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    console.log("handleSubmit invoqued!");
    e.preventDefault();
    dispatch(setFetchedAnimalsToLoading());
    dispatch(searchQuery(input.inputValue, accessToken));
  }
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="inputValue">Buscar por nombre o ID de SENASA: </label>
        <input
          type="text"
          name="inputValue"
          value={input.inputValue}
          onChange={handleChange}
          placeholder="Ingrese un nombre o un código de identificación."
        />
        <button>Buscar</button>
      </form>
    </div>
  );
}
