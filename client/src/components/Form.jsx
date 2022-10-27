import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions/actions";
// import loadingGIF from "../assets";

export function Form() {
  const [localState, setLocalState] = React.useState({
    id_senasa: "",
    type_of_animal: "",
    weight_kg: "",
    name: "",
    device_type: "",
    device_number: "",
  });

  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("tokenCattleTracker");
  // HANDLE FUNCTIONS:
  function handleOnChange(e) {
    setLocalState({ ...localState, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    console.log(`handleSubmit invocado. localState: `, localState);
    e.preventDefault();
    //HACER JS VALIDATIONS...
    dispatch(actions.setNewAnimalToLoading());
    dispatch(actions.createNewAnimal(localState, accessToken));
  }
  return (
    <div>
      <h2>Post a new animal...</h2>
      <form action="" onSubmit={handleSubmit}>
        <fieldset className="form-fieldset">
          <legend>New animal</legend>
          <div className="inside-form-container">
            <div className="form-id">
              <label htmlFor="id_senasa">id senasa</label>
              <input
                type="text"
                name="id_senasa"
                placeholder="id de senasa"
                onChange={handleOnChange}
              />
            </div>
            <div className="form-type-of-animal">
              <label htmlFor="type_of_animal">Tipo de animal: </label>
              <input
                type="text"
                name="type_of_animal"
                placeholder="Ingrese el tipo de animal. Ej: Vaquillona, Novillo, Toro"
                onChange={handleOnChange}
              />
            </div>
            <div className="form-weight_kg">
              <label htmlFor="weight_kg">Peso: </label>
              <input
                type="number"
                name="weight_kg"
                placeholder="peso del animal en kilogramos"
                onChange={handleOnChange}
              />
            </div>
            <div className="form-name">
              <label htmlFor="name">Nombre: </label>
              <input
                type="text"
                name="name"
                placeholder="nombre del animal"
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label htmlFor="device_type">Tipo de dispositivo: </label>
              <input type="text" name="device_type" onChange={handleOnChange} />
            </div>
            <div>
              <label htmlFor="device_number">Número de dispositivo: </label>
              <input
                type="text"
                name="device_number"
                onChange={handleOnChange}
              />
            </div>
          </div>
        </fieldset>
        <button>Registrar animal</button>
      </form>
    </div>
  );
}
