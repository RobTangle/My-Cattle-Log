import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useDispatch } from "react-redux";
import { getAllAnimals, deleteAnimal } from "../../redux/actions/actions";
import "./animalCard.css";

export function AnimalCard(props) {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("tokenCattleTracker");

  function handleDelete(e) {
    // console.log(e);
    console.log(`Eliminando animal con id ${e.target.value}`);
    const animal_id = e.target.value;
    console.log(animal_id);
    dispatch(deleteAnimal(animal_id, accessToken));
    dispatch(getAllAnimals(accessToken));
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
        <button className="btn-edit" value={props.animal?.id_senasa}>
          Edit
        </button>
        <button
          className="btn-delete"
          value={props.animal?.id_senasa}
          onClick={handleDelete}
        >
          X
        </button>
      </div>
    </div>
  );
}
