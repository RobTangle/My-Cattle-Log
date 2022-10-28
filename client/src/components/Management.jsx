import React from "react";
import { CardContainer } from "./CardContainer";
import { SearchBar } from "./SearchBar/SearchBar";
import { Form } from "./Form/Form";
import { Modal } from "./Modal/Modal";
export function Management() {
  const [showValue, setShowValue] = React.useState(false);

  function showModal(e) {
    e.preventDefault();
    setShowValue(true);
  }
  return (
    <>
      <div>
        <h2>Cattle Management</h2>
        <div>
          <button onClick={showModal}>Create new animal</button>
          <Modal show={showValue} setShowValue={setShowValue} />
        </div>
      </div>
    </>
  );
}
