import React from "react";
import { CardContainer } from "../../components/CardContainer/CardContainer";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Form } from "../../components/Form/Form";
import { Modal } from "../../components/Modal/Modal";
import { FetchedAnimals } from "../../components/FetchedAnimals/FetchedAnimals";

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
