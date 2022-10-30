import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { header } from "../../constants/token";
import axios from "axios";
import { REGISTER_NEW_USER } from "../../constants/urls";
import OkSVG from "../../assets/icons8-ok.svg";

export const SignUp = () => {
  const tokenAccess = localStorage.getItem("tokenCattleTracker");
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  // INPUT STATE:
  const [input, setInput] = useState({
    name: "",
    email: `${user?.email}`,
  });
  console.log(input);
  const redirectToHome = () => {
    Navigate("/home");
  };

  // HANDLE SUBMIT:
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        REGISTER_NEW_USER,
        input,
        header(tokenAccess)
      );
      if (response.status === 200) {
        return (
          <div className="submit-OK">
            <img src={OkSVG} alt="ok message" />
            <h2>Usuario creado exitosamente. Graciar por usar Cattle Log.</h2>
            <button onClick={redirectToHome}>Continuar al home</button>
          </div>
        );
      }
    } catch (error) {
      console.log(`Error en handleSubmit de SignUp. ${error.message}`);
    }
  };

  // HANDLE CHANGE:
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  //VALIDATIONS:
  //...validaciones con JS

  return (
    <div className="px-3 py-5 flex flex-col items-center min-h-screen h-full max-w-7xl mx-auto">
      <div className="bg-landing bg-cover bg-center w-full h-32 flex items-center justify-center mb-8">
        <h1 className="text-green text-3xl text-center backdrop-grayscale-0 bg-white/60 py-1 px-2 md:px-8 md:py-3 rounded-sm ">
          Bienvenido a Cattle Tracker
        </h1>
      </div>
      <p className="text-gray  text-justify mx-auto md:text-xl">
        Es tu primera vez aquí, te pedimos que completes tu perfil para
        continuar y accede a todas las funcionalidades de la app!
      </p>{" "}
      <br />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center md:w-1/2 md:my-8"
      >
        <div className="flex items-center gap-3 mb-3 w-full">
          <label
            htmlFor="name"
            className="text-gray font-semibold w-[90px] md:w-[130px]  "
          >
            Nombre{" "}
          </label>
          <input
            className="bg-gray/10 border border-solid border-gray/10 rounded-sm px-3 py-1  w-full"
            type="text"
            name="name"
            value={input.name}
            placeholder="Nombre"
            minLength={1}
            maxLength={50}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-3 mb-3 w-full">
          <label
            htmlFor="email"
            className="text-gray font-semibold w-[90px] md:w-[130px]"
          >
            Email{" "}
          </label>
          <input
            className="bg-gray/10 border border-solid border-gray/10 rounded-sm px-3 py-1  w-full italic text-gray"
            type="email"
            value={input?.email}
            disabled={true}
            name="email"
          />
        </div>
        <button
          type="submit"
          className="bg-green px-8 py-2 text-white font-bold rounded-sm my-5 border border-transparent border-solid hover:bg-transparent hover:text-green  hover:border-green  transition duration-300 "
        >
          Finalizar
        </button>
      </form>
    </div>
  );
};
