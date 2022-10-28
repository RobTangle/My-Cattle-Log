import React from "react";
import { AnimalCard } from "../AnimalCard/AnimalCard";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "../NavBar/NavBar";
import {
  getAllAnimals,
  setUserAnimalsToLoading,
} from "../../redux/actions/actions";
import loading from "../../assets/loading.gif";
import { Pagination } from "../Pagination/Pagination";
import { PropsColumns } from "../PropsColumns/PropsColumns";
import "./cardContainer.css";

export function CardContainer(props) {
  const userAnimalsState = useSelector((state) => state.userAnimals);
  const dispatch = useDispatch();
  const tokenAccess = localStorage.getItem("tokenCattleTracker");

  React.useEffect(() => {
    console.log(`en el useEffect`);
    console.log(`TOKEN ACCESS = `);
    console.log(tokenAccess);
    dispatch(setUserAnimalsToLoading());
    dispatch(getAllAnimals(tokenAccess));
  }, [dispatch]);

  return (
    <>
      <div>
        <h2>Lista de animales</h2>
        {userAnimalsState?.loading === true ? (
          <div>
            <img src={loading} alt="loading spinner" />
          </div>
        ) : null}
        {userAnimalsState?.length === 0 ? (
          <div>No hay ningún animal para mostrar </div>
        ) : null}
        {Array.isArray(userAnimalsState) ? (
          <div className="list-animals-grid">
            <PropsColumns />{" "}
            {userAnimalsState.map((animal) => (
              <AnimalCard animal={animal} key={animal.id_senasa} />
            ))}
          </div>
        ) : null}
        {userAnimalsState.error ? (
          <div>Oops! Hubo un error. {userAnimalsState.error}</div>
        ) : null}
        <Pagination />
      </div>
    </>
  );
}
