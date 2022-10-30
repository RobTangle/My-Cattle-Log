import React from "react";
import { useDispatch } from "react-redux";
import {
  searchQuery,
  setFetchedAnimalsToLoading,
  clearFetchedAnimals,
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

  function dispatchClearFetchedAnimals() {
    console.log(`dispatching clearFetchedAnimals...`);
    dispatch(clearFetchedAnimals());
  }

  function handleSubmit(e) {
    console.log("handleSubmit invoqued!");
    e.preventDefault();
    dispatch(setFetchedAnimalsToLoading());
    dispatch(searchQuery(input.inputValue, accessToken));
  }
  return (
    <div className="searchbar-container">
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="inputValue">Nombre / ID SENASA: </label>
        <input
          className="searchbar-input"
          type="text"
          name="inputValue"
          value={input.inputValue}
          onChange={handleChange}
          placeholder="Ingrese un nombre o un código de identificación."
        />
        <button>Buscar</button>
      </form>
      <button onClick={dispatchClearFetchedAnimals}>Limpiar resultados </button>
    </div>
  );
}
