import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "../Form/Form";
import loading from "../../assets/loading.gif";
import { NavBar } from "../NavBar/NavBar";
import { cleanNewAnimal } from "../../redux/actions/actions";

import "./modal.css";

export function Modal(props) {
  const newAnimalState = useSelector((state) => state.newAnimal);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(`Me desmontéo desmonté????`);
    dispatch(cleanNewAnimal());
  }, []);

  if (!props.show) {
    return null;
  }

  function closeModal(e) {
    e.preventDefault();
    props.setShowValue(false);
    dispatch(cleanNewAnimal());
  }

  return (
    <div className="modal-container">
      <div>
        {newAnimalState.pure ? <Form closeModal={closeModal} /> : null}
        {newAnimalState.loading ? (
          <div>
            <img src={loading} alt="loading gif" />
          </div>
        ) : null}
        {newAnimalState.newAnimal ? (
          <div className="modal-response">{newAnimalState.msg} </div>
        ) : null}
        {newAnimalState.error ? (
          <div className="modal-response-container">
            <div className="modal-response-error">
              {" "}
              <p>Oops! Hubo un error: {newAnimalState.error} </p>{" "}
              <p>
                {" "}
                Si es un error de conexión, por favor chequee que tiene una
                correcta conexión a internet y vuelta a internarlo.
              </p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="modal-footer">
        <button onClick={closeModal}>X</button>
      </div>
    </div>
  );
}
