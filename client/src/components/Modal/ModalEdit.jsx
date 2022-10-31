import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormEdit } from "../Form/FormEdit";
import loading from "../../assets/loading.gif";
import { cleanUpdateAnimal } from "../../redux/actions/actions";


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
        {updatedAnimal.pure ? (
          <FormEdit animal={props.animal} closeModal={closeModal} />
        ) : null}
        {updatedAnimal.loading ? (
          <div className="modal-response">
            <img src={loading} alt="loading gif" />
            <div>
              <button onClick={closeModal}>X</button>
            </div>
          </div>
        ) : null}
        {updatedAnimal.updated ? (
          <div className="modal-response">
            {updatedAnimal.msg}{" "}
            <div>
              <button onClick={closeModal}>X</button>
            </div>
          </div>
        ) : null}
        {updatedAnimal.updated === 0 ? (
          <div>Oops! {updatedAnimal.msg}</div>
        ) : null}
        {updatedAnimal.error ? (
          <div className="modal-response">
            {updatedAnimal.error}{" "}
            <div>
              <button onClick={closeModal}>X</button>
            </div>
          </div>
        ) : null}
      </div>
      {/* <div className="modal-footer">
        <button onClick={closeModal}>X</button>
      </div> */}
    </div>
  );
}
