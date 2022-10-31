import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/actions";
import InputForm from "./InputForm";

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
  console.log("🚀 ~ file: Form.jsx ~ line 26 ~ Form ~ localState", localState);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getTypesOfAnimalsAllowed());
  }, [dispatch]);

  const typesOfAnimalsState = useSelector((state) => state.typesOfAnimals);
  const accessToken = localStorage.getItem("tokenCattleTracker");

  // HANDLE FUNCTIONS:
  function handleOnChange(e) {
    console.log(e.target.name, e.target.value);
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
    <div className="w-full z-50 bg-white absolute inset-0 px-3 py-5  my-3 drop-shadow-lg h-fit ">
      <h2 className="text-green font-sans text-xl">Nuevo animal</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="inside-form-container">
          <div className="flex items-center gap-3 mb-3 w-full">
            <label
              htmlFor="id_senasa"
              className="text-gray font-semibold w-[120px] md:w-[130px] text-sm after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Identificador SENASA
            </label>
            <input
              className="bg-gray/10 border border-solid border-gray/10 rounded-sm px-3 py-1  w-full"
              type="text"
              name="id_senasa"
              placeholder="id de 16 caracteres"
              maxLength={16}
              onChange={handleOnChange}
            />
          </div>

          <legend className="text-gray font-semibold w-[120px] md:w-[130px] text-sm text-sm after:content-['*'] after:ml-0.5 after:text-red-500 ">
            Tipo de animal
          </legend>
          <div onChange={handleOnChange} className="mb-3">
            {Array.isArray(typesOfAnimalsState) && (
              <fieldset className="flex  gap-3 my-2 ">
                {" "}
                {typesOfAnimalsState?.map((type) => (
                  <>
                    <input
                      type="radio"
                      id={type}
                      name="type_of_animal"
                      value={`${type}`}
                      className="checked:bg-green"
                    />{" "}
                    {type}
                  </>
                ))}
              </fieldset>
            )}
          </div>

          <InputForm
            handleOnChange={handleOnChange}
            type="text"
            name="breed_name"
            text="Raza"
            placeholder="Ej: Angus / Holstein / Criolla "
          />
          <InputForm
            handleOnChange={handleOnChange}
            type="text"
            name="location"
            text="Localización"
            placeholder="Ej: Lote 21 / Sección 3"
          />
          <InputForm
            handleOnChange={handleOnChange}
            type="date"
            name="location"
            text="Fecha de nacimiento"
          />
          <InputForm
            handleOnChange={handleOnChange}
            type="number"
            name="weight_kg"
            text="Peso"
            placeholder="kilogramos, sin comas "
          />
          <InputForm
            handleOnChange={handleOnChange}
            type="text"
            name="name"
            text="Nombre"
            placeholder="nombre del animal "
          />
          <InputForm
            handleOnChange={handleOnChange}
            type="text"
            name="device_type"
            text="Tipo de dispositivo"
            placeholder="Ej: Collar / Ear tag "
          />
          <InputForm
            handleOnChange={handleOnChange}
            type="text"
            name="device_number"
            text="Número de dispositivo"
            placeholder="Código de 8 caracteres"
          />

          <div className="flex flex-col  gap-3 mb-3 w-full my-5">
            <label
              htmlFor="comments"
              className="text-gray font-semibold w-[120px] md:w-[130px] text-sm "
            >
              Comentarios{" "}
            </label>
            <textarea
              id="comments"
              type="textarea"
              name="comments"
              onChange={handleOnChange}
              placeholder="comentarios"
              value={localState.comments}
              maxLength={3000}
              className="bg-gray/10 border border-solid border-gray/10 rounded-sm px-3 py-1  w-full"
            />
          </div>
          <InputForm
            handleOnChange={upload}
            type="file"
            name="image_1"
            text="Imagen 1"
            placeholder="Imagen"
            accept=".png, .jpg, .jpeg"
          />
          <InputForm
            handleOnChange={upload}
            type="file"
            name="image_2"
            text="Imagen 2"
            placeholder="Imagen"
            accept=".png, .jpg, .jpeg"
          />
          <InputForm
            handleOnChange={upload}
            type="file"
            name="image_3"
            text="Imagen 3"
            placeholder="Imagen"
            accept=".png, .jpg, .jpeg"
          />

          <div className="my-3">
            <fieldset>
              <legend className="text-gray font-semibold w-[120px] md:w-[130px] text-sm ">
                Preñada{" "}
              </legend>
              <div className="flex gap-3">
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
              </div>
            </fieldset>
          </div>
          {localState.is_pregnant && (
            <InputForm
              handleOnChange={handleOnChange}
              type="date"
              name="delivery_date"
              text="Fecha estimada de parto"
            />
          )}
         <div className="flex items-center gap-5 justify-center w-full my-5">

          <button className=" border border-solid border-transparent bg-green px-3 py-1 rounded-sm text-white hover:bg-white hover:text-green hover:border-green transition-all ease-in-out duration-500">
            Registrar animal
          </button>
          <button
            onClick={props.closeModal}
            className=" bg-white border border-solid border-green px-3 py-1 rounded-sm text-green hover:bg-green hover:text-white hover:border-green transition-all ease-in-out duration-500"
            >
            Cerrar
          </button>
            </div>
        </div>
        {/* </fieldset> */}
      </form>
    </div>
  );
}
