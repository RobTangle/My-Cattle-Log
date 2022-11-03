import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "../NavBar/NavBar";
import { CardPregnantStatistics } from "../CardContainer/CardPregnantStatistics";
import { FilterButtons } from "../FilterButtons.jsx/FilterButtons";
import { getStats } from "../../redux/actions/actions";
import { DoughnutChart } from "../../charts/DoughnutChart";
import "./statistics.css";
import { PieChart } from "../../charts/PieChart";
import { VerticalBarChartPreg } from "../../charts/VerticalBarChartPreg";
import { VerticalBarChart } from "../../charts/VerticalBarChart";
import { CardFilterContainer } from "../CardContainer/CardFilterContainer";

export function Statistics(props) {
  const token = localStorage.getItem("tokenCattleTracker");
  const dispatch = useDispatch();
  const statsState = useSelector((state) => state.stats);

  const [filters, setFilters] = useState({
    races: "",
    location: "",
    type_of_animal: "",
    pregnant: "",
  });

  function renderPregnant(arg) {
    setFilters({
      ...filters,
      pregnant: arg,
    });
  }

  React.useEffect(() => {
    dispatch(getStats(token));
  }, [dispatch, token]);

  return (
    <>
      <div className="max-w-7xl mx-auto ">
        <NavBar />
        <h1 className="text-green text-3xl my-5">Estadísticas</h1>
        <br />
        <div>
          <h2 className="text-green text-2xl my-5">Razas</h2>
          <div className="graph400">
            {statsState.races && (
              <DoughnutChart
                statsObj={statsState.races}
                by="raza"
                title="Raza"
              />
            )}
          </div>
          <div>Botones de filtrado de razas</div>
          <div>
            {statsState.races && (
              <FilterButtons
                filtersArray={Object.keys(statsState?.races)}
                filters={filters}
                setFilters={setFilters}
                prop="races"
              />
            )}
          </div>
          <div>
            {filters.races && (
              <CardFilterContainer
                animalsToRender={statsState.races[filters.races]?.rows}
              />
            )}
          </div>
        </div>
        <br />
        <div>
          <h2 className="text-green text-2xl my-5">Localizaciones</h2>
          <div className="graph400">
            {statsState.location && (
              <PieChart
                statsObj={statsState.location}
                by="localización"
                title="Localización"
              />
            )}
          </div>
          <div>Botones de filtrado segun localizaciones</div>
          <div>
            {statsState?.location && (
              <FilterButtons
                filtersArray={Object.keys(statsState?.location)}
                filters={filters}
                setFilters={setFilters}
                prop="location"
              />
            )}
          </div>
          <div>
            {filters.location && (
              <CardFilterContainer
                animalsToRender={statsState.location[filters.location]?.rows}
              />
            )}
          </div>
        </div>
        <br />
        <div>
          <h2 className="text-green text-2xl my-5">Tipos</h2>
          <div className="graph400">
            {statsState.types && (
              <PieChart
                statsObj={statsState.types}
                by="tipo"
                title="Tipo de animal"
              />
            )}
          </div>
          <div className="graph600">
            {statsState.types && (
              <VerticalBarChart
                statsObj={statsState.types}
                by="tipo"
                title="Tipo de animal"
              />
            )}
          </div>
          <div>
            {statsState.types && (
              <FilterButtons
                filtersArray={Object.keys(statsState.types)}
                filters={filters}
                setFilters={setFilters}
                prop="type_of_animal"
              />
            )}
          </div>
          <div>
            {filters.type_of_animal && statsState.types && (
              <CardFilterContainer
                animalsToRender={statsState.types[filters.type_of_animal].rows}
              />
            )}
          </div>
        </div>
        <br />
        <div>
          <h2 className="text-green text-2xl my-5">
            Estado de embarazo de hembras
          </h2>
          <div className="graph600">
            {statsState.pregnant && (
              <VerticalBarChartPreg
                statsObjPreg={statsState?.sex?.femalePregnant}
                statsObjNotPreg={statsState?.sex?.femaleNotPregnant}
              />
            )}
          </div>
          <div>Botón Animales preñados - No preñados </div>
          <div className="flex items-center gap-5 justify-left w-full my-5">
            <button
              className=" border border-solid border-transparent bg-green px-3 py-1 rounded-sm text-white hover:bg-white hover:text-green hover:border-green transition-all ease-in-out duration-500"
              onClick={() => renderPregnant("positive")}
            >
              Ver preñadas
            </button>
            <button
              className=" border border-solid border-transparent bg-green px-3 py-1 rounded-sm text-white hover:bg-white hover:text-green hover:border-green transition-all ease-in-out duration-500"
              onClick={() => renderPregnant("negative")}
            >
              Ver no preñadas
            </button>
            <button
              className=" bg-white border border-solid border-green px-3 py-1 rounded-sm text-green hover:bg-green hover:text-white hover:border-green transition-all ease-in-out duration-500"
              onClick={() => renderPregnant("")}
            >
              Limpiar
            </button>
          </div>
          <div>
            {filters.pregnant === "positive" &&
              statsState?.sex?.femalePregnant && (
                <CardFilterContainer
                  animalsToRender={statsState.sex.femalePregnant.rows}
                />
              )}
            {filters.pregnant === "negative" &&
              statsState?.sex?.femalePregnant && (
                <CardFilterContainer
                  animalsToRender={statsState.sex.femaleNotPregnant.rows}
                />
              )}
          </div>
        </div>
        <br />
        <div>
          <h2 className="text-green text-2xl my-5">
            Próximos partos esperados
          </h2>
          <div>
            {statsState.pregnant && (
              <CardPregnantStatistics
                animalsToRender={statsState?.pregnant?.rows}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
