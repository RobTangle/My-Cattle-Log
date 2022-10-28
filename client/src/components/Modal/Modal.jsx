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
  }

  return (
    <div>
      <div>
        {newAnimalState.pure ? <Form /> : null}
        {newAnimalState.loading ? (
          <div>
            <img src={loading} alt="loading gif" />
          </div>
        ) : null}
        {newAnimalState.newAnimal ? <div>{newAnimalState.msg} </div> : null}
        {newAnimalState.error ? <div>{newAnimalState.error}</div> : null}
      </div>
      <div className="modal-footer">
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}