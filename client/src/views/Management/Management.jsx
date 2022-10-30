import React from "react";
import { CardContainer } from "../../components/CardContainer/CardContainer";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Form } from "../../components/Form/Form";
import { Modal } from "../../components/Modal/Modal";
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
        <div className="">
          <button
            onClick={showModal}
            className="text-green flex items-center gap-3"
          >
            <IoMdAddCircleOutline />
            Agregar animal{" "}
          </button>
          <Modal show={showValue} setShowValue={setShowValue} />
        </div>

        <SearchBar />

        <CardContainer />
      </div>
    </div>
  );
}
