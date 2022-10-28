import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/actions";
import "./form.css";
// import loadingGIF from "../assets";

export function Form(props) {
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
    setTimeout(() => {
      dispatch(actions.getAllAnimals(accessToken));
    }, 500);
  }
  return (
    <div className="form-modal">
      <h2>Nuevo animal...</h2>
      <form action="" onSubmit={handleSubmit}>
        {/* <fieldset className="form-fieldset"> */}

        <div className="inside-form-container">
          <div className="form-id">
            <label htmlFor="id_senasa">Identificador SENASA *</label>
            <input
              type="text"
              name="id_senasa"
              placeholder="id de 16 caracteres"
              maxLength={16}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-type-of-animal">
            <label htmlFor="type_of_animal">Tipo de animal *</label>
            <input
              type="text"
              name="type_of_animal"
              placeholder="Ej: Vaquillona / Novillo / Toro"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-weight_kg">
            <label htmlFor="weight_kg">Peso</label>
            <input
              type="number"
              name="weight_kg"
              placeholder="kilogramos, sin comas"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-name">
            <label htmlFor="name">Nombre *</label>
            <input
              type="text"
              name="name"
              placeholder="nombre del animal"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="device_type">Tipo de dispositivo * </label>
            <input
              type="text"
              name="device_type"
              onChange={handleOnChange}
              placeholder="Ej: Collar / Ear tag"
            />
          </div>
          <div>
            <label htmlFor="device_number">Número de dispositivo * </label>
            <input
              type="text"
              name="device_number"
              onChange={handleOnChange}
              placeholder="código de 8 caracteres"
              maxLength={8}
            />
          </div>

          <button>Registrar animal</button>
          <button onClick={props.closeModal}>Cerrar</button>
        </div>
        {/* </fieldset> */}
      </form>
    </div>
  );
}
