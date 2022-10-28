import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditForm } from "../Form/EditForm";
import loading from "../../assets/loading.gif";
import { NavBar } from "../NavBar/NavBar";
import { cleanUpdateAnimal } from "../../redux/actions/actions";

import "./modal.css";

export function ModalEdit(props) {
  const updatedAnimal = useSelector((state) => state.updatedAnimal);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(`Me desmontéo desmonté????`);
    // dispatch(cleanUpdateAnimal());
  }, []);

  if (!props.show) {
    return null;
  }

  function closeModal(e) {
    e.preventDefault();
    props.setShowValue(false);
    dispatch(cleanUpdateAnimal());
  }

  return (
    <div>
      <div>
        {updatedAnimal.pure ? <EditForm animal={props} /> : null}
        {updatedAnimal.loading ? (
          <div>
            <img src={loading} alt="loading gif" />
          </div>
        ) : null}
        {updatedAnimal.updated ? <div>{updatedAnimal.msg} </div> : null}
        {updatedAnimal.updated === 0 ? (
          <div>Oops! {updatedAnimal.msg}</div>
        ) : null}
        {updatedAnimal.error ? <div>{updatedAnimal.error}</div> : null}
      </div>
      <div className="modal-footer">
        <button onClick={closeModal}>Cerrar</button>
      </div>
    </div>
  );
}
