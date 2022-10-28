import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/actions";
import "./form.css";
// import loadingGIF from "../assets";

export function FormEdit(props) {
  console.log(props);
  console.log("props.animal = ");
  console.log(props.animal);
  const [localState, setLocalState] = React.useState({
    id_senasa: props.animal.id_senasa,
    type_of_animal: props.animal.type_of_animal,
    weight_kg: props.animal.weight_kg,
    name: props.animal.name,
    device_type: props.animal.device_type,
    device_number: props.animal.device_number,
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
    dispatch(actions.setUpdateAnimalToLoading());
    dispatch(actions.updateAnimal(localState, accessToken));
    setTimeout(() => {
      dispatch(actions.getAllAnimals(accessToken));
    }, 500);
  }
  return (
    <div className="form-modal">
      <h2>Editar animal...</h2>
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
              value={localState.id_senasa}
              disabled={true}
            />
          </div>
          <div className="form-type-of-animal">
            <label htmlFor="type_of_animal">Tipo de animal *</label>
            <input
              type="text"
              name="type_of_animal"
              placeholder="Ej: Vaquillona / Novillo / Toro"
              onChange={handleOnChange}
              value={localState.type_of_animal}
            />
          </div>
          <div className="form-weight_kg">
            <label htmlFor="weight_kg">Peso</label>
            <input
              type="number"
              name="weight_kg"
              placeholder="kilogramos, sin comas"
              onChange={handleOnChange}
              value={localState.weight_kg}
            />
          </div>
          <div className="form-name">
            <label htmlFor="name">Nombre *</label>
            <input
              type="text"
              name="name"
              placeholder="nombre del animal"
              onChange={handleOnChange}
              value={localState.name}
            />
          </div>
          <div>
            <label htmlFor="device_type">Tipo de dispositivo * </label>
            <input
              type="text"
              name="device_type"
              onChange={handleOnChange}
              placeholder="Ej: Collar / Ear tag"
              value={localState.device_type}
            />
          </div>
          <div>
            <label htmlFor="device_number">Número de dispositivo * </label>
            <input
              type="text"
              name="device_number"
              onChange={handleOnChange}
              placeholder="código de 8 caracteres"
              value={localState.device_number}
              maxLength={8}
            />
          </div>

          <button>Confirmar</button>
          <button onClick={props.closeModal}>X</button>
        </div>
        {/* </fieldset> */}
      </form>
    </div>
  );
}
