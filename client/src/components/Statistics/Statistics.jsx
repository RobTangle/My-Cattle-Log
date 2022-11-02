import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "../NavBar/NavBar";
import { CardStatistics } from "../CardContainer/CardStatistics";
import { getStats } from "../../redux/actions/actions";
import { DoughnutChart } from "../../charts/DoughnutChart";
import "./statistics.css";
import { PieChart } from "../../charts/PieChart";
import { RadarChart } from "../../charts/RadarChart";
import { VerticalBarChartPreg } from "../../charts/VerticalBarChartPreg";
import { VerticalBarChart } from "../../charts/VerticalBarChart";

export function Statistics(props) {
  const token = localStorage.getItem("tokenCattleTracker");
  const dispatch = useDispatch();
  const statsState = useSelector((state) => state.stats);
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
            Renderizado de cards filtrados por razas. Tengo el array listo para
            mapear en el stats.races["raza"].rows
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
            Renderizado de cards filtrados por locations. Tengo el array listo
            para mapear en el stats.location["localización"].rows
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
          <div className="graph400">
            {statsState.types && (
              <RadarChart
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
            Botones de filtrado según type_of_animal -Vaca, Toro, Novillo,
            Vaquillona-
          </div>
          <div>
            Renderizado de cards filtrados por locations. Tengo el array listo
            para mapear en el stats.types["tipo"].rows
          </div>
        </div>
        <br />
        <div>
          <h2 className="text-green text-2xl my-5">Estado de embarazo</h2>
          <div className="graph600">
            {statsState.pregnant && (
              <VerticalBarChartPreg
                statsObjPreg={statsState?.pregnant}
                statsObjNotPreg={statsState.notPregnant}
              />
            )}
          </div>
          <div>Botón Animales preñados - No preñados </div>
          <div>
            Renderizado de cards de animales embarazados. Array listo en
            stats.pregnant.rows
          </div>
        </div>
        <br />
        <div>
          <h2 className="text-green text-2xl my-5">
            Próximos partos esperados
          </h2>
          <div>Botón de ordenamiento ASC o DESC</div>
          <div>
            Renderizado de cards de animales embarazados. Array listo en
            stats.pregnant.rows
          </div>
          <div>
            {statsState.pregnant && (
              <CardStatistics animalsToRender={statsState?.pregnant?.rows} />
            )}
          </div>
        </div>
        <br />
        {/* <div>
          <h2>Tipo de dispositivo</h2>
          <div>CHART</div>
          <div>Botones de filtrado según tipo de dispositivo</div>
          <div>
            Renderizado de cards segúin el filtrado de tipo de dispositivo.
            Array listos en stats.deviceType[type].rows
          </div>
        </div> */}
      </div>
    </>
  );
}
