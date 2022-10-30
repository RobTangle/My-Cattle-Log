import React from "react";
//eslint-disable-next-line
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { cleanNewAnimal } from "../../redux/actions/actions";
import { NavBar } from "../../components/NavBar/NavBar";
import axios from "axios";
import { USER_EXISTS } from "../../constants/urls";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../components/SearchBar/SearchBar";
export function Home() {
  // const dispatch = useDispatch();
  // React.useEffect(() => {
  //   console.log(`Limpiando new animal...`);
  //   dispatch(cleanNewAnimal());
  // }, []);

  const { user, isAuthenticated, getAccessTokenSilently, isLoading, logout } =
    useAuth0();

  const navigate = useNavigate();

  // const handleValidation = async (user, isAuthenticated) => {
  //   try {
  //     const claims = await getAccessTokenSilently();
  //     localStorage.setItem("tokenCattleTracker", claims);
  //     console.log(`isAuthenticated = `, isAuthenticated);
  //     console.log("user = ", user);
  //     if (isAuthenticated && user) {
  //       console.log(`Despachando GET a USER_EXISTS`);
  //       let existe = await axios.get(USER_EXISTS, {
  //         headers: {
  //           Authorization: `Bearer ${claims}`,
  //         },
  //       });
  //       console.log(`existe.data.msg =`);
  //       console.log(existe.data.msg);

  //       if (existe.data.msg === false) {
  //         navigate("/register");
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     console.log(`Regresando al "/" para que se pueda loguear`);
  //     navigate("/");
  //   }
  // };

  React.useEffect(() => {
    console.log(`useEffect de Home`);
    console.log("user = ", user);
    console.log("isAuthenticated = ", isAuthenticated);
    console.log("isLoading = ", isLoading);
    if (!isLoading && !isAuthenticated) {
      console.log(
        `Terminó de cargar y no está autenticado. Navegandolo a "/".`
      );
      //Si no está autenticado, lo mando al landing para que haga el login.
      navigate("/");
    }
  }, [isLoading, isAuthenticated, navigate, user]);

  async function handleValidation(user, isAuthenticated) {
    console.log("En handleValidation.");
    console.log("user = ", user);
    console.log("isAuthenticated = ", isAuthenticated);
    console.log("isLoading = ", isLoading);
    try {
      const claims = await getAccessTokenSilently();
      localStorage.setItem("tokenCattleTracker", claims);
      console.log(`isAuthenticated = `, isAuthenticated);
      console.log("user = ", user);
      if (isAuthenticated && user) {
        console.log(`Despachando GET a USER_EXISTS`);
        let existe = await axios.get(USER_EXISTS, {
          headers: {
            Authorization: `Bearer ${claims}`,
          },
        });
        console.log(`existe.data.msg =`);
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
  }

  if (!isLoading && isAuthenticated) {
    console.log(
      `Entré a !isLoading && isAuthenticated. Invocando handleValidation con: `
    );
    console.log("user = ", user);
    console.log("isAuthenticated = ", isAuthenticated);
    handleValidation(user, isAuthenticated);
  }

  return (
    <div className="max-w-7xl mx-auto">
      <NavBar />
      <div className="w-full mt-16 md:mt-3 h-44 md:h-80 bg-home bg-cover bg-center text-right flex flex-col justify-end px-5 py-3 md:py-8 items-end ">
        <p className="text-white text-2xl font-semibold font-sans [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)] md:text-4xl">
          Cattle Log{" "}
        </p>
        <p className="text-white md:text-2xl font-semibold [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)] md:w-3/4">
          ¿Está utilizando papel y lápiz o Microsoft Excel? ¡Deje que Cattle Log
          le ayude a organizar sus registros de ganado!
        </p>
      </div>
      <div className="w-full my-8 h-full cursor-pointer">
        <p className="text-4xl text-center my-12 text-gray cursor-pointer">
          ¿Qué es Cattle Log?
        </p>

        <div className="flex flex-col  md:grid md:grid-cols-3 max-w-5xl mx-auto gap-3">
          <div className="h-52 w-full bg-green rounded-sm py-5 px-2  text-white hover:scale-[1.01] transition duration-500]">
            <p className="text-2xl font-sans mb-3 md:text-3xl">Fácil de usar</p>
            <p>
              ¿No eres experto en informática? No te preocupes, el programa es
              intuitivo y fácil de usar.
            </p>
          </div>
          <div className="h-52 w-full bg-green rounded-sm py-5 px-2  text-white hover:scale-[1.01] transition-all duration-500]">
            <p className="text-2xl font-sans mb-3 md:text-3xl">Pruébalo</p>
            <p>
              ¡Es totalmente gratuito! No hay necesidad de pagar por un
              programa, comience a organizarse hoy!
            </p>
          </div>
          <div className="h-52 w-full bg-green rounded-sm py-5 px-2  text-white hover:scale-[1.01] transition-all duration-500]">
            <p className="text-2xl font-sans mb-3 md:text-3xl">Ilimitado</p>
            <p>SIN límite en la cantidad de animales.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
