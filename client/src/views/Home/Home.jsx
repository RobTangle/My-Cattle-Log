import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { NavBar } from "../../components/NavBar/NavBar";
import axios from "axios";
import { USER_EXISTS } from "../../constants/urls";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
export function Home() {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } =
    useAuth0();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log(`Terminó de cargar y no está autenticado.`);
    }
  }, [isLoading, isAuthenticated, navigate, user]);

  async function handleValidation(user, isAuthenticated) {
    try {
      const claims = await getAccessTokenSilently();
      localStorage.setItem("tokenCattleTracker", claims);
      if (isAuthenticated && user) {
        console.log(`Despachando GET a USER_EXISTS`);
        let existe = await axios.get(USER_EXISTS, {
          headers: {
            Authorization: `Bearer ${claims}`,
          },
        });
        if (existe.data.msg === false) {
          navigate("/register");
        }
      }
    } catch (error) {
      console.log(
        "Sucedió un error en la función handleValidation del componente Home. ",
        error
      );
    }
  }

  if (!isLoading && isAuthenticated) {
    console.log(`Usuario autenticado. Invocando handleValidation... `);
    handleValidation(user, isAuthenticated);
  }

  return (
    <div className="max-w-7xl mx-auto">
      <NavBar />
      <div className="w-full mt-14 md:mt-0 h-52 md:h-96 bg-home bg-cover bg-center text-right flex flex-col justify-end px-5 py-3 md:py-8 items-end ">
        <p className="text-white text-2xl font-semibold font-sans [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)] md:text-4xl">
          My Cattle Log{" "}
        </p>
        <p className="text-white md:text-2xl font-semibold [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)] md:w-3/4">
          ¿Está utilizando papel y lápiz o Microsoft Excel? ¡Deje que My Cattle
          Log le ayude a organizar sus registros de ganado!
        </p>
      </div>
      {/* <div className="w-full h-full md:my-32 my-8">
        <div className="flex flex-col md:flex-row w-full md:h-72">
          <div className="md:w-1/2 w-full">
            <img
              className="w-full  h-72 md:h-full object-contain object-center"
              src="https://res.cloudinary.com/dfbxjt69z/image/upload/v1668780073/cattle/3d-render-smartphone-in-hand-with-finger-on-screen_vzmabh.jpg"
              alt=""
            />
          </div>
          <div className="text-green font-sans md:px-12">
            <p className="text-2xl font-sans mt-5 md:text-3xl">Fácil de usar</p>
            <p>
              ¿No eres experto en informática? No te preocupes, el programa es
              intuitivo y fácil de usar.
            </p>
            <p className="text-2xl font-sans mt-5 md:text-3xl">Pruébalo</p>
            <p>
              ¡Es totalmente gratuito! No hay necesidad de pagar por un
              programa, comience a organizarse hoy!
            </p>
            <p className="text-2xl font-sans mt-5 md:text-3xl">Ilimitado</p>
            <p >SIN límite en la cantidad de animales.</p>
          </div>
        </div>
      </div> */}
      <div className="flex flex-col  md:grid md:grid-cols-3 max-w-5xl mx-auto gap-3 md:my-28 items-start px-5 md:px-0 my-5">
        <div className=" flex flex-col items-center gap-3 md:h-52 w-full rounded-sm py-5 px-2  text-green hover:scale-[1.01] transition duration-500]">
          <div className="w-full h-16 md:h-20">
            <img
              className="w-full h-full object-contain object-center"
              src="https://res.cloudinary.com/dfbxjt69z/image/upload/v1668785593/cattle/o_3_t7xk7s.png"
              alt=""
            />
          </div>
          <p className="text-2xl font-sans md:mb-3 md:text-3xl">Fácil de usar</p>
          <p className="text-center text-xl">
            ¿No eres experto en informática? No te preocupes, el programa es
            intuitivo y fácil de usar.
          </p>
        </div>
        <div className="md:h-52 w-full rounded-sm py-5 px-2  text-green hover:scale-[1.01] transition-all duration-500] flex flex-col items-center gap-3 ">
          <div className="w-full h-16 md:h-20">
            <img
              className="w-full h-full object-contain object-center"
              src="https://res.cloudinary.com/dfbxjt69z/image/upload/v1668785593/cattle/o_3_t7xk7s.png"
              alt=""
            />
          </div>
          <p className="text-2xl font-sans md:mb-3 md:text-3xl">Pruébalo</p>
          <p className="text-center text-xl">
            ¡Es totalmente gratuito! No hay necesidad de pagar por un programa,
            comience a organizarse hoy!
          </p>
        </div>
        <div className="md:h-52 w-full rounded-sm py-5 px-2  text-green hover:scale-[1.01] transition-all duration-500] flex flex-col items-center gap-3 ">
          <div className="w-full h-16 md:h-20">
            <img
              className="w-full h-full object-contain object-center"
              src="https://res.cloudinary.com/dfbxjt69z/image/upload/v1668785593/cattle/o_3_t7xk7s.png"
              alt=""
            />
          </div>
          <p className="text-2xl font-sans md:mb-3 md:text-3xl">Ilimitado</p>
          <p className="text-center text-xl">
            SIN límite en la cantidad de animales.
          </p>
        </div>
      </div>
      <div className="w-full h-96  relative bg-home2 bg-center bg-cover flex items-end md:mt-60">
        <div className="h-full w-full bg-gray/30 absolute"></div>
        <div className="my-8 text-right w-full mx-8 z-10">
          <p className="text-white text-2xl font-semibold font-sans [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)] md:text-4xl">
            Simplificando el trabajo
          </p>
          <p className="text-white md:text-2xl font-semibold [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)] ">
            Para la gestión de granjas y animales para simplificar y mejorar la
            gestión del ganado.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
