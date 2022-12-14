import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { USER_EXISTS } from "../../constants/urls";

const LoginButton = ({ footer }) => {
  const {
    loginWithRedirect,
    user,
    isAuthenticated,
    getAccessTokenSilently,
    isLoading,
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

        if (existe.data.msg) {
          if (!isLoading && isAuthenticated) {
            navigate("/home");
          }
        }
        if (existe.data.msg === false) {
          navigate("/register");
        }
      }
    } catch (error) {
      console.log(`Error en el Login Button`);
      console.log(error);
    }
  };

  if (!isLoading && isAuthenticated) {
    handleValidation(user, isAuthenticated);
  }

  return (
    <button
      className={`${
        footer
          ? "border-transparent border-solid hover:bg-transparent hover:text-green  hover:border-green  transition duration-300"
          : "bg-green px-8 py-2 text-white font-bold rounded-sm my-5 border border-transparent border-solid hover:bg-transparent hover:text-green  hover:border-green  transition duration-300 "
      }`}
      onClick={() => loginWithRedirect()}
    >
      Iniciar sesión
    </button>
  );
};

export default LoginButton;
