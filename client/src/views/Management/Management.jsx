import React from "react";
import { CardContainer } from "../../components/CardContainer/CardContainer";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Form } from "../../components/Form/Form";
import { Modal } from "../../components/Modal/Modal";
import { FetchedAnimals } from "../../components/FetchedAnimals/FetchedAnimals";
import { IoMdAddCircleOutline } from "react-icons/io";
import { NavBar } from "../../components/NavBar/NavBar";

export function Management() {
  const [showValue, setShowValue] = React.useState(false);

  function showModal(e) {
    e.preventDefault();
    setShowValue(true);
  }
  return (
    <div className="max-w-7xl mx-auto ">
      <NavBar />
      <div className="px-2 mt-12 font-sans text-gray">
        <h1 className="text-green text-2xl my-5">Gestión de animales</h1>
        <div>
          <button
            onClick={showModal}
            className="text-gray flex items-center gap-3"
          >
            <IoMdAddCircleOutline />
            Agregar animal{" "}
          </button>
          <Modal show={showValue} setShowValue={setShowValue} />
        </div>
        <div className="my-5">
          <SearchBar />
        </div>
        <div className="fetched-animals-container">
          <FetchedAnimals />
        </div>
        <CardContainer />
      </div>
    </div>
  );
}
