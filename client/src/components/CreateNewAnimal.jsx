import React from "react";
import { useSelector } from "react-redux";
import { Form } from "./Form";
import loading from "../assets/loading.gif";
import { NavBar } from "./NavBar/NavBar";

export function CreateNewAnimal() {
  const newAnimalState = useSelector((state) => state.newAnimal);

  return (
    <div>
      <NavBar />
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
    </div>
  );
}
