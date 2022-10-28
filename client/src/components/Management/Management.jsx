import React from "react";
import { CardContainer } from "../CardContainer/CardContainer";
import { SearchBar } from "../SearchBar/SearchBar";
import { Form } from "../Form/Form";
import { Modal } from "../Modal/Modal";
import "./management.css";
import { FetchedAnimals } from "../FetchedAnimals/FetchedAnimals";

export function Management() {
  const [showValue, setShowValue] = React.useState(false);

  function showModal(e) {
    e.preventDefault();
    setShowValue(true);
  }
  return (
    <>
      <div>
        <h1>Gestión de animales</h1>
        <div>
          <button onClick={showModal}>Create new animal</button>
          <Modal show={showValue} setShowValue={setShowValue} />
        </div>
        <div className="sb-cc-container">
          <div className="searchbar-div">
            <SearchBar />
          </div>
          {}
          <div className="fetched-animals-container">
            <FetchedAnimals />
          </div>
          <CardContainer />
        </div>
      </div>
    </>
  );
}
