import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { USER_EXISTS } from "../../constants/urls";
const LoginButton = () => {
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

        if (existe.data.msg) {
          console.log(
            "Usuario existe en la DB. Redireccionando/navigate a /home"
          );
          navigate("/home");
        }
        if (existe.data.msg === false) {
          console.log(`Usuario no existe en la DB. Navigate to "/register"`);
          navigate("/register");
        }
        // } else if (existe.data.msg === "banned") {
        //   localStorage.removeItem("token");
        //   logout({ returnTo: "https://mascotapps.vercel.app/banned" });
        // } else {
        //   navigate("/register");
        // }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!isLoading && isAuthenticated) {
    handleValidation(user, isAuthenticated);
  }

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
