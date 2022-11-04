import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAnimals,
  setUserAnimalsToLoading,
} from "../../redux/actions/animal-actions/animal-actions";
import loading from "../../assets/loading.gif";
import { Pagination } from "../Pagination/Pagination";
import { PropsColumns } from "../PropsColumns/PropsColumns";

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
  }, [dispatch, tokenAccess]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-green text-xl border-solid  border-b-2 border-green my-3 mx-3">
        Lista de animales
      </div>
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
          <PropsColumns animals={userAnimalsState} />{" "}
        </div>
      ) : null}
      {userAnimalsState.error ? (
        <div className="error-msg-div">
          Oops! Hubo un error. {userAnimalsState.error}
        </div>
      ) : null}
    </div>
  );
}
