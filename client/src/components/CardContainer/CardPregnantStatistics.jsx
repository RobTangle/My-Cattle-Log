import React from "react";
import { useState } from "react";
import { URL } from "../../constants/urls";
import axios from "axios";
import { header } from "../../constants/token";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllAnimals,
//   setUserAnimalsToLoading,
// } from "../../redux/actions/actions";
// import loading from "../../assets/loading.gif";
import { Pagination } from "../Pagination/Pagination";
import { PropsPregnantStatistics } from "../PropsColumns/PropsPregnantStatistics";

export function CardPregnantStatistics({ animalsToRender }) {
  // const userAnimalsState = useSelector((state) => state.userAnimals);
  // const dispatch = useDispatch();
  const tokenAccess = localStorage.getItem("tokenCattleTracker");
  const [pregnant, setPregnant] = useState("");
  React.useEffect(() => {
    console.log(`en el useEffect`);
    console.log(`TOKEN ACCESS = `);
    console.log(tokenAccess);
    // dispatch(setUserAnimalsToLoading());
    // dispatch(getAllAnimals(tokenAccess));
    async function getPregnantAnimals(token) {
      const response = await axios.get(
        URL + "animal/isPregnant?status=true&order=ASC",
        header(token)
      );
      console.log(response.data);
      setPregnant(response.data);
    }
    getPregnantAnimals(tokenAccess);
  }, [tokenAccess]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-green text-xl border-solid  border-b-2 border-green my-3 mx-3">
        Lista de hembras preñadas
      </div>
      {/* {userAnimalsState?.loading === true ? (
        <div>
          <img src={loading} alt="loading spinner" />
        </div>
      ) : null} */}
      {pregnant?.list?.length === 0 ? (
        <div>No hay ningún animal para mostrar </div>
      ) : null}
      {Array.isArray(pregnant?.list) ? (
        <div className="list-animals-grid">
          <PropsPregnantStatistics animals={pregnant.list} />{" "}
        </div>
      ) : null}
      {pregnant.error ? (
        <div className="error-msg-div">
          Oops! Hubo un error. {pregnant.error}
        </div>
      ) : null}
    </div>
  );
}
