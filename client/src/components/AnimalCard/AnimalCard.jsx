import React from "react";
import "./animalCard.css";
export function AnimalCard(props) {
  return (
    <div className="card">
      <div className="prop">Id SENASA: {props.animal?.id_senasa}</div>
      <div className="prop">Tipo de animal: {props.animal?.type_of_animal}</div>
      <div className="prop">Peso en kg: {props.animal?.weight_kg}</div>
      <div className="prop">Nombre: {props.animal?.name}</div>
      <div className="prop">
        Tipo de dispositivo: {props.animal?.device_type}
      </div>
      <div className="prop">
        Número de dispositivo: {props.animal?.device_number}
      </div>
    </div>
  );
}
