import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useDispatch } from "react-redux";
import { getAllAnimals, deleteAnimal } from "../../redux/actions/actions";
import "./animalCard.css";
import { ModalEdit } from "../Modal/ModalEdit";

export function AnimalCard(props) {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("tokenCattleTracker");
  const [showValue, setShowValue] = React.useState(false);
  function handleDelete(e) {
    // console.log(e);
    console.log(`Eliminando animal con id ${e.target.value}`);
    const animal_id = e.target.value;
    console.log(animal_id);
    dispatch(deleteAnimal(animal_id, accessToken));
    dispatch(getAllAnimals(accessToken));
  }

  function handleClickEdit(e) {
    console.log(`Editando animal con id ${e.target.value}`);
  }

  function showModal(e) {
    e.preventDefault();
    setShowValue(true);
  }

  return (
    <div className="card">
      <div className="prop-id"> {props.animal?.id_senasa}</div>
      <div className="prop-type-animal">{props.animal?.type_of_animal}</div>
      <div className="prop-weight"> {props.animal?.weight_kg}</div>
      <div className="prop-name">{props.animal?.name}</div>
      <div className="prop-device-type">{props.animal?.device_type}</div>
      <div className="prop-device-number">{props.animal?.device_number}</div>
      <div className="prop-action">
        <button
          className="btn-edit"
          value={props.animal?.id_senasa}
          onClick={showModal}
        >
          Edit
        </button>
        <button
          className="btn-delete"
          value={props.animal?.id_senasa}
          onClick={handleDelete}
        >
          Delete
        </button>
        <ModalEdit
          show={showValue}
          setShowValue={setShowValue}
          animal={props.animal}
        />
      </div>
    </div>
  );
}
