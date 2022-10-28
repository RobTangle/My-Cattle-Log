import React from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { cleanNewAnimal } from "../../redux/actions/actions";
import { NavBar } from "../NavBar/NavBar";
import axios from "axios";
import { USER_EXISTS } from "../../constants/urls";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
export function Home() {
  // const dispatch = useDispatch();
  // React.useEffect(() => {
  //   console.log(`Limpiando new animal...`);
  //   dispatch(cleanNewAnimal());
  // }, []);

  const {
    loginWithRedirect,
    user,
    isAuthenticated,
    getAccessTokenSilently,
    isLoading,
    logout,
  } = useAuth0();

  const navigate = useNavigate();

  const handleValidation = async (user, isAuthenticated) => {
    try {
      const claims = await getAccessTokenSilently();
      localStorage.setItem("tokenCattleTracker", claims);

      if (isAuthenticated && user) {
        let existe = await axios.get(USER_EXISTS, {
          headers: {
            Authorization: `Bearer ${claims}`,
          },
        });
        console.log(existe.data.msg);

        if (existe.data.msg === false) {
          navigate("/register");
        }
      }
    } catch (error) {
      console.log(error);
      console.log(`Regresando al "/" para que se pueda loguear`);
      navigate("/");
    }
  };

  React.useEffect(() => {
    console.log(`useEffect de Home`);
    handleValidation();
  }, []);

  return (
    <>
      <NavBar />
      <div>ESTE ES EL HOME! WELCOME!</div>
      <SearchBar />
    </>
  );
}
