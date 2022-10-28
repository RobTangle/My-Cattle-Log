import React from "react";
import "./propsColumns.css";
export function PropsColumns(props) {
  return (
    <div className="card">
      <div className="prop-id">Id SENASA</div>
      <div className="prop-type-animal">Tipo de animal </div>
      <div className="prop-weight">Peso en kg</div>
      <div className="prop-name">Nombre </div>
      <div className="prop-device-type">Tipo de dispositivo</div>
      <div className="prop-device-number">Número de dispositivo</div>
      <div className="prop-action">Acciones</div>
    </div>
  );
}
