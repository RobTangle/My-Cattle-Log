import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../redux/actions/actions";

export function Statistics(props) {
  const token = localStorage.getItem("TokenCattleTracker");
  const dispatch = useDispatch();
  const statsState = useSelector((state) => state.stats);
  React.useEffect(() => {
    dispatch(getStats(token));
  }, []);

  return (
    <>
      <div>
        <h1>Estadísticas</h1>
        <div>
          <h2>Razas</h2>
          <div>
            <div>Botones de filtrado de razas</div>
            <div>
              Renderizado de cards filtrados por razas. Tengo el array listo
              para mapear en el stats.races["raza"].rows
            </div>
          </div>
        </div>
        <div>
          <h2>Localizaciones</h2>
          <div>Botones de filtrado segun localizaciones</div>
          <div>
            Renderizado de cards filtrados por locations. Tengo el array listo
            para mapear en el stats.location["localización"].rows
          </div>
        </div>
        <div>
          <h2>Tipos</h2>
          <div>
            Botones de filtrado según type_of_animal -Vaca, Toro, Novillo,
            Vaquillona-
          </div>
          <div>
            Renderizado de cards filtrados por locations. Tengo el array listo
            para mapear en el stats.types["tipo"].rows
          </div>
        </div>
        <div>
          <h2>Estado de embarazo</h2>
          <div>Botón Animales preñados - No preñados </div>
          <div>
            Renderizado de cards de animales embarazados. Array listo en
            stats.pregnant.rows
          </div>
        </div>
        <div>
          <h2>Próximos partos esperados</h2>
          <div>Botón de ordenamiento ASC o DESC</div>
          <div>
            Renderizado de cards de animales embarazados. Array listo en
            stats.pregnant.rows
          </div>
        </div>
        <div>
          <h2>Tipo de dispositivo</h2>
          <div>Botones de filtrado según tipo de dispositivo</div>
          <div>
            Renderizado de cards segúin el filtrado de tipo de dispositivo.
            Array listos en stats.deviceType[type].rows
          </div>
        </div>
      </div>
    </>
  );
}
