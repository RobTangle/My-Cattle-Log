import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/actions";
import "./form.css";
// import loadingGIF from "../assets";

export function Form(props) {
  const [localState, setLocalState] = React.useState({
    id_senasa: "",
    type_of_animal: "",
    breed_name: "",
    location: "",
    weight_kg: "",
    name: "",
    device_type: "",
    device_number: "",
    image_1: "",
    image_2: "",
    image_3: "",
    comments: "",
    birthday: "",
    is_pregnant: "",
    delivery_date: "",
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getTypesOfAnimalsAllowed());
  }, [ dispatch ]);

  const typesOfAnimalsState = useSelector((state) => state.typesOfAnimals);
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

  // UPLOAD PHOTOS/IMAGES TO CLOUDINARY:
  const CLOUD_NAME = "imagenes";
  const UPLOAD_PRESET = "dpxrr2uyq";

  const upload = async (e) => {
    const img = e.target.files[0];
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", CLOUD_NAME);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${UPLOAD_PRESET}/image/upload`,
      { method: "POST", body: data }
    );
    const dataNew = await response.json();
    setLocalState({
      ...localState,
      [e.target.name]: dataNew.secure_url,
    });
    // reemplazar con un mensaje de éxito o la acción deseada
  };

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
          <div>
            {Array.isArray(typesOfAnimalsState) && (
              <fieldset>
                {" "}
                <legend>Tipo de animal</legend>
                {typesOfAnimalsState?.map((type) => (
                  <div key={Math.random()}>
                    <label htmlFor={type} key={Math.random()}>
                      <input
                        type="radio"
                        id={type}
                        name="type_of_animal"
                        value={`${type}`}
                        onChange={handleOnChange}
                      />
                      {type}
                    </label>
                    <label htmlFor="">
                      <input
                        type="radio"
                        name="type_of_animal"
                        // onChange={handleOnChange}
                      />
                      Tester 2
                    </label>
                  </div>
                ))}
                <div>
                  <input
                    type="radio"
                    id="test"
                    name="type_of_animal"
                    value={typesOfAnimalsState[1]}
                    onChange={handleOnChange}
                  />{" "}
                  <label htmlFor={typesOfAnimalsState[1]}>test</label>
                </div>
              </fieldset>
            )}
          </div>
          <div>
            <label htmlFor="breed_name">Raza</label>
            <input
              type="text"
              name="breed_name"
              id="breed_name"
              placeholder="Ej: Angus / Holstein / Criolla "
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="location">Localización</label>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Ej: Lote 21 / Sección 3"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="birthday">Fecha de nacimiento </label>
            <input type="date" name="birthday" onChange={handleOnChange} />
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
            <label htmlFor="name">Nombre </label>
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
          <div>
            <label htmlFor="comments">Comentarios </label>
            <textarea
              id="comments"
              type="textarea"
              name="comments"
              onChange={handleOnChange}
              placeholder="comentarios"
              value={localState.comments}
              maxLength={3000}
            />
          </div>
          <div>
            <label htmlFor="photo">Imagen 1 </label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image_1"
              placeholder="Imagen"
              onChange={upload}
            ></input>
          </div>
          <div>
            <label htmlFor="photo">Imagen 2 </label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image_2"
              placeholder="Imagen"
              onChange={upload}
            ></input>
          </div>
          <div>
            <label htmlFor="photo">Imagen 3 </label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image_3"
              placeholder="Imagen"
              onChange={upload}
            ></input>
          </div>
          <div>
            <fieldset>
              <legend>Preñada </legend>
              <div>
                <input
                  type="radio"
                  id="is_pregant-no"
                  name="is_pregnant"
                  value={false}
                  onChange={handleOnChange}
                />
                <label htmlFor="is_pregnant">No </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="is_pregnant-sí"
                  name="is_pregnant"
                  value={true}
                  onChange={handleOnChange}
                />
                <label htmlFor="is_pregnant-sí">Sí</label>
              </div>
            </fieldset>
          </div>
          <div>
            <label htmlFor="delivery_date">Fecha estimada de parto </label>
            <input
              type="date"
              name="delivery_date"
              id="delivery_date"
              onChange={handleOnChange}
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
