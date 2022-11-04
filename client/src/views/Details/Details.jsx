import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAnimalDetail, resetDetail } from "../../redux/actions/animal-actions/animal-actions";


export function Details() {
  const token = localStorage.getItem("tokenCattleTracker");
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const animal = useSelector((state) => state.detail);
  console.log("🚀 ~ file: Details.jsx ~ line 13 ~ Details ~ animal", animal)
  React.useEffect(() => {
    dispatch(getAnimalDetail(id, token));
    return () => {
      dispatch(resetDetail());
    }
  }, [  id, token ]);

  return (
    <div>
      <h1>DETAILS</h1>
      <div></div>
      <div></div>
    </div>
  );
}
