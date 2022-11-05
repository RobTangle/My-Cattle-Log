import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormMdlzd } from "../Form/FormMdlzd";
import loading from "../../assets/loading.gif";
import { cleanUpdateAnimal } from "../../redux/actions/animal-actions/animal-actions";

export function ModalEdit(props) {
  const updatedAnimal = useSelector((state) => state.updatedAnimal);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(`useEffect de ModalEdit...`);
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
    <div className="w-full z-50 bg-white absolute inset-0 px-3 py-5  my-3 drop-shadow-lg h-fit max-w-xl mx-auto ">
      {updatedAnimal.pure ? (
        <FormMdlzd animal={props.animal} closeModal={closeModal} />
      ) : null}
      {updatedAnimal.loading ? (
        <div>
          <img src={loading} alt="loading gif" />
        </div>
      ) : null}
      {updatedAnimal.updated ? <div>{updatedAnimal.msg}</div> : null}
      {updatedAnimal.updated === 0 ? (
        <div>Oops! {updatedAnimal.msg}</div>
      ) : null}
      {updatedAnimal.error ? (
        <div className="modal-response">{updatedAnimal.error} </div>
      ) : null}

      <div className="modal-footer">
        <button onClick={closeModal}>X</button>
      </div>
    </div>
  );
}
